import { TTabKey } from "../../type";

export interface IDashboardAsideMenuContext {
  targetPath: string;
  setTargetPath: React.Dispatch<React.SetStateAction<string>>;
  currentTab: TTabKey;
}
