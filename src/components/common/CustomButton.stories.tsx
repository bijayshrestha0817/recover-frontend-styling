import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { CustomButton } from "./CustomButton";

const meta = {
  component: CustomButton,
  tags: ["autodocs"],
} satisfies Meta<typeof CustomButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    label: "Primary Button",
    variant: "primary",
  },
};

export const Secondary: Story = {
  args: {
    label: "Secondary Button",
    variant: "secondary",
  },
};

export const Delete: Story = {
  args: {
    label: "deleting...",
    styling: "bg-red-500 text-white",
  },
};
