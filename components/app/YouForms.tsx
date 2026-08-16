"use client";

import { useState, type FormEvent } from "react";
import { deleteAccountAction, exportWorkspaceAction, saveFocusAction } from "@/app/(v2)/(app)/actions";
import { buttonClass, fieldClass, ghostButtonClass } from "@/components/app/fields";

export function FocusForm({ defaultFocus }: { defaultFocus: string }) {
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setSaved(false);
    const result = await saveFocusAction(new FormData(event.currentTarget));
    if (result?.error) {
      setError(result.error);
      return;
    }
    setSaved(true);
  }

  return (
    <form className="space-y-3" onSubmit={onSubmit}>
      <p className="text-sm font-semibold text-kb-seal">Why this goal matters</p>
      <input
        name="focus"
        maxLength={160}
        defaultValue={defaultFocus}
        placeholder="A buffer. A quieter month. A home."
        className={fieldClass}
      />
      {error ? <p className="text-sm text-kb-seal">{error}</p> : null}
      {saved ? <p className="text-sm text-kb-muted">Saved.</p> : null}
      <button type="submit" className={buttonClass}>
        Save
      </button>
    </form>
  );
}

export function ExportButton() {
  const [error, setError] = useState<string | null>(null);

  async function onClick() {
    setError(null);
    const payload = await exportWorkspaceAction();
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "kirabaki-export.json";
    link.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div>
      <button type="button" onClick={onClick} className={`${ghostButtonClass} w-full`}>
        Take a copy
      </button>
      {error ? <p className="mt-2 text-sm text-kb-seal">{error}</p> : null}
    </div>
  );
}

export function DeleteForm() {
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    const result = await deleteAccountAction(new FormData(event.currentTarget));
    if (result?.error) {
      setError(result.error);
    }
  }

  return (
    <form className="space-y-3" onSubmit={onSubmit}>
      <p className="text-sm font-semibold text-kb-seal">Leave</p>
      <p className="text-sm text-kb-muted">This erases the workspace. Type delete if you mean it.</p>
      <input name="confirm" required className={fieldClass} autoComplete="off" />
      {error ? <p className="text-sm text-kb-seal">{error}</p> : null}
      <button type="submit" className={`${ghostButtonClass} w-full`}>
        Erase everything
      </button>
    </form>
  );
}
