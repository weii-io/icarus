export type TTabKey = "about" | "advanced";
export type Tab = {
  icon: React.ReactNode;
  key: TTabKey;
  label: string;
  path: string;
};
