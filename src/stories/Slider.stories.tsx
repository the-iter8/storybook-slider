import type { StoryFn } from "@storybook/react";
import Slider from "../components/Slider";
import type { SliderProps } from "../types";

const Template: StoryFn<SliderProps> = (args: SliderProps) => <Slider {...args} />;

export default {
  title: "Components/Slider",
  component: Slider,
};

export const Continuous = Template.bind({});
Continuous.args = {
  min: 0,
  max: 100,
  size: "medium",
  status: "default",
  type: "continuous",
  value: {
    primary: 20,
  },
};

export const RangeHovered = Template.bind({});
RangeHovered.args = {
  min: 0,
  max: 100,
  size: "medium",
  status: "hover",
  type: "range",
  value: {
    primary: 20,
    secondary: 80,
  },
};
export const DiscreteHovered = Template.bind({});
DiscreteHovered.args = {
  min: 0,
  max: 100,
  size: "medium",
  status: "hover",
  type: "discrete",
  step: 10,
  value: {
    primary: 20,
    secondary: 80,
  },
};

export const ContinuousSmallFocused = Template.bind({});
ContinuousSmallFocused.args = {
  min: 0,
  max: 100,
  size: "small",
  status: "focus",
  type: "continuous",
  value: {
    primary: 40,
  },
};
export const RangeSmallFocused = Template.bind({});
RangeSmallFocused.args = {
  min: 0,
  max: 100,
  size: "small",
  status: "focus",
  type: "range",
  value: {
    primary: 40,
    secondary: 80,
  },
};

export const DiscreteStepsVariant = Template.bind({});
DiscreteStepsVariant.args = {
  min: 0,
  max: 100,
  size: "medium",
  status: "default",
  type: "discrete",
  step: 30,
  value: {
    primary: 20,
    secondary: 80,
  },
};
