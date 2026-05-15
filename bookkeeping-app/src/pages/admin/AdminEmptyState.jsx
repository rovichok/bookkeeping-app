// src/components/admin/AdminEmptyState.jsx

export default function AdminEmptyState({ searchTerm, onClearSearch }) {
  return (
    <section className="admin-empty-state" role="status">
      <h2>No leads found</h2>

      {searchTerm ? (
        <>
          <p>No leads match your current search.</p>
          <button
            type="button"
            className="admin-btn secondary"
            onClick={onClearSearch}
          >
            Clear search
          </button>
        </>
      ) : (
        <p>
          New website inquiries will appear here once visitors submit the lead
          form.
        </p>
      )}
    </section>
  );
}
