import { BaseContextProvider } from "..";
import {
  ContextItem,
  ContextProviderDescription,
  ContextProviderExtras,
  ContextSubmenuItem,
  LoadSubmenuItemsArgs,
} from "../../";
import { walkDirInWorkspaces } from "../../indexing/walkDir";
import generateRepoMap from "../../util/generateRepoMap";
import {
  getUniqueUriPath,
  getUriPathBasename,
  groupByLastNPathParts,
} from "../../util/uri";

const ENTIRE_PROJECT_ITEM: ContextSubmenuItem = {
  id: "entire-codebase",
  title: "Entire codebase",
  description: "Search the entire codebase",
};

class RepoMapContextProvider extends BaseContextProvider {
  static description: ContextProviderDescription = {
    title: "repo-map",
    displayTitle: "Repository Map",
    description: "Select a folder",
    type: "submenu",
  };

  async getContextItems(
    query: string,
    extras: ContextProviderExtras,
  ): Promise<ContextItem[]> {
    return [
      {
        name: "Repository Map",
        description: "Overview of the repository structure",
        content: await generateRepoMap(extras.llm, extras.ide, {
          dirs: query === ENTIRE_PROJECT_ITEM.id ? undefined : [query],
        }),
      },
    ];
  }

  async loadSubmenuItems(
    args: LoadSubmenuItemsArgs,
  ): Promise<ContextSubmenuItem[]> {
    const folders = await walkDirInWorkspaces(args.ide, {
      onlyDirs: true,
    });
    const folderGroups = groupByLastNPathParts(folders, 2);

    return [
      ENTIRE_PROJECT_ITEM,
      ...folders.map((folder) => ({
        id: folder,
        title: getUriPathBasename(folder),
        description: getUniqueUriPath(folder, folderGroups),
      })),
    ];
  }
}

export default RepoMapContextProvider;
