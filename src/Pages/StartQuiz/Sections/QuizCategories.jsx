import { useEffect, useState } from 'react';
import { useAuthContext } from '@/hooks/useAuthContext';
import { useNavigate } from 'react-router-dom';
import useAxiosSecure from '@/hooks/useAxiosSecure';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Code,
  FlaskConical,
  Globe,
  Calculator,
  Brain,
  FileCode,
  Atom,
  Dna,
  Telescope,
  Leaf,
  Server,
  Coffee,
  Gamepad,
  Apple,
  Smartphone,
  Database,
  Sigma,
  Ruler,
  PieChart,
  SquareFunction,
  Scroll,
  Mountain,
  BookOpen,
  Palette,
  Film,
  Newspaper,
  Utensils,
  Castle,
  Cpu,
  LineChart,
  Network,
  Cog,
  LayoutGrid,
  Shield,
  Cloud,
  Link,
  BarChart,
  Wifi,
  Glasses,
  Target,
  DollarSign,
  TrendingUp,
  ClipboardList,
  Briefcase,
  Scale,
  Users,
  Truck,
} from 'lucide-react';

const categoryTabs = [
  {
    id: 'programming',
    name: 'Programming',
    color: 'bg-sky-600',
    hoverColor: 'hover:bg-sky-500',
    gradient: 'from-sky-600 to-sky-800',
    icon: <Code className="w-5 h-5" />,
  },
  {
    id: 'science',
    name: 'Science',
    color: 'bg-teal-600',
    hoverColor: 'hover:bg-teal-500',
    gradient: 'from-teal-600 to-teal-800',
    icon: <FlaskConical className="w-5 h-5" />,
  },
  {
    id: 'languages',
    name: 'Languages',
    color: 'bg-violet-600',
    hoverColor: 'hover:bg-violet-500',
    gradient: 'from-violet-600 to-violet-800',
    icon: <Globe className="w-5 h-5" />,
  },
  {
    id: 'math',
    name: 'Mathematics',
    color: 'bg-amber-600',
    hoverColor: 'hover:bg-amber-500',
    gradient: 'from-amber-600 to-amber-800',
    icon: <Calculator className="w-5 h-5" />,
  },
  {
    id: 'technology',
    name: 'Technology',
    color: 'bg-fuchsia-600',
    hoverColor: 'hover:bg-fuchsia-500',
    gradient: 'from-fuchsia-600 to-fuchsia-800',
    icon: <Cpu className="w-5 h-5" />,
  },
  {
    id: 'business',
    name: 'Business & Finance',
    color: 'bg-green-600',
    hoverColor: 'hover:bg-green-500',
    gradient: 'from-green-600 to-green-800',
    icon: <LineChart className="w-5 h-5" />,
  },
  {
    id: 'general',
    name: 'General Knowledge',
    color: 'bg-rose-500',
    hoverColor: 'hover:bg-rose-400',
    gradient: 'from-rose-400 to-rose-600',
    icon: <Brain className="w-5 h-5" />,
  },
];

