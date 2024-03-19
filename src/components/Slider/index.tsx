import React, { useState, useRef, useEffect } from "react";
import type {
  HandleProps,
  SliderProps,
  HandleStatus,
  ProgressbarProps,
  DiscreetPointsProps,
  TooltipProps,
} from "../../types";
import cn from "classnames";

const defaultHandleStyles =
  "flex items-center justify-center rounded-full absolute top-1/2 -translate-y-1/2 shadow-custom cursor-pointer z-10";
const conditionalStyles = {
  default: "bg-white",
  hover: "bg-[#edfaed]",
  focus: "bg-white border-[1.5px] border-secondary",
};

const Tooltip: React.FC<TooltipProps> = ({ position, active, size }) => {
  if (active)
    return (
      <div
        style={{
          bottom: size === "medium" ? "calc(100% + 1rem)" : "calc(100% + 0.5rem)",
        }}
        className='absolute p-2 bg-black text-primary text-center rounded-lg text-[13.5px] select-none'
      >
        <div className='relative'>
          <p>{position.toFixed(2)}%</p>
          <div className='absolute top-5 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-6 w-6 bg-black text-primary text-center rounded-sm rotate-45 -z-20'></div>
        </div>
      </div>
    );
};
const DiscretePoints: React.FC<DiscreetPointsProps> = ({ step, position, max }) => {
  const marginPercentage = max / step;
  const coveredSteps = Math.floor((position / max) * step);

  const points = [];
  for (let i = 0; i < step; i += 1) {
    const backgroundColor = i < coveredSteps ? "white" : "#47b647";

    points.push(
      <div
        style={{
          marginLeft: `calc(${marginPercentage}% - 0.25rem)`,
          background: backgroundColor,
        }}
        key={i}
        className='w-1 h-1 bg-white rounded-full'
      />
    );
  }
  return <div className='absolute top-1/2 -translate-y-1/2 w-full flex box-border ml-[-0.25rem]'>{points}</div>;
};
const ProgressBar: React.FC<ProgressbarProps> = ({ startPosition, endPosition }) => {
  return (
    <div
      className='absolute top-0 h-[8px] rounded-[40px] bg-secondary z-0'
      style={{ left: `${startPosition}%`, width: `${endPosition - startPosition}%` }}
    />
  );
};
const Handle: React.FC<HandleProps> = ({ size = "medium", status = "default", position, onMouseDown, isDragging }) => {
  const handleSize = size === "medium" ? "w-8 h-8" : "w-4 h-4";
  const handleRadius = size === "medium" ? "18px" : "12px";
  const leftValue = `calc(${position}% - ${handleRadius})`;

  return (
    <div
      onMouseDown={onMouseDown}
      className={cn(defaultHandleStyles, handleSize, conditionalStyles[status as HandleStatus])}
      style={{ left: leftValue }}
    >
      <div className={cn("scale-50 bg-secondary", handleSize, defaultHandleStyles)}></div>
      <Tooltip position={position} active={isDragging || status === "hover"} size={size} />
    </div>
  );
};
const Slider: React.FC<SliderProps> = ({ size, status, step, type, value, min = 0, max = 100 }) => {
  const [positionH1, setPositionH1] = useState(value.primary);
  const [positionH2, setPositionH2] = useState(value.secondary || max);
  const [isDragging, setIsDragging] = useState(false);
  const [activeHandle, setActiveHandle] = useState<number | null>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>, handle: number) => {
    setIsDragging(true);
    setActiveHandle(handle);
    updatePosition(e.clientX, handle);
  };
  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging || activeHandle === null) return;
    updatePosition(e.clientX, activeHandle);
  };
  const handleMouseUp = () => {
    setIsDragging(false);
    setActiveHandle(null);
  };
  const updatePosition = (clientX: number, handle: number) => {
    const rect = sliderRef.current!.getBoundingClientRect();
    const x = clientX - rect.left;
    let newPosition = (x / rect.width) * 100;
    newPosition = Math.max(min, newPosition);
    newPosition = Math.min(max, newPosition);
    if (type === "discrete" && step) {
      const stepValue = (max - min) / step;
      newPosition = Math.round(newPosition / stepValue) * stepValue;
    }
    if (type === "range") {
      if (handle === 1) {
        newPosition = Math.min(newPosition, positionH2);
        setPositionH1(newPosition);
      } else {
        newPosition = Math.max(newPosition, positionH1);
        setPositionH2(newPosition);
      }
    } else {
      setPositionH1(newPosition);
    }
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, activeHandle]);

  return (
    <div className='appearance-auto w-[480px] h-[8px] rounded-[40px] bg-primary relative' ref={sliderRef}>
      {type === "range" && (
        <>
          <ProgressBar startPosition={positionH1} endPosition={positionH2} />
          <Handle
            size={size}
            status={status}
            position={positionH1}
            isDragging={isDragging}
            onMouseDown={(e) => handleMouseDown(e, 1)}
          />
          <Handle
            size={size}
            status={status}
            position={positionH2}
            isDragging={isDragging}
            onMouseDown={(e) => handleMouseDown(e, 2)}
          />
        </>
      )}
      {type === "continuous" && (
        <>
          <ProgressBar startPosition={0} endPosition={positionH1} />
          <Handle
            size={size}
            status={status}
            position={positionH1}
            isDragging={isDragging}
            onMouseDown={(e) => handleMouseDown(e, 1)}
          />
        </>
      )}
      {type === "discrete" && (
        <>
          <ProgressBar startPosition={0} endPosition={positionH1} />
          <Handle
            size={size}
            status={status}
            position={positionH1}
            isDragging={isDragging}
            onMouseDown={(e) => handleMouseDown(e, 1)}
          />
          <DiscretePoints step={step!} position={positionH1} max={max} />
        </>
      )}
    </div>
  );
};

export default Slider;
