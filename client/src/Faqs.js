import React from "react";

const FAQs = () => {
  const faqs = [
    {
      question: "What is Meduvo?",
      answer:
        "Meduvo is a patient management and scheduling platform for healthcare professionals (HCPs).",
    },
    {
      question: "How does Meduvo work?",
      answer:
        "HCPs can sign up on Meduvo and seamlessly organize their patient list along with its associated appointments.",
    },
    {
      question: "Is Meduvo secure?",
      answer:
        "Yes, Meduvo takes the security and privacy of patients' information seriously. We use industry-standard encryption and follow strict privacy policies to ensure the confidentiality of user data.",
    },
    {
      question: "How can I schedule a new appointment for my patient?",
      answer:
        "To schedule an appointment, simply log in to your Meduvo account, navigate to the appointments section, and choose a suitable time slot that works best for you.",
    },
    {
      question: "What if I need to reschedule or cancel my patient's appointment?",
      answer:
        "If you need to reschedule or cancel your appointment, you can do so by accessing your appointments in your Meduvo account.",
    },
  ];

  return (
    <div>
      <h2 style={{ textAlign: "center" }}>Frequently Asked Questions</h2>
      <div style={{ maxWidth: "600px", margin: "0 auto" }}>
        {faqs.map((faq, index) => (
          <div key={index} style={{ marginBottom: "20px" }}>
            <h3>{faq.question}</h3>
            <p>{faq.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQs;
