export default function EditLeadButton({ lead, onEdit }) {
  return (
    <button
      type="button"
      className="admin-secondary-button"
      onClick={() => onEdit(lead)}
    >
      Edit
    </button>
  );
}
