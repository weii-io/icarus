import React from "react";

type Props = {
  content?: React.ReactNode;
  elementRef?: React.RefObject<HTMLDialogElement>;
};

function Dialog(props: Props) {
  return (
    <dialog ref={props.elementRef}>
      {props.content}
      <button onClick={() => props.elementRef?.current?.close()}>close</button>
    </dialog>
  );
}

export default Dialog;
