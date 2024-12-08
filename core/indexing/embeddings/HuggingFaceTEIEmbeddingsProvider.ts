import { LLMOptions } from "../../index.js";
import { BaseLLM } from "../../llm/index.js";
import { withExponentialBackoff } from "../../util/withExponentialBackoff.js";

class HuggingFaceTEIEmbeddingsProvider extends BaseLLM {
  static providerName = "huggingface-tei";
  private _maxBatchSize?: number;

  static defaultOptions: Partial<LLMOptions> | undefined = {
    apiBase: "http://localhost:8080",
    model: "tei",
  };

  constructor(options: LLMOptions) {
    super(options);

    this.doInfoRequest()
      .then((response) => {
        this.model = response.model_id;
        this.maxEmbeddingBatchSize = response.max_client_batch_size;
      })
      .catch((error) => {
        console.error(
          "Failed to fetch info from HuggingFace TEI Embeddings Provider:",
          error,
        );
      });
  }

  async embed(chunks: string[]) {
    const batchedChunks = this.getBatchedChunks(chunks);

    const results = await Promise.all(
      batchedChunks.map((batch) => this.doEmbedRequest(batch)),
    );
    return results.flat();
  }

  async doEmbedRequest(batch: string[]): Promise<number[][]> {
    const resp = await withExponentialBackoff<Response>(() =>
      this.fetch(new URL("embed", this.apiBase), {
        method: "POST",
        body: JSON.stringify({
          inputs: batch,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }),
    );
    if (!resp.ok) {
      const text = await resp.text();
      const embedError = JSON.parse(text) as TEIEmbedErrorResponse;
      if (!embedError.error_type || !embedError.error) {
        throw new Error(text);
      }
      throw new TEIEmbedError(embedError);
    }
    return (await resp.json()) as number[][];
  }

  async doInfoRequest(): Promise<TEIInfoResponse> {
    const resp = await withExponentialBackoff<Response>(() =>
      this.fetch(new URL("info", this.apiBase), {
        method: "GET",
      }),
    );
    if (!resp.ok) {
      throw new Error(await resp.text());
    }
    return (await resp.json()) as TEIInfoResponse;
  }
}

class TEIEmbedError extends Error {
  constructor(teiResponse: TEIEmbedErrorResponse) {
    super(JSON.stringify(teiResponse));
  }
}

type TEIEmbedErrorResponse = {
  error: string;
  error_type: string;
};

type TEIInfoResponse = {
  model_id: string;
  model_sha: string;
  model_dtype: string;
  model_type: {
    embedding: {
      pooling: string;
    };
  };
  max_concurrent_requests: number;
  max_input_length: number;
  max_batch_tokens: number;
  max_batch_requests: number;
  max_client_batch_size: number;
  auto_truncate: boolean;
  tokenization_workers: number;
  version: string;
  sha: string;
  docker_label: string;
};

export default HuggingFaceTEIEmbeddingsProvider;
