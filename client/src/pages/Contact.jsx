import React, { useState } from "react";
import MiniNavbar from "../components/MiniNavbar";
import emailjs from "emailjs-com";
import "../styles/Contact.css";

const Contact = () => {
  const [status, setStatus] = useState(""); 

  const sendEmail = (e) => {
    e.preventDefault();
    const btn = e.target.querySelector("button");
    btn.disabled = true;
    btn.innerText = "Sending...";

    emailjs.sendForm(
      "service_g7e3vla",
      "template_vgqphep",
      e.target,
      "XI2Edy1i4JB7WZIFL"
    )
      .then(() => {
        setStatus("Message sent successfully! ✅");
        e.target.reset();
      })
      .catch(() => setStatus("Failed to send message ❌"))
      .finally(() => {
        btn.disabled = false;
        btn.innerText = "Send Message";
        setTimeout(() => setStatus(""), 4000);
      });
  };

  return (
    <div className="contact-page">
      <MiniNavbar />

      <div className="contact-content fade-in">
        <h1 className="contact-title">Get in Touch</h1>
        <p className="contact-description">
          Have questions or feedback? Reach out and we’ll respond promptly.
          Your journey matters to us — let’s make it successful together.
        </p>

        <div className="contact-details">
          <p><strong>Email:</strong> 2022ugmm049@nitjsr.ac.in</p>
          <p><strong>Phone:</strong> +91-9570001919</p>
        </div>

        <form className="contact-form" onSubmit={sendEmail}>
          <input type="text" name="name" placeholder="Your Name" required />
          <input type="email" name="email" placeholder="Your Email" required />
          <textarea name="message" placeholder="Your Message" required />
          <button type="submit" className="contact-submit">Send Message</button>
        </form>

        {status && <div className="toast">{status}</div>}
      </div>
    </div>
  );
};

export default Contact;
