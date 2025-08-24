import React from "react";
import { Plus, Trash2 } from "lucide-react";

interface ArrayEditorProps<T> {
  label: string;
  items: T[];
  onAdd: () => void;
  onRemove: (index: number) => void;
  renderItem: (item: T, index: number) => React.ReactNode;
}

export function ArrayEditor<T>({
  label,
  items,
  onAdd,
  onRemove,
  renderItem,
}: ArrayEditorProps<T>) {
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <span className="text-lg text-gray-100">{label}</span>
        <button
          type="button"
          onClick={onAdd}
          className="inline-flex items-center gap-1 text-xs p-2 rounded-full text-black bg-gray-300 hover:bg-gray-300/80"
        >
          <Plus size={16} />
        </button>
      </div>
      <div className="space-y-2">
        {items.map((item, idx) => (
          <div key={idx} className="p-2 rounded-xl border border-gray-200">
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => onRemove(idx)}
                className="text-gray-300 hover:text-red-400"
              >
                <Trash2 size={16} />
              </button>
            </div>
            {renderItem(item, idx)}
          </div>
        ))}
      </div>
    </div>
  );
}
