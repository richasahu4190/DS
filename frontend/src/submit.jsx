// submit.js

import { useMemo, useState } from 'react';
import { useStore } from './store';


export const SubmitButton = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { nodes, edges } = useStore((s) => ({ nodes: s.nodes, edges: s.edges }));

  const payload = useMemo(() => ({ nodes, edges }), [nodes, edges]);

  const onSubmit = async () => {
    setIsSubmitting(true);

    try {
      const resp = await fetch('/pipelines/parse', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!resp.ok) {
        const text = await resp.text();
        throw new Error(text || `HTTP ${resp.status}`);
      }

      const result = await resp.json();
      const { num_nodes, num_edges, is_dag } = result;

      alert(
        `Pipeline parsed:\n\n` +
          `• Nodes: ${num_nodes}\n` +
          `• Edges: ${num_edges}\n` +
          `• DAG: ${is_dag ? 'Yes (acyclic)' : 'No (cycle detected)'}`
      );
    } catch (e) {
      alert(`Failed to submit pipeline.\n\n${e?.message ?? e}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="border-t border-slate-200/70 bg-white/70 backdrop-blur px-5 py-4 flex justify-center">
      <button
        className="min-w-[190px] rounded-2xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800 disabled:opacity-60"
        onClick={onSubmit}
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Submitting…' : 'Submit pipeline'}
      </button>
    </div>
  );
};
