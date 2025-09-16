import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Github, Eye } from "lucide-react";

interface PortfolioSectionProps {
  isDark: boolean;
  onProjectClick: (project: Project) => void;
}

export interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  fullDescription: string;
  image: string;
  images: string[];
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
  features: string[];
  challenges: string[];
  results: string[];
}

const projects: Project[] = [
  {
    id: 1,
    title: "E-Commerce Platform",
    category: "Web Development",
    description:
      "A fully-featured e-commerce platform with payment integration, inventory management, and analytics dashboard.",
    fullDescription:
      "This comprehensive e-commerce platform was built to handle high-traffic retail operations with advanced features including real-time inventory management, multi-payment gateway integration, and sophisticated analytics. The platform supports multiple vendors, advanced search capabilities, and mobile-responsive design.",
    image:
      "https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=800",
    images: [
      "https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=800",
    ],
    technologies: ["React", "Node.js", "MongoDB", "Stripe", "Redis", "AWS"],
    liveUrl: "#",
    githubUrl: "#",
    features: [
      "Multi-vendor support",
      "Real-time inventory",
      "Payment gateway integration",
      "Advanced analytics",
      "Mobile responsive",
    ],
    challenges: [
      "High traffic handling",
      "Real-time synchronization",
      "Payment security",
      "Scalable architecture",
    ],
    results: [
      "300% increase in sales",
      "99.9% uptime",
      "50% faster load times",
      "Reduced cart abandonment by 40%",
    ],
  },
  {
    id: 2,
    title: "AI Chat Assistant",
    category: "AI & Machine Learning",
    description:
      "An intelligent chatbot powered by natural language processing for customer service automation.",
    fullDescription:
      "Advanced AI-powered chatbot that uses natural language processing and machine learning to provide intelligent customer service. The system can handle complex queries, learn from interactions, and integrate with existing CRM systems.",
    image:
      "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800",
    images: [
      "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/3861943/pexels-photo-3861943.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/8386434/pexels-photo-8386434.jpeg?auto=compress&cs=tinysrgb&w=800",
    ],
    technologies: ["Python", "TensorFlow", "FastAPI", "React", "NLP", "Docker"],
    liveUrl: "#",
    githubUrl: "#",
    features: [
      "Natural language understanding",
      "Multi-language support",
      "CRM integration",
      "Learning capabilities",
      "Analytics dashboard",
    ],
    challenges: [
      "Context understanding",
      "Multi-language processing",
      "Real-time responses",
      "Continuous learning",
    ],
    results: [
      "80% reduction in support tickets",
      "24/7 availability",
      "95% customer satisfaction",
      "60% faster response times",
    ],
  },
  {
    id: 3,
    title: "Mobile Banking App",
    category: "Mobile Development",
    description:
      "Secure mobile banking application with biometric authentication and real-time transactions.",
    fullDescription:
      "A comprehensive mobile banking solution featuring advanced security measures, biometric authentication, and real-time transaction processing. The app provides a seamless banking experience with features like bill payments, money transfers, and investment tracking.",
    image:
      "https://images.pexels.com/photos/4386431/pexels-photo-4386431.jpeg?auto=compress&cs=tinysrgb&w=800",
    images: [
      "https://images.pexels.com/photos/4386431/pexels-photo-4386431.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/4386370/pexels-photo-4386370.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/4386433/pexels-photo-4386433.jpeg?auto=compress&cs=tinysrgb&w=800",
    ],
    technologies: [
      "React Native",
      "Firebase",
      "Node.js",
      "PostgreSQL",
      "Biometric APIs",
      "Encryption",
    ],
    liveUrl: "#",
    githubUrl: "#",
    features: [
      "Biometric authentication",
      "Real-time transactions",
      "Bill payments",
      "Investment tracking",
      "Secure messaging",
    ],
    challenges: [
      "Security compliance",
      "Real-time processing",
      "Cross-platform compatibility",
      "Offline functionality",
    ],
    results: [
      "1M+ downloads",
      "99.99% security rating",
      "4.8/5 app store rating",
      "50% increase in digital transactions",
    ],
  },
  {
    id: 4,
    title: "Cloud Infrastructure",
    category: "Cloud Architecture",
    description:
      "Scalable cloud infrastructure setup with automated deployment and monitoring systems.",
    fullDescription:
      "Enterprise-grade cloud infrastructure solution designed for high availability and scalability. Features automated deployment pipelines, comprehensive monitoring, and disaster recovery capabilities across multiple cloud providers.",
    image:
      "https://images.pexels.com/photos/4164418/pexels-photo-4164418.jpeg?auto=compress&cs=tinysrgb&w=800",
    images: [
      "https://images.pexels.com/photos/4164418/pexels-photo-4164418.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/325229/pexels-photo-325229.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/2881232/pexels-photo-2881232.jpeg?auto=compress&cs=tinysrgb&w=800",
    ],
    technologies: [
      "AWS",
      "Kubernetes",
      "Docker",
      "Terraform",
      "Prometheus",
      "Grafana",
    ],
    liveUrl: "#",
    githubUrl: "#",
    features: [
      "Auto-scaling",
      "Load balancing",
      "Monitoring & alerts",
      "Disaster recovery",
      "Multi-cloud support",
    ],
    challenges: [
      "High availability",
      "Cost optimization",
      "Security compliance",
      "Performance monitoring",
    ],
    results: [
      "99.99% uptime",
      "40% cost reduction",
      "Zero downtime deployments",
      "Improved scalability by 500%",
    ],
  },
  {
    id: 5,
    title: "Data Analytics Dashboard",
    category: "Web Development",
    description:
      "Comprehensive analytics dashboard with real-time data visualization and reporting features.",
    fullDescription:
      "Advanced data analytics platform that processes large datasets and provides real-time insights through interactive visualizations. Features custom reporting, predictive analytics, and integration with multiple data sources.",
    image:
      "https://images.pexels.com/photos/590020/pexels-photo-590020.jpeg?auto=compress&cs=tinysrgb&w=800",
    images: [
      "https://images.pexels.com/photos/590020/pexels-photo-590020.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/669610/pexels-photo-669610.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=800",
    ],
    technologies: [
      "Vue.js",
      "D3.js",
      "Python",
      "PostgreSQL",
      "Apache Kafka",
      "Elasticsearch",
    ],
    liveUrl: "#",
    githubUrl: "#",
    features: [
      "Real-time data processing",
      "Interactive visualizations",
      "Custom reports",
      "Predictive analytics",
      "Multi-source integration",
    ],
    challenges: [
      "Big data processing",
      "Real-time updates",
      "Performance optimization",
      "Data accuracy",
    ],
    results: [
      "Processing 1TB+ daily",
      "Sub-second query responses",
      "90% faster reporting",
      "Improved decision making by 60%",
    ],
  },
  {
    id: 6,
    title: "IoT Monitoring System",
    category: "AI & Machine Learning",
    description:
      "IoT device monitoring system with predictive maintenance and anomaly detection capabilities.",
    fullDescription:
      "Comprehensive IoT monitoring solution that tracks thousands of connected devices, predicts maintenance needs, and detects anomalies in real-time. Uses machine learning algorithms to optimize device performance and prevent failures.",
    image:
      "https://images.pexels.com/photos/159304/network-cable-ethernet-computer-159304.jpeg?auto=compress&cs=tinysrgb&w=800",
    images: [
      "https://images.pexels.com/photos/159304/network-cable-ethernet-computer-159304.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/442150/pexels-photo-442150.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/325229/pexels-photo-325229.jpeg?auto=compress&cs=tinysrgb&w=800",
    ],
    technologies: [
      "IoT",
      "Python",
      "Machine Learning",
      "React",
      "MQTT",
      "InfluxDB",
    ],
    liveUrl: "#",
    githubUrl: "#",
    features: [
      "Device monitoring",
      "Predictive maintenance",
      "Anomaly detection",
      "Real-time alerts",
      "Performance optimization",
    ],
    challenges: [
      "Scalable architecture",
      "Real-time processing",
      "Predictive accuracy",
      "Device compatibility",
    ],
    results: [
      "10,000+ devices monitored",
      "70% reduction in downtime",
      "85% prediction accuracy",
      "30% maintenance cost savings",
    ],
  },
  {
    id: 7,
    title: "Social Media Platform",
    category: "Web Development",
    description:
      "Modern social media platform with real-time messaging and content sharing capabilities.",
    fullDescription:
      "A comprehensive social media platform built for modern users with features including real-time messaging, content sharing, live streaming, and advanced privacy controls. Designed to handle millions of users with high performance and security.",
    image:
      "https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg?auto=compress&cs=tinysrgb&w=800",
    images: [
      "https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/1591062/pexels-photo-1591062.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/1591061/pexels-photo-1591061.jpeg?auto=compress&cs=tinysrgb&w=800",
    ],
    technologies: [
      "React",
      "Node.js",
      "Socket.io",
      "MongoDB",
      "Redis",
      "AWS S3",
    ],
    liveUrl: "#",
    githubUrl: "#",
    features: [
      "Real-time messaging",
      "Content sharing",
      "Live streaming",
      "Privacy controls",
      "Mobile responsive",
    ],
    challenges: [
      "Real-time scalability",
      "Content moderation",
      "Privacy compliance",
      "Performance optimization",
    ],
    results: [
      "2M+ active users",
      "99.9% uptime",
      "Sub-second message delivery",
      "High user engagement",
    ],
  },
  {
    id: 8,
    title: "Healthcare Management System",
    category: "Web Development",
    description:
      "Comprehensive healthcare management system for hospitals and clinics with patient records and scheduling.",
    fullDescription:
      "Advanced healthcare management platform designed for hospitals and clinics to manage patient records, appointments, billing, and medical history. Features HIPAA compliance, telemedicine integration, and comprehensive reporting.",
    image:
      "https://images.pexels.com/photos/40568/medical-appointment-doctor-healthcare-40568.jpeg?auto=compress&cs=tinysrgb&w=800",
    images: [
      "https://images.pexels.com/photos/40568/medical-appointment-doctor-healthcare-40568.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/263402/pexels-photo-263402.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/356040/pexels-photo-356040.jpeg?auto=compress&cs=tinysrgb&w=800",
    ],
    technologies: [
      "React",
      "Node.js",
      "PostgreSQL",
      "HIPAA Compliance",
      "WebRTC",
      "PDF Generation",
    ],
    liveUrl: "#",
    githubUrl: "#",
    features: [
      "Patient records",
      "Appointment scheduling",
      "Telemedicine",
      "Billing system",
      "Medical reports",
    ],
    challenges: [
      "HIPAA compliance",
      "Data security",
      "Integration complexity",
      "User experience",
    ],
    results: [
      "500+ healthcare providers",
      "HIPAA certified",
      "40% efficiency improvement",
      "99.99% data security",
    ],
  },
  {
    id: 9,
    title: "Cryptocurrency Trading Bot",
    category: "AI & Machine Learning",
    description:
      "Automated cryptocurrency trading bot with machine learning algorithms for market analysis.",
    fullDescription:
      "Sophisticated cryptocurrency trading bot that uses machine learning algorithms to analyze market trends, execute trades automatically, and manage risk. Features real-time market data processing, portfolio management, and advanced trading strategies.",
    image:
      "https://images.pexels.com/photos/730547/pexels-photo-730547.jpeg?auto=compress&cs=tinysrgb&w=800",
    images: [
      "https://images.pexels.com/photos/730547/pexels-photo-730547.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/844124/pexels-photo-844124.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/315788/pexels-photo-315788.jpeg?auto=compress&cs=tinysrgb&w=800",
    ],
    technologies: [
      "Python",
      "Machine Learning",
      "APIs",
      "WebSocket",
      "PostgreSQL",
      "Docker",
    ],
    liveUrl: "#",
    githubUrl: "#",
    features: [
      "Automated trading",
      "Market analysis",
      "Risk management",
      "Portfolio tracking",
      "Real-time alerts",
    ],
    challenges: [
      "Market volatility",
      "Real-time processing",
      "Risk management",
      "API reliability",
    ],
    results: [
      "25% average returns",
      "24/7 trading",
      "Risk-adjusted performance",
      "Automated portfolio management",
    ],
  },
  {
    id: 10,
    title: "Learning Management System",
    category: "Web Development",
    description:
      "Comprehensive LMS platform for online education with interactive courses and progress tracking.",
    fullDescription:
      "Full-featured learning management system designed for educational institutions and corporate training. Features interactive course creation, student progress tracking, assessment tools, and comprehensive analytics for educators.",
    image:
      "https://images.pexels.com/photos/301926/pexels-photo-301926.jpeg?auto=compress&cs=tinysrgb&w=800",
    images: [
      "https://images.pexels.com/photos/301926/pexels-photo-301926.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/159844/cellular-education-classroom-159844.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/256541/pexels-photo-256541.jpeg?auto=compress&cs=tinysrgb&w=800",
    ],
    technologies: [
      "React",
      "Node.js",
      "MongoDB",
      "WebRTC",
      "AWS",
      "Video Processing",
    ],
    liveUrl: "#",
    githubUrl: "#",
    features: [
      "Course creation",
      "Progress tracking",
      "Video streaming",
      "Assessments",
      "Analytics dashboard",
    ],
    challenges: [
      "Video streaming",
      "Scalable architecture",
      "User engagement",
      "Content management",
    ],
    results: [
      "100K+ students",
      "95% completion rate",
      "Improved learning outcomes",
      "Global accessibility",
    ],
  },
  {
    id: 11,
    title: "Smart Home Automation",
    category: "IoT",
    description:
      "Intelligent home automation system with voice control and energy optimization.",
    fullDescription:
      "Advanced smart home automation platform that integrates various IoT devices, provides voice control capabilities, and optimizes energy consumption. Features machine learning for predictive automation and comprehensive security monitoring.",
    image:
      "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800",
    images: [
      "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/1571453/pexels-photo-1571453.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/1571452/pexels-photo-1571452.jpeg?auto=compress&cs=tinysrgb&w=800",
    ],
    technologies: [
      "IoT",
      "React Native",
      "Python",
      "Machine Learning",
      "Voice Recognition",
      "MQTT",
    ],
    liveUrl: "#",
    githubUrl: "#",
    features: [
      "Voice control",
      "Energy optimization",
      "Security monitoring",
      "Device integration",
      "Predictive automation",
    ],
    challenges: [
      "Device compatibility",
      "Voice recognition",
      "Energy optimization",
      "Security protocols",
    ],
    results: [
      "30% energy savings",
      "Seamless device integration",
      "Enhanced security",
      "Improved convenience",
    ],
  },
  {
    id: 12,
    title: "Blockchain Supply Chain",
    category: "Blockchain",
    description:
      "Blockchain-based supply chain tracking system for transparency and authenticity verification.",
    fullDescription:
      "Revolutionary blockchain-powered supply chain management system that provides complete transparency and traceability from manufacturer to consumer. Features smart contracts, authenticity verification, and real-time tracking capabilities.",
    image:
      "https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=800",
    images: [
      "https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/1181472/pexels-photo-1181472.jpeg?auto=compress&cs=tinysrgb&w=800",
    ],
    technologies: [
      "Blockchain",
      "Smart Contracts",
      "React",
      "Node.js",
      "Ethereum",
      "IPFS",
    ],
    liveUrl: "#",
    githubUrl: "#",
    features: [
      "Product tracking",
      "Authenticity verification",
      "Smart contracts",
      "Transparency",
      "Immutable records",
    ],
    challenges: [
      "Blockchain scalability",
      "Integration complexity",
      "Cost optimization",
      "User adoption",
    ],
    results: [
      "100% traceability",
      "Reduced counterfeiting",
      "Improved trust",
      "Supply chain efficiency",
    ],
  },
];

