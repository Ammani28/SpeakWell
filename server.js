const express = require('express');
const cors = require('cors');
const path = require('path');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const app = express();

const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET || 'speakwell_jwt_secret_key_2026_antigravity';
const GEMINI_API_KEY = process.env.GEMINI_API_KEY || '';

if (!GEMINI_API_KEY) {
  console.error("CRITICAL: GEMINI_API_KEY is missing in environment variables!");
}

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(__dirname));

// Health check endpoint (for Uptime monitoring)
app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

// Authentication Middleware
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token required. Please sign in.' });
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid or expired session token.' });
    }
    req.user = decoded;
    next();
  });
}

// -------------------------------------------------------------
// 500-ITEM COMBINATORIAL SEED DICTIONARY & 3-AXIS MATRIX ENGINE
// -------------------------------------------------------------
const COMBINATORIAL_SUBJECTS = {
  'Job Interview & Career': [
    { title: 'First Job Interview', detail: 'your very first job interview experience', vocab: ['break the ice', 'nervous butterflies', 'make a great impression'] },
    { title: 'Dealing with a Difficult Boss', detail: 'working with a manager who has a tough personality', vocab: ['professional boundary', 'conflict resolution', 'diplomatic response'] },
    { title: 'Answering "Tell Me About Yourself"', detail: 'summarizing your background for a recruiter', vocab: ['elevator pitch', 'key achievements', 'career highlights'] },
    { title: 'Salary Negotiations', detail: 'discussing your starting pay or asking for a raise', vocab: ['market value', 'compensation package', 'know your worth'] },
    { title: 'Work From Home vs Office', detail: 'comparing remote work flexibility with office collaboration', vocab: ['work-life balance', 'remote collaboration', 'office culture'] },
    { title: 'Handling Tight Deadlines', detail: 'completing critical tasks under extreme time pressure', vocab: ['work under pressure', 'meet the deadline', 'prioritize tasks'] },
    { title: 'Resignation & Notice Period', detail: 'leaving a company gracefully and handing over duties', vocab: ['graceful exit', 'handover process', 'career transition'] },
    { title: 'Handling Team Conflicts', detail: 'resolving disagreements between team members', vocab: ['find common ground', 'active listening', 'de-escalate tension'] },
    { title: 'Career Path Pivot', detail: 'switching to a completely new industry or domain', vocab: ['transferable skills', 'leap of faith', 'steep learning curve'] },
    { title: 'Performance Appraisal Review', detail: 'receiving annual feedback and setting future targets', vocab: ['constructive feedback', 'growth mindset', 'key metrics'] },
    { title: 'Office Politics & Culture', detail: 'navigating workplace dynamics and unwritten rules', vocab: ['build rapport', 'stay professional', 'company alignment'] },
    { title: 'Overtime & Burnout Prevention', detail: 'managing long working hours without compromising health', vocab: ['prevent burnout', 'set boundaries', 'workplace wellness'] },
    { title: 'Onboarding New Teammates', detail: 'welcoming and training a junior colleague on your team', vocab: ['show them the ropes', 'peer mentorship', 'smooth transition'] },
    { title: 'Elevator Pitch Practice', detail: 'introducing yourself and your project in under 60 seconds', vocab: ['concise pitch', 'hook the listener', 'value proposition'] },
    { title: 'Layoff Anxiety & Security', detail: 'staying resilient during industry downsizing', vocab: ['future-proof skills', 'stay adaptable', 'financial cushion'] },
    { title: 'Workplace Diversity & Inclusion', detail: 'working in multicultural and diverse teams', vocab: ['diverse perspectives', 'inclusive environment', 'cultural awareness'] },
    { title: 'Pushing for a Promotion', detail: 'demonstrating leadership to get to the next level', vocab: ['take initiative', 'track record', 'step up to the plate'] },
    { title: 'Finding a Career Mentor', detail: 'seeking guidance from senior industry professionals', vocab: ['valuable guidance', 'career roadmap', 'learn from experience'] },
    { title: 'Networking Events', detail: 'connecting with industry peers at conferences or meetups', vocab: ['expand network', 'make meaningful connections', 'follow up'] },
    { title: 'Job Hunting Strategies', detail: 'searching for job openings and tailoring your resume', vocab: ['stand out', 'tailored resume', 'target companies'] }
  ],
  'Travel & Cultural Immersion': [
    { title: 'Lost Luggage at Airport', detail: 'discovering your luggage was misplaced during a flight', vocab: ['baggage claim', 'travel mishap', 'file a report'] },
    { title: 'Solo Traveling vs Group Trips', detail: 'exploring a new country alone versus traveling with friends', vocab: ['wanderlust', 'step out of comfort zone', 'travel companion'] },
    { title: 'Memorable Scenic Train Trip', detail: 'a train journey with spectacular landscapes and views', vocab: ['scenic route', 'unforgettable views', 'off the beaten path'] },
    { title: 'Street Food Discovery', detail: 'trying local delicacies from street stalls in another city', vocab: ['local delicacy', 'culinary experience', 'exotic flavors'] },
    { title: 'Dream Vacation Planning', detail: 'designing your ideal bucket-list international holiday', vocab: ['bucket list destination', 'cultural immersion', 'sightseeing'] },
    { title: 'Beach Retreat vs Mountain Trek', detail: 'choosing between sunny beaches and snowy mountain peaks', vocab: ['coastal breeze', 'mountain peak', 'serene getaway'] },
    { title: 'Airport Flight Delays', detail: 'spending hours stranded at an airport during a delay', vocab: ['kill time', 'travel delay', 'stay patient'] },
    { title: 'Passport & Visa Hassles', detail: 'navigating embassy interviews and visa documentation', vocab: ['paperwork hassle', 'entry permit', 'smooth clearance'] },
    { title: 'Hostel Social Encounters', detail: 'meeting international travelers in a shared hostel lounge', vocab: ['swap travel stories', 'global community', 'budget travel'] },
    { title: 'Missed Transit Connection', detail: 'missing a connecting bus or flight in a foreign city', vocab: ['quick thinking', 'alternative route', 'unexpected detour'] },
    { title: 'Language Barrier Humor', detail: 'communicating using hand gestures when you cannot speak the local language', vocab: ['body language', 'miming', 'break the barrier'] },
    { title: 'Bargaining at Local Markets', detail: 'negotiating prices for souvenirs with local vendors', vocab: ['haggle for price', 'good deal', 'art of bargaining'] },
    { title: 'Packing Light Strategy', detail: 'fitting everything into a single carry-on bag for a long trip', vocab: ['travel light', 'essential items', 'minimalist packer'] },
    { title: 'Beating Jet Lag', detail: 'recovering after flying across multiple time zones', vocab: ['adjust circadian rhythm', 'sleep schedule', 'overcome fatigue'] },
    { title: 'Unplanned Road Trips', detail: 'taking an spontaneous drive without a fixed destination', vocab: ['open road', 'spontaneous adventure', 'spontaneous stops'] },
    { title: 'Discovering Hidden Gems', detail: 'finding quiet spots that tourists rarely visit', vocab: ['secret spot', 'authentic experience', 'hidden gem'] },
    { title: 'Airbnb vs Traditional Hotels', detail: 'comparing staying in local apartments with full-service hotels', vocab: ['homey feel', 'hotel amenities', 'local host'] },
    { title: 'Cultural Etiquette Lessons', detail: 'learning customs and manners when visiting sacred or traditional sites', vocab: ['show respect', 'local customs', 'cultural sensitivity'] },
    { title: 'Wilderness Camping', detail: 'spending the night under the stars in a tent in nature', vocab: ['roughing it', 'starry sky', 'connect with nature'] },
    { title: 'Ocean Cruise Experience', detail: 'sailing across islands on a large cruise ship', vocab: ['island hopping', 'ocean breeze', 'all-inclusive'] }
  ],
  'Daily Casual Conversation': [
    { title: 'Morning Tea vs Coffee', detail: 'starting your day with a hot cup of tea or coffee', vocab: ['daily pick-me-up', 'cozy atmosphere', 'sip on'] },
    { title: 'Screen Time Management', detail: 'balancing smartphone usage with real-life activities', vocab: ['digital detox', 'screen addiction', 'mindful usage'] },
    { title: 'Childhood Festival Memories', detail: 'celebrating festive holidays with family as a child', vocab: ['festive atmosphere', 'cherished memories', 'family tradition'] },
    { title: 'Reconnecting with Old Friends', detail: 'meeting a friend you haven\'t seen in several years', vocab: ['pick up where left off', 'walk down memory lane', 'reconnect'] },
    { title: 'Cooking Disaster Moments', detail: 'attempting a recipe that turned out completely wrong', vocab: ['kitchen mishap', 'burnt to a crisp', 'learning experience'] },
    { title: 'Daily Fitness Habits', detail: 'incorporating walks or workouts into a busy schedule', vocab: ['stay active', 'daily routine', 'fit lifestyle'] },
    { title: 'Late Night Habits vs Early Mornings', detail: 'staying up late studying or working versus waking up at dawn', vocab: ['night owl', 'early bird', 'burn the midnight oil'] },
    { title: 'Grocery Shopping Routines', detail: 'navigating supermarket aisles and making healthy choices', vocab: ['stock up', 'grocery list', 'fresh produce'] },
    { title: 'Pet Companionship Joys', detail: 'the fun and responsibilities of caring for a dog or cat', vocab: ['furry friend', 'unconditional love', 'pet care'] },
    { title: 'Rainy Day Activities', detail: 'spending a rainy weekend indoors with books or movies', vocab: ['patter of rain', 'cozy indoors', 'hot cocoa'] },
    { title: 'Favorite Podcasts & Shows', detail: 'listening to audio series or watching favorite series', vocab: ['binge-watch', 'audio episode', 'highly recommended'] },
    { title: 'Weekend Sleep-ins', detail: 'catching up on rest on Sunday morning without alarms', vocab: ['sleep in', 'lazy Sunday', 'recharge batteries'] },
    { title: 'DIY Home Repairs', detail: 'fixing small things around the house by yourself', vocab: ['handy tools', 'do-it-yourself', 'fix up'] },
    { title: 'Commuting on Public Transit', detail: 'riding buses, subways, or cabs during daily peak hours', vocab: ['daily commute', 'rush hour', 'grab a seat'] },
    { title: 'Room & Desk Organization', detail: 'decluttering your living space or work desk', vocab: ['clear clutter', 'tidy up', 'organized space'] },
    { title: 'Favorite Comfort Food', detail: 'treating yourself to a favorite dessert or warm meal', vocab: ['guilty pleasure', 'comfort food', 'satisfy cravings'] },
    { title: 'Nostalgic Music Tracks', detail: 'listening to songs that take you back to high school', vocab: ['throwback tune', 'nostalgic vibe', 'soundtrack of youth'] },
    { title: 'Social Media Scrolling', detail: 'scrolling through social feeds during breaks', vocab: ['infinite scroll', 'stay updated', 'pass the time'] },
    { title: 'Neighborhood Cafe Vibes', detail: 'sitting at a local cafe reading or working', vocab: ['cozy corner', 'coffee shop vibe', 'people watching'] },
    { title: 'Handling Bad Hair Days', detail: 'dealing with little unexpected morning inconveniences', vocab: ['rough morning', 'laugh it off', 'shake it off'] }
  ],
  'Debate & Opinions': [
    { title: 'Social Media Friendship Impact', detail: 'whether social media strengthens or weakens real friendships', vocab: ['double-edged sword', 'virtual connections', 'superficial engagement'] },
    { title: 'Can Money Buy Happiness?', detail: 'the extent to which financial wealth creates genuine happiness', vocab: ['financial stability', 'material wealth', 'quality of life'] },
    { title: 'Online vs Traditional University', detail: 'evaluating remote e-learning against physical campus lectures', vocab: ['hands-on learning', 'flexible schedule', 'campus environment'] },
    { title: 'AI & Human Creativity', detail: 'whether artificial intelligence enriches or threatens human art', vocab: ['human touch', 'automation', 'creative expression'] },
    { title: 'Four-Day Work Week Trial', detail: 'reducing weekly work days from five to four while keeping full pay', vocab: ['workplace productivity', 'three-day weekend', 'work efficiency'] },
    { title: 'Cashless Society Debate', detail: 'replacing physical currency completely with digital payments', vocab: ['digital currency', 'financial privacy', 'seamless transactions'] },
    { title: 'Permanent Remote Work', detail: 'whether companies should allow employees to work from anywhere forever', vocab: ['location independence', 'geographical flexibility', 'company cohesion'] },
    { title: 'Electric vs Gasoline Cars', detail: 'transitioning vehicles to battery electric power', vocab: ['zero emissions', 'charging infrastructure', 'carbon footprint'] },
    { title: 'Standardized Exams Validity', detail: 'whether exam test scores accurately measure real human intelligence', vocab: ['holistic assessment', 'test anxiety', 'measure of capability'] },
    { title: 'Urban vs Rural Living', detail: 'choosing fast-paced city life versus quiet countryside living', vocab: ['hustle and bustle', 'serene lifestyle', 'access to amenities'] },
    { title: 'Fast Fashion Environmental Impact', detail: 'buying cheap trendy clothes versus sustainable long-lasting fashion', vocab: ['sustainable choices', 'throwaway culture', 'eco-friendly'] },
    { title: 'Video Games Benefits', detail: 'whether gaming improves problem-solving or leads to screen addiction', vocab: ['cognitive skills', 'hand-eye coordination', 'moderate play'] },
    { title: 'Single-Use Plastic Bans', detail: 'outlawing disposable plastic straws, bags, and packaging', vocab: ['environmental tax', 'reusable alternatives', 'waste reduction'] },
    { title: 'Workaholism & Success', detail: 'whether working 70 hours a week is required for great career success', vocab: ['hustle culture', 'burnout risk', 'sustainable pace'] },
    { title: 'Social Media Influencer Culture', detail: 'the influence of online creators on teenage purchasing habits', vocab: ['role model', 'sponsored content', 'critical thinking'] },
    { title: 'Digital Privacy vs National Security', detail: 'balancing citizen encryption rights with government security monitoring', vocab: ['data protection', 'surveillance', 'fundamental rights'] },
    { title: 'Space Exploration Funding', detail: 'spending billions exploring Mars versus fixing problems on Earth', vocab: ['scientific discovery', 'resource allocation', 'future exploration'] },
    { title: 'AI Ethics & Regulation', detail: 'enforcing strict laws on artificial intelligence developers', vocab: ['ethical guardrails', 'responsible tech', 'algorithmic bias'] },
    { title: 'Animal Testing Laws', detail: 'banning animal testing for cosmetics and medical products', vocab: ['humane alternatives', 'ethical treatment', 'scientific testing'] },
    { title: 'Universal Basic Income', detail: 'providing a guaranteed monthly income to every citizen', vocab: ['safety net', 'poverty alleviation', 'economic stimulus'] }
  ]
};

