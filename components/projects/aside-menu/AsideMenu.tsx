import React from "react";
import Link from "next/link";
import styles from "./AsideMenu.module.css";
import { TTabKey, Tab } from "./aside-menu.type";
import { useRouter } from "next/router";
import { Button } from "../../button";
import { logoutUserApi } from "../../../server";
import { Icon } from "../../Icon";
import { Spinner } from "../../Spinner";

type Props = {
  currentTab: TTabKey;
  projectId: number;
};

export const AsideMenu: React.FC<Props> = React.memo(
  ({ currentTab, projectId }) => {
    // change icon of the tab
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
        label: "About",
        key: "about",
        path: `/dashboard/projects/${projectId}?tab=about`,
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
        label: "Advanced",
        key: "advanced",
        path: `/dashboard/projects/${projectId}?tab=advanced`,
      },
    ];

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
            router.push("/dashboard");
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
          <span>Back to Dashboard</span>
        </Button.Primary>
      </>
    );
  }
);

AsideMenu.displayName = "AsideMenu";
