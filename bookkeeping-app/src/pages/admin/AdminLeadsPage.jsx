import { useEffect, useState, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";

import SectionHeader from "../../components/ui/SectionHeader";
import { useAuth } from "../../context/AuthContext";
import DeleteLeadButton from "./DeleteLeadButton";
import EditLeadModal from "./EditLeadModal";
import EditLeadButton from "./EditLeadButton";
import ConfirmModal from "./ConfirmModal";
import AdminToast from "./AdminToast";
import LeadTableSkeleton from "./LeadTableSkeleton";
import AdminEmptyState from "./AdminEmptyState";
import AdminStatsCards from "./AdminStatsCards";

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

  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const [sortConfig, setSortConfig] = useState({
    key: "createdAtUtc",
    direction: "desc",
  });

  const [editingLead, setEditingLead] = useState(null);
  const [savingEdit, setSavingEdit] = useState(false);

  const [refreshKey, setRefreshKey] = useState(0);
  const [leadPendingDelete, setLeadPendingDelete] = useState(null);

  const [toast, setToast] = useState({
    message: "",
    type: "success",
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search.trim());
      setPage(1);
    }, 300);

    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchLeads() {
      setLoading(true);
      setError("");

      try {
        const params = new URLSearchParams({
          page: String(page),
          pageSize: String(pageSize),
          search: debouncedSearch,
          sortBy: sortConfig.key,
          sortDirection: sortConfig.direction,
        });

        const response = await fetch(`${API_URL}?${params.toString()}`, {
          credentials: "include",
          signal: controller.signal,
        });

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

        setLeads(formattedLeads);
        setTotalCount(data.totalCount ?? 0);
        setTotalPages(data.totalPages ?? 1);
      } catch (error) {
        if (error.name === "AbortError") return;
        setError(error.message || "Something went wrong.");
      } finally {
        setLoading(false);
      }
    }

    fetchLeads();

    return () => controller.abort();
  }, [
    page,
    pageSize,
    debouncedSearch,
    sortConfig,
    refreshKey,
    logout,
    navigate,
  ]);

  useEffect(() => {
    if (editingLead) return;

    const intervalId = setInterval(() => {
      setRefreshKey((prev) => prev + 1);
    }, 30000);

    return () => clearInterval(intervalId);
  }, [editingLead]);

  const showToast = useCallback((message, type = "success") => {
    setToast({ message, type });

    setTimeout(() => {
      setToast({
        message: "",
        type: "success",
      });
    }, 3000);
  }, []);

  const handleSort = useCallback((key) => {
    setPage(1);

    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
    }));
  }, []);

  const getSortIcon = useCallback(
    (key) => {
      if (sortConfig.key !== key) return "↕";
      return sortConfig.direction === "asc" ? "↑" : "↓";
    },
    [sortConfig],
  );

  const getAriaSort = useCallback(
    (key) => {
      if (sortConfig.key !== key) return "none";
      return sortConfig.direction === "asc" ? "ascending" : "descending";
    },
    [sortConfig],
  );

  const handleRequestDeleteLead = useCallback((id) => {
    setLeadPendingDelete(id);
  }, []);

  const handleConfirmDeleteLead = useCallback(async () => {
    if (!leadPendingDelete) return;

    try {
      const response = await fetch(`${API_URL}/${leadPendingDelete}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Unable to delete lead.");
      }

      setLeads((prev) => prev.filter((lead) => lead.id !== leadPendingDelete));
      setTotalCount((prev) => Math.max(prev - 1, 0));

      if (leads.length === 1 && page > 1) {
        setPage((prev) => prev - 1);
      }

      setLeadPendingDelete(null);
      showToast("Lead deleted successfully.");
    } catch (error) {
      alert(error.message || "Something went wrong.");
    }
  }, [leadPendingDelete, leads.length, page, showToast]);

  const paginationLabel = useMemo(() => {
    return `Page ${page} of ${totalPages} · ${totalCount} ${
      totalCount === 1 ? "lead" : "leads"
    }`;
  }, [page, totalPages, totalCount]);

  const handleOpenEditModal = useCallback((lead) => {
    setEditingLead(lead);
  }, []);

  const handleCloseEditModal = useCallback(() => {
    setEditingLead(null);
  }, []);

  async function handleSaveLead(id, updatedLead) {
    setSavingEdit(true);

    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(updatedLead),
      });

      if (response.status === 401) {
        await logout();
        navigate("/admin/login", { replace: true });
        return;
      }

      if (!response.ok) {
        throw new Error("Unable to update lead.");
      }

      const savedLead = await response.json();

      setLeads((prev) =>
        prev.map((lead) =>
          lead.id === id
            ? {
                ...lead,
                ...savedLead,
                displayDate: new Date(savedLead.createdAtUtc).toLocaleString(),
              }
            : lead,
        ),
      );

      setEditingLead(null);
      showToast("Lead updated successfully.");
    } catch (error) {
      alert(error.message || "Something went wrong.");
    } finally {
      setSavingEdit(false);
    }
  }

  return (
    <section className="section">
      <div className="container">
        <SectionHeader
          eyebrow="Admin"
          title="Contact Leads"
          text="Review contact form submissions from Lentis visitors."
        />

        <AdminStatsCards totalCount={totalCount} leads={leads} />

        <div className="admin-toolbar">
          <input
            type="search"
            aria-label="Search leads"
            placeholder="Search by name, email, or message..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <button
            type="button"
            className="admin-secondary-button"
            onClick={() => setRefreshKey((prev) => prev + 1)}
            disabled={loading}
          >
            {loading ? "Refreshing..." : "Refresh"}
          </button>
        </div>

        {error && (
          <p className="form-error" role="alert">
            {error}
          </p>
        )}

        {loading ? (
          <LeadTableSkeleton rows={pageSize} />
        ) : error ? (
          <p className="form-error" role="alert">
            Unable to display leads.
          </p>
        ) : leads.length === 0 ? (
          <AdminEmptyState
            searchTerm={search}
            onClearSearch={() => setSearch("")}
          />
        ) : (
          <>
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

                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {leads.map((lead) => (
                    <tr key={lead.id}>
                      <td>{lead.name}</td>
                      <td>{lead.email}</td>
                      <td>{lead.message}</td>
                      <td>{lead.displayDate}</td>
                      <td className="admin-actions">
                        <EditLeadButton
                          lead={lead}
                          onEdit={handleOpenEditModal}
                        />

                        <DeleteLeadButton
                          leadId={lead.id}
                          onDelete={handleRequestDeleteLead}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {!loading && !error && totalCount > 0 && (
              <div className="admin-pagination">
                <button
                  type="button"
                  onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                  disabled={page === 1}
                >
                  Previous
                </button>

                <span>{paginationLabel}</span>

                <button
                  type="button"
                  onClick={() =>
                    setPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={page === totalPages}
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}

        <EditLeadModal
          key={editingLead?.id || "no-lead"}
          lead={editingLead}
          isOpen={Boolean(editingLead)}
          onClose={handleCloseEditModal}
          onSave={handleSaveLead}
          saving={savingEdit}
        />

        <ConfirmModal
          isOpen={Boolean(leadPendingDelete)}
          title="Delete lead?"
          message="This will permanently remove this contact lead from the admin dashboard."
          confirmText="Delete lead"
          cancelText="Cancel"
          danger
          onConfirm={handleConfirmDeleteLead}
          onCancel={() => setLeadPendingDelete(null)}
        />

        <AdminToast
          message={toast.message}
          type={toast.type}
          onClose={() =>
            setToast({
              message: "",
              type: "success",
            })
          }
        />
      </div>
    </section>
  );
}
