import React from "react";
import Link from "next/link";
import styles from "./AsideMenu.module.css";
import { TTabKey, Tab } from "./aside-menu.type";
import { useRouter } from "next/router";
import { Button } from "../../button";
import { logoutUserApi } from "../../../service";
import { Icon } from "../../Icon";
import { Spinner } from "../../Spinner";

type Props = {
  currentTab: TTabKey;
};

export const AsideMenu: React.FC<Props> = React.memo(({ currentTab }) => {
  const [targetPath, setTargetPath] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();

  React.useEffect(() => {
    router.events.on("routeChangeStart", () => {
      setLoading(true);
    });
    router.events.on("routeChangeComplete", () => {
      setLoading(false);
    });

    return () => {
      router.events.off("routeChangeStart", () => {
        setLoading(true);
      });
      router.events.off("routeChangeComplete", () => {
        setLoading(false);
      });
    };
  }, [router]);

  return (
    <>
      <ul className={styles.container}>
        {Tabs.map(({ key, icon, label, path }) => (
          <li key={key} className={key === currentTab ? styles.active : ""}>
            <Link onClick={() => setTargetPath(path)} href={path}>
              {icon}
              <span>{label}</span>
              <Spinner
                visible={targetPath === path && loading}
                size={16}
                color="#fff"
              />
            </Link>
          </li>
        ))}
      </ul>
      <Button.Primary
        className={styles.logout}
        onClick={async () => {
          await logoutUserApi();
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
    </>
  );
});

AsideMenu.displayName = "AsideMenu";

const Tabs: Tab[] = [
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
    path: "/dashboard?tab=projects",
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
    path: "/dashboard?tab=tasks",
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
    path: "/dashboard?tab=settings",
  },
];
