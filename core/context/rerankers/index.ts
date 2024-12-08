import { BedrockReranker } from "./bedrock.js";
import { CohereReranker } from "./cohere.js";
import { ContinueProxyReranker } from "./ContinueProxyReranker.js";
import { FreeTrialReranker } from "./freeTrial.js";
import { LLMReranker } from "./llm.js";
import { HuggingFaceTEIReranker } from "./tei.js";
import { VoyageReranker } from "./voyage.js";

export const AllRerankers: { [key: string]: any } = {
  cohere: CohereReranker,
  bedrock: BedrockReranker,
  llm: LLMReranker,
  voyage: VoyageReranker,
  "free-trial": FreeTrialReranker,
  "huggingface-tei": HuggingFaceTEIReranker,
  "continue-proxy": ContinueProxyReranker,
};
