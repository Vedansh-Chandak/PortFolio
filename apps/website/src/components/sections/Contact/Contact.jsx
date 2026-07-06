import Container from "@/components/common/Container";
import ContactHeader from "./ContactHeader";
import ContactForm from "./ContactForm";

export default function Contact() {
  return (
    <section
      id="contact"
      className="border-t border-zinc-200 bg-white py-28"
    >
      <Container>
        <div className="grid gap-20 lg:grid-cols-2">
          <ContactHeader />

          <ContactForm />
        </div>
      </Container>
    </section>
  );
}