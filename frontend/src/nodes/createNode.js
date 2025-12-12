import React, { useState } from "react";
import { Handle, Position } from "reactflow";

export function createNode(config) {
  return function NodeComponent({ id, data }) {
    const {
      label,
      fields = [],
      inputs = [],
      outputs = [],
      width = 200,
      height = 100,
    } = config;

    // Prepare state for fields automatically
    const initialState = {};
    fields.forEach(f => {
      initialState[f.key] = data?.[f.key] || f.default || "";
    });

    const [state, setState] = useState(initialState);

    const updateField = (key, value) => {
      setState(prev => ({ ...prev, [key]: value }));
    };

    return (
      <div
        style={{
          width,
          minHeight: height,
          border: "1px solid black",
          padding: 8,
          background: "white",
          borderRadius: 6,
          position: "relative",
        }}
      >
        {/* Header */}
        <div style={{ fontWeight: "bold", marginBottom: 8 }}>{label}</div>

        {/* Auto-generated fields */}
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {fields.map((field) => (
            <div key={field.key}>
              <label>
                {field.label}:{" "}
                {field.type === "text" && (
                  <input
                    type="text"
                    value={state[field.key]}
                    onChange={(e) => updateField(field.key, e.target.value)}
                  />
                )}

                {field.type === "select" && (
                  <select
                    value={state[field.key]}
                    onChange={(e) => updateField(field.key, e.target.value)}
                  >
                    {field.options.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                )}
              </label>
            </div>
          ))}
        </div>

        {/* Auto input handles */}
        {inputs.map((h, i) => (
          <Handle
            key={h}
            id={h}
            type="target"
            position={Position.Left}
            style={{ top: 60 + i * 25 }}
          />
        ))}

        {/* Auto output handles */}
        {outputs.map((h, i) => (
          <Handle
            key={h}
            id={h}
            type="source"
            position={Position.Right}
            style={{ top: 60 + i * 25 }}
          />
        ))}
      </div>
    );
  };
}
