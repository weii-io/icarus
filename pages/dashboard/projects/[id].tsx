import React from "react";
import { Project, Task } from "../../../interface";
import { getProjectByIdApi, getTasksApi } from "../../../service";
import { Layout } from "../../../components";
import styles from "../../../styles/Project.module.css";
import Link from "next/link";
import { AsideMenu } from "../../../components/projects/aside-menu";
import { TTabKey } from "../../../components/projects/aside-menu/aside-menu.type";
import { useRouter } from "next/router";
import { GithubFileTrees } from "../../../components/projects";

type Props = {
  project: Project;
  tasks: Task[];
};

// TODO: style this page
// TODO: link github file content to this page
// TODO: check whether or not to add a sync feature to save github file to database
// TODO: add a sync feature to save database to github file

function Project(props: Props) {
  const router = useRouter();

  const menuContent = {
    about: (
      <GithubFileTrees
        branch="dev"
        githubProfile={props.project.githubProfile}
        repoSlug={props.project.githubRepoSlug as string}
        key={props.project.id}
      />
    ),
    advanced: <div>advanced</div>,
  };
  return (
    <Layout className={styles.layout}>
      <aside style={{ position: "relative" }}>
        <h1>Icarus</h1>
        <AsideMenu
          currentTab={router.query.tab as TTabKey}
          projectId={props.project.id}
        />
      </aside>
      <section>{menuContent[router.query.tab as TTabKey]}</section>
    </Layout>
  );
}

export const getServerSideProps = async (context: any) => {
  const { req } = context;
  const getProjectByIdReponse = await getProjectByIdApi(
    context.params.id,
    req.headers.cookie
  );
  if (!getProjectByIdReponse.ok) {
    return {
      notFound: true,
    };
  }
  const project = await getProjectByIdReponse.json();
  const getTasksResponse = await getTasksApi(project.id, req.headers.cookie);
  const tasks = await getTasksResponse.json();
  return {
    props: {
      project: project,
      tasks: tasks,
    },
  };
};

export default Project;
