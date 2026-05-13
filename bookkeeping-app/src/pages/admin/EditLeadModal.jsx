import { useState } from "react";

function getInitialFormData(lead) {
  return {
    name: lead?.name || "",
    email: lead?.email || "",
    message: lead?.message || "",
  };
}

export default function EditLeadModal({
  lead,
  isOpen,
  onClose,
  onSave,
  saving,
}) {
  const [formData, setFormData] = useState(() => getInitialFormData(lead));

  if (!isOpen || !lead) return null;

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    onSave(lead.id, formData);
  }

  return (
    <div className="admin-modal-backdrop">
      <div className="admin-modal" role="dialog" aria-modal="true">
        <div className="admin-modal-header">
          <h2>Edit Lead</h2>

          <button
            type="button"
            className="admin-modal-close"
            onClick={onClose}
            aria-label="Close edit modal"
          >
            ×
          </button>
        </div>

        <form className="admin-modal-form" onSubmit={handleSubmit}>
          <label>
            Name
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Email
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Message
            <textarea
              name="message"
              rows="5"
              value={formData.message}
              onChange={handleChange}
              required
            />
          </label>

          <div className="admin-modal-actions">
            <button
              type="button"
              className="admin-secondary-button"
              onClick={onClose}
              disabled={saving}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="admin-primary-button"
              disabled={saving}
            >
              {saving ? "Saving..." : "Save changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
