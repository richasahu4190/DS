import { createNode } from './createNode';

export const MergeNode = createNode({
  label: 'Merge',
  subtitle: 'Combine values',
  icon: 'M',
  accent: 'indigo',
  inputs: [
    { id: 'left', label: 'left' },
    { id: 'right', label: 'right' },
  ],
  outputs: [{ id: 'merged', label: 'merged' }],
  fields: [
    {
      type: 'select',
      key: 'mode',
      label: 'Mode',
      options: ['concat', 'prefer-left', 'prefer-right'],
      default: 'concat',
    },
  ],
});
