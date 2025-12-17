import React from 'react';
import { Handle, Position } from 'reactflow';
import * as Tooltip from '@radix-ui/react-tooltip';

const ACCENT_STYLES = {
  clay: {
    gradient: 'from-orange-200/25 via-orange-300/15 to-orange-400/20',
    border: 'border-orange-300',
    color: '#c08457',
  },
  sand: {
    gradient: 'from-amber-200/25 via-amber-300/15 to-amber-400/20',
    border: 'border-amber-300',
    color: '#d6b46a',
  },
  eucalyptus: {
    gradient: 'from-teal-200/25 via-teal-300/15 to-teal-400/20',
    border: 'border-teal-400',
    color: '#5f8575',
  },
  moss: {
    gradient: 'from-green-200/25 via-green-300/15 to-green-400/20',
    border: 'border-green-400',
    color: '#6b8f71',
  },
  olive: {
    gradient: 'from-lime-200/25 via-lime-300/15 to-lime-400/20',
    border: 'border-lime-400',
    color: '#8a9b5e',
  },
  sky: {
    gradient: 'from-sky-200/25 via-sky-300/15 to-sky-400/20',
    border: 'border-sky-300',
    color: '#7dd3fc',
  },
  indigo: {
    gradient: 'from-indigo-200/25 via-indigo-300/15 to-indigo-400/20',
    border: 'border-indigo-300',
    color: '#818cf8',
  },
  mauve: {
    gradient: 'from-violet-200/25 via-violet-300/15 to-violet-400/20',
    border: 'border-violet-300',
    color: '#a78bfa',
  },
  dustyRose: {
    gradient: 'from-rose-100/25 via-rose-200/15 to-rose-300/20',
    border: 'border-rose-300',
    color: '#f9a8d4',
  },
  stone: {
    gradient: 'from-stone-200/25 via-stone-300/15 to-stone-400/20',
    border: 'border-stone-400',
    color: '#a8a29e',
  },
};

const normalizeHandle = (h) =>
  typeof h === 'string'
    ? { id: h, label: h }
    : { id: h.id, label: h.label ?? h.id };

export const BaseNode = ({
  title,
  subtitle,
  icon,
  accent = 'stone',
  inputs = [],
  outputs = [],
  children,
  style,
}) => {
  const theme = ACCENT_STYLES[accent] ?? ACCENT_STYLES.stone;

  const handleStyle = {
    width: 12,
    height: 12,
    background: theme.color,
    border: '2px solid #fff',
  };

  return (
    <div
      className={`
        relative w-[260px] rounded-2xl
        bg-gradient-to-br ${theme.gradient}
        shadow-soft border border-l-4 ${theme.border}
      `}
      style={{ ...style, borderLeftColor: theme.color }}
    >
      {/* Header */}
      <div className="flex items-center gap-2 px-3 pt-3">
        <div
          className="h-7 w-7 rounded-xl text-white text-xs font-extrabold flex items-center justify-center"
          style={{ background: theme.color }}
        >
          {icon ?? title?.[0] ?? '?'}
        </div>

        <div className="min-w-0">
          <div className="text-sm font-semibold text-slate-900">{title}</div>
          {subtitle && <div className="text-xs text-slate-500">{subtitle}</div>}
        </div>
      </div>

      {/* Content */}
      <div className="px-3 pb-3 pt-3">{children}</div>

      {/* INPUT HANDLES */}
      {inputs.map(normalizeHandle).map((h, i) => (
        <Tooltip.Root key={`in-${h.label}`}>
          <Tooltip.Trigger asChild>
            <div
              className="absolute flex items-center"
              style={{ left: -10, top: 58 + i * 26 }}
            >
              <Handle
                id={h.id}
                type="target"
                position={Position.Left}
                style={handleStyle}
              />
            </div>
          </Tooltip.Trigger>

          <Tooltip.Content
            side="left"
            className="rounded-md bg-slate-800 px-3 py-1 text-[12px] text-white shadow-lg"
          >
            {h.label}
          </Tooltip.Content>
        </Tooltip.Root>
      ))}

      {/* OUTPUT HANDLES */}
      {outputs.map(normalizeHandle).map((h, i) => (
        <Tooltip.Root key={`out-${h.label}`}>
          <Tooltip.Trigger asChild>
            <div
              className="absolute flex items-center"
              style={{ right: -10, top: 58 + i * 26 }}
            >
              <Handle
                id={h.id}
                type="source"
                position={Position.Right}
                style={handleStyle}
              />
            </div>
          </Tooltip.Trigger>

          <Tooltip.Content
            side="right"
            className="rounded-md bg-slate-800 px-3 py-1 text-[12px] text-white shadow-lg"
          >
            {h.label}
          </Tooltip.Content>
        </Tooltip.Root>
      ))}
    </div>
  );
};
