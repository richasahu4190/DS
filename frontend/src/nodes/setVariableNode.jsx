import { createNode } from "./createNode";

export const SetVariableNode = createNode({
  label: 'Set Variable',
  subtitle: 'Write to context',
  icon: 'V',
  accent: 'olive',
  inputs: [{ id: 'value', label: 'value' }],
  outputs: [{ id: 'value', label: 'value' }],

  fields: [
    {
      type: "text",
      key: "varName",
      label: "Variable Name",
      default: "myVar",
    },
  ],

  description: "Stores the incoming value into a named variable.",
});
