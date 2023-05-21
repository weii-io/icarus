import React from "react";
import { GithubFileTreesContext } from "../../../context";
import classNames from "classnames";
import styles from "./DirectoryPath.module.css";
import { Spacer } from "../../Spacer";
import { Icon } from "../../Icon";
import { IGithubFileTreesContext } from "../../../context/interface";

export const DirectoryPath = () => {
  const { directory, setDirectory } = React.useContext(
    GithubFileTreesContext
  ) as IGithubFileTreesContext;

  return (
    <ul className={classNames("row", styles.container)}>
      {directory.map((branch, index) => {
        return (
          <div className="row" key={index}>
            <Spacer direction="horizontal" size={16} />
            <div>
              <span>{index === 0 ? "" : ">"}</span>
              <Spacer direction="horizontal" size={16} />
            </div>
            <li
              className={styles.listItem}
              onClick={() => {
                setDirectory(directory.slice(0, index + 1));
              }}
            >
              {index !== 0 && (
                <>
                  {branch.type === "tree" ? (
                    <Icon
                      fillColor="white"
                      strokeColor="white"
                      strokeWidth={1.5}
                      height={16}
                      width={16}
                      viewBox="0 0 30 30"
                    >
                      <Icon.Folder />
                    </Icon>
                  ) : (
                    <Icon
                      fillColor="black"
                      strokeColor="white"
                      strokeWidth={1.5}
                      height={16}
                      width={16}
                      viewBox="0 0 50 50"
                    >
                      <Icon.File />
                    </Icon>
                  )}
                  <Spacer direction="horizontal" size={4} />
                </>
              )}
              <span>{branch.name}</span>
            </li>
          </div>
        );
      })}
    </ul>
  );
};
