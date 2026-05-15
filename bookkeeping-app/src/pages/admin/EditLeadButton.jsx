export default function EditLeadButton({ lead, onEdit }) {
  return (
    <button
      type="button"
      className="admin-secondary-button"
      onClick={() => onEdit(lead)}
      aria-label={`Edit lead from ${lead.name}`}
    >
      Edit
    </button>
  );
}
