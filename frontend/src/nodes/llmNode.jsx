import { createNode } from "./createNode";

export const LLMNode = createNode({
  label: 'LLM',
  subtitle: 'Generate text',
  icon: 'L',
  accent: 'moss',
  inputs: [

    { id: 'prompt', label: 'prompt' },
  ],
  outputs: [{ id: 'response', label: 'response' }],

  // Optional custom fields
  fields: [
    {
      type: "text",
      key: "model",
      label: "Model Name",
      default: "gpt-4",
    }
  ],

  // Optional static info inside the node
  description: "This is an LLM.",
});
