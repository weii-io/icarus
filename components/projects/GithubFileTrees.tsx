import React from "react";
import { GithubProfile, GithubTree } from "../../interface";
import { getGithubRepositoryTree } from "../../server";

type Props = {
  branch: string;
  repoSlug: string;
  githubProfile: GithubProfile;
};

export const GithubFileTrees = (props: Props) => {
  const [trees, setTrees] = React.useState([] as GithubTree[]);
  React.useEffect(() => {
    getGithubRepositoryTree(
      props.branch,
      props.githubProfile,
      props.repoSlug
    ).then(async (response) => {
      const data = await response.json();
      setTrees(data.tree);
    });
  }, [props.branch, props.githubProfile, props.repoSlug]);

  return <div></div>;
};
