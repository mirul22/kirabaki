"use client";

export function TextSubmit({
  id,
  action,
  label,
}: {
  id: string;
  action: (formData: FormData) => void | Promise<void>;
  label: string;
}) {
  return (
    <form action={action}>
      <input type="hidden" name="id" value={id} />
      <button type="submit" className="h-11 px-2 text-sm font-semibold text-kb-muted">
        {label}
      </button>
    </form>
  );
}
