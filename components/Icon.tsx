import React from "react";
import {
  Check,
  CheckCircle,
  ExclamationCircle,
  GoogleColor,
  X,
  Document,
  ClipboardDocument,
  Gear6Tooths,
} from "../icons";

type Props = {
  /** unit in pixel */
  width: number;
  /** unit in pixel */
  height: number;
  /** color of the stroke  */
  strokeColor: string;
  /** width of the stroke */
  strokeWidth: number;
  /** color of the fill */
  fillColor: string;
  children: React.ReactNode;
  viewBox: string;
};

type IconSubComponents = {
  CheckCircle: typeof CheckCircle;
  GoogleColor: typeof GoogleColor;
  ExclamationCircle: typeof ExclamationCircle;
  Check: typeof Check;
  X: typeof X;
  Document: typeof Document;
  ClipboardDocument: typeof ClipboardDocument;
  Gear6Tooths: typeof Gear6Tooths;
};

export const Icon: React.FC<Props> & IconSubComponents = (props: Props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill={props.fillColor}
      viewBox={props.viewBox}
      strokeWidth={`${props.strokeWidth}`}
      stroke={props.strokeColor}
      width={props.width}
      height={props.height}
    >
      {props.children}
    </svg>
  );
};

Icon.CheckCircle = CheckCircle;
Icon.GoogleColor = GoogleColor;
Icon.ExclamationCircle = ExclamationCircle;
Icon.Check = Check;
Icon.X = X;
Icon.Document = Document;
Icon.ClipboardDocument = ClipboardDocument;
Icon.Gear6Tooths = Gear6Tooths;
