import { createNode } from './createNode';

export const JsonParseNode = createNode({
  label: 'JSON Parse',
  subtitle: 'Text → Object',
  icon: '{ }',
  accent: 'sand',
  inputs: [{ id: 'text', label: 'text' }],
  outputs: [{ id: 'json', label: 'json' }],
  fields: [
    {
      type: 'text',
      key: 'path',
      label: 'Path (optional)',
      default: '',
      placeholder: 'e.g. user.name',
    },
  ],
});
