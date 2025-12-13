import { useState, useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import emailjs from "emailjs-com";
import "./Contact.css";
import PartnerSlider from "../components/PartnerSlider";

export default function Contact() {
  const { theme } = useContext(ThemeContext);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validate = () => {
    let temp = {};

    if (!form.name.trim()) temp.name = "Name is required.";
    if (!form.email.trim()) temp.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(form.email))
      temp.email = "Enter a valid email.";

    if (!form.phone.trim()) temp.phone = "Phone number is required.";
    else if (form.phone.length < 10)
      temp.phone = "Phone must be 10 digits.";

    if (!form.subject.trim()) temp.subject = "Subject is required.";
    if (!form.message.trim()) temp.message = "Message cannot be blank.";

    setErrors(temp);
    return Object.keys(temp).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) return;

    emailjs
      .send(
        "service_wlqztzg",
        "template_os0feh7",
        {
          ...form,
          date: new Date().toLocaleString(),
        },
        "MKeCJkhfEGycu1JGy"
      )
      .then(() => {
        alert("Your message has been sent! 🚗✨");
        setForm({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        });
      })
      .catch(() => alert("Failed to send message. Please try again later."));
  };

  return (
    <div className={`contact-page fade-up ${theme}`}>

      {/* HEADER */}
      <div className="contact-header">
        <h1 className="contact-title">Get in Touch</h1>
        <p className="contact-sub">
          We’re here to assist you with bookings, test drives, and inquiries.
        </p>
      </div>

      {/* CONTACT CARDS */}
      <div className="contact-cards">
        <div className="contact-card">
          <div className="icon">📞</div>
          <h3>Call Us</h3>
          <p>+91 98765 43210</p>
          <span>Mon - Sat | 9AM - 6PM</span>
        </div>

        <div className="contact-card">
          <div className="icon">📧</div>
          <h3>Email Us</h3>
          <p>support@amwinmotors.com</p>
          <span>We reply within 24 hours</span>
        </div>

        <div className="contact-card">
          <div className="icon">📍</div>
          <h3>Visit Showroom</h3>
          <p>Bangalore, Karnataka</p>
          <span>Open All Days</span>
        </div>
      </div>

      {/* FORM + MAP */}
      <div className="contact-main">

        {/* FORM */}
        <form className="contact-form" onSubmit={handleSubmit}>
          <h2>Send Us a Message</h2>

          <div className="form-row">
            <div className="field">
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={form.name}
                onChange={handleChange}
                className={errors.name ? "invalid" : ""}
              />
              {errors.name && <span className="error-span">{errors.name}</span>}
            </div>

            <div className="field">
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={form.email}
                onChange={handleChange}
                className={errors.email ? "invalid" : ""}
              />
              {errors.email && <span className="error-span">{errors.email}</span>}
            </div>
          </div>

          <div className="form-row">
            <div className="field">
              <input
                type="text"
                name="phone"
                placeholder="Phone Number"
                value={form.phone}
                onChange={handleChange}
                className={errors.phone ? "invalid" : ""}
              />
              {errors.phone && <span className="error-span">{errors.phone}</span>}
            </div>

            <div className="field">
              <input
                type="text"
                name="subject"
                placeholder="Subject"
                value={form.subject}
                onChange={handleChange}
                className={errors.subject ? "invalid" : ""}
              />
              {errors.subject && (
                <span className="error-span">{errors.subject}</span>
              )}
            </div>
          </div>

          <div className="field">
            <textarea
              name="message"
              placeholder="Your Message..."
              value={form.message}
              onChange={handleChange}
              className={errors.message ? "invalid" : ""}
            />
            {errors.message && (
              <span className="error-span">{errors.message}</span>
            )}
          </div>

          <button className="submit-btn">Send Message</button>
        </form>

        {/* MAP */}
        <div className="contact-map">
          <iframe
            title="Location Map"
            src="https://www.google.com/maps/embed?pb=!1m18..."
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
      </div>

      <PartnerSlider />
    </div>
  );
}
