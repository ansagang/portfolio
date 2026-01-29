"use client";

export default function CategorySelect({ language, categories = [], value }) {
  return (
    <select
      name="category"
      value={value ?? ""}
      onChange={(e) => {
        // bubble the change up: we rely on FiltersShell's parent to handle URL updates
        // since this component is rendered *inside* FiltersShell, dispatch a native event
        const ev = new CustomEvent("category-change", { detail: e.target.value });
        window.dispatchEvent(ev);
      }}
      className="select"
    >
      <option value="">{language?.app?.common?.all ?? "All"}</option>
      {categories.map((c) => {
        const code = c?.code ?? c?.value ?? "";
        const title = c?.title ?? c?.label ?? String(code);
        return (
          <option key={code} value={code}>
            {title}
          </option>
        );
      })}
    </select>
  );
}
