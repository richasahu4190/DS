import { createNode } from './createNode';

export const SwitchNode = createNode({
  label: 'Switch',
  subtitle: 'Route based on key',
  icon: '⇄',
  accent: 'mauve',
  inputs: [{ id: 'in', label: 'in' }],
  outputs: [
    { id: 'true', label: 'true' },
    { id: 'false', label: 'false' },
  ],
  fields: [
    {
      type: 'text',
      key: 'key',
      label: 'Key',
      default: 'enabled',
      placeholder: 'e.g. status',
    },
    {
      type: 'text',
      key: 'equals',
      label: 'Equals',
      default: 'true',
      placeholder: 'e.g. ok',
    },
  ],
});
