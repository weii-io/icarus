import React from "react";
import styles from "../AsideMenu.module.css";
import Link from "next/link";
import { DashboardAsideMenuContext } from "../context";
import { IDashboardAsideMenuContext } from "../context/interface";
import { Icon } from "../../../Icon";
import { IBaseTabProps } from "./interface";

export const Projects = ({ key }: IBaseTabProps) => {
  const path = "/dashboard?tab=projects";
  const { setTargetPath, currentTab } = React.useContext(
    DashboardAsideMenuContext
  ) as IDashboardAsideMenuContext;

  return (
    <li className={currentTab === key ? styles.active : ""}>
      <Link onClick={() => setTargetPath(path)} href={path}>
        <Icon
          height={16}
          width={16}
          viewBox="0 0 24 24"
          fillColor="none"
          strokeWidth={1.5}
          strokeColor="white"
        >
          <Icon.Document />
        </Icon>
        <span>Projects</span>
      </Link>
    </li>
  );
};
