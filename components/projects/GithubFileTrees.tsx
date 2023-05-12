import React from "react";
import { GithubProfile, GithubTree } from "../../interface";
import { getGithubRepositoryTree } from "../../server";
import styles from "./GithubFileTress.module.css";
import { GithubFileTreesContext } from "../../context";
import { Icon } from "../Icon";
import { Spacer } from "../Spacer";

type Props = {
  branch: string;
  repoSlug: string;
  githubProfile: GithubProfile;
};

type Branch = {
  name: string;
  sha: string;
};

export const GithubFileTrees = (props: Props) => {
  const [trees, setTrees] = React.useState([] as GithubTree[]);
  const [directory, setDirectory] = React.useState<Branch[]>([
    {
      name: props.branch,
      sha: props.branch,
    },
  ]);

  React.useEffect(() => {
    getGithubRepositoryTree(
      directory[directory.length - 1].sha,
      props.githubProfile,
      props.repoSlug
    ).then(async (response) => {
      const data = await response.json();
      setTrees(
        data.tree.sort((a: GithubTree, b: GithubTree) => {
          // Sort by type: tree first, then blob
          if (a.type === "tree" && b.type === "blob") {
            return -1; // a is tree, b is blob
          }
          if (a.type === "blob" && b.type === "tree") {
            return 1; // a is blob, b is tree
          }

          // Sort alphabetically within each type
          return a.path.localeCompare(b.path);
        })
      );
    });
  }, [directory, props.githubProfile, props.repoSlug]);

  return (
    <GithubFileTreesContext.Provider
      value={{
        currentDirectory: directory,
      }}
    >
      <div className={styles.container}>
        <div style={{ alignItems: "flex-end" }} className="row">
          {directory.map((branch, index) => {
            return (
              <div className="row" key={index}>
                <Spacer direction="horizontal" size={16} />
                <div>
                  <span>{index === 0 ? "" : ">"}</span>
                  <Spacer direction="horizontal" size={16} />
                </div>
                <div
                  className={styles.directory}
                  onClick={() => {
                    setDirectory(directory.slice(0, index + 1));
                  }}
                >
                  {index !== 0 && (
                    <>
                      <Icon
                        fillColor="black"
                        strokeColor="black"
                        strokeWidth={1.5}
                        height={16}
                        width={16}
                        viewBox="0 0 30 30"
                      >
                        <Icon.Folder />
                      </Icon>
                      <Spacer direction="horizontal" size={4} />
                    </>
                  )}
                  <span>{branch.name}</span>
                </div>
              </div>
            );
          })}
        </div>
        <ul className={styles.listContainer}>
          {trees.map((tree, index) => {
            return (
              <li
                onClick={() => {
                  if (tree.type === "tree") {
                    setDirectory([
                      ...directory,
                      {
                        name: tree.path,
                        sha: tree.sha,
                      },
                    ]);
                  }
                }}
                className={styles.list}
                key={index}
              >
                {tree.type === "blob" ? (
                  <Icon
                    fillColor="white"
                    strokeColor="black"
                    strokeWidth={1.5}
                    height={20}
                    width={20}
                    viewBox="0 0 50 50"
                  >
                    <Icon.File />
                  </Icon>
                ) : (
                  <Icon
                    fillColor="black"
                    strokeColor="black"
                    strokeWidth={1.5}
                    height={20}
                    width={20}
                    viewBox="0 0 30 30"
                  >
                    <Icon.Folder />
                  </Icon>
                )}
                <Spacer direction="horizontal" size={8} />
                <span>{tree.path}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </GithubFileTreesContext.Provider>
  );
};