// Subject definitions (unchanged)
const subjects = {
  programming: [
    {
      title: 'JavaScript',
      link: 'javascript',
      description:
        'Test your knowledge of JavaScript fundamentals and concepts.',
      icon: <FileCode className="w-5 h-5" />,
      type: 'Web Development',
    },
    {
      title: 'React',
      link: 'react',
      description:
        'Learn and test your React skills with components, hooks, and more.',
      icon: <Atom className="w-5 h-5" />,
      type: 'Web Development',
    },
    {
      title: 'HTML',
      link: 'html',
      description: 'Test your knowledge of HTML basics and advanced concepts.',
      icon: <Globe className="w-5 h-5" />,
      type: 'Web Development',
    },
    {
      title: 'CSS',
      link: 'css',
      description: 'Challenge yourself with CSS styling and layout concepts.',
      icon: <Palette className="w-5 h-5" />,
      type: 'Web Development',
    },
    {
      title: 'Python',
      link: 'python',
      description:
        'Dive into Python programming with fun and interactive quizzes.',
      icon: <Code className="w-5 h-5" />,
      type: 'Backend Development',
    },
    {
      title: 'Node.js',
      link: 'node-js',
      description:
        'Test your Node.js skills with backend server programming concepts.',
      icon: <Server className="w-5 h-5" />,
      type: 'Backend Development',
    },
    {
      title: 'Java',
      link: 'java',
      description:
        'Assess your Java skills with object-oriented programming questions.',
      icon: <Coffee className="w-5 h-5" />,
      type: 'Backend Development',
    },
    {
      title: 'C#',
      link: 'c-sharp',
      description:
        'Test your C# skills, from .NET development to game programming.',
      icon: <Gamepad className="w-5 h-5" />,
      type: 'Backend Development',
    },
    {
      title: 'Swift',
      link: 'swift',
      description:
        'Challenge yourself with Swift programming for iOS development.',
      icon: <Apple className="w-5 h-5" />,
      type: 'Mobile Development',
    },
    {
      title: 'Kotlin',
      link: 'kotlin',
      description:
        'Evaluate your Kotlin expertise for Android and backend development.',
      icon: <Smartphone className="w-5 h-5" />,
      type: 'Mobile Development',
    },
    {
      title: 'C++',
      link: 'c-plus-plus',
      description:
        'Challenge yourself with C++ questions covering algorithms & logic.',
      icon: <Code className="w-5 h-5" />,
      type: 'General Programming',
    },
    {
      title: 'SQL',
      link: 'sql',
      description: 'Enhance your database management skills with SQL quizzes.',
      icon: <Database className="w-5 h-5" />,
      type: 'Database Management',
    },
    {
      title: 'TypeScript',
      link: 'typescript',
      description:
        "Test your knowledge of TypeScript's static typing and features.",
      icon: <FileCode className="w-5 h-5" />,
      type: 'Web Development',
    },
    {
      title: 'GraphQL',
      link: 'graphql',
      description:
        'Challenge yourself with modern API query language concepts.',
      icon: <Network className="w-5 h-5" />,
      type: 'Web Development',
    },
    {
      title: 'Rust',
      link: 'rust',
      description:
        'Test your skills with this performance-focused systems language.',
      icon: <Cog className="w-5 h-5" />,
      type: 'Systems Programming',
    },
    {
      title: 'Go',
      link: 'golang',
      description:
        "Evaluate your knowledge of Go's concurrency and simplicity.",
      icon: <Code className="w-5 h-5" />,
      type: 'Backend Development',
    },
  ],
  science: [
    {
      title: 'Physics',
      link: 'physics',
      description: 'Test your understanding of physical laws and theories.',
      icon: <Atom className="w-5 h-5" />,
      type: 'Natural Sciences',
    },
    {
      title: 'Chemistry',
      link: 'chemistry',
      description:
        'Challenge yourself with questions about chemical elements and reactions.',
      icon: <FlaskConical className="w-5 h-5" />,
      type: 'Natural Sciences',
    },
    {
      title: 'Biology',
      link: 'biology',
      description: 'Explore the science of living organisms and ecosystems.',
      icon: <Dna className="w-5 h-5" />,
      type: 'Natural Sciences',
    },
    {
      title: 'Astronomy',
      link: 'astronomy',
      description: 'Test your knowledge of stars, planets, and the universe.',
      icon: <Telescope className="w-5 h-5" />,
      type: 'Natural Sciences',
    },
    {
      title: 'Earth Science',
      link: 'earth-science',
      description: 'Learn about geology, atmosphere, and natural phenomena.',
      icon: <Globe className="w-5 h-5" />,
      type: 'Natural Sciences',
    },
    {
      title: 'Environmental Science',
      link: 'environmental-science',
      description:
        'Test your knowledge of environmental issues and sustainability.',
      icon: <Leaf className="w-5 h-5" />,
      type: 'Natural Sciences',
    },
    {
      title: 'Genetics',
      link: 'genetics',
      description:
        'Challenge yourself with heredity and genetic variation concepts.',
      icon: <Dna className="w-5 h-5" />,
      type: 'Natural Sciences',
    },
    {
      title: 'Neuroscience',
      link: 'neuroscience',
      description: 'Test your knowledge of the brain and nervous system.',
      icon: <Brain className="w-5 h-5" />,
      type: 'Natural Sciences',
    },
    {
      title: 'Quantum Physics',
      link: 'quantum-physics',
      description:
        'Explore the fascinating world of quantum mechanics and theory.',
      icon: <Atom className="w-5 h-5" />,
      type: 'Natural Sciences',
    },
  ],
  languages: [
    {
      title: 'English',
      link: 'english',
      description: 'Test your grammar, vocabulary, and reading comprehension.',
      icon: <BookOpen className="w-5 h-5" />,
      type: 'Language Learning',
    },
    {
      title: 'Spanish',
      link: 'spanish',
      description: 'Challenge your Spanish language skills and vocabulary.',
      icon: <Globe className="w-5 h-5" />,
      type: 'Language Learning',
    },
    {
      title: 'French',
      link: 'french',
      description: 'Test your French language proficiency and grammar.',
      icon: <Globe className="w-5 h-5" />,
      type: 'Language Learning',
    },
    {
      title: 'German',
      link: 'german',
      description:
        'Improve your German language skills with interactive quizzes.',
      icon: <Globe className="w-5 h-5" />,
      type: 'Language Learning',
    },
    {
      title: 'Japanese',
      link: 'japanese',
      description:
        'Test your knowledge of Japanese language and writing systems.',
      icon: <Globe className="w-5 h-5" />,
      type: 'Language Learning',
    },
    {
      title: 'Chinese',
      link: 'chinese',
      description:
        'Challenge yourself with Chinese language and character quizzes.',
      icon: <Globe className="w-5 h-5" />,
      type: 'Language Learning',
    },
    {
      title: 'Arabic',
      link: 'arabic',
      description:
        'Test your knowledge of Arabic script and grammar structures.',
      icon: <Globe className="w-5 h-5" />,
      type: 'Language Learning',
    },
    {
      title: 'Russian',
      link: 'russian',
      description: 'Challenge yourself with Russian alphabet and vocabulary.',
      icon: <Globe className="w-5 h-5" />,
      type: 'Language Learning',
    },
    {
      title: 'Portuguese',
      link: 'portuguese',
      description:
        'Develop your Portuguese language skills through interactive quizzes.',
      icon: <Globe className="w-5 h-5" />,
      type: 'Language Learning',
    },
  ],
  math: [
    {
      title: 'Algebra',
      link: 'algebra',
      description: 'Test your algebraic problem-solving skills and equations.',
      icon: <Sigma className="w-5 h-5" />,
      type: 'Mathematics',
    },
    {
      title: 'Geometry',
      link: 'geometry',
      description:
        'Challenge yourself with shapes, angles, and spatial reasoning.',
      icon: <Ruler className="w-5 h-5" />,
      type: 'Mathematics',
    },
    {
      title: 'Calculus',
      link: 'calculus',
      description: 'Test your knowledge of derivatives, integrals, and limits.',
      icon: <SquareFunction className="w-5 h-5" />,
      type: 'Mathematics',
    },
    {
      title: 'Statistics',
      link: 'statistics',
      description:
        'Improve your understanding of data analysis and probability.',
      icon: <PieChart className="w-5 h-5" />,
      type: 'Mathematics',
    },
    {
      title: 'Trigonometry',
      link: 'trigonometry',
      description:
        'Test your knowledge of trigonometric functions and identities.',
      icon: <Calculator className="w-5 h-5" />,
      type: 'Mathematics',
    },
    {
      title: 'Number Theory',
      link: 'number-theory',
      description:
        'Challenge yourself with properties of numbers and mathematical concepts.',
      icon: <Calculator className="w-5 h-5" />,
      type: 'Mathematics',
    },
    {
      title: 'Linear Algebra',
      link: 'linear-algebra',
      description:
        'Test your understanding of vectors, matrices and linear transformations.',
      icon: <LayoutGrid className="w-5 h-5" />,
      type: 'Mathematics',
    },
    {
      title: 'Discrete Mathematics',
      link: 'discrete-math',
      description:
        'Challenge yourself with logic, sets, graphs, and algorithms.',
      icon: <Network className="w-5 h-5" />,
      type: 'Mathematics',
    },
    {
      title: 'Differential Equations',
      link: 'differential-equations',
      description:
        'Test your knowledge of solving various types of differential equations.',
      icon: <SquareFunction className="w-5 h-5" />,
      type: 'Mathematics',
    },
  ],
  technology: [
    {
      title: 'AI & Machine Learning',
      link: 'ai-ml',
      description:
        'Test your knowledge of artificial intelligence concepts and algorithms.',
      icon: <Brain className="w-5 h-5" />,
      type: 'Computing',
    },
    {
      title: 'Cybersecurity',
      link: 'cybersecurity',
      description:
        'Challenge yourself with network security and ethical hacking concepts.',
      icon: <Shield className="w-5 h-5" />,
      type: 'Computing',
    },
    {
      title: 'Cloud Computing',
      link: 'cloud-computing',
      description:
        'Test your understanding of AWS, Azure, and cloud architecture.',
      icon: <Cloud className="w-5 h-5" />,
      type: 'Computing',
    },
    {
      title: 'Blockchain',
      link: 'blockchain',
      description:
        'Explore distributed ledger technology and cryptocurrency concepts.',
      icon: <Link className="w-5 h-5" />,
      type: 'Computing',
    },
    {
      title: 'DevOps',
      link: 'devops',
      description:
        'Challenge yourself with CI/CD, containers, and infrastructure as code.',
      icon: <Cog className="w-5 h-5" />,
      type: 'Computing',
    },
    {
      title: 'Data Science',
      link: 'data-science',
      description:
        'Test your knowledge of data analysis, visualization, and big data.',
      icon: <BarChart className="w-5 h-5" />,
      type: 'Computing',
    },
    {
      title: 'IoT',
      link: 'internet-of-things',
      description:
        'Learn about connected devices, sensors, and smart technology.',
      icon: <Wifi className="w-5 h-5" />,
      type: 'Computing',
    },
    {
      title: 'Computer Networks',
      link: 'computer-networks',
      description:
        'Test your understanding of network protocols and infrastructure.',
      icon: <Network className="w-5 h-5" />,
      type: 'Computing',
    },
    {
      title: 'AR & VR',
      link: 'ar-vr',
      description:
        'Challenge yourself with augmented and virtual reality concepts.',
      icon: <Glasses className="w-5 h-5" />,
      type: 'Computing',
    },
  ],
  business: [
    {
      title: 'Marketing',
      link: 'marketing',
      description:
        'Test your knowledge of digital marketing strategies and concepts.',
      icon: <Target className="w-5 h-5" />,
      type: 'Business',
    },
    {
      title: 'Finance',
      link: 'finance',
      description:
        'Challenge yourself with financial concepts and investment strategies.',
      icon: <DollarSign className="w-5 h-5" />,
      type: 'Business',
    },
    {
      title: 'Accounting',
      link: 'accounting',
      description:
        'Test your understanding of accounting principles and financial statements.',
      icon: <Calculator className="w-5 h-5" />,
      type: 'Business',
    },
    {
      title: 'Economics',
      link: 'economics',
      description: 'Explore micro and macroeconomic theories and concepts.',
      icon: <TrendingUp className="w-5 h-5" />,
      type: 'Business',
    },
    {
      title: 'Project Management',
      link: 'project-management',
      description: 'Test your knowledge of Agile, Scrum, and project planning.',
      icon: <ClipboardList className="w-5 h-5" />,
      type: 'Business',
    },
    {
      title: 'Entrepreneurship',
      link: 'entrepreneurship',
      description:
        'Challenge yourself with startup concepts and business models.',
      icon: <Briefcase className="w-5 h-5" />,
      type: 'Business',
    },
    {
      title: 'Business Law',
      link: 'business-law',
      description:
        'Test your understanding of legal concepts in business contexts.',
      icon: <Scale className="w-5 h-5" />,
      type: 'Business',
    },
    {
      title: 'Human Resources',
      link: 'human-resources',
      description:
        'Learn about talent acquisition, development, and management.',
      icon: <Users className="w-5 h-5" />,
      type: 'Business',
    },
    {
      title: 'Supply Chain Management',
      link: 'supply-chain',
      description:
        'Test your knowledge of logistics and supply chain operations.',
      icon: <Truck className="w-5 h-5" />,
      type: 'Business',
    },
  ],
  general: [
    {
      title: 'History',
      link: 'history',
      description: 'Test your knowledge of world history and important events.',
      icon: <Scroll className="w-5 h-5" />,
      type: 'General Knowledge',
    },
    {
      title: 'Geography',
      link: 'geography',
      description:
        'Challenge yourself with questions about countries, capitals, and landforms.',
      icon: <Mountain className="w-5 h-5" />,
      type: 'General Knowledge',
    },
    {
      title: 'Literature',
      link: 'literature',
      description: 'Test your knowledge of famous authors and literary works.',
      icon: <BookOpen className="w-5 h-5" />,
      type: 'General Knowledge',
    },
    {
      title: 'Art & Music',
      link: 'art-music',
      description:
        'Explore art history, famous artists, composers, and musical theory.',
      icon: <Palette className="w-5 h-5" />,
      type: 'General Knowledge',
    },
    {
      title: 'Pop Culture',
      link: 'pop-culture',
      description: 'Test your knowledge of movies, TV shows, and celebrities.',
      icon: <Film className="w-5 h-5" />,
      type: 'General Knowledge',
    },
    {
      title: 'Current Events',
      link: 'current-events',
      description: 'Stay updated with quizzes on recent news and events.',
      icon: <Newspaper className="w-5 h-5" />,
      type: 'General Knowledge',
    },
    {
      title: 'Philosophy',
      link: 'philosophy',
      description:
        'Challenge yourself with questions about great thinkers and ideas.',
      icon: <BookOpen className="w-5 h-5" />,
      type: 'General Knowledge',
    },
    {
      title: 'Psychology',
      link: 'psychology',
      description:
        'Test your understanding of human behavior and mental processes.',
      icon: <Brain className="w-5 h-5" />,
      type: 'General Knowledge',
    },
    {
      title: 'Mythology',
      link: 'mythology',
      description:
        'Explore ancient myths, legends and folklore from around the world.',
      icon: <Castle className="w-5 h-5" />,
      type: 'General Knowledge',
    },
    {
      title: 'Food & Cuisine',
      link: 'food-cuisine',
      description:
        'Test your knowledge of international dishes, ingredients and cooking.',
      icon: <Utensils className="w-5 h-5" />,
      type: 'General Knowledge',
    },
  ],
};

