export default function AdminToast({ message, type = "success", onClose }) {
  if (!message) return null;

  return (
    <div className={`admin-toast admin-toast-${type}`} role="status">
      <span>{message}</span>

      <button type="button" onClick={onClose} aria-label="Dismiss notification">
        ×
      </button>
    </div>
  );
}
