
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
      questionTelugu: "నేను సర్వీస్‌ని ఎలా బుక్ చేసుకోవాలి?",
      answer: "Booking a service is easy! Simply browse our services, select the one you need, choose your preferred date and time, and complete the booking process. You'll receive a confirmation email shortly after.",
      answerTelugu: "సర్వీస్‌ని బుక్ చేసుకోవడం చాలా సులభం! మా సేవలను బ్రౌజ్ చేయండి, మీకు అవసరమైన దానిని ఎంచుకోండి, మీకు అనుకూలమైన తేదీ మరియు సమయాన్ని ఎంచుకోండి మరియు బుకింగ్ ప్రక్రియను పూర్తి చేయండి. మీరు త్వరలోనే నిర్ధారణ ఇమెయిల్‌ని అందుకుంటారు."
    },
    {
      question: "What if I'm not satisfied with the service?",
      questionTelugu: "నేను సేవతో సంతృప్తి చెందకపోతే ఏమి చేయాలి?",
      answer: "Customer satisfaction is our top priority. If you're not completely satisfied with the service provided, please contact our customer support within 24 hours, and we'll arrange for a free re-service or issue a refund as appropriate.",
      answerTelugu: "కస్టమర్ సంతృప్తి మా ప్రధాన ప్రాధాన్యత. మీరు అందించిన సేవతో పూర్తిగా సంతృప్తి చెందకపోతే, దయచేసి 24 గంటలలోపు మా కస్టమర్ సపోర్ట్‌ని సంప్రదించండి, మేము ఉచిత రీ-సర్వీస్ లేదా తగినట్లుగా రీఫండ్‌ను అందిస్తాము."
    },
    {
      question: "Are your service providers verified?",
      questionTelugu: "మీ సేవా ప్రదాతలు ధృవీకరించబడ్డారా?",
      answer: "Yes, all our service providers undergo a thorough background check and verification process. We ensure they have the necessary skills, experience, and credentials before they join our platform.",
      answerTelugu: "అవును, మా సేవా ప్రదాతలందరూ సమగ్రమైన నేపథ్య తనిఖీ మరియు ధృవీకరణ ప్రక్రియను పూర్తి చేస్తారు. వారు మా ప్లాట్‌ఫారమ్‌లో చేరే ముందు వారికి అవసరమైన నైపుణ్యాలు, అనుభవం మరియు ప్రమాణపత్రాలు ఉన్నాయని మేము నిర్ధారిస్తాము."
    },
    {
      question: "Can I reschedule or cancel my booking?",
      questionTelugu: "నేను నా బుకింగ్‌ని రీషెడ్యూల్ చేయగలనా లేదా రద్దు చేయగలనా?",
      answer: "Yes, you can reschedule or cancel your booking up to 24 hours before the scheduled service time through your account dashboard. Cancellations made less than 24 hours before the service may incur a cancellation fee.",
      answerTelugu: "అవును, మీరు మీ అకౌంట్ డాష్‌బోర్డ్ ద్వారా షెడ్యూల్ చేసిన సేవా సమయానికి 24 గంటల ముందు వరకు మీ బుకింగ్‌ని రీషెడ్యూల్ చేయవచ్చు లేదా రద్దు చేయవచ్చు. సేవకు 24 గంటల కంటే తక్కువ సమయంలో చేసిన రద్దులకు రద్దు రుసుము విధించబడవచ్చు."
    },
    {
      question: "What areas do you serve?",
      questionTelugu: "మీరు ఏ ప్రాంతాలకు సేవలందిస్తున్నారు?",
      answer: "We currently serve all major cities and surrounding areas across the country. You can check if we serve your area by entering your zip code on our website.",
      answerTelugu: "మేము ప్రస్తుతం దేశవ్యాప్తంగా అన్ని ప్రధాన నగరాలు మరియు చుట్టుపక్కల ప్రాంతాలకు సేవలందిస్తున్నాము. మా వెబ్‌సైట్‌లో మీ పిన్‌కోడ్‌ని నమోదు చేయడం ద్వారా మేము మీ ప్రాంతానికి సేవలందిస్తున్నామో లేదో తనిఖీ చేయవచ్చు."
    },
    {
      question: "How are your service prices determined?",
      questionTelugu: "మీ సేవా ధరలు ఎలా నిర్ణయించబడతాయి?",
      answer: "Our service prices are based on factors such as the type of service, size of the property, and specific requirements. You'll see a transparent price breakdown before confirming your booking.",
      answerTelugu: "మా సేవా ధరలు సేవా రకం, ఆస్తి పరిమాణం మరియు నిర్దిష్ట అవసరాల వంటి అంశాల ఆధారంగా ఉంటాయి. మీ బుకింగ్‌ని నిర్ధారించే ముందు మీరు పారదర్శక ధర విభజనను చూస్తారు."
    },
  ];

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Frequently Asked Questions</h2>
          <p className="text-xl text-gray-600 mb-2">తరచుగా అడిగే ప్రశ్నలు</p>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Find answers to the most common questions about our services
            <span className="block mt-1">మా సేవల గురించి అత్యంత సామాన్య ప్రశ్నలకు సమాధానాలు కనుగొనండి</span>
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">
                  <div>
                    <p className="text-lg font-medium">{faq.question}</p>
                    <p className="text-sm text-gray-600">{faq.questionTelugu}</p>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="text-gray-600">
                    <p className="mb-2">{faq.answer}</p>
                    <p className="text-sm">{faq.answerTelugu}</p>
                  </div>
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
