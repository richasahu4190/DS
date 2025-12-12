import { createNode } from "./createNode";

export const InputNode = createNode({
  label: "Input",
  inputs: [],
  outputs: ["value"],

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