const generateDifficulty = level => {
  const difficulty =
    level > 8
      ? 'so_hard'
      : level <= 8 && level > 6
      ? 'hard'
      : level <= 6 && level > 4
      ? 'medium'
      : level <= 4 && level > 2
      ? 'easy'
      : 'so_easy';
  return difficulty;
};

const QuizCategories = () => {
  const [activeTab, setActiveTab] = useState('programming');
  const [hoveredCard, setHoveredCard] = useState(null);
  const [userLevel, setUserLevel] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [selectedQuiz, setSelectedQuiz] = useState('');
  const [open, setOpen] = useState(false);
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    axiosSecure
      .get(`/userInfo`)
      .then(res => setUserLevel(res?.data?.level?.level))
      .catch(err => {
        console.error('Error fetching user level:', err);
        setUserLevel(0);
      });
  }, [user]);

  const handleSelectType = (subject, quizzesType) => {
    navigate(
      `/quiz/${subject.link}?difficulty=${generateDifficulty(
        userLevel
      )}&quizzesNumber=10&type=${quizzesType}`
    );
  };

  const handleQuizCardClick = subject => {
    setSelectedQuiz(subject);
    setOpen(true);
  };

  const activeCategory = categoryTabs.find(cat => cat.id === activeTab);

  return (
    <div className="px-4 sm:px-6 lg:px-8 pb-16 max-w-7xl mx-auto">
      {/* Sticky Header with Category Tabs */}
      <div
        className={`sticky top-0 z-10 py-4 backdrop-blur-sm transition-all ${
          isScrolled ? 'bg-gray-900/90 shadow-md' : 'bg-gray-900/50'
        }`}
      >
        <div className="overflow-x-auto no-scrollbar">
          <div className="flex space-x-3 min-w-max">
            {categoryTabs.map(category => (
              <button
                key={category.id}
                onClick={() => setActiveTab(category.id)}
                className={`px-5 py-2.5 rounded-lg text-sm font-medium flex items-center gap-2 transition-all border border-gray-800 backdrop-blur-sm ${
                  activeTab === category.id
                    ? `bg-gradient-to-r ${category.gradient} text-white`
                    : `bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 hover:border-gray-700`
                }`}
              >
                <span
                  className={`${
                    activeTab === category.id ? 'text-white' : 'text-gray-400'
                  } transition-colors`}
                >
                  {category.icon}
                </span>
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Category Header */}
      <div className="mt-8 mb-10">
        <div className="flex items-center gap-3">
          <div
            className={`${activeCategory.color} w-10 h-10 rounded-lg flex items-center justify-center text-white`}
          >
            {activeCategory.icon}
          </div>
          <div>
            <h1 className="text-2xl font-semibold text-white">
              {activeCategory.name}
            </h1>
            <p className="text-gray-400 text-sm">
              Choose a topic to test your knowledge
            </p>
          </div>
        </div>
      </div>

      {/* Quiz Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="bg-gray-900/90 backdrop-blur-sm text-white rounded-lg border border-gray-700 max-w-sm mx-auto">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold text-white">
              Select Quiz Format
            </DialogTitle>
            <DialogDescription className="text-gray-400 text-sm">
              Choose how you want to be challenged
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-1 gap-3 mt-4">
            <button
              onClick={() => {
                handleSelectType(selectedQuiz, 'tf');
                setOpen(false);
              }}
              className={`w-full py-2.5 bg-gradient-to-r ${
                activeCategory.gradient
              } hover:opacity-90 rounded-lg text-white font-medium flex items-center justify-center gap-2 transition-all duration-300 shadow-md shadow-gray-800/20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-${
                activeCategory.color.split('-')[1]
              }-500/50`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              True / False
            </button>
            <button
              onClick={() => {
                handleSelectType(selectedQuiz, 'mc');
                setOpen(false);
              }}
              className="w-full py-2.5 bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 rounded-lg text-white font-medium flex items-center justify-center gap-2 transition-all duration-300 shadow-md shadow-gray-800/20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-purple-500/50"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
              Multiple Choice
            </button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Quiz Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {subjects[activeTab]?.map((subject, index) => (
          <div
            key={index}
            onClick={() => handleQuizCardClick(subject)}
            className="group relative overflow-hidden rounded-xl border border-gray-800 p-6 backdrop-blur-sm hover:border-gray-700 transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/10 cursor-pointer"
            style={{ background: 'rgba(17, 24, 39, 0.7)' }}
            onMouseEnter={() => setHoveredCard(index)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            {/* Type Badge */}
            <div className="absolute top-4 right-4 flex items-center px-2 py-1 rounded-full bg-gray-800 border border-gray-700 text-gray-300 text-xs font-medium">
              {subject.type}
            </div>

            {/* Background Gradient Overlay */}
            <div
              className={`absolute -right-24 -top-24 w-48 h-48 bg-gradient-to-br ${activeCategory.gradient} opacity-20 rounded-full blur-xl transition-all duration-500 group-hover:scale-150 group-hover:opacity-30`}
            ></div>

            {/* Content */}
            <div className="relative z-10">
              <div
                className={`w-10 h-10 bg-gradient-to-br ${activeCategory.gradient} rounded-lg flex items-center justify-center mb-4 shadow-lg shadow-indigo-900/20 group-hover:scale-110 transition-transform duration-300`}
              >
                {subject.icon}
              </div>
              <h2 className="text-lg font-semibold text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-indigo-400 group-hover:to-purple-400 transition-all duration-300">
                {subject.title}
              </h2>
              <p className="text-gray-400 text-sm mb-4 group-hover:text-gray-300 transition-colors duration-300 line-clamp-2">
                {subject.description}
              </p>
              <button
                onClick={e => {
                  e.stopPropagation();
                  localStorage.removeItem(`history_posted`);
                  handleQuizCardClick(subject);
                }}
                className="text-indigo-400 hover:text-indigo-300 text-sm font-medium flex items-center gap-1 transition-colors"
              >
                Start Quiz
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuizCategories;
