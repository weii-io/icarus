export type BaseInputProps = {
  // onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

export type TextProps = {
  autoComplete: string;
  id: string;
  label: string;
  required: boolean;
  value: string;
};
