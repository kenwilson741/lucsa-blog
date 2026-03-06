// Mock data for the LUCSA website
export const stats = [
    { label: 'Members', value: 150, suffix: '+' },
    { label: 'Events Held', value: 45, suffix: '+' },
    { label: 'Awards Won', value: 12, suffix: '' },
    { label: 'Since', value: 2023, suffix: '', isYear: true },
];

export const coreValues = [
    { title: 'Completeness', description: 'Delivering thorough, comprehensive communication that leaves no gaps.', icon: 'CheckCircle2' },
    { title: 'Conciseness', description: 'Expressing ideas clearly with precision and brevity.', icon: 'AlignLeft' },
    { title: 'Consideration', description: 'Thoughtful communication that respects diverse perspectives.', icon: 'Heart' },
    { title: 'Correctness', description: 'Upholding accuracy and truth in all our work.', icon: 'ShieldCheck' },
    { title: 'Courtesy', description: 'Respectful and professional interactions at all times.', icon: 'HandHeart' },
    { title: 'Objectivity', description: 'Unbiased reporting and fair representation of all viewpoints.', icon: 'Scale' },
    { title: 'Professionalism', description: 'Maintaining the highest standards in journalism and communication.', icon: 'Award' },
];

export const leaders = [
    { name: 'Prof. Jacinta Ndambuki', role: 'Patron', image: '', bio: 'Professor of Communication and distinguished academic leader at Laikipia University. Provides strategic guidance and mentorship to LUCSA members.', isPatron: true },
    { name: 'Wilson Kenagwa', role: 'Chairperson', image: '', bio: 'Visionary leader driving LUCSA\'s mission to develop journalistic excellence. Leads the executive committee and represents LUCSA at all official functions.', badges: [] },
    { name: 'Khamis Mwinyi', role: 'Vice Chairperson', image: '', bio: 'Award-winning writer and dynamic leader supporting LUCSA\'s growth and development.', badges: ['Best Male Writer - JSAK Summit 2026'] },
    { name: 'Nympha Mwaura', role: 'Secretary General', image: '', bio: 'Organizational backbone of LUCSA, managing records, correspondence, and administrative operations with excellence.', badges: [] },
    { name: 'TBA', role: 'Treasurer', image: '', bio: 'Managing LUCSA\'s financial resources with transparency and accountability.', badges: [] },
    { name: 'TBA', role: 'Organizing Secretary', image: '', bio: 'Coordinating events, workshops, and community service activities that bring LUCSA members together.', badges: [] },
    { name: 'TBA', role: 'Year 1 Coordinator', image: '', bio: 'Guiding first-year communication students into the LUCSA community.', badges: [] },
    { name: 'TBA', role: 'Year 2 Coordinator', image: '', bio: 'Supporting second-year students in their professional development journey.', badges: [] },
    { name: 'TBA', role: 'Year 3 Coordinator', image: '', bio: 'Mentoring third-year students and connecting them with industry opportunities.', badges: [] },
    { name: 'TBA', role: 'Year 4 Coordinator', image: '', bio: 'Preparing final-year students for transition into the professional world.', badges: [] },
];

export const awards = [
    { title: 'Best Female Writer', recipient: 'Faith Amoit', organization: 'JSAK Summit 2026', date: 'February 2026', category: 'Writing Excellence', description: 'Recognized for outstanding writing skills and journalistic excellence at the national JSAK Summit.' },
    { title: 'Best Male Writer', recipient: 'Khamis Mwinyi', organization: 'JSAK Summit 2026', date: 'February 2026', category: 'Writing Excellence', description: 'Honored for exceptional writing talent and dedication to quality journalism.' },
    { title: 'JSAK Chapter Representative', recipient: 'Elizabeth Maina', organization: 'JSAK', date: '2025/2026', category: 'Leadership Recognition', description: 'Appointed as JSAK Chapter Representative, bridging Laikipia University with the national journalism body.' },
];

