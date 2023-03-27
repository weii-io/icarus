import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Register.module.css";
import React from "react";
import { Tab } from "../components/register";
import { Icon, Layout } from "../components";

interface CreateProjectPayload {
  name: string;
  description: string;
  assigneeEmails: string[];
}

const InputChangeHandler = (
  event: React.ChangeEvent<HTMLInputElement>,
  setPayload: React.Dispatch<React.SetStateAction<any>>
) => {
  setPayload((payload: any) => {
    return {
      ...payload,
      [event.target.id]: event.target.value,
    };
  });
};

const FormSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault();
};

const Register: NextPage = () => {
  const [activeTab, setActiveTab] = React.useState(0);

  const [createProjectPayload, setCreateProjectPayload] =
    React.useState<CreateProjectPayload>({
      name: "",
      description: "",
      assigneeEmails: ["", "", ""],
    });

  const form = React.useRef<HTMLFormElement>(null);

  const tabs = [
    {
      title: "Create your project",
      description: "Get started with your first project",
      form: (
        <>
          <h1>Create your project</h1>
          <p>Get started with your first project</p>
          <div>
            <div>
              <label htmlFor="name">Name</label>
              <input
                value={createProjectPayload.name}
                type="text"
                id="name"
                onChange={(event) =>
                  InputChangeHandler(event, setCreateProjectPayload)
                }
              />
            </div>
            <div>
              <label htmlFor="description">Description</label>
              <input
                value={createProjectPayload.description}
                type="text"
                id="description"
                onChange={(event) =>
                  InputChangeHandler(event, setCreateProjectPayload)
                }
              />
            </div>
            <button onClick={() => setActiveTab(activeTab + 1)}>
              Continue
            </button>
          </div>
        </>
      ),
    },
    {
      title: "Invite your team",
      description: "Start collaborating with your team",
      form: (
        <>
          <h1>Invite your team</h1>
          <p>Start collaborating with your team</p>
          <div>
            <div>
              <label htmlFor="email">Email address</label>
              <input
                data-index={0}
                value={createProjectPayload.assigneeEmails[0]}
                onChange={(event) =>
                  setCreateProjectPayload((payload) => {
                    const index = Number(event.target.dataset.index);
                    const newAssigneeEmails = [...payload.assigneeEmails];
                    newAssigneeEmails[index] = event.target.value;
                    return {
                      ...payload,
                      assigneeEmails: newAssigneeEmails,
                    };
                  })
                }
                type="email"
                id="assigneeEmails[0]"
              />
              <input
                data-index={1}
                value={createProjectPayload.assigneeEmails[1]}
                onChange={(event) =>
                  setCreateProjectPayload((payload) => {
                    const index = Number(event.target.dataset.index);
                    const newAssigneeEmails = [...payload.assigneeEmails];
                    newAssigneeEmails[index] = event.target.value;
                    return {
                      ...payload,
                      assigneeEmails: newAssigneeEmails,
                    };
                  })
                }
                type="email"
                id="assigneeEmails[1]"
              />
              <input
                data-index={2}
                value={createProjectPayload.assigneeEmails[2]}
                onChange={(event) =>
                  setCreateProjectPayload((payload) => {
                    const index = Number(event.target.dataset.index);
                    const newAssigneeEmails = [...payload.assigneeEmails];
                    newAssigneeEmails[index] = event.target.value;
                    return {
                      ...payload,
                      assigneeEmails: newAssigneeEmails,
                    };
                  })
                }
                type="email"
                id="assigneeEmails[2]"
              />
              <button>Add more</button>
            </div>
            <button>complete sign up</button>
          </div>
        </>
      ),
    },
  ];

  return (
    <div>
      <Layout>
        <div className={styles.panel}>
          <h1>Icarus</h1>
          <div>
            {tabs.map((tab, index) => (
              <Tab
                key={tab.title}
                activeIndex={activeTab}
                index={index}
                icon={
                  <Icon
                    viewBox="0 0 24 24"
                    height={24}
                    width={24}
                    fillColor="none"
                    strokeColor="black"
                    strokeWidth={1.5}
                  >
                    <Icon.CheckCircle />
                  </Icon>
                }
                title={tab.title}
                description={tab.description}
              />
            ))}
          </div>
        </div>
        <form
          onSubmit={(event) => FormSubmitHandler(event)}
          className={styles.panel}
          ref={form}
        >
          {tabs[activeTab].form}
        </form>
      </Layout>
    </div>
  );
};

export default Register;
