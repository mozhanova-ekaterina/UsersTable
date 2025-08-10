export default function TableHeader({ label, sortKey, sortConfig, onSort }) {
  let arrow = "";
  if (sortConfig.key === sortKey) {
    arrow =
      sortConfig.direction === "asc"
        ? "↑"
        : sortConfig.direction === "desc"
        ? "↓"
        : "";
  }

  return (
    <th
      onClick={() => onSort(sortKey)}
      style={{ cursor: "pointer" }}
    >
      {label} {arrow}
    </th>
  );
}
