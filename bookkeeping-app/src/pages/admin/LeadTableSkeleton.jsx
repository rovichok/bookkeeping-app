// src/components/admin/LeadTableSkeleton.jsx

export default function LeadTableSkeleton() {
  return (
    <div className="admin-table-wrap" aria-label="Loading leads">
      <table className="admin-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Service</th>
            <th>Status</th>
            <th>Submitted</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {Array.from({ length: 6 }).map((_, index) => (
            <tr key={index}>
              {Array.from({ length: 6 }).map((_, cellIndex) => (
                <td key={cellIndex}>
                  <div className="skeleton-line" />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
