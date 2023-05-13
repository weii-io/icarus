import React from "react";
import styles from "./GithubFileTrees.module.css";
import { Branch, GithubProfile, GithubTree } from "../../../interface";
import { getGithubBlob, getGithubRepositoryTree } from "../../../server";
import { GithubFileTreesContext } from "../../../context";
import { Icon } from "../../Icon";
import { Spacer } from "../../Spacer";
import { DirectoryPath } from "./DirectoryPath";
import { sortGithubTree } from "./utils";
import { CodeContent } from "./CodeContent";

type Props = {
  branch: string;
  repoSlug: string;
  githubProfile: GithubProfile;
};

export const GithubFileTrees = (props: Props) => {
  const [trees, setTrees] = React.useState([] as GithubTree[]);
  const [blob, setBlob] = React.useState("");
  const [directory, setDirectory] = React.useState<Branch[]>([
    {
      name: props.branch,
      sha: props.branch,
      type: "tree",
    },
  ]);

  const onClickTreeDirectoryHandler = (tree: GithubTree) => {
    setDirectory([
      ...directory,
      {
        name: tree.path,
        sha: tree.sha,
        type: tree.type,
      },
    ]);
  };

  const onClickBlobDirectoryHandler = (tree: GithubTree) => {
    setDirectory([
      ...directory.slice(0, directory.length - 1),
      {
        name: tree.path,
        sha: tree.sha,
        type: tree.type,
      },
    ]);
    getGithubBlob(props.repoSlug, tree.sha).then(async (response) => {
      const data = await response.json();
      if (data.content === "")
        setBlob(Buffer.from("This file is empty").toString("base64"));
      else setBlob(data.content);
    });
  };

  React.useEffect(() => {
    if (directory[directory.length - 1].type === "tree") {
      // get github tree
      getGithubRepositoryTree(
        directory[directory.length - 1].sha,
        props.githubProfile,
        props.repoSlug
      ).then(async (response) => {
        if (response.ok) {
          const data = await response.json();
          setTrees(sortGithubTree(data.tree));
        }
      });
      // set blob to empty
      setBlob("");
    }
  }, [directory, props.githubProfile, props.repoSlug, blob]);

  return (
    <GithubFileTreesContext.Provider
      value={{
        directory,
        setDirectory,
        blob,
      }}
    >
      <div className={styles.container}>
        <DirectoryPath />
        <ul className={styles.list}>
          <CodeContent />
          {!blob &&
            trees.map((tree, index) => {
              return (
                <li
                  onClick={() => {
                    if (tree.type === "tree") onClickTreeDirectoryHandler(tree);
                    else onClickBlobDirectoryHandler(tree);
                  }}
                  className={styles.listItem}
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
