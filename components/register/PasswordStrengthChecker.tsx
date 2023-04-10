import { Icon } from "../Icon";
import styles from "./PasswordStrengthChecker.module.css";

type Props = {
  password: string;
};

export const PasswordStrengthChecker = (props: Props) => {
  return (
    <ul className={styles.container}>
      <li>
        <Icon
          viewBox="0 0 24 24"
          width={16}
          height={16}
          strokeColor="black"
          strokeWidth={1.5}
          fillColor="none"
        >
          {props.password.length >= 8 ? <Icon.Check /> : <Icon.X />}
        </Icon>
        At least 8 characters
      </li>
      <li>
        <Icon
          viewBox="0 0 24 24"
          width={16}
          height={16}
          strokeColor="black"
          strokeWidth={1.5}
          fillColor="none"
        >
          {props.password.match(/[A-Z]/) ? <Icon.Check /> : <Icon.X />}
        </Icon>
        At least one uppercase letter
      </li>
      <li>
        <Icon
          viewBox="0 0 24 24"
          width={16}
          height={16}
          strokeColor="black"
          strokeWidth={1.5}
          fillColor="none"
        >
          {props.password.match(/[a-z]/) ? <Icon.Check /> : <Icon.X />}
        </Icon>
        At least one lowercase letter
      </li>
      <li>
        <Icon
          viewBox="0 0 24 24"
          width={16}
          height={16}
          strokeColor="black"
          strokeWidth={1.5}
          fillColor="none"
        >
          {props.password.match(/[0-9]/) ? <Icon.Check /> : <Icon.X />}
        </Icon>
        At least one number
      </li>
      <li>
        <Icon
          viewBox="0 0 24 24"
          width={16}
          height={16}
          strokeColor="black"
          strokeWidth={1.5}
          fillColor="none"
        >
          {props.password.match(/[!@#$%^&*_]/) ? <Icon.Check /> : <Icon.X />}
        </Icon>
        At least one special character <br />
        (!@#$%^&*_)
      </li>
    </ul>
  );
};
