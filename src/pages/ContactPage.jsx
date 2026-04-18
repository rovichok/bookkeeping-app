import SectionHeader from "../components/ui/SectionHeader";
import Button from "../components/ui/Button";

export default function ContactPage() {
  return (
    <section className="page-hero">
      <div className="container contact-grid">
        <div>
          <SectionHeader
            eyebrow="Contact"
            title="Let’s talk about your books"
            text="Tell us what is going on, and we’ll help you figure out the next step."
          />
        </div>

        {/* 
          This is only the frontend form for now.
          It does not submit anywhere yet.
          Later, we can connect it to a backend endpoint or email service.
        */}
        <form className="contact-form">
          <label>
            Name
            <input type="text" name="name" />
          </label>

          <label>
            Email
            <input type="email" name="email" />
          </label>

          <label>
            What do you need help with?
            <textarea name="message" rows="6" />
          </label>

          <Button type="submit">Send Inquiry</Button>
        </form>
      </div>
    </section>
  );
}
