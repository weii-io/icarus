import React from "react";
import { CheckCircle, GoogleColor } from "../icons";

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
