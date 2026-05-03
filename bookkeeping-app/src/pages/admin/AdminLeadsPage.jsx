import { useEffect, useMemo, useState } from "react";
import SectionHeader from "../../components/ui/SectionHeader";

const API_URL = "https://localhost:7239/api/leads";

const columns = [
  { key: "name", label: "Name" },
  { key: "email", label: "Email" },
  { key: "message", label: "Message" },
  { key: "createdAtUtc", label: "Submitted" },
];

export default function AdminLeadsPage() {
  const [state, setState] = useState({
    leads: [],
    loading: true,
    error: "",
  });

  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const [sortConfig, setSortConfig] = useState({
    key: "createdAtUtc",
    direction: "desc",
  });

  useEffect(() => {
    const controller = new AbortController();

    async function fetchLeads() {
      try {
        const response = await fetch(API_URL, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error("Unable to load leads.");
        }

        const data = await response.json();

        if (!Array.isArray(data)) {
          throw new Error("Invalid leads response.");
        }

        setState({
          leads: data,
          loading: false,
          error: "",
        });
      } catch (error) {
        if (error.name === "AbortError") return;

        setState((prev) => ({
          ...prev,
          loading: false,
          error: error.message || "Something went wrong.",
        }));
      }
    }

    fetchLeads();

    return () => controller.abort();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300);

    return () => clearTimeout(timer);
  }, [search]);

  function handleSort(key) {
    setSortConfig((prev) => {
      const isSameColumn = prev.key === key;

      return {
        key,
        direction: isSameColumn && prev.direction === "asc" ? "desc" : "asc",
      };
    });
  }

  function getSortIcon(key) {
    if (sortConfig.key !== key) return "↕";
    return sortConfig.direction === "asc" ? "↑" : "↓";
  }

  const processedLeads = useMemo(() => {
    const value = debouncedSearch.toLowerCase().trim();

    const filtered = value
      ? state.leads.filter((lead) =>
          [lead.name, lead.email, lead.message].some((field) =>
            field?.toLowerCase().includes(value),
          ),
        )
      : [...state.leads];

    return filtered.sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];

      if (sortConfig.key === "createdAtUtc") {
        const aDate = new Date(aValue).getTime();
        const bDate = new Date(bValue).getTime();

        return sortConfig.direction === "asc" ? aDate - bDate : bDate - aDate;
      }

      const aText = String(aValue ?? "").toLowerCase();
      const bText = String(bValue ?? "").toLowerCase();

      return sortConfig.direction === "asc"
        ? aText.localeCompare(bText)
        : bText.localeCompare(aText);
    });
  }, [state.leads, debouncedSearch, sortConfig]);

  return (
    <section className="section">
      <div className="container">
        <SectionHeader
          eyebrow="Admin"
          title="Contact Leads"
          text="Review contact form submissions from Lentis visitors."
        />

        <div className="admin-toolbar">
          <input
            type="search"
            aria-label="Search leads"
            placeholder="Search by name, email, or message..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {state.loading && <p>Loading leads...</p>}

        {state.error && <p className="form-error">{state.error}</p>}

        {!state.loading && !state.error && (
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  {columns.map((column) => (
                    <th key={column.key}>
                      <button
                        type="button"
                        onClick={() => handleSort(column.key)}
                      >
                        <span className="header-label">{column.label}</span>
                        <span className="header-icon">
                          {getSortIcon(column.key)}
                        </span>
                      </button>
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {processedLeads.map((lead) => (
                  <tr key={lead.id}>
                    <td>{lead.name}</td>
                    <td>{lead.email}</td>
                    <td>{lead.message}</td>
                    <td>{new Date(lead.createdAtUtc).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {processedLeads.length === 0 && <p>No leads match your search.</p>}
          </div>
        )}
      </div>
    </section>
  );
}
