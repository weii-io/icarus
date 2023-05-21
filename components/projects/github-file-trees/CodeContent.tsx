import React from "react";
import { GithubFileTreesContext } from "../../../context";
import { IGithubFileTreesContext } from "../../../context/interface";
export const CodeContent = () => {
  const { blob } = React.useContext(
    GithubFileTreesContext
  ) as IGithubFileTreesContext;
  if (!blob) return null;
  return (
    <pre>
      <code>{Buffer.from(blob, "base64").toString("utf-8")}</code>
    </pre>
  );
};
