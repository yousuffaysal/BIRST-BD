import { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Linkedin,
  Youtube,
  Twitter,
  Send,
  ChevronRight,
  ArrowUp
} from "lucide-react";
import { Link } from "react-router-dom";
import birstLogo from "../../assets/BIRST_LOGO.svg";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const Footer = () => {
  const axiosPublic = useAxiosPublic();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [error, setError] = useState("");

  const handleSubscribe = async (e) => {
    e.preventDefault();
    setError("");
    setSubscribed(false);

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email");
      return;
    }

    try {
      await axiosPublic.post("/contacts", {
        name: "Newsletter Subscriber",
        email: email,
        message: "Newsletter subscription request from footer"
      });
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 5000);
    } catch (err) {
      setError("Subscription failed. Please try again.");
    }
  };

  const quickLinks = [
    { label: "Home", to: "/" },
    { label: "About Us", to: "/about" },
    { label: "Courses", to: "/courses" },
    { label: "Services", to: "/service" },
    { label: "Research & Publication", to: "/researchAndPublication" },
    { label: "News & Events", to: "/newsAndEvents" },
    { label: "Gallery", to: "/gallery" },
    { label: "Contact Us", to: "/contact" },
  ];

  const aboutLinks = [
    { label: "BIRSTBD Profile", to: "/about/profile" },
    { label: "Our Mission", to: "/about/mission" },
    { label: "Our Vision", to: "/about/vision" },
    { label: "Our Team", to: "/about/team" },
  ];

  const socialLinks = [
    { icon: Facebook, href: "https://facebook.com/birstbd", label: "Facebook" },
    { icon: Linkedin, href: "https://linkedin.com/company/birstbd", label: "LinkedIn" },
    { icon: Youtube, href: "https://youtube.com/@birstbd", label: "YouTube" },
    { icon: Twitter, href: "https://twitter.com/birstbd", label: "Twitter" },
  ];

  return (
    <footer className="bg-[var(--color-birst-dark)] text-white mt-0 border-t border-white/5">
      <div className="w-full px-4 sm:px-8 lg:px-16 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">

          {/* Brand & About */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <img
                src="https://ik.imagekit.io/2lax2ytm2/Frame%201%20(4).png?updatedAt=1768684405210"
                alt="BIRST Logo"
                className="h-12 w-auto"
              />
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Empowering minds through excellence in research and professional development.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-[var(--color-birst-primary)] hover:text-white transition-all duration-300 text-gray-400"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold text-white mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link, i) => (
                <li key={i}>
                  <Link
                    to={link.to}
                    className="text-gray-400 hover:text-[var(--color-birst-primary)] transition flex items-center gap-2 text-sm group"
                  >
                    <ChevronRight className="w-3 h-3 text-[var(--color-birst-primary)] opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* About Links */}
          <div>
            <h4 className="text-lg font-bold text-white mb-6">About Us</h4>
            <ul className="space-y-3">
              {aboutLinks.map((link, i) => (
                <li key={i}>
                  <Link
                    to={link.to}
                    className="text-gray-400 hover:text-[var(--color-birst-primary)] transition flex items-center gap-2 text-sm group"
                  >
                    <ChevronRight className="w-3 h-3 text-[var(--color-birst-primary)] opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info & Newsletter */}
          <div className="sm:col-span-2 lg:col-span-1">
            <h4 className="text-lg font-bold text-white mb-6">Contact Us</h4>
            <div className="space-y-4 text-sm text-gray-400 mb-8">
              <div className="flex items-start gap-3 group">
                <MapPin className="w-5 h-5 text-[var(--color-birst-primary)] mt-0.5 flex-shrink-0 group-hover:animate-bounce" />
                <p className="leading-relaxed">H-16, RD-02, SEC-6/KA SENPARA PARBATA MIRPUR</p>
              </div>
              <div className="flex items-center gap-3 group">
                <Phone className="w-5 h-5 text-[var(--color-birst-primary)] flex-shrink-0 group-hover:animate-shake" />
                <div>
                  <a href="tel:+8801827891389" className="hover:text-white transition block">01827891389</a>
                  <a href="tel:+8801551245430" className="hover:text-white transition block">01551245430</a>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-[var(--color-birst-primary)] flex-shrink-0" />
                <a href="mailto:info@birstbd.com" className="hover:text-white transition">
                  info@birstbd.com
                </a>
              </div>
            </div>

            {/* Newsletter */}
            <div>
              <h5 className="text-sm font-semibold text-white mb-3">Newsletter</h5>
              <form onSubmit={handleSubscribe} className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email address"
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[var(--color-birst-primary)] transition text-sm"
                />
                <button
                  type="submit"
                  className="absolute right-1 top-1 p-2 bg-[var(--color-birst-primary)] hover:bg-[var(--color-birst-accent)] rounded-md text-white transition-colors"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
              {error && <p className="text-red-400 text-xs mt-2">{error}</p>}
              {subscribed && <p className="text-green-400 text-xs mt-2">Subscribed!</p>}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            {/* Copyright & Links */}
            <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6 text-sm text-gray-500">
              <p>
                &copy; {new Date().getFullYear()} BIRSTBD. All rights reserved.
              </p>
              <div className="flex gap-6 items-center">
                <a href="#" className="hover:text-white transition">Privacy Policy</a>
                <a href="#" className="hover:text-white transition">Terms of Service</a>
              </div>
            </div>

            {/* Built By Credit & Back to Top */}
            <div className="flex items-center gap-6">
              {/* Built By Credit */}
              <a
                href="https://foxmenstudio.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2.5 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[var(--color-birst-primary)]/30 rounded-full transition-all duration-300 backdrop-blur-sm"
              >
                <span className="text-xs text-gray-400 group-hover:text-gray-300 transition-colors font-medium">
                  Built by
                </span>
                <img
                  src="https://ik.imagekit.io/2lax2ytm2/Frame%202.svg?updatedAt=1767898162197"
                  alt="Foxmen Studio"
                  className="h-5 w-auto opacity-90 group-hover:opacity-100 transition-all duration-300"
                  style={{
                    filter: 'drop-shadow(0 0 8px rgba(140, 95, 253, 0.5))',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.filter = 'drop-shadow(0 0 12px rgba(140, 95, 253, 0.8)) drop-shadow(0 0 20px rgba(140, 95, 253, 0.5))';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.filter = 'drop-shadow(0 0 8px rgba(140, 95, 253, 0.5))';
                  }}
                />
              </a>

              {/* Back to Top */}
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="flex items-center gap-1 hover:text-[var(--color-birst-primary)] transition-colors text-sm text-gray-500 pl-6 border-l border-white/10"
              >
                Back to Top
                <ArrowUp className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;