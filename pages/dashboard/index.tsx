import React from "react";
import styles from "../../styles/Dashboard.module.css";
import { useRouter } from "next/router";
import { GetServerSidePropsContext } from "next";

import { User } from "../../interface";
import { Layout } from "../../components";
import { Projects, Settings, Tasks } from "../../components/dashboard";
import { DashboardContext } from "../../context";
import { AsideMenu } from "../../components/dashboard/aside-menu";
import { TTabKey } from "../../components/dashboard/aside-menu/type";
import { IcarusApiUserService } from "../../service/icarus-api/user";

type TProps = {
  user: User;
};

const content = {
  projects: <Projects />,
  settings: <Settings />,
  tasks: <Tasks />,
};

function Dashboard(props: TProps) {
  const router = useRouter();
  const tab = router.query.tab as TTabKey;

  return (
    <>
      <Layout className={styles.layout}>
        <aside style={{ position: "relative" }}>
          <h1>Icarus</h1>
          <AsideMenu currentTab={tab} />
        </aside>
        <section>
          <DashboardContext.Provider value={{ user: props.user }}>
            {content[tab]}
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

  const getCurrentUserResponse =
    await new IcarusApiUserService().getCurrentUser(
      context.req.headers.cookie as string
    );

  if (getCurrentUserResponse.ok) {
    const user = await getCurrentUserResponse.json();
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
