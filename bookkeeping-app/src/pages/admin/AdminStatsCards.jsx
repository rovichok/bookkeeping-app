// src/pages/admin/AdminStatsCards.jsx

export default function AdminStatsCards({ totalCount, leads }) {
  const latestLead = leads[0];

  const cards = [
    {
      label: "Total leads",
      value: totalCount,
    },
    {
      label: "Current page",
      value: leads.length,
    },
    {
      label: "Latest lead",
      value: latestLead ? latestLead.name : "None",
    },
    {
      label: "Last submitted",
      value: latestLead ? latestLead.displayDate : "—",
    },
  ];

  return (
    <div className="admin-stats-grid">
      {cards.map((card) => (
        <article className="admin-stat-card" key={card.label}>
          <span>{card.label}</span>
          <strong>{card.value}</strong>
        </article>
      ))}
    </div>
  );
}
