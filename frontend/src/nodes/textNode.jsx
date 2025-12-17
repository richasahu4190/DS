import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useUpdateNodeInternals } from 'reactflow';
import { useStore } from '../store';
import { BaseNode } from './BaseNode';

const VAR_REGEX = /\{\{\s*([A-Za-z_$][A-Za-z0-9_$]*)\s*\}\}/g;

const clamp = (n, min, max) => Math.max(min, Math.min(max, n));

const getVariablesInOrder = (text) => {
  const seen = new Set();
  const vars = [];
  let m;

  VAR_REGEX.lastIndex = 0;
  while ((m = VAR_REGEX.exec(text)) !== null) {
    const v = m[1];
    if (!seen.has(v)) {
      seen.add(v);
      vars.push(v);
    }
  }

  return vars;
};

let measureCanvas;
const measureLine = (line, font) => {
  if (!measureCanvas) {
    measureCanvas = document.createElement('canvas');
  }
  const ctx = measureCanvas.getContext('2d');
  ctx.font = font;
  return ctx.measureText(line).width;
};

export const TextNode = ({ id, data }) => {
  const updateNodeField = useStore((s) => s.updateNodeField);
  const updateNodeInternals = useUpdateNodeInternals();

  const text = (data?.text ?? 'Output').toString();

  // Persist default once so it becomes part of the store payload
  useEffect(() => {
    if (data?.text === undefined || data?.text === null) {
      updateNodeField(id, 'text', 'Output');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const vars = useMemo(() => getVariablesInOrder(text), [text]);
  const inputHandles = useMemo(
    () => vars.map((v) => ({ id: v, label: v })),
    [vars]
  );

  const textareaRef = useRef(null);
  const [nodeWidth, setNodeWidth] = useState(260);

  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;

    // Autosize height
    el.style.height = '0px';
    const next = clamp(el.scrollHeight, 64, 260);
    el.style.height = `${next}px`;

    // Autosize width based on longest line
    const lines = text.split(/\r?\n/);
    const font = window.getComputedStyle(el).font;
    const maxLineWidth = Math.max(
      120,
      ...lines.map((l) => measureLine(l.length ? l : ' ', font))
    );

    const nextWidth = clamp(Math.ceil(maxLineWidth + 64), 240, 520);
    setNodeWidth(nextWidth);

    // Handles move when the node size/vars change
    updateNodeInternals(id);
  }, [text, vars, id, updateNodeInternals]);

  return (
    <BaseNode
      title="Text"
      subtitle="Templated text"
      icon="T"
      accent="clay"
      inputs={inputHandles}
      outputs={[{ id: 'output', label: 'output' }]}
      style={{ width: nodeWidth }}
    >
      <label className="flex flex-col gap-1">
        <div className="text-xs font-semibold text-slate-600">Text</div>
        <textarea
          ref={textareaRef}
          className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 shadow-sm outline-none focus:border-sky-400 focus:ring-4 focus:ring-sky-100 font-mono leading-5"
          value={text}
          onChange={(e) => updateNodeField(id, 'text', e.target.value)}
          placeholder="Type here. Use {{variable}} to create inputs."
          spellCheck={false}
        />
        {vars.length ? (
          <div className="mt-2 text-xs text-slate-500">
            Inputs: {vars.map((v) => `{{${v}}}`).join(', ')}
          </div>
        ) : (
          <div className="mt-2 text-xs text-slate-500">
            Tip: type {'{{input}}'} to create a new input handle.
          </div>
        )}
      </label>
    </BaseNode>
  );
};
