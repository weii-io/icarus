export type TTabKey = "projects" | "tasks" | "settings";
export type Tab = {
  icon: React.ReactNode;
  key: TTabKey;
  label: string;
  path: string;
};
