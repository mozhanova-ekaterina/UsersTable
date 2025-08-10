import { useEffect, useState } from "react";

export const useFetch = ({ query, sortBy, order, limit, skip }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchUsers({
      query = "",
      sortBy = "",
      order = "",
      limit = 10,
      skip = 0,
    } = {}) {
      try {
        setLoading(true);
        setError("");

        let url = "https://dummyjson.com/users";

        if (query) {
          url = `https://dummyjson.com/users/search?q=${encodeURIComponent(
            query
          )}`;
        }

        const params = new URLSearchParams();
        params.append("limit", limit);
        params.append("skip", skip);

        if (sortBy && order) {
          params.append("sortBy", sortBy);
          params.append("order", order);
        }

        url += `?${params.toString()}`;

        const res = await fetch(url);

        if (!res.ok) throw new Error("Ошибка при получении данных");
        const data = await res.json();
        setData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchUsers({ query, sortBy, order, limit, skip });
  }, [limit, query, sortBy, order, skip]);

  return { data, loading, error };
};
