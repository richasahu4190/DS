import { createNode } from "./createNode";

export const InputNode = createNode({
  label: 'Input',
  subtitle: 'Start of pipeline',
  icon: 'I',
  accent: 'violet',
  inputs: [],
  outputs: [{ id: 'value', label: 'value' }],

  fields: [
    {
      type: "text",
      key: "name",
      label: "Name",
      default: "input_1",
    },
    {
      type: "select",
      key: "inputType",
      label: "Type",
      options: ["Text", "File"],
      default: "Text",
    },
  ],
});
