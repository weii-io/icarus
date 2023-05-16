import { Project } from "../../../interface";
import { Icon } from "../../Icon";
import styles from "./Dropdown.module.css";
import React from "react";

type Props = {
  project: Project;
};

const ProjectDropdownContext = React.createContext<Project | null>(null);

export const ProjectDropdown = (props: Props) => {
  const [isOpen, setIsOpen] = React.useState(false);

  React.useEffect(() => {
    const handleGlobalClick = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest(`[data-dropdown-id="${props.project.id}"]`)) {
        setIsOpen(false);
      }
    };

    window.addEventListener("click", handleGlobalClick as EventListener);
    return () => {
      window.removeEventListener("click", handleGlobalClick as EventListener);
    };
  }, [props.project.id]);

  React.useEffect(() => {
    const handleDropdownOpen = (event: CustomEvent) => {
      const { id } = event.detail;
      if (id !== props.project.id) {
        setIsOpen(false);
      }
    };

    window.addEventListener(
      "project-dropdown-open",
      handleDropdownOpen as EventListener
    );
    return () => {
      window.removeEventListener(
        "project-dropdown-open",
        handleDropdownOpen as EventListener
      );
    };
  }, [props.project.id]);

  const handleDropdownClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    setIsOpen((prevState) => !prevState);
    window.dispatchEvent(
      new CustomEvent("project-dropdown-open", {
        detail: { id: props.project.id },
      })
    );
  };

  return (
    <div className={styles.container}>
      <div
        onClick={handleDropdownClick}
        className={styles.icon}
        aria-expanded={isOpen ? "true" : "false"}
        data-dropdown-id={props.project.id}
      >
        <Icon
          fillColor="#000"
          height={16}
          width={16}
          strokeColor="black"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
        >
          <Icon.ThreeDotsLineHorizontal />
        </Icon>
      </div>
      <ProjectDropdownContext.Provider value={props.project}>
        {isOpen && <Dropdown />}
      </ProjectDropdownContext.Provider>
    </div>
  );
};

const Dropdown = () => {
  const project = React.useContext(ProjectDropdownContext) as Project;

  return (
    <div className={styles.dropdown} role="select">
      {/* Dropdown content */}
      {/* delete project */}
      <div onClick={() => console.log("delete this project")}>
        <span>Delete {`"${project.name}"`}</span>
      </div>
      {/* update project */}
      <div onClick={() => console.log("update this project")}>
        <span>Update {`"${project.name}"`}</span>
      </div>
    </div>
  );
};
