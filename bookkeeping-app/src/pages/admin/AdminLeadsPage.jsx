import { useEffect, useMemo, useState } from "react";
import SectionHeader from "../../components/ui/SectionHeader";

const API_URL = "https://localhost:7239/api/leads";

export default function AdminLeadsPage() {
  // ---------------------------
  // STATE (grouped)
  // ---------------------------
  const [state, setState] = useState({
    leads: [],
    loading: true,
    error: "",
  });

  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  // ---------------------------
  // FETCH LEADS (with AbortController)
  // ---------------------------
  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    async function fetchLeads() {
      try {
        const response = await fetch(API_URL, { signal });

        if (!response.ok) {
          throw new Error("Unable to load leads.");
        }

        const data = await response.json();

        // Safety check (very important in production)
        if (!Array.isArray(data)) {
          throw new Error("Invalid leads response.");
        }

        // Single state update → better performance
        setState({
          leads: data,
          loading: false,
          error: "",
        });
      } catch (error) {
        // Ignore aborted requests (component unmounted)
        if (error.name === "AbortError") return;

        setState((prev) => ({
          ...prev,
          loading: false,
          error: error.message || "Something went wrong.",
        }));
      }
    }

    fetchLeads();

    // Cleanup
    return () => controller.abort();
  }, []);

  // ---------------------------
  // DEBOUNCE SEARCH
  // ---------------------------
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300);

    return () => clearTimeout(timer);
  }, [search]);

  // ---------------------------
  // FILTERING (optimized)
  // ---------------------------
  const filteredLeads = useMemo(() => {
    const value = debouncedSearch.toLowerCase().trim();

    if (!value) return state.leads;

    return state.leads.filter(
      (lead) =>
        lead.name?.toLowerCase().includes(value) ||
        lead.email?.toLowerCase().includes(value) ||
        lead.message?.toLowerCase().includes(value),
    );
  }, [state.leads, debouncedSearch]);

  // ---------------------------
  // UI
  // ---------------------------
  return (
    <section className="section">
      <div className="container">
        <SectionHeader
          eyebrow="Admin"
          title="Contact Leads"
          text="Review contact form submissions from Lentis visitors."
        />

        {/* Search */}
        <div className="admin-toolbar">
          <input
            type="search"
            aria-label="Search leads"
            placeholder="Search by name, email, or message..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Loading */}
        {state.loading && <p>Loading leads...</p>}

        {/* Error */}
        {state.error && <p className="form-error">{state.error}</p>}

        {/* Table */}
        {!state.loading && !state.error && (
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Message</th>
                  <th>Submitted</th>
                </tr>
              </thead>

              <tbody>
                {filteredLeads.map((lead) => (
                  <tr key={lead.id}>
                    <td>{lead.name}</td>
                    <td>{lead.email}</td>
                    <td>{lead.message}</td>
                    <td>{new Date(lead.createdAtUtc).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filteredLeads.length === 0 && <p>No leads match your search.</p>}
          </div>
        )}
      </div>
    </section>
  );
}
