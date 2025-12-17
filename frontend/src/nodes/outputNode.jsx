import { createNode } from "./createNode";

export const OutputNode = createNode({
  label: 'Output',
  subtitle: 'End of pipeline',
  icon: 'O',
  accent: 'eucalyptus',
  inputs: [{ id: 'value', label: 'value' }],
  outputs: [],

  fields: [
    {
      type: "text",
      key: "outputName",
      label: "Name",
      default: "output_1",
    },
    {
      type: "select",
      key: "outputType",
      label: "Type",
      options: ["Text", "Image"],
      default: "Text",
    },
  ],
});