const COMBINATORIAL_SITUATIONS = [
  { label: 'Explaining to a Friend', prefix: 'Imagine you are explaining this to a close friend over coffee.' },
  { label: 'Recruiter Interview Question', prefix: 'Imagine answering an unexpected question from a job recruiter.' },
  { label: 'Giving Advice to a Junior', prefix: 'Imagine mentoring someone who is dealing with this situation for the first time.' },
  { label: 'Reflecting in Audio Journal', prefix: 'Imagine recording your private thoughts in an audio journal at night.' },
  { label: 'Debating at a Dinner Party', prefix: 'Imagine sharing your perspective during a lively conversation with friends.' },
  { label: 'Recommending to a Colleague', prefix: 'Imagine recommending your approach to a workplace team member.' },
  { label: 'Sharing a Past Memory', prefix: 'Imagine telling a story from your past during a relaxed family gathering.' },
  { label: 'Explaining Choices to Family', prefix: 'Imagine explaining your personal decisions to your parents or partner.' },
  { label: 'Writing a Public Review', prefix: 'Imagine voicing your honest review to help other people make up their mind.' },
  { label: 'Stepping Out of Comfort Zone', prefix: 'Imagine encouraging someone to take a brave step forward.' },
  { label: 'Long Road Trip Chat', prefix: 'Imagine discussing this topic while on a 5-hour scenic drive.' },
  { label: 'Podcast Guest Appearance', prefix: 'Imagine being interviewed as a guest speaker on an informative podcast episode.' }
];

