
"use client";

import React, { useState } from "react";
import { Phone, Mail, MapPin, Send, MessageSquare, CheckCircle2 } from "lucide-react";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API request timeout
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    console.log("Contact Form Data:", formData);
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    // Reset form after submission
    setFormData({ name: "", email: "", phone: "", message: "" });
    setTimeout(() => setIsSubmitted(false), 4000);
  };

  return (
    <section className="w-full py-20 bg-zinc-50 dark:bg-zinc-950 transition-colors duration-300" id="contact">
      <div className=" mx-auto px-4 sm:px-6 lg:px-8 container">
        
        {/* Header Section */}
        <div className="text-center max-w-2xl mx-auto mb-16 flex flex-col items-center gap-3">
          <span className="text-xs font-bold uppercase tracking-widest text-red-500 bg-red-500/10 px-3 py-1 rounded-full">
            Get In Touch
          </span>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-zinc-900 dark:text-zinc-50">
            Let&apos;s Start a <span className="text-red-600">Conversation</span>
          </h2>
          <p className="text-sm sm:text-base text-zinc-500 dark:text-zinc-400">
            Have a question, project idea, or just want to say hello? Drop a message, and I&apos;ll get back to you as soon as possible.
          </p>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Contact Cards */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-6">
            <div className="flex flex-col gap-6">
              
              {/* Phone Card */}
              <div className="flex items-start gap-4 p-5 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 shadow-sm hover:shadow-md transition-all">
                <div className="p-3 bg-red-50 dark:bg-red-950/40 rounded-xl text-red-600 shrink-0">
                  <Phone className="size-6" />
                </div>
                <div className="flex flex-col gap-1">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                    Call / WhatsApp
                  </h3>
                  <a href="tel:+8801319698855" className="text-base font-bold text-zinc-800 dark:text-zinc-200 hover:text-red-600 dark:hover:text-red-500 transition-colors">
                    +880 1319-698855
                  </a>
                  <p className="text-xs text-zinc-400 dark:text-zinc-500">Available Sat - Thu, 9 AM - 6 PM</p>
                </div>
              </div>

              {/* Email Card */}
              <div className="flex items-start gap-4 p-5 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 shadow-sm hover:shadow-md transition-all">
                <div className="p-3 bg-red-50 dark:bg-red-950/40 rounded-xl text-red-600 shrink-0">
                  <Mail className="size-6" />
                </div>
                <div className="flex flex-col gap-1">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                    Email Address
                  </h3>
                  <a href="mailto:support@roktoneer.com" className="text-base font-bold text-zinc-800 dark:text-zinc-200 hover:text-red-600 dark:hover:text-red-500 transition-colors">
                    support@roktoneer.com
                  </a>
                  <p className="text-xs text-zinc-400 dark:text-zinc-500">Response within 24 hours</p>
                </div>
              </div>

              {/* Location Card */}
              <div className="flex items-start gap-4 p-5 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 shadow-sm hover:shadow-md transition-all">
                <div className="p-3 bg-red-50 dark:bg-red-950/40 rounded-xl text-red-600 shrink-0">
                  <MapPin className="size-6" />
                </div>
                <div className="flex flex-col gap-1">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                    Location
                  </h3>
                  <p className="text-base font-bold text-zinc-800 dark:text-zinc-200">
                    Mirpur, Dhaka, Bangladesh
                  </p>
                  <p className="text-xs text-zinc-400 dark:text-zinc-500">Open for remote & on-site syncs</p>
                </div>
              </div>

            </div>

            {/* Micro Announcement Box */}
            <div className="hidden lg:flex items-center gap-3 p-5 bg-zinc-700 text-zinc-100 rounded-2xl border border-zinc-800 dark:bg-zinc-900 dark:border-zinc-800 shadow-sm">
              <MessageSquare className="size-5 text-red-500 shrink-0 animate-pulse" />
              <p className="text-xs leading-relaxed font-medium">
                Looking for regular freelance contracts or immediate software development collaborations? Let&apos;s connect directly!
              </p>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <div className="relative bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200/80 dark:border-zinc-800/80 p-6 sm:p-10 shadow-sm h-full flex flex-col justify-center">
              
              {isSubmitted ? (
                <div className="flex flex-col items-center justify-center text-center gap-4 py-12 animate-in fade-in-50 zoom-in-95 duration-300">
                  <div className="p-4 bg-emerald-50 dark:bg-emerald-950/40 rounded-2xl text-emerald-500">
                    <CheckCircle2 className="size-12 stroke-[1.5]" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-50">Message Sent Successfully!</h3>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400 max-w-sm">
                      Thank you for reaching out. Your notification was successfully sent, and you&apos;ll receive a feedback shortly.
                    </p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Full Name */}
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="name" className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Adil"
                        className="w-full text-sm px-4 py-3 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all text-zinc-900 dark:text-zinc-100"
                      />
                    </div>

                    {/* Email Address */}
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="email" className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="adil@example.com"
                        className="w-full text-sm px-4 py-3 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all text-zinc-900 dark:text-zinc-100"
                      />
                    </div>
                  </div>

                  {/* Phone Number */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="phone" className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+880 17XX-XXXXXX"
                      className="w-full text-sm px-4 py-3 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all text-zinc-900 dark:text-zinc-100"
                    />
                  </div>

                  {/* Message Input */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="message" className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
                      Your Message <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Hi, let's discuss details about your next structural/development milestone..."
                      className="w-full text-sm px-4 py-3 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all text-zinc-900 dark:text-zinc-100 resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-bold text-sm rounded-xl transition-all shadow-md hover:shadow-lg active:scale-98 flex items-center justify-center gap-2 disabled:opacity-70 disabled:pointer-events-none select-none"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="size-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="size-4" />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}