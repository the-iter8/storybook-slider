type SliderBarType = "continuous" | "range" | "discrete";
type HandleSize = "small" | "medium";
type HandleStatus = "default" | "hover" | "focus";

interface TooltipProps {
  position: number;
  active: boolean;
  size: HandleSize;
}
interface DiscreetPointsProps {
  max: number;
  position: number;
  step: number;
}
interface ProgressbarProps {
  startPosition: number;
  endPosition: number;
}
interface HandleProps {
  isDragging: boolean;
  onMouseDown: (e: React.MouseEvent<HTMLDivElement>) => void;
  position: number;
  size?: HandleSize;
  status?: HandleStatus;
}

type SliderProps = {
  min: number;
  max: number;
  step?: number;
  type?: SliderBarType;
  value: {
    primary: number;
    secondary?: number;
  };
  size?: HandleSize;
  status?: HandleStatus;
};

export type {
  SliderBarType,
  TooltipProps,
  HandleSize,
  HandleStatus,
  HandleProps,
  SliderProps,
  ProgressbarProps,
  DiscreetPointsProps,
};
