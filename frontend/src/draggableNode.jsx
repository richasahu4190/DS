// draggableNode.js

export const DraggableNode = ({ type, label }) => {
  const onDragStart = (event, nodeType) => {
    // React Flow DnD relies on a custom mime type. Some browsers are pickier,
    // so we also set text/plain as a fallback.
    const appData = { nodeType };
    event.currentTarget.style.cursor = 'grabbing';

    event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));
    event.dataTransfer.setData('text/plain', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div
      className="cursor-grab select-none rounded-xl border border-slate-200 bg-slate-200 px-3 py-2 text-xs font-semibold text-slate-800 shadow-sm transition hover:-translate-y-0.5 hover:shadow hover:bg-black hover:text-white "
      onDragStart={(event) => onDragStart(event, type)}
      onDragEnd={(event) => (event.currentTarget.style.cursor = 'grab')}
      draggable
    >
      {label}
    </div>
  );
};
