import { useState } from "react";
import UserTable from "./components/UserTable";
import "./App.css";
import { useFetch } from "./hooks/useFetch";
import { Pagination } from "./components/Pagination";

function App() {
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "" });
  const [limit, setLimit] = useState(10);
  const [skip, setSkip] = useState(0);

  const { data, loading, error } = useFetch({
    sortBy: sortConfig.key,
    order: sortConfig.direction,
    limit,
    skip,
  });

  const pages = Math.ceil(data.total / limit);

  function onSortChange(key) {
    setSortConfig((prev) => {
      if (prev.key === key) {
        if (prev.direction === "asc") return { key, direction: "desc" };
        if (prev.direction === "desc") return { key: "", direction: "" };
      }
      return { key, direction: "asc" };
    });
  }

  return (
    <div className="app-container">
      <h1>Таблица пользователей</h1>

      {loading && <p>Загрузка...</p>}
      {error && <p className="error">{error}</p>}
      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        <div>
          <select onChange={(e) => setLimit(e.target.value)} value={limit}>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="30">30</option>
          </select>
        </div>
        {data.users && (
          <UserTable
            users={data.users}
            sortConfig={sortConfig}
            onSort={onSortChange}
          />
        )}
        <Pagination pages={pages} limit={limit} skip={skip} setSkip={setSkip} />
      </div>
    </div>
  );
}

export default App;
