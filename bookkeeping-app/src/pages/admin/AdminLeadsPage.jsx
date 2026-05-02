// useState → stores data (leads, search, status)
// useEffect → runs side effects (fetching API)
// useMemo → optimizes filtering (prevents unnecessary recalculations)

import { useEffect, useMemo, useState } from "react";
import SectionHeader from "../../components/ui/SectionHeader";
// reusable UI component for page title/intro

// backend endpoint we created in LeadsController
const API_URL = "https://localhost:7239/api/leads";

export default function AdminLeadsPage() {
  const [leads, setLeads] = useState([]); // holds all leads fetched from API
  const [search, setSearch] = useState(""); // stores search input from user
  const [status, setStatus] = useState({
    loading: true,
    error: "",
  }); // loading → controls spinner/message; error → stores error message if fetch fails

  useEffect(() => {
    async function fetchLeads() {
      try {
        const response = await fetch(API_URL); // call backend API

        // if server returns 4xx/5xx → throw error
        if (!response.ok) {
          throw new Error("Unable to load leads.");
        }

        // convert response to JSON
        const data = await response.json();

        setLeads(data); // store leads in state → triggers re-render
      } catch (error) {
        setStatus({
          loading: false,
          error: error.message || "Something went wrong.",
        }); // if error → stop loading + show message
        return;
      }

      // after success → stop loading
      setStatus({
        loading: false,
        error: "",
      });
    }

    fetchLeads();
  }, []); // [] → runs ONLY once when component mounts

  // ---------------------------
  //
  // FILTERING LOGIC (SEARCH) // ---------------------------

  const filteredLeads = useMemo(() => {
    // normalize search input (case-insensitive + remove spaces)
    const value = search.toLowerCase().trim();

    // if no search → return all leads
    if (!value) return leads;

    return leads.filter((lead) => {
      return (
        lead.name.toLowerCase().includes(value) ||
        lead.email.toLowerCase().includes(value) ||
        lead.message.toLowerCase().includes(value)
      );
    }); // filter leads where ANY field matches search
  }, [leads, search]); // recalculates ONLY when leads or search changes

  // ---------------------------
  // UI RENDER
  // ---------------------------

  return (
    <section className="section">
      <div className="container">
        {/* Page Header */}
        <SectionHeader
          eyebrow="Admin"
          title="Contact Leads"
          text="Review contact form submissions from Lentis visitors."
        />

        {/* Search Input */}
        <div className="admin-toolbar">
          <input
            type="search"
            placeholder="Search by name, email, or message..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Loading State */}
        {status.loading && <p>Loading leads...</p>}

        {/* Error State */}
        {status.error && <p className="form-error">{status.error}</p>}

        {/* Table (only if loaded + no error) */}
        {!status.loading && !status.error && (
          <div className="admin-table-wrap">
            <table className="admin-table">
              {/* Table Header */}
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Message</th>
                  <th>Submitted</th>
                </tr>
              </thead>

              {/* Table Body */}
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

            {/* Empty state */}
            {filteredLeads.length === 0 && <p>No leads match your search.</p>}
          </div>
        )}
      </div>
    </section>
  );
}
