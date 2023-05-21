import { GithubTree } from "../../../../interface";

export const sortGithubTree = (trees: GithubTree[]) => {
  return trees.sort((a: GithubTree, b: GithubTree) => {
    // Sort by type: tree first, then blob
    if (a.type === "tree" && b.type === "blob") {
      return -1; // a is tree, b is blob
    }
    if (a.type === "blob" && b.type === "tree") {
      return 1; // a is blob, b is tree
    }

    // Sort alphabetically within each type
    return a.path.localeCompare(b.path);
  });
};
