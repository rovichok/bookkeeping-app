export default function DeleteLeadButton({ leadId, onDelete }) {
  return (
    <button
      type="button"
      className="admin-danger-button"
      onClick={() => onDelete(leadId)}
      aria-label="Delete lead"
    >
      Delete
    </button>
  );
}
