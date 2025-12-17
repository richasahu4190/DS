import React, { useEffect } from 'react';
import { useStore } from '../store';
import { BaseNode } from './BaseNode';

export function createNode(config) {
  return function NodeComponent({ id, data }) {
    const {
      label,
      subtitle,
      icon,
      accent,
      fields = [],
      inputs = [],
      outputs = [],
      style,
      renderContent,
    } = config;

    const updateNodeField = useStore((s) => s.updateNodeField);

    // Ensure default values exist in the global store so they get included in submit payloads.
    useEffect(() => {
      fields.forEach((f) => {
        const hasValue = data?.[f.key] !== undefined && data?.[f.key] !== null;
        if (!hasValue && f.default !== undefined) {
          updateNodeField(id, f.key, f.default);
        }
      });
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onFieldChange = (field, rawValue) => {
      updateNodeField(id, field.key, rawValue);
    };
    

    const fieldValue = (field) => (data?.[field.key] ?? field.default ?? '').toString();

    return (
      <BaseNode
        title={label}
        subtitle={subtitle}
        icon={icon}
        accent={accent}
        inputs={inputs}
        outputs={outputs}
        style={style}
        
      >
        {typeof renderContent === 'function' ? (
          renderContent({ id, data, updateNodeField })
        ) : (
          <div className="flex flex-col gap-3">
            {fields.map((field) => (
              <label key={field.key} className="flex flex-col gap-1">
                <div className="text-xs font-semibold text-slate-600">{field.label}</div>

                {field.type === 'text' ? (
                  <input
                    className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 shadow-sm outline-none focus:border-sky-400 focus:ring-4 focus:ring-sky-100"
                    type="text"
                    value={fieldValue(field)}
                    onChange={(e) => onFieldChange(field, e.target.value)}
                    placeholder={field.placeholder ?? ''}
                  />
                ) : null}

                {field.type === 'number' ? (
                  <input
                    className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 shadow-sm outline-none focus:border-sky-400 focus:ring-4 focus:ring-sky-100"
                    type="number"
                    value={fieldValue(field)}
                    onChange={(e) => onFieldChange(field, e.target.value)}
                    placeholder={field.placeholder ?? ''}
                  />
                ) : null}

                {field.type === 'select' ? (
                  <select
                    className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 shadow-sm outline-none focus:border-sky-400 focus:ring-4 focus:ring-sky-100"
                    value={fieldValue(field)}
                    onChange={(e) => onFieldChange(field, e.target.value)}
                  >
                    {field.options.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                ) : null}
              </label>
            ))}
          </div>
        )}
      </BaseNode>
    );
  };
}
