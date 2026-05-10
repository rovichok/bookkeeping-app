import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SectionHeader from "../../components/ui/SectionHeader";
import { useAuth } from "../../context/AuthContext";

const API_URL = "https://localhost:7239/api/leads";

const COLUMNS = [
  { key: "name", label: "Name" },
  { key: "email", label: "Email" },
  { key: "message", label: "Message" },
  { key: "createdAtUtc", label: "Submitted" },
];

export default function AdminLeadsPage() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const [state, setState] = useState({
    leads: [],
    loading: true,
    error: "",
    totalCount: 0,
    totalPages: 1,
  });

  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);

  const [sortConfig, setSortConfig] = useState({
    key: "createdAtUtc",
    direction: "desc",
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1);
    }, 300);

    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchLeads() {
      console.log("fetchLeads started");
      setState((prev) => ({
        ...prev,
        loading: true,
        error: "",
      }));

      try {
        const params = new URLSearchParams({
          page: String(page),
          pageSize: String(pageSize),
          search: debouncedSearch,
          sortBy: sortConfig.key,
          sortDirection: sortConfig.direction,
        });

        console.log("Fetching leads from:", `${API_URL}?${params.toString()}`);
        const response = await fetch(`${API_URL}?${params.toString()}`, {
          signal: controller.signal,
          credentials: "include",
        });
        console.log("Leads response status:", response.status);
        if (response.status === 401) {
          await logout();
          navigate("/admin/login", { replace: true });
          return;
        }

        if (!response.ok) {
          throw new Error("Unable to load leads.");
        }

        const data = await response.json();

        if (!Array.isArray(data.items)) {
          throw new Error("Invalid leads response.");
        }

        const formattedLeads = data.items.map((lead) => ({
          ...lead,
          displayDate: new Date(lead.createdAtUtc).toLocaleString(),
        }));

        setState({
          leads: formattedLeads,
          loading: false,
          error: "",
          totalCount: data.totalCount ?? 0,
          totalPages: data.totalPages ?? 1,
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
  }, [page, pageSize, debouncedSearch, sortConfig, logout, navigate]);

  useEffect(() => {
    console.log("AdminLeadsPage mounted");
  }, []);

  function handleSort(key) {
    setPage(1);

    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
    }));
  }

  function getSortIcon(key) {
    if (sortConfig.key !== key) return "↕";
    return sortConfig.direction === "asc" ? "↑" : "↓";
  }

  function getAriaSort(key) {
    if (sortConfig.key !== key) return "none";
    return sortConfig.direction === "asc" ? "ascending" : "descending";
  }

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

        {state.error && (
          <p className="form-error" role="alert">
            {state.error}
          </p>
        )}

        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                {COLUMNS.map((column) => (
                  <th key={column.key} aria-sort={getAriaSort(column.key)}>
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
              {state.loading ? (
                <tr>
                  <td colSpan={COLUMNS.length}>Loading leads...</td>
                </tr>
              ) : state.error ? (
                <tr>
                  <td colSpan={COLUMNS.length}>Unable to display leads.</td>
                </tr>
              ) : state.leads.length > 0 ? (
                state.leads.map((lead) => (
                  <tr key={lead.id}>
                    <td>{lead.name}</td>
                    <td>{lead.email}</td>
                    <td>{lead.message}</td>
                    <td>{lead.displayDate}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={COLUMNS.length}>No leads match your search.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {!state.loading && !state.error && state.totalCount > 0 && (
          <div className="admin-pagination">
            <button
              type="button"
              onClick={() => setPage((p) => Math.max(p - 1, 1))}
              disabled={page === 1}
            >
              Previous
            </button>

            <span>
              Page {page} of {state.totalPages} · {state.totalCount}{" "}
              {state.totalCount === 1 ? "lead" : "leads"}
            </span>

            <button
              type="button"
              onClick={() => setPage((p) => Math.min(p + 1, state.totalPages))}
              disabled={page === state.totalPages}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
