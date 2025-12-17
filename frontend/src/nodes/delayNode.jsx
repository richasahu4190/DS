import { createNode } from './createNode';

export const DelayNode = createNode({
  label: 'Delay',
  subtitle: 'Wait before forwarding',
  icon: '⏱',
  accent: 'stone',
  inputs: [{ id: 'in', label: 'in' }],
  outputs: [{ id: 'out', label: 'out' }],
  fields: [
    {
      type: 'number',
      key: 'ms',
      label: 'Milliseconds',
      default: 250,
      placeholder: 'e.g. 500',
    },
  ],
});
