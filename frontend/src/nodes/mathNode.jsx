import { createNode } from './createNode';

export const MathNode = createNode({
  label: 'Math',
  subtitle: 'a ⊕ b',
  icon: '∑',
  accent: 'sky',
  inputs: [
    { id: 'a', label: 'a' },
    { id: 'b', label: 'b' },
  ],
  outputs: [{ id: 'result', label: 'result' }],
  fields: [
    {
      type: 'select',
      key: 'op',
      label: 'Operation',
      options: ['+', '-', '*', '/'],
      default: '+',
    },
  ],
});
