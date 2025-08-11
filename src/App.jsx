import { useState } from "react";
import "./App.css";
import { useFetch } from "./hooks/useFetch";
import { Pagination } from "./components/Pagination/Pagination";
import UserTable from "./components/UserTable/UserTable";
import { Select } from "./components/Select/Select";

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
      
      {loading && <div className="loader"></div>}
      {error && <p className="error">{error}</p>}

      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
       <Select limit={limit} setLimit={setLimit} />
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
