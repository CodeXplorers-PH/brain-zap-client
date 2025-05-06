import { useEffect, useState } from 'react';
import {
  FiSend,
  FiLinkedin,
  FiGithub,
  FiBarChart2,
  FiTrendingUp,
  FiCalendar,
  FiAward,
  FiShare2,
  FiPrinter,
  FiEdit3,
} from 'react-icons/fi';
import { IoPieChart } from 'react-icons/io5';
import { RiUserCommunityFill } from 'react-icons/ri';
import { BsBriefcase, BsRobot } from 'react-icons/bs';
import { SparklesText } from '@/components/magicui/sparkles-text';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
      document.title = 'Contact | BrainZap';
    },[])

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call to save message to database
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormData({ name: '', email: '', subject: '', message: '' });

      // Reset success message after 5 seconds
      setTimeout(() => setSubmitSuccess(false), 5000);
    }, 1500);
  };

  const uniqueFeatures = [
    {
      icon: <FiBarChart2 className="w-8 h-8" />,
      title: 'Interest-Based Quizzes',
      description:
        "Generate personalized quizzes on topics you're passionate about to enhance your learning experience and knowledge retention.",
    },
    {
      icon: <FiTrendingUp className="w-8 h-8" />,
      title: 'Competitive Leaderboards',
      description:
        'Compete globally and see your rank among other learners. Challenge yourself to climb the rankings and earn recognition.',
    },
    {
      icon: <FiCalendar className="w-8 h-8" />,
      title: 'Daily Learning Streaks',
      description:
        'Build consistent learning habits with daily streak rewards. Stay motivated and track your progress over time.',
    },
    {
      icon: <FiAward className="w-8 h-8" />,
      title: 'Achievement System',
      description:
        'Earn badges and unlock rewards as you progress through various learning milestones and challenges.',
    },
    {
      icon: <BsRobot className="w-8 h-8" />,
      title: 'AI-Powered Feedback',
      description:
        'Get personalized insights on your performance with our advanced AI that analyzes your answers and provides tailored recommendations.',
    },
    {
      icon: <RiUserCommunityFill className="w-8 h-8" />,
      title: 'Learning Community',
      description:
        'Share your insights through our interactive blog section and connect with other learners who share your interests.',
    },
    {
      icon: <FiPrinter className="w-8 h-8" />,
      title: 'Printable Results',
      description:
        'Save your quiz results for later study and reference. Export your progress reports to track improvements over time.',
    },
    {
      icon: <FiShare2 className="w-8 h-8" />,
      title: 'Social Sharing',
      description:
        'Share your achievements across social media platforms and inspire others to join your learning journey.',
    },
    {
      icon: <IoPieChart className="w-8 h-8" />,
      title: 'Knowledge Analytics',
      description:
        'Track your learning progress with detailed analytics that identify strengths and areas for improvement across different subject areas.',
    },
  ];

  const teamMembers = [
    {
      name: 'AJM Fajlay Rabby',
      role: 'Frontend Lead & Product Visionary',
      bio: 'A product-focused frontend lead turning vision into experience and ideas into interface.',
      image: 'https://avatars.githubusercontent.com/u/55575386?v=4',
      links: {
        linkedin: 'https://www.linkedin.com/in/ornobaadi/',
        github: 'https://github.com/ornobaadi',
        portfolio: 'https://ornobaadi-1.web.app/',
      },
    },
    {
      name: 'Md. Atef Abrar Bhuyian',
      role: 'Technical Lead & Fullstack Solutions Architect',
      bio: 'A fullstack architect bridging frontend and backend with robust, scalable solutions.',
      image: 'https://avatars.githubusercontent.com/u/122459257?v=4',
      links: {
        linkedin: 'https://www.linkedin.com/in/atef-abrar-bhuyian/',
        github: 'https://github.com/Atef-Abrar-Bhuyian',
        portfolio: 'https://atef-abrar-bhuyian.netlify.app/',
      },
    },
    {
      name: 'Shahid Hasan Rumon',
      role: 'Backend Architect & API Integrations Expert',
      bio: 'A backend maestro specializing in API integrations and scalable system design.',
      image: 'https://avatars.githubusercontent.com/u/142591239?v=4',
      links: {
        linkedin: 'https://www.linkedin.com/in/shrumon/',
        github: 'https://github.com/rumon3-1416',
        portfolio: 'https://shahidhasanrumon.netlify.app/',
      },
    },
    {
      name: 'Prapoo Rozario',
      role: 'Performance Engineer & Security Specialist',
      bio: 'A performance-driven engineer refining system speed and enhancing security protocols.',
      image: 'https://avatars.githubusercontent.com/u/174159523?v=4',
      links: {
        linkedin: 'https://www.linkedin.com/in/Prapoo/',
        github: 'https://github.com/PrapooRozario',
        portfolio: 'https://prapoo-rozario.vercel.app/',
      },
    },
    {
      name: 'Md Ahbabuzzaman',
      role: 'Gamification & User Engagement Engineer',
      bio: 'A gamification expert crafting features that boost user engagement and retention.',
      image: 'https://avatars.githubusercontent.com/u/160356472?v=4',
      links: {
        linkedin: 'https://www.linkedin.com/in/zaman-ahbab/',
        github: 'https://github.com/ahbab-zaman',
        portfolio: 'https://ahbab-portfolio.vercel.app/',
      },
    },
  ];

  return (
    <>
      <div className="relative overflow-hidden bg-gray-950 min-h-screen">
        {/* Content Section */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-40 pb-20">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-5xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 text-center mb-4">
              About Us
            </h2>
            <p className="text-xl text-gray-400 text-center">
              We're on a mission to revolutionize learning through AI-powered
              quizzes
            </p>
          </div>

          {/* Team Section */}
          <div className="mb-24">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
                Meet the Team
              </span>
            </h2>

            <div className="flex flex-wrap justify-center gap-8">
              {teamMembers.map((member, index) => (
                <div
                  key={index}
                  className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-6 hover:bg-gray-800/70 transition duration-300 w-full max-w-sm flex-grow"
                  style={{
                    flexBasis: 'calc(33.333% - 1.5rem)',
                    minWidth: '280px',
                  }}
                >
                  <div className="flex flex-col items-center text-center">
                    <div className="w-28 h-28 rounded-full overflow-hidden mb-4 border-2 border-purple-500/50 p-1">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="rounded-full w-full h-full object-cover"
                        onError={e => {
                          e.target.onerror = null;
                          e.target.src = '/api/placeholder/100/100';
                        }}
                      />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-1">
                      {member.name}
                    </h3>
                    <p className="text-purple-400 text-sm mb-3">
                      {member.role}
                    </p>
                    <p className="text-gray-400 text-sm mb-4">{member.bio}</p>

                    <div className="flex space-x-4 mt-2">
                      <a
                        href={member.links.linkedin}
                        className="text-gray-400 hover:text-purple-400"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FiLinkedin className="w-5 h-5" />
                      </a>
                      <a
                        href={member.links.github}
                        className="text-gray-400 hover:text-purple-400"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FiGithub className="w-5 h-5" />
                      </a>
                      <a
                        href={member.links.portfolio}
                        className="text-gray-400 hover:text-purple-400"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <BsBriefcase className="w-5 h-5" />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* What Makes BrainZap Special Section */}
          <div className="mb-20">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-10 text-center">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                What Makes BrainZap Special
              </span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {uniqueFeatures.map((feature, index) => (
                <div
                  key={index}
                  className="bg-gray-800/40 backdrop-blur-sm border border-gray-700/30 rounded-lg p-5 hover:bg-gray-800/60 transition-all duration-300 hover:border-purple-500/20 group flex flex-col"
                >
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="text-purple-400 bg-gray-700/30 p-2 rounded-md group-hover:bg-purple-500/10 transition-all duration-300">
                      {feature.icon}
                    </div>
                    <h3 className="font-medium text-white text-lg">
                      {feature.title}
                    </h3>
                  </div>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {feature.description.split(' ').slice(0, 12).join(' ') +
                      (feature.description.split(' ').length > 12 ? '...' : '')}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Form Section */}
          <div>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                <SparklesText
                  text="Get in Touch"
                  className="text-white inline-block"
                />
              </h2>
              <p className="text-md text-gray-400 max-w-2xl mx-auto">
                Have questions, feedback, or just want to say hello? We'd love
                to hear from you!
              </p>
            </div>

            <div className="max-w-3xl mx-auto">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-300 mb-1"
                    >
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-gray-800/70 border border-gray-700/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/50 text-white transition-all duration-300"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-300 mb-1"
                    >
                      Your Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-gray-800/70 border border-gray-700/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/50 text-white transition-all duration-300"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium text-gray-300 mb-1"
                  >
                    Type
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-gray-800/70 border border-gray-700/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/50 text-white transition-all duration-300"
                  >
                    <option value="feedback">Feedback</option>
                    <option value="feature">Feature Request</option>
                    <option value="bug">Bug Report</option>
                    <option value="question">General Question</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-300 mb-1"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="6"
                    className="w-full px-4 py-3 bg-gray-800/70 border border-gray-700/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/50 text-white transition-all duration-300"
                    placeholder={
                      formData.subject === 'feature'
                        ? 'Describe your feature idea...'
                        : formData.subject === 'bug'
                        ? 'Please describe the issue in detail...'
                        : 'Your message here...'
                    }
                  ></textarea>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full px-6 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg shadow-purple-500/20 hover:shadow-xl hover:shadow-purple-500/30 ${
                      isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <span>Submitting...</span>
                        <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                      </>
                    ) : (
                      <>
                        <span>
                          Submit{' '}
                          {formData.subject === 'feature'
                            ? 'Request'
                            : formData.subject === 'bug'
                            ? 'Report'
                            : 'Feedback'}
                        </span>
                        <FiSend className="w-5 h-5" />
                      </>
                    )}
                  </button>
                </div>

                {submitSuccess && (
                  <div className="text-center py-3 px-4 bg-green-500/20 border border-green-500/50 rounded-lg text-green-300 mt-4">
                    Thank you! Your {formData.subject} has been received and
                    will be reviewed by our team.
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
