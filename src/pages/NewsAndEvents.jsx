import React, { useState, useEffect } from 'react';
import { Calendar, Clock, ExternalLink, User, Mail, Phone } from 'lucide-react';
import useAxiosPublic from '../hooks/useAxiosPublic';

export default function NewsAndEvents() {
  const axiosPublic = useAxiosPublic();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axiosPublic.get('/events');
        if (response.data) {
          setEvents(response.data);
        }
      } catch (error) {
        console.error('Error fetching events:', error);
        setEvents(sampleEvents);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const sampleEvents = [
    {
      _id: '1',
      title: 'Machine Learning in Bangla',
      type: 'webinar',
      date: '2020-12-16',
      time: '8:00 PM - 9:00 PM',
      speaker: 'Sabber Ahamed',
      description: 'Webinar series covering basic data science and machine learning concepts. This series will be in Bangla language to make it accessible for all.',
      featured: true,
      thumbnail: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800',
    },
    {
      _id: '2',
      title: 'ONLINE SEMINAR ON "MACHINE LEARNING WITH AWS - OPPORTUNITIES AND CAREER PATH"',
      type: 'seminar',
      date: '2021-02-25',
      time: '8.00 PM - 9.00 PM',
      speaker: 'Mohammad Mahdee Uz Zaman',
      speakerTitle: 'Solution Architect, Amazon Web Services, USA, and Founder, Cloudcamp Bangladesh',
      speakerImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200',
      description: 'Join us for an insightful seminar on machine learning with AWS, exploring career opportunities and pathways in cloud computing.',
      featured: true,
      thumbnail: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800',
    },
    {
      _id: '3',
      title: 'Day-Long Webinar ON "Enjoy Publishing Your Research with Ease"',
      type: 'webinar',
      date: '2021-05-21',
      time: 'Full Day',
      isFree: true,
      description: 'Statistical Research Consultants Bangladesh (SRCBD) is offering a day-long ONLINE LIVE webinar on "Enjoy Publishing Your Research with Ease" dated May 21, 2021 (After Eid-ul-Fitr).',
      contact: {
        website: 'srcbd.org',
        email: 'srcbd.training@gmail.com',
        phone: '01792087904',
      },
      featured: true,
      thumbnail: 'https://images.unsplash.com/photo-1532619675605-1ede6c4ed25b?w=800',
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumbs */}
        <div className="text-sm text-gray-600 mb-6">
          <span className="hover:text-indigo-600">Home</span> / <span className="text-gray-900">News & Events</span>
        </div>

        {/* Page Title */}
        <h1 className="text-4xl md:text-5xl font-bold text-center text-gray-900 mb-12">
          News & Events
        </h1>

        {/* Events Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event) => (
            <div
              key={event._id}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all overflow-hidden"
            >
              {/* Header with gradient */}
              <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 p-6 text-white relative">
                <div className="absolute top-2 left-2 opacity-20">
                  <h3 className="text-xs font-bold">SRCBD</h3>
                  <p className="text-xs">Towards Excellence Through Data</p>
                </div>
                <div className="relative z-10">
                  <span className="inline-block px-3 py-1 bg-white/20 rounded-full text-xs font-semibold mb-2 uppercase">
                    {event.type}
                  </span>
                  {event.isFree && (
                    <span className="inline-block ml-2 px-3 py-1 bg-green-500 rounded-full text-xs font-semibold">
                      FREE
                    </span>
                  )}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h2 className="text-xl font-bold text-red-600 mb-4 line-clamp-3">
                  {event.title}
                </h2>

                {/* Event Details */}
                <div className="space-y-3 mb-4">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Calendar className="w-5 h-5 text-indigo-600" />
                    <span className="font-semibold">Date:</span>
                    <span>{new Date(event.date).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}</span>
                  </div>
                  {event.time && (
                    <div className="flex items-center gap-2 text-gray-600">
                      <Clock className="w-5 h-5 text-indigo-600" />
                      <span className="font-semibold">Time:</span>
                      <span>{event.time}</span>
                    </div>
                  )}
                  {event.speaker && (
                    <div className="flex items-start gap-2">
                      <User className="w-5 h-5 text-indigo-600 mt-0.5" />
                      <div>
                        <p className="font-semibold text-gray-900">{event.speaker}</p>
                        {event.speakerTitle && (
                          <p className="text-sm text-gray-600">{event.speakerTitle}</p>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* Speaker Image */}
                {event.speakerImage && (
                  <div className="mb-4">
                    <img
                      src={event.speakerImage}
                      alt={event.speaker}
                      className="w-24 h-24 rounded-full object-cover border-4 border-indigo-100"
                    />
                  </div>
                )}

                {/* Description */}
                {event.description && (
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {event.description}
                  </p>
                )}

                {/* Contact Info */}
                {event.contact && (
                  <div className="bg-gray-50 rounded-lg p-4 mb-4 space-y-2 text-sm">
                    {event.contact.website && (
                      <div className="flex items-center gap-2">
                        <ExternalLink className="w-4 h-4 text-indigo-600" />
                        <a href={`https://${event.contact.website}`} className="text-indigo-600 hover:underline">
                          {event.contact.website}
                        </a>
                      </div>
                    )}
                    {event.contact.email && (
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-indigo-600" />
                        <a href={`mailto:${event.contact.email}`} className="text-indigo-600 hover:underline">
                          {event.contact.email}
                        </a>
                      </div>
                    )}
                    {event.contact.phone && (
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-indigo-600" />
                        <a href={`tel:${event.contact.phone}`} className="text-indigo-600 hover:underline">
                          {event.contact.phone}
                        </a>
                      </div>
                    )}
                  </div>
                )}

                {/* Read More Button */}
                <button
                  onClick={() => setSelectedEvent(event)}
                  className="flex items-center gap-2 text-indigo-600 font-semibold hover:gap-3 transition-all"
                >
                  Read More
                  <ExternalLink className="w-4 h-4" />
                </button>

                {/* Date Badge */}
                <div className="mt-4 pt-4 border-t border-gray-200 flex justify-end">
                  <span className="text-sm text-gray-500">
                    {new Date(event.date).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Event Detail Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50" onClick={() => setSelectedEvent(null)}>
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">{selectedEvent.title}</h2>
              <p className="text-gray-700 mb-4">{selectedEvent.description}</p>
              <button
                onClick={() => setSelectedEvent(null)}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}