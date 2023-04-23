import React from "react";
import { Project, User } from "../../interface";
import { useRouter } from "next/router";
import { Layout } from "../../components";
import { GetServerSidePropsContext } from "next";
import styles from "../../styles/Dashboard.module.css";
import { Settings } from "../../components/dashboard/Settings";
import { AsideMenu, Projects, Tasks } from "../../components/dashboard";
import { DashboardContext } from "../../context";
import { getMeApi } from "../../server";
import { TTabKey } from "../../components/dashboard/dashboard.type";
import Link from "next/link";

type Props = {
  user: User;
};

const menuContent = {
  projects: <Projects />,
  settings: <Settings />,
  tasks: <Tasks />,
};

function Dashboard(props: Props) {
  const router = useRouter();

  return (
    <>
      <Layout className={styles.layout}>
        <aside style={{ position: "relative" }}>
          <h1>Icarus</h1>
          <AsideMenu currentTab={router.query.tab as TTabKey} />
        </aside>
        <section>
          <DashboardContext.Provider value={{ user: props.user }}>
            {menuContent[router.query.tab as TTabKey]}
          </DashboardContext.Provider>
        </section>
      </Layout>
    </>
  );
}

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  if (!context.query.tab) {
    return {
      redirect: {
        destination: "/dashboard?tab=projects",
        permanent: false,
      },
    };
  }

  const getMeResponse = await getMeApi(context.req.headers.cookie as string);

  if (getMeResponse.ok) {
    const user = await getMeResponse.json();
    return {
      props: {
        user,
      },
    };
  }

  return {
    props: {},
  };
};

export default Dashboard;
