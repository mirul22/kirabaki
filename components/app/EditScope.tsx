"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

type EditState = {
  editing: boolean;
  setEditing: (value: boolean) => void;
};

const EditContext = createContext<EditState>({
  editing: false,
  setEditing: () => undefined,
});

export function EditScope({ children }: { children: ReactNode }) {
  const [editing, setEditing] = useState(false);
  return <EditContext.Provider value={{ editing, setEditing }}>{children}</EditContext.Provider>;
}

export function useEdit() {
  return useContext(EditContext);
}

export function EditButton({ label = "Edit" }: { label?: string }) {
  const { editing, setEditing } = useEdit();
  return (
    <button
      type="button"
      className="h-11 shrink-0 text-sm font-semibold text-kb-seal"
      onClick={() => setEditing(!editing)}
    >
      {editing ? "Done" : label}
    </button>
  );
}

export function WhenEditing({ children }: { children: ReactNode }) {
  const { editing } = useEdit();
  if (!editing) {
    return null;
  }
  return children;
}

export function WhenReading({ children }: { children: ReactNode }) {
  const { editing } = useEdit();
  if (editing) {
    return null;
  }
  return children;
}
