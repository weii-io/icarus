import React from "react";
import styles from "./AsideMenu.module.css";
import { Button } from "../../button";
import { Icon } from "../../Icon";
import { TTabKey } from "./type";
import { DashboardAsideMenuContext } from "./context";
import { Tab } from "./tab";
import { IcarusApiAuthService } from "../../../service/icarus-api/auth";

type TProps = {
  currentTab: TTabKey;
};

const Tabs = [
  <Tab.Projects key="projects" tabKey="projects" />,
  <Tab.Tasks key="tasks" tabKey="tasks" />,
  <Tab.Settings key="settings" tabKey="settings" />,
];

export const AsideMenu: React.FC<TProps> = React.memo(({ currentTab }) => {
  const [targetPath, setTargetPath] = React.useState<string>("");

  return (
    <DashboardAsideMenuContext.Provider
      value={{
        targetPath,
        setTargetPath,
        currentTab,
      }}
    >
      <ul className={styles.container}>{Tabs.map((tab) => tab)}</ul>
      <Button.Primary
        className={styles.logout}
        onClick={async () => {
          await new IcarusApiAuthService().logout();
          window.location.reload();
        }}
      >
        <Icon
          fillColor="black"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          strokeColor="white"
          width={16}
          height={16}
        >
          <Icon.Logout />
        </Icon>
        <span>Logout</span>
      </Button.Primary>
    </DashboardAsideMenuContext.Provider>
  );
});

AsideMenu.displayName = "AsideMenu";
