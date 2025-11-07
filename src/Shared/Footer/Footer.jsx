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
  ChevronRight
} from "lucide-react";
import { Link } from "react-router-dom";
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
    <footer className="bg-gradient-to-b from-gray-900 to-black text-white mt-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-10">

          {/* Brand & About */}
          <div className="sm:col-span-2 lg:col-span-1">
            <h3 className="text-xl sm:text-2xl font-bold text-indigo-400 mb-3 sm:mb-4">BIRSTBD</h3>
            <p className="text-gray-300 text-xs sm:text-sm leading-relaxed mb-4 sm:mb-6">
              Bangladesh Institute for Research and Statistical Training (BIRST) - Empowering minds through 
              excellence in research and professional development. We provide comprehensive training in statistics, 
              research methodology, and data analysis.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-indigo-600 transition"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-base sm:text-lg font-semibold text-white mb-3 sm:mb-5">Quick Links</h4>
            <ul className="space-y-2 sm:space-y-3">
              {quickLinks.map((link, i) => (
                <li key={i}>
                  <Link
                    to={link.to}
                    className="text-gray-400 hover:text-indigo-400 transition flex items-center gap-1 text-xs sm:text-sm"
                  >
                    <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* About Links */}
          <div>
            <h4 className="text-base sm:text-lg font-semibold text-white mb-3 sm:mb-5">About Us</h4>
            <ul className="space-y-2 sm:space-y-3">
              {aboutLinks.map((link, i) => (
                <li key={i}>
                  <Link
                    to={link.to}
                    className="text-gray-400 hover:text-indigo-400 transition flex items-center gap-1 text-xs sm:text-sm"
                  >
                    <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info & Newsletter */}
          <div className="sm:col-span-2 lg:col-span-1">
            <h4 className="text-base sm:text-lg font-semibold text-white mb-3 sm:mb-5">Contact Us</h4>
            <div className="space-y-3 sm:space-y-4 text-xs sm:text-sm text-gray-300 mb-4 sm:mb-6">
              <div className="flex items-start gap-2 sm:gap-3">
                <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-400 mt-0.5 flex-shrink-0" />
                <p className="break-words">Dhaka, Bangladesh</p>
              </div>
              <div className="flex items-center gap-2 sm:gap-3">
                <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-400 flex-shrink-0" />
                <a href="tel:+8801753973892" className="hover:text-indigo-400 break-all">+880 1753-973892</a>
              </div>
              <div className="flex items-center gap-2 sm:gap-3">
                <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-400 flex-shrink-0" />
                <a href="mailto:birstbd@gmail.com" className="hover:text-indigo-400 break-all">
                  birstbd@gmail.com
                </a>
              </div>
            </div>

            {/* Newsletter */}
            <div className="mt-4 sm:mt-6">
              <h4 className="text-base sm:text-lg font-semibold text-white mb-2 sm:mb-3">Stay Updated</h4>
              <p className="text-xs sm:text-sm text-gray-400 mb-3 sm:mb-4">
                Subscribe to get updates on new courses, events, and research insights.
              </p>
              <form onSubmit={handleSubscribe} className="space-y-2 sm:space-y-3">
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email"
                    className="flex-1 px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-xs sm:text-sm min-h-[44px]"
                    aria-label="Email for newsletter"
                  />
                  <button
                    type="submit"
                    className="px-3 sm:px-4 py-2 sm:py-2.5 bg-indigo-600 hover:bg-indigo-700 rounded-lg transition flex items-center justify-center gap-1 text-xs sm:text-sm font-medium min-h-[44px] touch-target whitespace-nowrap"
                  >
                    <Send className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span className="hidden sm:inline">Subscribe</span>
                    <span className="sm:hidden">Sub</span>
                  </button>
                </div>
                {error && <p className="text-red-400 text-xs">{error}</p>}
                {subscribed && <p className="text-green-400 text-xs">Subscribed successfully!</p>}
              </form>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-gray-800 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs sm:text-sm text-gray-500 text-center sm:text-left">
          <p className="break-words">
            &copy; {new Date().getFullYear()} BIRSTBD (Bangladesh Institute for Research and Statistical Training). All rights reserved.
          </p>
          <p>
            Powered by{" "}
            <a href="https://foxmenstudio.com" target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:underline">
              Foxmen Studio
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
