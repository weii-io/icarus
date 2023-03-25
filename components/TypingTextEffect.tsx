import React from "react";
import styles from "../styles/TypingTextEffect.module.css";

type Props = {
  text: string;
  typingSpeed: number;
};

export function TypingTextEffect({
  text,
  typingSpeed,
  ...props
}: Props & React.HTMLAttributes<HTMLSpanElement>) {
  const [visibleText, setVisibleText] = React.useState("");

  React.useEffect(() => {
    let index = -1;

    const timer = setInterval(() => {
      index++;

      if (index < text.length) {
        setVisibleText((prevText) => prevText + text[index]);
      } else {
        clearInterval(timer);
      }
    }, typingSpeed);

    return () => clearInterval(timer);
  }, [text, typingSpeed]);

  return (
    <span {...props}>
      {visibleText}
      <span
        className={styles.cursor}
        style={{ animation: `blink ${typingSpeed * 10}ms infinite` }}
      >
        |
      </span>
    </span>
  );
}
