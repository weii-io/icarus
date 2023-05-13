import React from "react";
import { GithubFileTreesContext } from "../../../context";
import { TGithubFileTreesContext } from "../../../context/type";
export const CodeContent = () => {
  const { blob } = React.useContext(
    GithubFileTreesContext
  ) as TGithubFileTreesContext;
  if (!blob) return null;
  return (
    <pre>
      <code>{Buffer.from(blob, "base64").toString("utf-8")}</code>
    </pre>
  );
};
