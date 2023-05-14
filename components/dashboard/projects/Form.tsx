import React from "react";
import { CreateProjectContext, ProjectsContext } from "../../../context";
import { CreateProjectDto } from "../../../service/dto";
import { Input } from "../../input";
import { Icon } from "../../Icon";
import { Spacer } from "../../Spacer";
import { Button } from "../../button";
import { Spinner } from "../../Spinner";
import {
  ICreateProjectContext,
  IProjectsContext,
} from "../../../context/interface";

export const CreateProjectForm: React.FC = () => {
  const {
    createProjectDto,
    setCreateProjectDto,
    handleSubmit,
    onChangeRepositorySelect,
  } = React.useContext(CreateProjectContext) as ICreateProjectContext;

  const { userGithubRepositories } = React.useContext(
    ProjectsContext
  ) as IProjectsContext;

  const handleChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setCreateProjectDto((dto: CreateProjectDto) => ({
        ...dto,
        [name]: value,
      }));
    },
    [setCreateProjectDto]
  );

  const [loading, setLoading] = React.useState(false);

  return (
    <form
      onSubmit={async (event) => {
        event.preventDefault();
        setLoading(true);
        await handleSubmit(event);
        setLoading(false);
      }}
    >
      <Input.Text
        label="Project Name"
        name="name"
        id="name"
        value={createProjectDto.name || ""}
        onChange={handleChange}
        required={true}
        autoComplete="off"
      />
      <br />
      <br />
      <Input.TextArea
        required={false}
        label="Project Description"
        name="description"
        id="description"
        value={createProjectDto.description || ""}
        onChange={handleChange}
        autoComplete="off"
      />
      {userGithubRepositories && userGithubRepositories.length > 0 && (
        <div>
          <div className="row" style={{ alignItems: "center" }}>
            <Icon
              viewBox="0 0 24 24"
              width={20}
              height={20}
              strokeColor="none"
              strokeWidth={1.5}
              fillColor="black"
            >
              <Icon.Github />
            </Icon>
            <Spacer direction="horizontal" size={8} />
            <h1>Connect your GitHub Repository</h1>
          </div>
          <Spacer direction="vertical" size={4} />
          <select
            value={createProjectDto.githubRepoSlug || ""}
            style={{ width: "100%", padding: "8px", borderRadius: "4px" }}
            onChange={onChangeRepositorySelect}
          >
            <option value="">Select a Repository</option>
            {userGithubRepositories.map((repo) => (
              <option key={repo.full_name} value={repo.full_name}>
                {repo.name}
              </option>
            ))}
          </select>
        </div>
      )}
      <br />
      <Button.Primary
        style={{
          display: "flex",
          justifyContent: "center",
        }}
        disabled={loading}
        type="submit"
      >
        {loading ? (
          <Spinner visible color="#fff" size={16} />
        ) : (
          "Create Project"
        )}
      </Button.Primary>
    </form>
  );
};