export const events = [
    { id: '1', title: 'Podcasting Workshop', date: '2026-03-15', time: '10:00 AM', venue: 'Annex Mess, Laikipia University', category: 'Workshop', description: 'Learn the fundamentals of podcasting from concept to production. Hands-on session with professional equipment and industry mentors.', status: 'Open' as const, spots: 50 },
    { id: '2', title: 'Investigative Journalism Masterclass', date: '2026-03-22', time: '2:00 PM', venue: 'Main Auditorium', category: 'Workshop', description: 'Deep dive into investigative journalism techniques with veteran reporters. Learn research methods, source verification, and story development.', status: 'Open' as const, spots: 80 },
    { id: '3', title: 'Photography Competition', date: '2026-04-05', time: '9:00 AM', venue: 'Campus Grounds', category: 'Competition', description: 'Annual photography competition capturing life at Laikipia University. Theme: "Voices of the Community". Prizes for top 3 entries.', status: 'Open' as const, spots: 100 },
    { id: '4', title: 'Community Service - Orphanage Visit', date: '2026-04-12', time: '8:00 AM', venue: 'Nyahururu Children\'s Home', category: 'Community Service', description: 'Join us for a day of giving back to the community. Activities include storytelling, donations, and mentorship for children.', status: 'Open' as const, spots: 40 },
    { id: '5', title: 'Media House Field Trip - NTV', date: '2026-04-20', time: '7:00 AM', venue: 'NTV Studios, Nairobi', category: 'Networking', description: 'Experience a day in the life at NTV. Tour the studios, meet journalists and producers, and learn about career opportunities in broadcast media.', status: 'Open' as const, spots: 30 },
    { id: '6', title: 'Social Media Strategy Workshop', date: '2026-05-03', time: '11:00 AM', venue: 'Computer Lab 2', category: 'Workshop', description: 'Master social media management, content creation, and digital storytelling. Learn analytics, scheduling tools, and engagement strategies.', status: 'Open' as const, spots: 45 },
];

export const blogPosts = [
    { slug: 'jsak-summit-2026-recap', title: 'LUCSA Shines at JSAK Summit 2026', excerpt: 'Our members brought home two major awards at the national Journalism Students Association of Kenya summit, proving that Laikipia University\'s communication students are a force to be reckoned with.', category: 'News & Announcements', author: 'Wilson Kenagwa', authorRole: 'Chairperson', date: '2026-02-28', readTime: '5 min read', featured: true, image: '' },
    { slug: 'mastering-investigative-journalism', title: 'Mastering the Art of Investigative Journalism', excerpt: 'Tips and insights from our recent masterclass on investigative journalism techniques, featuring veteran reporters from leading Kenyan media houses.', category: 'Tutorials & Tips', author: 'Nympha Mwaura', authorRole: 'Secretary General', date: '2026-02-20', readTime: '7 min read', featured: false, image: '' },
    { slug: 'faith-amoit-best-female-writer', title: 'Faith Amoit: Best Female Writer at JSAK Summit', excerpt: 'A spotlight on Faith Amoit\'s journey to winning the Best Female Writer award at the prestigious JSAK Summit 2026, and her advice for aspiring writers.', category: 'Student Spotlights', author: 'LUCSA Media', authorRole: 'Media Team', date: '2026-02-25', readTime: '4 min read', featured: true, image: '' },
    { slug: 'podcasting-101-getting-started', title: 'Podcasting 101: Getting Started', excerpt: 'Everything you need to know about starting your first podcast - from equipment and software to content planning and distribution strategies.', category: 'Tutorials & Tips', author: 'Khamis Mwinyi', authorRole: 'Vice Chairperson', date: '2026-02-15', readTime: '8 min read', featured: false, image: '' },
    { slug: 'community-service-orphanage-visit', title: 'Giving Back: LUCSA\'s Community Service Initiative', excerpt: 'Highlights from our recent orphanage visit and how LUCSA members are making a positive impact in the Nyahururu community through acts of kindness.', category: 'Event Coverage', author: 'LUCSA Media', authorRole: 'Media Team', date: '2026-02-10', readTime: '3 min read', featured: false, image: '' },
    { slug: 'digital-media-landscape-kenya', title: 'The Digital Media Landscape in Kenya: Opportunities for Graduates', excerpt: 'An in-depth analysis of career opportunities in Kenya\'s evolving digital media space, with insights from industry professionals and recent graduates.', category: 'Opinion Pieces', author: 'Elizabeth Maina', authorRole: 'JSAK Representative', date: '2026-02-05', readTime: '10 min read', featured: false, image: '' },
];

