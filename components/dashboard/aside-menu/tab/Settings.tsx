import React from "react";
import styles from "../AsideMenu.module.css";
import Link from "next/link";
import { DashboardAsideMenuContext } from "../context";
import { IDashboardAsideMenuContext } from "../context/interface";
import { Icon } from "../../../Icon";
import { IBaseTabProps } from "./interface";

export const Settings = ({ tabKey }: IBaseTabProps) => {
  const path = "/dashboard?tab=settings";
  const { setTargetPath, currentTab } = React.useContext(
    DashboardAsideMenuContext
  ) as IDashboardAsideMenuContext;

  return (
    <li className={currentTab === tabKey ? styles.active : ""}>
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
        <span>Settings</span>
      </Link>
    </li>
  );
};
