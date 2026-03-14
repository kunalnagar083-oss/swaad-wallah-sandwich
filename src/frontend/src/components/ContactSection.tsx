import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Clock,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Send,
  User,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

const contactInfo = [
  {
    icon: User,
    label: "Owner",
    value: "Kunal Nagar",
    href: null,
  },
  {
    icon: MapPin,
    label: "Address",
    value: "Indrapuri Sector C, Bhopal, Madhya Pradesh",
    href: null,
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+91 93035 26637",
    href: "tel:+919303526637",
  },
  {
    icon: Clock,
    label: "Hours",
    value: "Open Daily: 11:00 AM – 11:00 PM",
    href: null,
  },
  {
    icon: Mail,
    label: "Email",
    value: "swaadwallahbhopal@gmail.com",
    href: null,
  },
  {
    icon: Instagram,
    label: "Instagram",
    value: "@swaad_wallah_sandwich",
    href: "https://www.instagram.com/swaad_wallah_sandwich",
    isInstagram: true,
  },
];

export default function ContactSection() {
  const [form, setForm] = useState({ name: "", phone: "", message: "" });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 800));
    toast.success("Message sent! We'll get back to you soon.");
    setForm({ name: "", phone: "", message: "" });
    setSubmitting(false);
  };

  return (
    <section id="contact" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-2">
            Get In Touch
          </p>
          <h2 className="font-display text-4xl sm:text-5xl font-800 text-foreground mb-4">
            Contact Us
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Have a question or want to place a bulk order? We'd love to hear
            from you!
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            {contactInfo.map(
              ({
                icon: Icon,
                label,
                value,
                href,
                isInstagram,
              }: {
                icon: any;
                label: string;
                value: string;
                href: string | null;
                isInstagram?: boolean;
              }) => (
                <div
                  key={label}
                  className={`flex gap-4 items-start ${
                    isInstagram
                      ? "bg-gradient-to-r from-purple-50 via-pink-50 to-orange-50 rounded-2xl p-4 border border-pink-200"
                      : ""
                  }`}
                >
                  <div
                    className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${
                      isInstagram
                        ? "bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400"
                        : "bg-primary/10"
                    }`}
                  >
                    <Icon
                      className={`w-5 h-5 ${isInstagram ? "text-white" : "text-primary"}`}
                    />
                  </div>
                  <div className="flex-1">
                    <div
                      className={`font-semibold text-sm mb-0.5 ${
                        isInstagram ? "text-pink-700" : "text-foreground"
                      }`}
                    >
                      {label}
                    </div>
                    {href ? (
                      <a
                        href={href}
                        target={isInstagram ? "_blank" : undefined}
                        rel={isInstagram ? "noopener noreferrer" : undefined}
                        className={
                          isInstagram
                            ? "inline-flex items-center gap-1.5 text-sm font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 bg-clip-text text-transparent hover:opacity-80 transition-opacity"
                            : "text-sm text-muted-foreground hover:text-primary transition-colors"
                        }
                        data-ocid={
                          isInstagram
                            ? "contact.instagram.link"
                            : "contact.phone.link"
                        }
                      >
                        {isInstagram && (
                          <span className="inline-block text-pink-500">✦</span>
                        )}
                        {value}
                        {isInstagram && (
                          <span className="ml-1 text-xs font-normal bg-gradient-to-r from-purple-100 to-pink-100 text-pink-600 px-2 py-0.5 rounded-full border border-pink-200">
                            Follow us
                          </span>
                        )}
                      </a>
                    ) : (
                      <div className="text-muted-foreground text-sm leading-relaxed">
                        {value}
                      </div>
                    )}
                  </div>
                </div>
              ),
            )}

            {/* Map placeholder */}
            <div className="mt-6 rounded-2xl overflow-hidden h-48 bg-muted flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <MapPin className="w-8 h-8 mx-auto mb-2 text-primary/50" />
                <p className="text-sm font-medium">
                  Indrapuri Sector C, Bhopal
                </p>
                <p className="text-xs mt-1">Madhya Pradesh, India</p>
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <form
              onSubmit={handleSubmit}
              className="bg-card rounded-2xl p-6 shadow-card space-y-5"
              data-ocid="contact.panel"
            >
              <div>
                <Label
                  htmlFor="contact-name"
                  className="text-sm font-medium mb-1.5 block"
                >
                  Your Name
                </Label>
                <Input
                  id="contact-name"
                  placeholder="Your name"
                  value={form.name}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, name: e.target.value }))
                  }
                  required
                  data-ocid="contact.input"
                />
              </div>
              <div>
                <Label
                  htmlFor="contact-phone"
                  className="text-sm font-medium mb-1.5 block"
                >
                  Phone Number
                </Label>
                <Input
                  id="contact-phone"
                  placeholder="+91 XXXXX XXXXX"
                  value={form.phone}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, phone: e.target.value }))
                  }
                  required
                  data-ocid="contact.input"
                />
              </div>
              <div>
                <Label
                  htmlFor="contact-message"
                  className="text-sm font-medium mb-1.5 block"
                >
                  Message
                </Label>
                <Textarea
                  id="contact-message"
                  placeholder="I'd like to place a bulk order..."
                  rows={4}
                  value={form.message}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, message: e.target.value }))
                  }
                  required
                  data-ocid="contact.textarea"
                />
              </div>
              <Button
                type="submit"
                disabled={submitting}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold h-11"
                data-ocid="contact.submit_button"
              >
                {submitting ? (
                  "Sending..."
                ) : (
                  <span className="flex items-center gap-2">
                    <Send className="w-4 h-4" /> Send Message
                  </span>
                )}
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
