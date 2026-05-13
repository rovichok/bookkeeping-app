export default function DeleteLeadButton({ leadId, onDelete }) {
  return (
    <button
      type="button"
      className="admin-danger-button"
      onClick={() => onDelete(leadId)}
    >
      Delete
    </button>
  );
}
