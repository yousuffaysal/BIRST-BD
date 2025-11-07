import { useState, useEffect } from "react";
import { Clock, Mail, Phone, MapPin, ChevronDown, BookOpen, Calendar, Image, FileText, Database, Users, TrendingUp, ArrowRight } from "lucide-react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Page3DWrapper, { Card3D, Text3D, Float3D, Icon3D, Button3D } from "../../components/ui/Page3DWrapper";
import { motion } from "framer-motion";

const Home = () => {
  const axiosPublic = useAxiosPublic();
  const [timeLeft, setTimeLeft] = useState({ days: 70, hours: 12, minutes: 30, seconds: 0 });
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);
  
  // Data from collections
  const [courses, setCourses] = useState([]);
  const [events, setEvents] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [publications, setPublications] = useState([]);
  const [researchResources, setResearchResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    courses: 0,
    events: 0,
    publications: 0,
    resources: 0
  });

  // Countdown Logic (Target: +70 days, +12 hours, +30 mins from now)
  useEffect(() => {
    const target = new Date();
    target.setDate(target.getDate() + 70);
    target.setHours(target.getHours() + 12);
    target.setMinutes(target.getMinutes() + 30);

    const interval = setInterval(() => {
      const now = new Date();
      const diff = target - now;

      if (diff <= 0) {
        clearInterval(interval);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Fetch data from all collections
  useEffect(() => {
    const fetchAllData = async () => {
      try {
        setLoading(true);
        const [coursesRes, eventsRes, galleryRes, publicationsRes, resourcesRes] = await Promise.all([
          axiosPublic.get('/courses').catch(() => ({ data: [] })),
          axiosPublic.get('/events').catch(() => ({ data: [] })),
          axiosPublic.get('/gallery?type=photo').catch(() => ({ data: [] })),
          axiosPublic.get('/research/publications').catch(() => ({ data: [] })),
          axiosPublic.get('/research/resources').catch(() => ({ data: [] }))
        ]);

        const coursesData = coursesRes.data || [];
        const eventsData = eventsRes.data || [];
        const galleryData = galleryRes.data || [];
        const publicationsData = publicationsRes.data || [];
        const resourcesData = resourcesRes.data || [];

        setCourses(coursesData.slice(0, 3));
        setEvents(eventsData.slice(0, 3));
        setGallery(galleryData.slice(0, 6));
        setPublications(publicationsData.slice(0, 3));
        setResearchResources(resourcesData.slice(0, 3));

        setStats({
          courses: coursesData.length,
          events: eventsData.length,
          publications: publicationsData.length,
          resources: resourcesData.length
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, [axiosPublic]);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    try {
      await axiosPublic.post("/contacts", { 
        name: "Newsletter Subscriber",
        email: email,
        message: "Newsletter subscription request"
      });
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 5000);
    } catch (err) {
      alert("Subscription failed. Please try again.");
    }
  };

  const faqs = [
    {
      q: "When will BIRST launch?",
      a: "We are working diligently to launch our comprehensive platform. The countdown above shows our estimated launch date. Stay subscribed for updates!"
    },
    {
      q: "What programs will be offered?",
      a: "We will offer a wide range of research and training programs across various disciplines, including advanced research methodologies, professional development courses, and specialized certification programs."
    },
    {
      q: "How can I stay updated?",
      a: "Subscribe to our newsletter using the form below. We'll send you regular updates and notify you immediately when we launch."
    },
    {
      q: "Will there be online and in-person options?",
      a: "Yes! We plan to offer both online and in-person programs to accommodate diverse learning preferences and ensure accessibility for all participants across Bangladesh."
    },
    {
      q: "Can we collaborate?",
      a: "We welcome collaboration opportunities! Please reach out through our contact form with details about your interests, and our team will get back to you."
    },
  ];

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  return (
    <Page3DWrapper className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hero */}
      <section className="text-center py-8 sm:py-12 lg:py-16 px-4 sm:px-6">
        <Text3D className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-indigo-900 mb-3 sm:mb-4">
          Bangladesh Institute for
        </Text3D>
        <Text3D className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-indigo-700 mb-4 sm:mb-6" delay={0.2}>
          Research and Statistical Training (BIRST)
        </Text3D>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-base sm:text-lg lg:text-xl text-gray-700 max-w-3xl mx-auto px-4"
        >
          Empowering minds through excellence in research and professional development
        </motion.p>
      </section>

      {/* Countdown */}
      <section className="bg-white py-8 sm:py-12 shadow-lg px-4 sm:px-6">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6 text-center">
          {Object.entries(timeLeft).map(([unit, value], index) => (
            <Float3D key={unit} delay={index * 0.1} speed={0.8 + index * 0.1}>
              <Card3D className="bg-indigo-50 p-4 sm:p-5 md:p-6 rounded-lg sm:rounded-xl" delay={index * 0.1}>
                <motion.div
                  key={value}
                  initial={{ rotateY: 180, opacity: 0 }}
                  animate={{ rotateY: 0, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="text-2xl sm:text-3xl md:text-4xl font-bold text-indigo-700"
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  {value.toString().padStart(2, "0")}
                </motion.div>
                <div className="text-xs sm:text-sm uppercase text-gray-600 mt-1 sm:mt-2">{unit}</div>
              </Card3D>
            </Float3D>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-center">
          {[
            { icon: BookOpen, value: stats.courses, label: 'Courses' },
            { icon: Calendar, value: stats.events, label: 'Events' },
            { icon: FileText, value: stats.publications, label: 'Publications' },
            { icon: Database, value: stats.resources, label: 'Resources' },
          ].map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card3D key={index} delay={index * 0.1} className="bg-white/10 backdrop-blur-sm p-4 sm:p-5 md:p-6 rounded-lg sm:rounded-xl">
                <Icon3D delay={index * 0.15}>
                  <Icon className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 mx-auto mb-2 sm:mb-3" />
                </Icon3D>
                <motion.div
                  initial={{ scale: 0, rotateX: 180 }}
                  animate={{ scale: 1, rotateX: 0 }}
                  transition={{ delay: index * 0.1 + 0.3, type: "spring", stiffness: 200 }}
                  className="text-2xl sm:text-2xl md:text-3xl font-bold mb-1"
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  {stat.value}+
                </motion.div>
                <div className="text-xs sm:text-sm text-indigo-100">{stat.label}</div>
              </Card3D>
            );
          })}
        </div>
      </section>

      {/* Featured Courses */}
      {courses.length > 0 && (
        <section className="py-12 sm:py-16 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 sm:mb-8">
              <Text3D className="text-2xl sm:text-3xl font-bold text-indigo-900">Featured Courses</Text3D>
              <Button3D className="text-indigo-600 hover:text-indigo-800 font-semibold flex items-center gap-2">
                <a href="/courses" className="flex items-center gap-2">
                  View All <ArrowRight className="w-5 h-5" />
                </a>
              </Button3D>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {courses.map((course, index) => (
                <Card3D key={course._id} delay={index * 0.1} className="bg-white rounded-lg sm:rounded-xl shadow-lg p-4 sm:p-5 md:p-6 border-l-4 border-indigo-500">
                  <Icon3D delay={index * 0.1}>
                    <BookOpen className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-indigo-600 mb-3 sm:mb-4" />
                  </Icon3D>
                  <h4 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">{course.title}</h4>
                  <p className="text-gray-600 text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-2">{course.description}</p>
                  {course.category && (
                    <motion.span
                      initial={{ rotateY: -90, opacity: 0 }}
                      animate={{ rotateY: 0, opacity: 1 }}
                      transition={{ delay: index * 0.1 + 0.3 }}
                      className="inline-block px-3 py-1 bg-indigo-100 text-indigo-700 text-xs font-semibold rounded-full mb-3"
                      style={{ transformStyle: 'preserve-3d' }}
                    >
                      {course.category}
                    </motion.span>
                  )}
                </Card3D>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Upcoming Events */}
      {events.length > 0 && (
        <section className="py-12 sm:py-16 px-4 sm:px-6 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 sm:mb-8">
              <Text3D className="text-2xl sm:text-3xl font-bold text-indigo-900">Upcoming Events</Text3D>
              <Button3D className="text-indigo-600 hover:text-indigo-800 font-semibold flex items-center gap-2">
                <a href="/events" className="flex items-center gap-2 text-sm sm:text-base">
                  View All <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                </a>
              </Button3D>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {events.map((event, index) => (
                <Card3D key={event._id} delay={index * 0.1} className="bg-white rounded-lg sm:rounded-xl shadow-lg p-4 sm:p-5 md:p-6 border-l-4 border-purple-500">
                  <Icon3D delay={index * 0.1}>
                    <Calendar className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-purple-600 mb-3 sm:mb-4" />
                  </Icon3D>
                  <h4 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">{event.title}</h4>
                  <p className="text-gray-600 text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-2">{event.description}</p>
                  {event.date && (
                    <div className="text-xs sm:text-sm text-gray-500 mb-2 sm:mb-3">
                      <strong>Date:</strong> {formatDate(event.date)}
                    </div>
                  )}
                  {event.type && (
                    <motion.span
                      initial={{ rotateY: -90, opacity: 0 }}
                      animate={{ rotateY: 0, opacity: 1 }}
                      transition={{ delay: index * 0.1 + 0.3 }}
                      className="inline-block px-3 py-1 bg-purple-100 text-purple-700 text-xs font-semibold rounded-full"
                      style={{ transformStyle: 'preserve-3d' }}
                    >
                      {event.type}
                    </motion.span>
                  )}
                </Card3D>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Featured Publications */}
      {publications.length > 0 && (
        <section className="py-12 sm:py-16 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 sm:mb-8">
              <Text3D className="text-2xl sm:text-3xl font-bold text-indigo-900">Latest Publications</Text3D>
              <Button3D className="text-indigo-600 hover:text-indigo-800 font-semibold flex items-center gap-2">
                <a href="/research-and-publication" className="flex items-center gap-2 text-sm sm:text-base">
                  View All <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                </a>
              </Button3D>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {publications.map((pub, index) => (
                <Card3D key={pub._id} delay={index * 0.1} className="bg-white rounded-lg sm:rounded-xl shadow-lg p-4 sm:p-5 md:p-6 border-l-4 border-blue-500">
                  <Icon3D delay={index * 0.1}>
                    <FileText className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-blue-600 mb-3 sm:mb-4" />
                  </Icon3D>
                  <h4 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">{pub.title}</h4>
                  {pub.authors && (
                    <p className="text-gray-600 text-xs sm:text-sm mb-2 line-clamp-2">
                      <strong>Authors:</strong> {Array.isArray(pub.authors) ? pub.authors.join(', ') : pub.authors}
                    </p>
                  )}
                  {pub.year && (
                    <motion.span
                      initial={{ rotateY: -90, opacity: 0 }}
                      animate={{ rotateY: 0, opacity: 1 }}
                      transition={{ delay: index * 0.1 + 0.3 }}
                      className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full mb-3"
                      style={{ transformStyle: 'preserve-3d' }}
                    >
                      {pub.year}
                    </motion.span>
                  )}
                  {pub.category && (
                    <motion.span
                      initial={{ rotateY: 90, opacity: 0 }}
                      animate={{ rotateY: 0, opacity: 1 }}
                      transition={{ delay: index * 0.1 + 0.4 }}
                      className="inline-block px-3 py-1 bg-gray-100 text-gray-700 text-xs font-semibold rounded-full ml-2"
                      style={{ transformStyle: 'preserve-3d' }}
                    >
                      {pub.category}
                    </motion.span>
                  )}
                </Card3D>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Gallery Preview */}
      {gallery.length > 0 && (
        <section className="py-12 sm:py-16 px-4 sm:px-6 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 sm:mb-8">
              <Text3D className="text-2xl sm:text-3xl font-bold text-indigo-900">Gallery</Text3D>
              <Button3D className="text-indigo-600 hover:text-indigo-800 font-semibold flex items-center gap-2">
                <a href="/gallery" className="flex items-center gap-2 text-sm sm:text-base">
                  View All <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                </a>
              </Button3D>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
              {gallery.map((item) => (
                <motion.div
                  key={item._id}
                  className="relative group cursor-pointer rounded-lg sm:rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all aspect-square"
                  whileHover={{ scale: 1.05 }}
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  {item.thumbnail ? (
                    <img
                      src={item.thumbnail}
                      alt={item.title || 'Gallery item'}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center">
                      <Image className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-white" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all flex items-center justify-center">
                    <span className="text-white opacity-0 group-hover:opacity-100 font-semibold text-xs sm:text-sm text-center px-2">
                      {item.title || 'View'}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Research Resources */}
      {researchResources.length > 0 && (
        <section className="py-12 sm:py-16 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 sm:mb-8">
              <Text3D className="text-2xl sm:text-3xl font-bold text-indigo-900">Research Resources</Text3D>
              <Button3D className="text-indigo-600 hover:text-indigo-800 font-semibold flex items-center gap-2">
                <a href="/research-and-publication" className="flex items-center gap-2 text-sm sm:text-base">
                  View All <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                </a>
              </Button3D>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {researchResources.map((resource, index) => (
                <Card3D key={resource._id} delay={index * 0.1} className="bg-white rounded-lg sm:rounded-xl shadow-lg p-4 sm:p-5 md:p-6 border-l-4 border-green-500">
                  <Icon3D delay={index * 0.1}>
                    <Database className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-green-600 mb-3 sm:mb-4" />
                  </Icon3D>
                  <h4 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">{resource.title}</h4>
                  <p className="text-gray-600 text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-2">{resource.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {resource.category && (
                      <motion.span
                        initial={{ rotateY: -90, opacity: 0 }}
                        animate={{ rotateY: 0, opacity: 1 }}
                        transition={{ delay: index * 0.1 + 0.3 }}
                        className="inline-block px-2 sm:px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full"
                        style={{ transformStyle: 'preserve-3d' }}
                      >
                        {resource.category}
                      </motion.span>
                    )}
                    {resource.type && (
                      <motion.span
                        initial={{ rotateY: 90, opacity: 0 }}
                        animate={{ rotateY: 0, opacity: 1 }}
                        transition={{ delay: index * 0.1 + 0.4 }}
                        className="inline-block px-2 sm:px-3 py-1 bg-gray-100 text-gray-700 text-xs font-semibold rounded-full"
                        style={{ transformStyle: 'preserve-3d' }}
                      >
                        {resource.type}
                      </motion.span>
                    )}
                  </div>
                </Card3D>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Brewing */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 text-center">
        <Text3D className="text-2xl sm:text-3xl font-bold text-indigo-900 mb-3 sm:mb-4">
          We're Brewing Something Special
        </Text3D>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-base sm:text-lg text-gray-700 max-w-3xl mx-auto px-4"
        >
          Our team is working around the clock to create an exceptional platform for research and training excellence. 
          The website is currently under construction, but we're excited to share our vision with you soon.
        </motion.p>
      </section>

      {/* What We Offer */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 bg-gray-50">
        <Text3D className="text-2xl sm:text-3xl font-bold text-center text-indigo-900 mb-8 sm:mb-12">
          What We Offer
        </Text3D>
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
          {[
            { title: "Research Excellence", desc: "Cutting-edge research programs designed to advance knowledge and innovation in Bangladesh.", icon: TrendingUp },
            { title: "Expert Faculty", desc: "Learn from distinguished researchers and practitioners with extensive field experience.", icon: Users },
            { title: "Certified Programs", desc: "Internationally recognized training programs and certifications for professional development.", icon: BookOpen },
            { title: "Collaborative Environment", desc: "Foster innovation through collaborative research and knowledge-sharing initiatives.", icon: Users },
          ].map((item, i) => {
            const Icon = item.icon;
            return (
              <Card3D key={i} delay={i * 0.1} className="bg-white p-6 sm:p-8 rounded-xl sm:rounded-2xl shadow-lg">
                <Icon3D delay={i * 0.1}>
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                    <Icon className="w-6 h-6 sm:w-8 sm:h-8 text-indigo-700" />
                  </div>
                </Icon3D>
                <h4 className="text-lg sm:text-xl font-bold text-indigo-900 mb-2 sm:mb-3">{item.title}</h4>
                <p className="text-sm sm:text-base text-gray-700">{item.desc}</p>
              </Card3D>
            );
          })}
        </div>
      </section>

      {/* FAQ */}
      <section className="py-12 sm:py-16 px-4 sm:px-6">
        <Text3D className="text-2xl sm:text-3xl font-bold text-center text-indigo-900 mb-8 sm:mb-12">
          Frequently Asked Questions
        </Text3D>
        <div className="max-w-3xl mx-auto space-y-3 sm:space-y-4">
          {faqs.map((faq, i) => (
            <Card3D key={i} delay={i * 0.05} className="bg-white rounded-lg sm:rounded-xl shadow-md overflow-hidden">
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full px-4 sm:px-6 py-3 sm:py-4 text-left flex justify-between items-center hover:bg-indigo-50 transition min-h-[44px] touch-target"
                aria-expanded={openFaq === i}
                aria-controls={`faq-answer-${i}`}
              >
                <span className="text-sm sm:text-base font-semibold text-indigo-900 pr-2">{faq.q}</span>
                <ChevronDown
                  className={`w-4 h-4 sm:w-5 sm:h-5 text-indigo-600 transition-transform flex-shrink-0 ${
                    openFaq === i ? "rotate-180" : ""
                  }`}
                />
              </button>
              {openFaq === i && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  id={`faq-answer-${i}`}
                  className="px-4 sm:px-6 pb-3 sm:pb-4 text-xs sm:text-sm text-gray-700"
                >
                  {faq.a}
                </motion.div>
              )}
            </Card3D>
          ))}
        </div>
      </section>

      {/* Stay Connected */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 bg-indigo-900 text-white">
        <Text3D className="text-2xl sm:text-3xl font-bold text-center mb-4 sm:mb-8">Stay Connected</Text3D>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-8 sm:mb-12 max-w-2xl mx-auto text-sm sm:text-base px-4"
        >
          Be the first to know when we launch
        </motion.p>

        <form onSubmit={handleSubscribe} className="max-w-md mx-auto mb-8 sm:mb-12 px-4">
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="flex-1 px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500 min-h-[44px]"
            />
            <Button3D
              type="submit"
              className="px-4 sm:px-6 py-2.5 sm:py-3 bg-orange-500 hover:bg-orange-600 rounded-lg font-semibold text-sm sm:text-base whitespace-nowrap min-h-[44px] touch-target"
            >
              Get Notified
            </Button3D>
          </div>
          {subscribed && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-xs sm:text-sm text-green-300 mt-2 text-center"
            >
              Subscribed successfully!
            </motion.p>
          )}
        </form>

        <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Mail className="w-5 h-5 sm:w-6 sm:h-6 mx-auto mb-2" />
            <a href="mailto:birstbd@gmail.com" className="hover:underline text-xs sm:text-sm break-all">
              birstbd@gmail.com
            </a>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Phone className="w-5 h-5 sm:w-6 sm:h-6 mx-auto mb-2" />
            <a href="tel:+8801753973892" className="hover:underline text-xs sm:text-sm">
              01753-973892
            </a>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <MapPin className="w-5 h-5 sm:w-6 sm:h-6 mx-auto mb-2" />
            <p className="text-xs sm:text-sm">Dhaka, Bangladesh</p>
          </motion.div>
        </div>
      </section>
    </Page3DWrapper>
  );
};

export default Home;