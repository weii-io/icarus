import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Register.module.css";
import React from "react";
import { Tab } from "../components/register";
import { Icon, Layout } from "../components";

interface CreateUserPayload {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

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
  const [createUserPayload, setCreateUserPayload] =
    React.useState<CreateUserPayload>({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  const [createProjectPayload, setCreateProjectPayload] =
    React.useState<CreateProjectPayload>({
      name: "",
      description: "",
      assigneeEmails: ["", "", ""],
    });

  const form = React.useRef<HTMLFormElement>(null);

  const tabs = [
    {
      title: "Your details",
      description: "Please provide your name and email",
      form: (
        <>
          <h1>Your details</h1>
          <p>Please provide your name and email.</p>
          <button>
            <Icon
              viewBox="0 0 48 48"
              width={24}
              height={24}
              strokeColor="none"
              strokeWidth={0}
              fillColor="none"
            >
              <Icon.GoogleColor />
            </Icon>
            Sign up with Google
          </button>
          <div>
            <hr />
            <p>or</p>
          </div>
          <div>
            <div>
              <label htmlFor="firstName">First name</label>
              <input
                required
                value={createUserPayload.firstName}
                onChange={(event) =>
                  InputChangeHandler(event, setCreateUserPayload)
                }
                type="text"
                id="firstName"
              />
            </div>
            <div>
              <label htmlFor="lastName">Last name</label>
              <input
                required
                value={createUserPayload.lastName}
                onChange={(event) =>
                  InputChangeHandler(event, setCreateUserPayload)
                }
                type="text"
                id="lastName"
              />
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <input
                value={createUserPayload.email}
                onChange={(event) =>
                  InputChangeHandler(event, setCreateUserPayload)
                }
                type="email"
                id="email"
              />
            </div>
            <button
              onClick={() => {
                // validation before continuing to next tab
                // validate first name is not empty
                // validate last name is not empty
                // validate email is not empty
                // validate email is valid
                if (form.current?.reportValidity()) setActiveTab(activeTab + 1);
              }}
            >
              Continue
            </button>
          </div>
        </>
      ),
    },
    {
      title: "Choose a password",
      description: "Must be at least 8 characters",
      form: (
        <>
          <h1>choose a password</h1>
          <p>Must be at least 8 characters</p>
          <div>
            <div>
              <label htmlFor="password">Password</label>
              <input
                required
                value={createUserPayload.password}
                onChange={(event) =>
                  InputChangeHandler(event, setCreateUserPayload)
                }
                pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,12}$"
                onInvalid={(event) => {
                  if (event.currentTarget.validity.patternMismatch)
                    event.currentTarget.setCustomValidity(
                      "Password must be at least 8 characters and include at least one uppercase letter, one lowercase letter, one number, and one special character"
                    );
                }}
                onInput={(event) => {
                  event.currentTarget.setCustomValidity("");
                }}
                type="password"
                id="password"
              />
            </div>
            <div>
              <label htmlFor="confirmPassword">Confirm password</label>
              <input
                required
                pattern={`^${createUserPayload.password}$`}
                onInvalid={(event) => {
                  if (event.currentTarget.validity.patternMismatch)
                    event.currentTarget.setCustomValidity("Password not match");
                }}
                onInput={(event) => {
                  event.currentTarget.setCustomValidity("");
                }}
                value={createUserPayload.confirmPassword}
                onChange={(event) =>
                  InputChangeHandler(event, setCreateUserPayload)
                }
                type="password"
                id="confirmPassword"
              />
            </div>
            <button
              onClick={() => {
                // validation before continuing to next tab
                // validate password is not empty
                // validate password is at least 8 characters
                // validate password matches confirm password
                if (form.current?.reportValidity()) setActiveTab(activeTab + 1);
              }}
            >
              Continue
            </button>
          </div>
        </>
      ),
    },
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
      <Head>
        <title>Icarus - Project Management Tools for weii.io</title>
        <meta
          name="description"
          content="Project Management Tools powered by weii.io"
        />
        {/* TODO: update fav icon */}
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <div className={styles.panel}>
          <h1>icarus</h1>
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
