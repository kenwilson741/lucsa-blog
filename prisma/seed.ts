import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log('🌱 Seeding LUCSA database...');

    // Seed Events
    const events = [
        { title: 'Podcasting Workshop', date: '2026-03-15', time: '10:00 AM', venue: 'Annex Mess, Laikipia University', category: 'Workshop', description: 'Learn the fundamentals of podcasting from concept to production. Hands-on session with professional equipment and industry mentors.', status: 'Open', spots: 50 },
        { title: 'Investigative Journalism Masterclass', date: '2026-03-22', time: '2:00 PM', venue: 'Main Auditorium', category: 'Workshop', description: 'Deep dive into investigative journalism techniques with veteran reporters. Learn research methods, source verification, and story development.', status: 'Open', spots: 80 },
        { title: 'Photography Competition', date: '2026-04-05', time: '9:00 AM', venue: 'Campus Grounds', category: 'Competition', description: 'Annual photography competition capturing life at Laikipia University. Theme: "Voices of the Community". Prizes for top 3 entries.', status: 'Open', spots: 100 },
        { title: 'Community Service - Orphanage Visit', date: '2026-04-12', time: '8:00 AM', venue: "Nyahururu Children's Home", category: 'Community Service', description: 'Join us for a day of giving back to the community. Activities include storytelling, donations, and mentorship for children.', status: 'Open', spots: 40 },
        { title: 'Media House Field Trip - NTV', date: '2026-04-20', time: '7:00 AM', venue: 'NTV Studios, Nairobi', category: 'Networking', description: 'Experience a day in the life at NTV. Tour the studios, meet journalists and producers, and learn about career opportunities in broadcast media.', status: 'Open', spots: 30 },
        { title: 'Social Media Strategy Workshop', date: '2026-05-03', time: '11:00 AM', venue: 'Computer Lab 2', category: 'Workshop', description: 'Master social media management, content creation, and digital storytelling. Learn analytics, scheduling tools, and engagement strategies.', status: 'Open', spots: 45 },
    ];
    for (const event of events) {
        await prisma.event.create({ data: event });
    }
    console.log(`  ✅ ${events.length} events seeded`);

    // Seed Blog Posts
    const blogPosts = [
        { slug: 'jsak-summit-2026-recap', title: 'LUCSA Shines at JSAK Summit 2026', excerpt: "Our members brought home two major awards at the national Journalism Students Association of Kenya summit, proving that Laikipia University's communication students are a force to be reckoned with.", category: 'News & Announcements', authorName: 'Wilson Kenagwa', authorRole: 'Chairperson', date: '2026-02-28', readTime: '5 min read', featured: true },
        { slug: 'mastering-investigative-journalism', title: 'Mastering the Art of Investigative Journalism', excerpt: 'Tips and insights from our recent masterclass on investigative journalism techniques, featuring veteran reporters from leading Kenyan media houses.', category: 'Tutorials & Tips', authorName: 'Nympha Mwaura', authorRole: 'Secretary General', date: '2026-02-20', readTime: '7 min read' },
        { slug: 'faith-amoit-best-female-writer', title: 'Faith Amoit: Best Female Writer at JSAK Summit', excerpt: "A spotlight on Faith Amoit's journey to winning the Best Female Writer award at the prestigious JSAK Summit 2026, and her advice for aspiring writers.", category: 'Student Spotlights', authorName: 'LUCSA Media', authorRole: 'Media Team', date: '2026-02-25', readTime: '4 min read', featured: true },
        { slug: 'podcasting-101-getting-started', title: 'Podcasting 101: Getting Started', excerpt: 'Everything you need to know about starting your first podcast - from equipment and software to content planning and distribution strategies.', category: 'Tutorials & Tips', authorName: 'Khamis Mwinyi', authorRole: 'Vice Chairperson', date: '2026-02-15', readTime: '8 min read' },
        { slug: 'community-service-orphanage-visit', title: "Giving Back: LUCSA's Community Service Initiative", excerpt: 'Highlights from our recent orphanage visit and how LUCSA members are making a positive impact in the Nyahururu community through acts of kindness.', category: 'Event Coverage', authorName: 'LUCSA Media', authorRole: 'Media Team', date: '2026-02-10', readTime: '3 min read' },
        { slug: 'digital-media-landscape-kenya', title: 'The Digital Media Landscape in Kenya: Opportunities for Graduates', excerpt: "An in-depth analysis of career opportunities in Kenya's evolving digital media space, with insights from industry professionals and recent graduates.", category: 'Opinion Pieces', authorName: 'Elizabeth Maina', authorRole: 'JSAK Representative', date: '2026-02-05', readTime: '10 min read' },
    ];
    for (const post of blogPosts) {
        await prisma.blogPost.create({ data: post });
    }
    console.log(`  ✅ ${blogPosts.length} blog posts seeded`);

    // Seed Awards
    const awards = [
        { title: 'Best Female Writer', recipient: 'Faith Amoit', organization: 'JSAK Summit 2026', date: 'February 2026', category: 'Writing Excellence', description: 'Recognized for outstanding writing skills and journalistic excellence at the national JSAK Summit.' },
        { title: 'Best Male Writer', recipient: 'Khamis Mwinyi', organization: 'JSAK Summit 2026', date: 'February 2026', category: 'Writing Excellence', description: 'Honored for exceptional writing talent and dedication to quality journalism.' },
        { title: 'JSAK Chapter Representative', recipient: 'Elizabeth Maina', organization: 'JSAK', date: '2025/2026', category: 'Leadership Recognition', description: 'Appointed as JSAK Chapter Representative, bridging Laikipia University with the national journalism body.' },
    ];
    for (const award of awards) {
        await prisma.award.create({ data: award });
    }
    console.log(`  ✅ ${awards.length} awards seeded`);

    // Seed Gallery Images
    const galleryImages = [
        { title: 'JSAK Summit 2026', category: 'Event Coverage', artist: 'LUCSA Media Team', description: 'LUCSA delegation at the JSAK Summit 2026' },
        { title: 'Mentorship Session', category: 'Event Coverage', artist: 'LUCSA Media Team', description: 'Industry professionals sharing insights with students' },
        { title: 'Campus Life', category: 'Student Photography', artist: 'Photography Club', description: 'Capturing everyday moments at Laikipia University' },
        { title: 'Awards Ceremony', category: 'Event Coverage', artist: 'LUCSA Media Team', description: 'LUCSA members receiving awards at JSAK Summit' },
        { title: 'Workshop Session', category: 'Event Coverage', artist: 'LUCSA Media Team', description: 'Hands-on podcasting workshop in progress' },
        { title: 'Community Service', category: 'Event Coverage', artist: 'LUCSA Media Team', description: 'LUCSA members during orphanage visit' },
        { title: 'Sunset at Laikipia', category: 'Student Photography', artist: 'Photography Club', description: 'Beautiful sunset over Laikipia University campus' },
        { title: 'Media Studio', category: 'Student Photography', artist: 'Photography Club', description: 'Behind the scenes at a video production session' },
    ];
    for (const img of galleryImages) {
        await prisma.galleryImage.create({ data: img });
    }
    console.log(`  ✅ ${galleryImages.length} gallery images seeded`);

    // Seed Leaders
    const leaders = [
        { name: 'Prof. Jacinta Ndambuki', role: 'Patron', bio: 'Professor of Communication and distinguished academic leader at Laikipia University. Provides strategic guidance and mentorship to LUCSA members.', isPatron: true, sortOrder: 0 },
        { name: 'Wilson Kenagwa', role: 'Chairperson', bio: "Visionary leader driving LUCSA's mission to develop journalistic excellence. Leads the executive committee and represents LUCSA at all official functions.", badges: '[]', sortOrder: 1 },
        { name: 'Khamis Mwinyi', role: 'Vice Chairperson', bio: "Award-winning writer and dynamic leader supporting LUCSA's growth and development.", badges: '["Best Male Writer - JSAK Summit 2026"]', sortOrder: 2 },
        { name: 'Nympha Mwaura', role: 'Secretary General', bio: 'Organizational backbone of LUCSA, managing records, correspondence, and administrative operations with excellence.', badges: '[]', sortOrder: 3 },
        { name: 'TBA', role: 'Treasurer', bio: "Managing LUCSA's financial resources with transparency and accountability.", badges: '[]', sortOrder: 4 },
        { name: 'TBA', role: 'Organizing Secretary', bio: 'Coordinating events, workshops, and community service activities that bring LUCSA members together.', badges: '[]', sortOrder: 5 },
        { name: 'TBA', role: 'Year 1 Coordinator', bio: 'Guiding first-year communication students into the LUCSA community.', badges: '[]', sortOrder: 6 },
        { name: 'TBA', role: 'Year 2 Coordinator', bio: 'Supporting second-year students in their professional development journey.', badges: '[]', sortOrder: 7 },
        { name: 'TBA', role: 'Year 3 Coordinator', bio: 'Mentoring third-year students and connecting them with industry opportunities.', badges: '[]', sortOrder: 8 },
        { name: 'TBA', role: 'Year 4 Coordinator', bio: 'Preparing final-year students for transition into the professional world.', badges: '[]', sortOrder: 9 },
    ];
    for (const leader of leaders) {
        await prisma.leader.create({ data: leader });
    }
    console.log(`  ✅ ${leaders.length} leaders seeded`);

    console.log('✨ Database seeded successfully!');
}

main()
    .catch((e) => {
        console.error('❌ Seed failed:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
