import type { Meta, StoryObj } from "@storybook/react-vite";
import { ServerStatusIndicator } from "./server-status-indicator";

const meta = {
  title: "Components/ServerStatusIndicator",
  component: ServerStatusIndicator,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    status: {
      control: "select",
      options: ["checking", "online", "offline"],
    },
  },
} satisfies Meta<typeof ServerStatusIndicator>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Online: Story = { args: { status: "online" } };
export const Offline: Story = { args: { status: "offline" } };
export const Checking: Story = { args: { status: "checking" } };
