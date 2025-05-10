
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
  const faqs = [
    {
      question: "How do I book a service?",
      answer: "Booking a service is easy! Simply browse our services, select the one you need, choose your preferred date and time, and complete the booking process. You'll receive a confirmation email shortly after."
    },
    {
      question: "What if I'm not satisfied with the service?",
      answer: "Customer satisfaction is our top priority. If you're not completely satisfied with the service provided, please contact our customer support within 24 hours, and we'll arrange for a free re-service or issue a refund as appropriate."
    },
    {
      question: "Are your service providers verified?",
      answer: "Yes, all our service providers undergo a thorough background check and verification process. We ensure they have the necessary skills, experience, and credentials before they join our platform."
    },
    {
      question: "Can I reschedule or cancel my booking?",
      answer: "Yes, you can reschedule or cancel your booking up to 24 hours before the scheduled service time through your account dashboard. Cancellations made less than 24 hours before the service may incur a cancellation fee."
    },
    {
      question: "What areas do you serve?",
      answer: "We currently serve all major cities and surrounding areas across the country. You can check if we serve your area by entering your zip code on our website."
    },
    {
      question: "How are your service prices determined?",
      answer: "Our service prices are based on factors such as the type of service, size of the property, and specific requirements. You'll see a transparent price breakdown before confirming your booking."
    },
  ];

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Find answers to the most common questions about our services
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left text-lg font-medium">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