export const galleryImages = [
    { id: '1', title: 'JSAK Summit 2026', category: 'Event Coverage', artist: 'LUCSA Media Team', description: 'LUCSA delegation at the JSAK Summit 2026' },
    { id: '2', title: 'Mentorship Session', category: 'Event Coverage', artist: 'LUCSA Media Team', description: 'Industry professionals sharing insights with students' },
    { id: '3', title: 'Campus Life', category: 'Student Photography', artist: 'Photography Club', description: 'Capturing everyday moments at Laikipia University' },
    { id: '4', title: 'Awards Ceremony', category: 'Event Coverage', artist: 'LUCSA Media Team', description: 'LUCSA members receiving awards at JSAK Summit' },
    { id: '5', title: 'Workshop Session', category: 'Event Coverage', artist: 'LUCSA Media Team', description: 'Hands-on podcasting workshop in progress' },
    { id: '6', title: 'Community Service', category: 'Event Coverage', artist: 'LUCSA Media Team', description: 'LUCSA members during orphanage visit' },
    { id: '7', title: 'Sunset at Laikipia', category: 'Student Photography', artist: 'Photography Club', description: 'Beautiful sunset over Laikipia University campus' },
    { id: '8', title: 'Media Studio', category: 'Student Photography', artist: 'Photography Club', description: 'Behind the scenes at a video production session' },
];

export const timelineEvents = [
    { year: '2023', title: 'LUCSA Founded', description: 'Constitution adopted and first executive committee inaugurated at Laikipia University.' },
    { year: '2023', title: 'First AGM', description: 'Inaugural Annual General Meeting held with over 100 communication students in attendance.' },
    { year: '2024', title: 'JSAK Membership', description: 'LUCSA officially joins the Journalism Students Association of Kenya (JSAK).' },
    { year: '2024', title: 'First Media House Trip', description: 'Members visit NTV Studios in Nairobi, gaining hands-on industry exposure.' },
    { year: '2025', title: 'Community Service Launch', description: 'LUCSA initiates its community service program with regular orphanage and charity visits.' },
    { year: '2025', title: 'Digital Skills Program', description: 'Launch of Ajira Digital training workshops for digital skills development.' },
    { year: '2026', title: 'JSAK Summit Success', description: 'LUCSA wins Best Female Writer (Faith Amoit) and Best Male Writer (Khamis Mwinyi) at JSAK Summit.' },
];

export const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Events', href: '/events' },
    { label: 'Blog', href: '/blog' },
    { label: 'Leadership', href: '/leadership' },
    { label: 'Awards', href: '/awards' },
    { label: 'Gallery', href: '/gallery' },
];

export const programs = [
    'Bachelor of Arts in Communication and Media',
    'English and Communication',
    'Kiswahili and Communication',
];

export const sponsorTiers = [
    { tier: 'Platinum', sponsors: [{ name: 'Laikipia University', url: '#' }] },
    { tier: 'Gold', sponsors: [{ name: 'JSAK', url: '#' }, { name: 'Media Council of Kenya', url: '#' }] },
    { tier: 'Silver', sponsors: [{ name: 'NTV Kenya', url: '#' }, { name: 'Citizen TV', url: '#' }] },
];