const COMBINATORIAL_ANGLES = [
  { label: 'Expectation vs Reality', question: 'What was your expectation compared to how things actually turned out?' },
  { label: 'Biggest Lesson Learned', question: 'What single key lesson did you walk away with after this experience?' },
  { label: 'Pros vs Unexpected Cons', question: 'What are the biggest advantages and unexpected disadvantages you noticed?' },
  { label: 'Beginner Mistake to Avoid', question: 'What is one common mistake beginners make, and how can it be avoided?' },
  { label: 'Ideal Best-Case Scenario', question: 'What would the absolute perfect outcome look like in this situation?' },
  { label: 'Sudden Turning Point', question: 'Was there a specific moment or decision that completely changed the outcome?' },
  { label: 'Perspective Shift Over Time', question: 'How has your personal opinion on this topic evolved over the past few years?' },
  { label: '3 Practical Tips for Success', question: 'What 3 concrete tips would you give to anyone handling this right now?' },
  { label: 'Emotional & Psychological Impact', question: 'How does this situation impact a person\'s confidence and peace of mind?' },
  { label: 'Efficiency vs Enjoyment Balance', question: 'How do you strike the right balance between getting results and enjoying the process?' },
  { label: 'Predicting 5-Year Future Trends', question: 'Where do you see this topic evolving over the next five years?' },
  { label: 'Finding the Compromise Solution', question: 'What is the best middle-ground solution when opinions are strongly divided?' }
];

