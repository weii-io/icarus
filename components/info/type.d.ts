export type TInfo = "error" | "success" | "warning" | "info";
export type ToastProps = {
  message: string;
  handleClose: () => void;
};
