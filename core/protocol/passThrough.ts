import {
  ToCoreFromWebviewProtocol,
  ToWebviewFromCoreProtocol,
} from "./coreWebview.js";

// Message types to pass through from webview to core
export const WEBVIEW_TO_CORE_PASS_THROUGH: (keyof ToCoreFromWebviewProtocol)[] =
  [
    "update/modelChange",
    "ping",
    "abort",
    "history/list",
    "history/delete",
    "history/load",
    "history/save",
    "devdata/log",
    "config/addOpenAiKey",
    "config/addModel",
    "config/newPromptFile",
    "config/ideSettingsUpdate",
    "config/getSerializedProfileInfo",
    "config/deleteModel",
    "config/reload",
    "context/getContextItems",
    "context/loadSubmenuItems",
    "context/addDocs",
    "context/removeDocs",
    "context/indexDocs",
    "autocomplete/complete",
    "autocomplete/cancel",
    "autocomplete/accept",
    "command/run",
    "tts/kill",
    "llm/complete",
    "llm/streamComplete",
    "llm/streamChat",
    "llm/listModels",
    "streamDiffLines",
    "chatDescriber/describe",
    "stats/getTokensPerDay",
    "stats/getTokensPerModel",
    // Codebase
    "index/setPaused",
    "index/forceReIndex",
    "index/forceReIndexFiles",
    "index/indexingProgressBarInitialized",
    // Docs, etc.
    "indexing/getStatuses",
    "indexing/reindex",
    "indexing/abort",
    "indexing/setPaused",
    //
    "completeOnboarding",
    "addAutocompleteModel",
    "config/listProfiles",
    "profiles/switch",
    "didChangeSelectedProfile",
  ];

// Message types to pass through from core to webview
export const CORE_TO_WEBVIEW_PASS_THROUGH: (keyof ToWebviewFromCoreProtocol)[] =
  [
    "configUpdate",
    "getDefaultModelTitle",
    "indexProgress", // Codebase
    "indexing/statusUpdate", // Docs, etc.
    "addContextItem",
    "refreshSubmenuItems",
    "isContinueInputFocused",
    "didChangeAvailableProfiles",
    "setTTSActive",
    "getWebviewHistoryLength",
  ];
