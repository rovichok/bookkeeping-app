export default function FaqSection() {
  const faqs = [
    {
      question: "Do you only work with QuickBooks Online?",
      answer:
        "QuickBooks Online is our main bookkeeping platform, but we can also review your current workflow and help you decide what should stay, change, or connect better.",
    },
    {
      question: "Can you help clean up messy books?",
      answer:
        "Yes. We help organize inaccurate, incomplete, or behind bookkeeping records so your financial reports become clearer and easier to trust.",
    },
    {
      question: "Do you work with restaurants?",
      answer:
        "Yes. We are especially interested in helping restaurants improve vendor bills, invoice flow, bookkeeping cleanup, and back-office processes.",
    },
    {
      question: "Can you automate bookkeeping tasks?",
      answer:
        "Yes. We help identify repeated manual tasks and create simpler workflows, dashboards, or automation systems where they make sense.",
    },
    {
      question: "Do I need to switch software?",
      answer:
        "Not necessarily. We first review your current tools and process. The goal is to simplify your workflow, not force unnecessary software changes.",
    },
    {
      question: "How do we get started?",
      answer:
        "Start by contacting us with a short description of your bookkeeping or workflow challenge. We will review the situation and recommend the best next step.",
    },
  ];

  return (
    <section className="section">
      <div className="container">
        <p className="eyebrow">FAQ</p>
        <h2>Common questions</h2>

        <div className="card-grid">
          {faqs.map((faq) => (
            <article className="service-card" key={faq.question}>
              <h3>{faq.question}</h3>
              <p>{faq.answer}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