const categories = [
  "الكل",
  "تطوير المواقع",
  "تطوير التطبيقات",
  "الذكاء الاصطناعي",
  "الحوسبة السحابية",
  "إنترنت الأشياء",
  "البلوك تشين",
];

const categoryMapping: { [key: string]: string } = {
  الكل: "All",
  "تطوير المواقع": "Web Development",
  "تطوير التطبيقات": "Mobile Development",
  "الذكاء الاصطناعي": "AI & Machine Learning",
  "الحوسبة السحابية": "Cloud Architecture",
  "إنترنت الأشياء": "IoT",
  "البلوك تشين": "Blockchain",
};

const PROJECTS_PER_PAGE = 6;

const PortfolioSection: React.FC<PortfolioSectionProps> = ({
  isDark,
  onProjectClick,
}) => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const [visibleProjects, setVisibleProjects] = useState(PROJECTS_PER_PAGE);

  const filteredProjects =
    selectedCategory === "All"
      ? projects
      : projects.filter(
          (project) => project.category === categoryMapping[selectedCategory]
        );

  const displayedProjects = filteredProjects.slice(0, visibleProjects);
  const hasMoreProjects = visibleProjects < filteredProjects.length;

  const handleViewMore = () => {
    setVisibleProjects((prev) => prev + PROJECTS_PER_PAGE);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setVisibleProjects(PROJECTS_PER_PAGE); // Reset to initial count when category changes
  };

  return (
    <section
      id="work"
      className={`py-20 ${isDark ? "bg-gray-900" : "bg-white"}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.h2
            className={`text-4xl md:text-5xl font-bold mb-6 ${
              isDark ? "text-white" : "text-gray-900"
            }`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            viewport={{ once: true }}
          >
            <span className="text-purple-600 me-3">أعمالنا</span>
          </motion.h2>

          <motion.p
            className={`text-lg max-w-3xl mx-auto ${
              isDark ? "text-gray-300" : "text-gray-600"
            }`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            viewport={{ once: true }}
          >
            اكتشف محفظة مشاريعنا الناجحة التي تعرض خبرتنا والتزامنا بتقديم حلول
            برمجية استثنائية.
          </motion.p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          className="flex flex-wrap justify-center gap-4 mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          {categories.map((category) => (
            <motion.button
              key={category}
              onClick={() => handleCategoryChange(category)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                selectedCategory === category
                  ? "bg-purple-600 text-white shadow-lg"
                  : isDark
                  ? "bg-gray-800 text-gray-300 hover:bg-gray-700"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8" layout>
          <AnimatePresence>
            {displayedProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`group relative rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 cursor-pointer ${
                  isDark ? "bg-gray-800" : "bg-white"
                }`}
                onMouseEnter={() => setHoveredProject(project.id)}
                onMouseLeave={() => setHoveredProject(null)}
                whileHover={{ y: -10 }}
                onClick={() => onProjectClick(project)}
              >
                {/* Image */}
                <div className="relative h-64 overflow-hidden">
                  <motion.img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    whileHover={{ scale: 1.1 }}
                  />

                  {/* Overlay */}
                  <motion.div
                    className="absolute inset-0 bg-purple-900/80 flex items-center justify-center"
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: hoveredProject === project.id ? 1 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex space-x-4">
                      {project.liveUrl && (
                        <motion.a
                          href={project.liveUrl}
                          onClick={(e) => e.stopPropagation()}
                          className="p-3 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-all duration-200"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <ExternalLink className="w-6 h-6" />
                        </motion.a>
                      )}
                      {project.githubUrl && (
                        <motion.a
                          href={project.githubUrl}
                          onClick={(e) => e.stopPropagation()}
                          className="p-3 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-all duration-200"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Github className="w-6 h-6" />
                        </motion.a>
                      )}
                      <motion.button
                        className="p-3 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-all duration-200"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Eye className="w-6 h-6" />
                      </motion.button>
                    </div>
                  </motion.div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <motion.div
                    className="text-sm text-purple-600 font-medium mb-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.1 + 0.2 }}
                  >
                    {project.category}
                  </motion.div>

                  <motion.h3
                    className={`text-xl font-bold mb-3 ${
                      isDark ? "text-white" : "text-gray-900"
                    }`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 + 0.3 }}
                  >
                    {project.title}
                  </motion.h3>

                  <motion.p
                    className={`${
                      isDark ? "text-gray-300" : "text-gray-600"
                    } mb-4 text-sm leading-relaxed`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 + 0.4 }}
                  >
                    {project.description}
                  </motion.p>

                  {/* Technologies */}
                  <motion.div
                    className="flex flex-wrap gap-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.1 + 0.5 }}
                  >
                    {project.technologies.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className={`px-3 py-1 text-xs rounded-full ${
                          isDark
                            ? "bg-gray-700 text-gray-300"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 4 && (
                      <span
                        className={`px-3 py-1 text-xs rounded-full ${
                          isDark
                            ? "bg-purple-600/20 text-purple-300"
                            : "bg-purple-100 text-purple-600"
                        }`}
                      >
                        +{project.technologies.length - 4}
                      </span>
                    )}
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* View More Button */}
        {hasMoreProjects && (
          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <motion.button
              onClick={handleViewMore}
              className={`px-8 py-4 rounded-lg font-semibold transition-all duration-300 border-2 ${
                isDark
                  ? "border-purple-600 text-purple-400 hover:bg-purple-600 hover:text-white"
                  : "border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white"
              }`}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              عرض المزيد من المشاريع (
              {filteredProjects.length - visibleProjects} متبقي)
            </motion.button>
          </motion.div>
        )}

        {/* Show All Projects Button (when no more to load) */}
        {!hasMoreProjects && filteredProjects.length > PROJECTS_PER_PAGE && (
          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <motion.button
              onClick={() => setVisibleProjects(PROJECTS_PER_PAGE)}
              className={`px-8 py-4 rounded-lg font-semibold transition-all duration-300 border-2 ${
                isDark
                  ? "border-gray-600 text-gray-400 hover:bg-gray-600 hover:text-white"
                  : "border-gray-400 text-gray-600 hover:bg-gray-400 hover:text-white"
              }`}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              عرض أقل
            </motion.button>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default PortfolioSection;
