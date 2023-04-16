import Link from "next/link";
import { Icon } from "../Icon";
import styles from "./AsideMenu.module.css";
import { TTab } from "./type";
import React from "react";

type Props = {
  currentTab: TTab;
};

const Tabs = [
  {
    icon: (
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
    ),
    label: "Projects",
    key: "projects",
    link: "/dashboard?tab=projects",
  },
  {
    icon: (
      <Icon
        height={16}
        width={16}
        viewBox="0 0 24 24"
        fillColor="none"
        strokeWidth={1.5}
        strokeColor="white"
      >
        <Icon.ClipboardDocument />
      </Icon>
    ),
    label: "Tasks",
    key: "tasks",
    link: "/dashboard?tab=tasks",
  },
  {
    icon: (
      <Icon
        height={16}
        width={16}
        viewBox="0 0 24 24"
        fillColor="none"
        strokeWidth={1.5}
        strokeColor="white"
      >
        <Icon.Gear6Tooths />
      </Icon>
    ),
    label: "Settings",
    key: "settings",
    link: "/dashboard?tab=settings",
  },
];

export const AsideMenu: React.FC<Props> = (props: Props) => {
  // TODO: show some kind of loading when user is switching tabs

  return (
    <ul className={styles.container}>
      {Tabs.map((tab) => (
        <li
          key={tab.key}
          className={tab.key === props.currentTab ? styles.active : ""}
        >
          <Link href={tab.link}>
            {tab.icon}
            <span>{tab.label}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
};