function generateDynamicMatrixTopic(purpose = 'Job Interview & Career', targetLang = 'English') {
  const purposeKey = Object.keys(COMBINATORIAL_SUBJECTS).find(k => 
    purpose.toLowerCase().includes(k.toLowerCase()) || k.toLowerCase().includes(purpose.toLowerCase())
  ) || 'Job Interview & Career';

  const subjects = COMBINATORIAL_SUBJECTS[purposeKey] || COMBINATORIAL_SUBJECTS['Job Interview & Career'];
  
  const selectedSubject = subjects[Math.floor(Math.random() * subjects.length)];
  const selectedSituation = COMBINATORIAL_SITUATIONS[Math.floor(Math.random() * COMBINATORIAL_SITUATIONS.length)];
  const selectedAngle = COMBINATORIAL_ANGLES[Math.floor(Math.random() * COMBINATORIAL_ANGLES.length)];

  const title = `${selectedSubject.title}`;
  const desc = `${selectedSituation.prefix} Describe ${selectedSubject.detail}. ${selectedAngle.question} Speak naturally in ${targetLang}.`;
  const vocab = [...selectedSubject.vocab];

  return {
    title,
    desc,
    vocab
  };
}

// -------------------------------------------------------------
// SECURE GEMINI BACKEND PROXY ENDPOINT
// -------------------------------------------------------------
app.post('/api/gemini', async (req, res) => {
  try {
    const { model = 'gemini-1.5-flash', purpose = 'Job Interview & Career', payload } = req.body;

    if (GEMINI_API_KEY) {
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${GEMINI_API_KEY}`;
      const apiRes = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await apiRes.json();

      if (apiRes.ok) {
        return res.json(data);
      } else {
        console.error(`Gemini API Error (${apiRes.status}) for purpose "${purpose}":`, data);
        return res.status(apiRes.status).json(data);
      }
    } else {
      console.error("CRITICAL: GEMINI_API_KEY is missing in environment variables!");
      return res.status(400).json({
        error: "GEMINI_API_KEY is missing in server environment. Please set process.env.GEMINI_API_KEY."
      });
    }

  } catch (error) {
    console.error('Gemini proxy internal exception:', error);
    return res.status(500).json({ error: 'Gemini proxy request failed: ' + error.message });
  }
});

// -------------------------------------------------------------
// AUTH ENDPOINTS
// -------------------------------------------------------------

// POST /api/auth/register
app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Name, email, and password are required.' });
    }

    const existingUser = await prisma.user.findUnique({
      where: { email: email.toLowerCase().trim() }
    });

    if (existingUser) {
      return res.status(400).json({ error: 'An account with this email already exists.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name: name.trim(),
        email: email.toLowerCase().trim(),
        phone: phone ? phone.trim() : null,
        password: hashedPassword,
        targetLang: 'English',
        streakCount: 0,
        dailyDeadline: '22:00'
      }
    });

    const token = jwt.sign(
      { id: user.id, email: user.email, name: user.name },
      JWT_SECRET,
      { expiresIn: '30d' }
    );

    const { password: _, ...userWithoutPassword } = user;
    return res.json({ token, user: userWithoutPassword });
  } catch (error) {
    console.error('Register error:', error);
    return res.status(500).json({ error: 'Server error during registration.' });
  }
});

// POST /api/auth/login
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required.' });
    }

    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase().trim() }
    });

    if (!user) {
      return res.status(400).json({ error: 'Invalid email or password.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid email or password.' });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, name: user.name },
      JWT_SECRET,
      { expiresIn: '30d' }
    );

    const { password: _, ...userWithoutPassword } = user;
    return res.json({ token, user: userWithoutPassword });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ error: 'Server error during login.' });
  }
});

// -------------------------------------------------------------
// USER PROFILE ENDPOINTS
// -------------------------------------------------------------

// GET /api/user/profile
app.get('/api/user/profile', authenticateToken, async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id }
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    const { password: _, ...userWithoutPassword } = user;
    return res.json(userWithoutPassword);
  } catch (error) {
    console.error('Fetch profile error:', error);
    return res.status(500).json({ error: 'Failed to fetch user profile.' });
  }
});

// PUT /api/user/profile
app.put('/api/user/profile', authenticateToken, async (req, res) => {
  try {
    const { name, phone, targetLang, dailyDeadline, streakCount, lastCompletedDate } = req.body;

    const updateData = {};
    if (name !== undefined) updateData.name = name;
    if (phone !== undefined) updateData.phone = phone;
    if (targetLang !== undefined) updateData.targetLang = targetLang;
    if (dailyDeadline !== undefined) updateData.dailyDeadline = dailyDeadline;
    if (streakCount !== undefined) updateData.streakCount = streakCount;
    if (lastCompletedDate !== undefined) updateData.lastCompletedDate = lastCompletedDate;

    const updatedUser = await prisma.user.update({
      where: { id: req.user.id },
      data: updateData
    });

    const { password: _, ...userWithoutPassword } = updatedUser;
    return res.json(userWithoutPassword);
  } catch (error) {
    console.error('Update profile error:', error);
    return res.status(500).json({ error: 'Failed to update user profile.' });
  }
});

// -------------------------------------------------------------
// USER HISTORY ENDPOINTS
// -------------------------------------------------------------

// GET /api/user/history
app.get('/api/user/history', authenticateToken, async (req, res) => {
  try {
    const histories = await prisma.practiceHistory.findMany({
      where: { userId: req.user.id },
      orderBy: { createdAt: 'desc' }
    });

    const formattedHistories = histories.map(h => ({
      ...h,
      goodPoints: JSON.parse(h.goodPoints || '[]'),
      mistakesAndCorrections: JSON.parse(h.mistakesAndCorrections || '[]')
    }));

    return res.json(formattedHistories);
  } catch (error) {
    console.error('Get history error:', error);
    return res.status(500).json({ error: 'Failed to fetch practice history.' });
  }
});

// POST /api/user/history
app.post('/api/user/history', authenticateToken, async (req, res) => {
  try {
    const {
      topicTitle,
      targetLang,
      transcript,
      overallScore,
      estimatedLevel,
      relevanceScore,
      grammarScore,
      vocabScore,
      fluencyScore,
      goodPoints,
      mistakesAndCorrections,
      polishedVersion,
      wordCount
    } = req.body;

    if (!topicTitle || !transcript) {
      return res.status(400).json({ error: 'Topic title and transcript are required.' });
    }

    const historyRecord = await prisma.practiceHistory.create({
      data: {
        userId: req.user.id,
        topicTitle: topicTitle || 'Spontaneous Speech',
        targetLang: targetLang || 'English',
        transcript: transcript || '',
        overallScore: Math.round(overallScore || 85),
        estimatedLevel: estimatedLevel || 'B2 Upper-Intermediate',
        relevanceScore: parseFloat(relevanceScore || 9.0),
        grammarScore: parseFloat(grammarScore || 8.5),
        vocabScore: parseFloat(vocabScore || 8.0),
        fluencyScore: parseFloat(fluencyScore || 9.0),
        goodPoints: JSON.stringify(goodPoints || []),
        mistakesAndCorrections: JSON.stringify(mistakesAndCorrections || []),
        polishedVersion: polishedVersion || transcript,
        wordCount: parseInt(wordCount || 0, 10)
      }
    });

    const todayStr = new Date().toDateString();
    const user = await prisma.user.findUnique({ where: { id: req.user.id } });
    if (user && user.lastCompletedDate !== todayStr) {
      await prisma.user.update({
        where: { id: req.user.id },
        data: {
          streakCount: (user.streakCount || 0) + 1,
          lastCompletedDate: todayStr
        }
      });
    }

    return res.json({
      ...historyRecord,
      goodPoints: JSON.parse(historyRecord.goodPoints),
      mistakesAndCorrections: JSON.parse(historyRecord.mistakesAndCorrections)
    });
  } catch (error) {
    console.error('Save history error:', error);
    return res.status(500).json({ error: 'Failed to save practice history.' });
  }
});

// DELETE /api/user/history
app.delete('/api/user/history', authenticateToken, async (req, res) => {
  try {
    await prisma.practiceHistory.deleteMany({
      where: { userId: req.user.id }
    });

    return res.json({ message: 'Practice history cleared successfully.' });
  } catch (error) {
    console.error('Clear history error:', error);
    return res.status(500).json({ error: 'Failed to clear practice history.' });
  }
});

// Catch-all route to serve the main HTML page
app.get('*', (req, res) => {
  const publicIndex = path.join(__dirname, 'public', 'index.html');
  const rootIndex = path.join(__dirname, 'index.html');
  const agentHtml = path.join(__dirname, 'agent.html');

  const fs = require('fs');
  if (fs.existsSync(publicIndex)) {
    return res.sendFile(publicIndex);
  } else if (fs.existsSync(rootIndex)) {
    return res.sendFile(rootIndex);
  } else if (fs.existsSync(agentHtml)) {
    return res.sendFile(agentHtml);
  } else {
    return res.status(200).send('<h1>SpeakWell Server Running</h1>');
  }
});

// -------------------------------------------------------------
// SERVER LISTEN (Always bind cleanly to 0.0.0.0 for Render)
// -------------------------------------------------------------
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 SpeakWell Server running on port ${PORT}`);
});

module.exports = app;