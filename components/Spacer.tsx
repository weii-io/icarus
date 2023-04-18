import React from "react";
type Props = {
  direction: "horizontal" | "vertical";
  size: number;
};

/**
 * Spacer is a component that can be used to create space between components
 * @param direction direction of the space
 * @param size size of the space in px
 * @returns
 * @example
 * <Spacer direction="horizontal" size={10} />
 * <Spacer direction="vertical" size={10} />
 */

export const Spacer: React.FC<Props> = React.memo(({ size, direction }) => {
  return (
    <div
      style={{
        width: direction === "horizontal" ? `${size}px` : 0,
        height: direction === "vertical" ? `${size}px` : 0,
      }}
    />
  );
});

Spacer.displayName = "Spacer";
