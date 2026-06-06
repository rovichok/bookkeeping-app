import { useEffect, useState } from "react";
import { API_BASE_URL } from "../apiConfig";

export default function AdminAuditPage() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function loadAuditLogs() {
      try {
        const res = await fetch(
          `${API_BASE_URL}/api/admin/audit?page=1&pageSize=25`,
          {
            credentials: "include",
            signal: controller.signal,
          },
        );

        const result = await res.json();

        if (res.status === 401) {
          throw new Error("You are not authorized to view audit history.");
        }

        if (!res.ok) {
          throw new Error(result.message ?? "Failed to load audit logs.");
        }

        setLogs(result.data ?? []);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    loadAuditLogs();

    return () => controller.abort();
  }, []);

  if (loading) {
    return <p>Loading audit history...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <main>
      <h1>Audit History</h1>

      <table>
        <thead>
          <tr>
            <th>Created At</th>
            <th>Action</th>
            <th>Entity Type</th>
            <th>Entity ID</th>
            <th>Performed By</th>
            <th>IP Address</th>
          </tr>
        </thead>

        <tbody>
          {logs.map((log) => (
            <tr key={log.id}>
              <td>{new Date(log.createdAtUtc).toLocaleString()}</td>
              <td>{log.action}</td>
              <td>{log.entityType}</td>
              <td>{log.entityId ?? "-"}</td>
              <td>{log.performedBy ?? "-"}</td>
              <td>{log.ipAddress ?? "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
