// toolbar.js

import { DraggableNode } from './draggableNode';

export const PipelineToolbar = () => {
  return (
    <div className="sticky top-0 z-10 border-b border-slate-200/70 bg-white/80 backdrop-blur">
      <div className="px-5 py-3">
        <div className="text-lg font-semibold text-slate-900 ">VectorShift Pipeline</div>
        <div className=" text-xs text-slate-500">
          Drag nodes into the canvas and connect handles.
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <DraggableNode type="customInput" label="Input" />
          <DraggableNode type="llm" label="LLM" />
          <DraggableNode type="customOutput" label="Output" />
          <DraggableNode type="text" label="Text" />

          {/* New demo nodes */}
          <DraggableNode type="switch" label="Switch" />
          <DraggableNode type="math" label="Math" />
          <DraggableNode type="merge" label="Merge" />
          <DraggableNode type="delay" label="Delay" />
          <DraggableNode type="jsonParse" label="JSON Parse" />
          <DraggableNode type="setVariable" label="Set Variable" />

        </div>
      </div>
    </div>
  );
};
