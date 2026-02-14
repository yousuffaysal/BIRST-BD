/**
 * SEO Configuration for BIRSTBD Website
 * Contains default and page-specific SEO metadata
 */

export const defaultSEO = {
    siteName: 'BIRSTBD',
    siteUrl: 'https://birstbd.com',
    defaultTitle: 'Bangladesh Institute for Research and Statistical Training',
    defaultDescription: 'Join BIRSTBD for expert research training, statistical analysis courses, and professional workshops. Empowering researchers across Bangladesh with data-driven skills and AI-powered tools.',
    defaultKeywords: 'research training Bangladesh, statistical analysis, data science courses, SPSS training, research methodology, thesis support, BIRSTBD, online learning, workshops',
    defaultImage: 'https://ik.imagekit.io/2lax2ytm2/og-image-default.jpg',
    twitterHandle: '@BIRSTBD',
    themeColor: '#00BFFF',
    language: 'en',
    locale: 'en_US',
};

export const pageSEO = {
    home: {
        title: 'Bangladesh Institute for Research and Statistical Training',
        description: 'Join a vibrant community of learners. Transform your aspirations into achievements with professional statistical training and workshops from BIRSTBD.',
        keywords: 'research training, statistical analysis, data science, Bangladesh, online courses, workshops, BIRSTBD',
        image: 'https://ik.imagekit.io/2lax2ytm2/home-og.jpg',
    },

    courses: {
        title: 'Online Courses | BIRSTBD - Research & Statistical Training',
        description: 'Browse comprehensive research methodology, statistical analysis, and data science courses. Expert-led training in SPSS, R, Python, and more.',
        keywords: 'online courses, research methods, statistics courses, SPSS training, data analysis, machine learning courses',
        image: 'https://ik.imagekit.io/2lax2ytm2/courses-og.jpg',
    },

    about: {
        title: 'About Us | BIRSTBD - Leading Research Training Institute',
        description: 'Learn about BIRSTBD\'s mission to empower researchers worldwide through advanced training, statistical expertise, and collaborative opportunities.',
        keywords: 'about BIRSTBD, research institute, statistical training, mission vision, Bangladesh education',
        image: 'https://ik.imagekit.io/2lax2ytm2/about-og.jpg',
    },

    events: {
        title: 'Workshops & Events | BIRSTBD',
        description: 'Join our upcoming webinars, workshops, and conferences. Learn from industry experts and network with fellow researchers.',
        keywords: 'research workshops, webinars, conferences, training events, Bangladesh, BIRSTBD events',
        image: 'https://ik.imagekit.io/2lax2ytm2/events-og.jpg',
    },

    contact: {
        title: 'Contact Us | BIRSTBD',
        description: 'Get in touch with BIRSTBD for course inquiries, collaborations, or support. We\'re here to help you succeed in your research journey.',
        keywords: 'contact BIRSTBD, support, inquiries, research help, Bangladesh',
        image: 'https://ik.imagekit.io/2lax2ytm2/contact-og.jpg',
    },

    aitools: {
        title: 'AI Tools | BIRSTBD - Research Assistant Tools',
        description: 'Access AI-powered research tools to enhance your productivity. Smart assistants for data analysis, writing, and research methodology.',
        keywords: 'AI tools, research assistant, data analysis tools, AI powered, research productivity',
        image: 'https://ik.imagekit.io/2lax2ytm2/aitools-og.jpg',
    },

    researchAndPublication: {
        title: 'Research & Publication | BIRSTBD',
        description: 'Explore research resources, publication support, and academic guidance. Get help with thesis writing, journal submissions, and more.',
        keywords: 'research publication, thesis support, academic writing, journal submission, research resources',
        image: 'https://ik.imagekit.io/2lax2ytm2/research-og.jpg',
    },

    blogs: {
        title: 'Blog | BIRSTBD - Research Insights & Tips',
        description: 'Read expert insights on research methodology, statistical analysis, and career development. Stay updated with the latest trends.',
        keywords: 'research blog, statistics tips, data science articles, research insights, BIRSTBD blog',
        image: 'https://ik.imagekit.io/2lax2ytm2/blog-og.jpg',
    },

    gallery: {
        title: 'Gallery | BIRSTBD - Events & Workshops',
        description: 'View photos and videos from our workshops, training sessions, and events. See our community in action.',
        keywords: 'BIRSTBD gallery, workshop photos, event images, training videos',
        image: 'https://ik.imagekit.io/2lax2ytm2/gallery-og.jpg',
    },
};

// Structured Data Templates
export const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: 'Bangladesh Institute for Research and Statistical Training',
    alternateName: 'BIRSTBD',
    url: 'https://birstbd.com',
    logo: 'https://ik.imagekit.io/2lax2ytm2/BIRST_LOGO.svg',
    description: 'Professional research and statistical training institute in Bangladesh offering expert courses, workshops, and AI-powered tools.',
    address: {
        '@type': 'PostalAddress',
        addressCountry: 'BD',
        addressLocality: 'Bangladesh',
    },
    sameAs: [
        'https://facebook.com/BIRSTBD',
        'https://twitter.com/BIRSTBD',
        'https://linkedin.com/company/BIRSTBD',
    ],
    contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'Customer Service',
        email: 'info@birstbd.com',
    },
};

export const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'BIRSTBD',
    url: 'https://birstbd.com',
    potentialAction: {
        '@type': 'SearchAction',
        target: 'https://birstbd.com/search?q={search_term_string}',
        'query-input': 'required name=search_term_string',
    },
};

export const breadcrumbSchema = (items) => ({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        item: `https://birstbd.com${item.path}`,
    })),
});

export const courseSchema = (course) => ({
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: course.title,
    description: course.description,
    provider: {
        '@type': 'Organization',
        name: 'BIRSTBD',
        sameAs: 'https://birstbd.com',
    },
    offers: {
        '@type': 'Offer',
        price: course.price,
        priceCurrency: course.currency || 'BDT',
    },
    image: course.thumbnail,
    hasCourseInstance: {
        '@type': 'CourseInstance',
        courseMode: 'online',
        instructor: {
            '@type': 'Person',
            name: course.instructor,
        },
    },
});

export const eventSchema = (event) => ({
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: event.title,
    description: event.description,
    startDate: event.date,
    eventAttendanceMode: event.location === 'Online'
        ? 'https://schema.org/OnlineEventAttendanceMode'
        : 'https://schema.org/OfflineEventAttendanceMode',
    eventStatus: 'https://schema.org/EventScheduled',
    location: event.location === 'Online'
        ? {
            '@type': 'VirtualLocation',
            url: event.platform || 'https://birstbd.com',
        }
        : {
            '@type': 'Place',
            name: event.location,
            address: event.location,
        },
    image: event.thumbnail,
    organizer: {
        '@type': 'Organization',
        name: 'BIRSTBD',
        url: 'https://birstbd.com',
    },
    offers: event.isFree ? {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'BDT',
        availability: 'https://schema.org/InStock',
    } : undefined,
});
