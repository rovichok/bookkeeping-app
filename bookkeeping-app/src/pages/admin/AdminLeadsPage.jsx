import { useEffect, useState, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";

// Component imports
import SectionHeader from "../../components/ui/SectionHeader";
import { useAuth } from "../../context/AuthContext";
import DeleteLeadButton from "./DeleteLeadButton";
import EditLeadModal from "./EditLeadModal";
import EditLeadButton from "./EditLeadButton";
import ConfirmModal from "./ConfirmModal";
import AdminToast from "./AdminToast";

// Backend API gateway for contact leads
const API_URL = "https://localhost:7239/api/leads";

// Table layout schema defining object keys and headers
const COLUMNS = [
  { key: "name", label: "Name" },
  { key: "email", label: "Email" },
  { key: "message", label: "Message" },
  { key: "createdAtUtc", label: "Submitted" },
];

export default function AdminLeadsPage() {
  const navigate = useNavigate(); // React Router hook for page redirects
  const { logout } = useAuth(); // Custom auth context hook to handle session terminations

  // =========================
  // DATA STATE
  // =========================

  const [leads, setLeads] = useState([]); // Holds the array of lead objects fetched from server
  const [loading, setLoading] = useState(true); // Tracks global network request state
  const [error, setError] = useState(""); // Stores fetch or server-side error messages

  // =========================
  // PAGINATION STATE
  // =========================

  const [page, setPage] = useState(1); // Tracks current active table page
  const [pageSize] = useState(10); // Configures static rows display limit per page

  const [totalCount, setTotalCount] = useState(0); // Total lead count across database
  const [totalPages, setTotalPages] = useState(1); // Derived total pages calculated by backend

  // =========================
  // SEARCH STATE
  // =========================

  const [search, setSearch] = useState(""); // Direct binding for the text input box
  const [debouncedSearch, setDebouncedSearch] = useState(""); // Delayed value used to trigger API calls

  // =========================
  // SORT STATE
  // =========================

  const [sortConfig, setSortConfig] = useState({
    key: "createdAtUtc", // Targeted database column for sorting
    direction: "desc", // "asc" or "desc" sorting order
  });

  // =========================
  // EDIT STATE
  // =========================

  const [editingLead, setEditingLead] = useState(null); // Active lead object populating the open modal
  const [savingEdit, setSavingEdit] = useState(false); // UI loading flag for patch/put operations

  // =========================
  // REFRESH KEY
  // =========================
  const [refreshKey, setRefreshKey] = useState(0);

  // =========================
  // LEAD PENDING STATE
  // =========================
  const [leadPendingDelete, setLeadPendingDelete] = useState(null);

  // =========================
  // TOAST STATE
  // =========================
  const [toast, setToast] = useState({
    message: "",
    type: "success",
  });

  // =========================
  // DEBOUNCED SEARCH EFFECT
  // =========================

  useEffect(() => {
    // Wait for user to stop typing for 300ms before triggering a query
    const timer = setTimeout(() => {
      setDebouncedSearch(search.trim());
      setPage(1); // Reset back to first page when filtering results
    }, 300);

    // Cancel old timer if input changes again before 300ms passes
    return () => clearTimeout(timer);
  }, [search]);

  // =========================
  // FETCH LEADS EFFECT
  // =========================

  useEffect(() => {
    // Instantiates controller to cancel network request if dependencies change quickly
    const controller = new AbortController();

    async function fetchLeads() {
      setLoading(true);
      setError("");

      try {
        // Construct standard query parameters for server pagination/sorting
        const params = new URLSearchParams({
          page: String(page),
          pageSize: String(pageSize),
          search: debouncedSearch,
          sortBy: sortConfig.key,
          sortDirection: sortConfig.direction,
        });

        const response = await fetch(`${API_URL}?${params.toString()}`, {
          credentials: "include", // Passes HttpOnly authentication cookies
          signal: controller.signal, // Attaches request abort listener
        });

        // Terminate flow and redirect user if credentials have expired
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

        // Format dates into localized strings directly inside state allocation loop
        const formattedLeads = data.items.map((lead) => ({
          ...lead,
          displayDate: new Date(lead.createdAtUtc).toLocaleString(),
        }));

        setLeads(formattedLeads);
        setTotalCount(data.totalCount ?? 0);
        setTotalPages(data.totalPages ?? 1);
      } catch (error) {
        // Suppress errors explicitly triggered by React lifecycle unmount aborts
        if (error.name === "AbortError") return;

        setError(error.message || "Something went wrong.");
      } finally {
        setLoading(false);
      }
    }

    fetchLeads();

    // Aborts open HTTP request if the component unmounts or dependencies change
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

  // =========================
  // AUTO-REFRESH EFFECT
  // =========================
  useEffect(() => {
    if (editingLead) return;

    const intervalId = setInterval(() => {
      setRefreshKey((prev) => prev + 1);
    }, 30000);

    return () => clearInterval(intervalId);
  }, [editingLead]);

  // =========================
  // SORTING HANDLERS
  // =========================

  // Triggers column updates and resets current active page index to 1
  const handleSort = useCallback((key) => {
    setPage(1);

    setSortConfig((prev) => ({
      key,
      // Invert direction if clicking current sort header, otherwise default to asc
      direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
    }));
  }, []);

  // Evaluates appropriate text arrow graphics to draw beside active header keys
  const getSortIcon = useCallback(
    (key) => {
      if (sortConfig.key !== key) return "↕";
      return sortConfig.direction === "asc" ? "↑" : "↓";
    },
    [sortConfig],
  );

  // Manages accessible descriptive labels for screen readers reading header sorts
  const getAriaSort = useCallback(
    (key) => {
      if (sortConfig.key !== key) return "none";

      return sortConfig.direction === "asc" ? "ascending" : "descending";
    },
    [sortConfig],
  );

  // =========================
  // DELETE LEAD HANDLER
  // =========================
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
  }, [leadPendingDelete, leads.length, page]);

  // =========================
  // PAGINATION LABEL
  // =========================

  // Generates analytical label string string; updates only when structural counts change
  const paginationLabel = useMemo(() => {
    return `Page ${page} of ${totalPages} · ${totalCount} ${
      totalCount === 1 ? "lead" : "leads"
    }`;
  }, [page, totalPages, totalCount]);

  // =========================
  // MODAL ACTIONS
  // =========================

  // Opens editing view and hooks targeted lead reference data
  const handleOpenEditModal = useCallback((lead) => {
    setEditingLead(lead);
  }, []);

  // Wipes edit state hooks to close modal overlay layout
  const handleCloseEditModal = useCallback(() => {
    setEditingLead(null);
  }, []);

  // Processes form modifications from EditLeadModal using server updates
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

      // Authentication expiration redirect catch
      if (response.status === 401) {
        await logout();
        navigate("/admin/login", { replace: true });
        return;
      }

      if (!response.ok) {
        throw new Error("Unable to update lead.");
      }

      const savedLead = await response.json();

      // Merges newly updated parameters into local leads state to prevent full page re-fetch
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

      // Successfully close dialog modal on complete resolution
      setEditingLead(null);
      showToast("Lead updated successfully.");
    } catch (error) {
      alert(error.message || "Something went wrong.");
    } finally {
      setSavingEdit(false);
    }
  }

  // Toast Function
  function showToast(message, type = "success") {
    setToast({ message, type });

    setTimeout(() => {
      setToast({
        message: "",
        type: "success",
      });
    }, 3000);
  }

  // =========================
  // RENDER JSX
  // =========================

  return (
    <section className="section">
      <div className="container">
        <SectionHeader
          eyebrow="Admin"
          title="Contact Leads"
          text="Review contact form submissions from Lentis visitors."
        />

        {/* Toolbar containing live context search bar */}
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

        {/* Conditional global error alert strip */}
        {error && (
          <p className="form-error" role="alert">
            {error}
          </p>
        )}

        {/* Dynamic Data Table Framework */}
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                {/* Dynamically construct standard table tracking headers from schema layout */}
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
              {loading ? (
                // Loading State Row placeholder
                <tr>
                  <td colSpan={COLUMNS.length + 1}>
                    <div className="admin-loading-row">
                      <span className="admin-spinner" aria-hidden="true"></span>
                      <span>Loading leads...</span>
                    </div>
                  </td>
                </tr>
              ) : error ? (
                // Error Fallback Row placeholder
                <tr>
                  <td colSpan={COLUMNS.length + 1}>Unable to display leads.</td>
                </tr>
              ) : leads.length > 0 ? (
                // Populated Table Row Content Loop
                leads.map((lead) => (
                  <tr key={lead.id}>
                    <td>{lead.name}</td>
                    <td>{lead.email}</td>
                    <td>{lead.message}</td>
                    <td>{lead.displayDate}</td>
                    <td className="admin-actions">
                      {/* Action buttons allowing admin state interaction workflows */}
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
                ))
              ) : (
                // Empty Dataset Match fallback interface row
                <tr>
                  <td colSpan={COLUMNS.length + 1}>
                    No leads match your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer controls (hidden during loading windows or zero-record matches) */}
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
              onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={page === totalPages}
            >
              Next
            </button>
          </div>
        )}

        {/* Dynamic Controlled Popup Form Dialog Element */}
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
