"use client";

import { useRef, useState, useMemo } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { FiSearch, FiX, FiFilter } from "react-icons/fi";

// Inline certifications data (migrated from certifications.js)
const CERTS_DATA = [
  // HACKATHONS
  { title: "Google UP: Build with AI — Champion", issuer: "GDG University of the Philippines Manila", date: "March 2025", category: "Certifications & Hackathons", color: "#4285F4", description: "Secured the Champion title in the 'Build with AI' hackathon organized by Google Developer Group at UP Manila. Architected an AI-driven framework to automate analysis of complex legal documents using LLMs and NLP." },
  { title: "SkyDev 2025 Hackathon — Champion", issuer: "SkyDev Community", date: "October 2025", category: "Certifications & Hackathons", color: "#00BCFF", description: "Achieved First Place at SkyDev 2025 with a computer vision assistant for visually impaired users. Led the computer vision pipeline, ensuring low-latency performance on mobile hardware." },
  { title: "Caffeine.ai Hackathon — Champion (Technical Track)", issuer: "Caffeine AI / ICP Philippines", date: "November 2025", category: "Certifications & Hackathons", color: "#6F4E37", description: "Champion in the inaugural Caffeine AI Manila hackathon. Built EcoCycle — AI waste classification + blockchain reward system. Featured in PhilStar Tech." },
  { title: "UNity 2025 Hackathon — Champion", issuer: "UNity Tech Global", date: "November 2025", category: "Certifications & Hackathons", color: "#2E7D32", description: "Top spot at UNity 2025. Developed GuardianNet — AI-driven disaster management system using satellite imagery and social media sentiment analysis." },
  { title: "SparkHub Online Hackathon — Champion", issuer: "Devpost / SparkHub", date: "November 2025", category: "Certifications & Hackathons", color: "#FF4081", description: "Champion in international Devpost hackathon. Decentralized AI waste management platform with blockchain incentives and exceptional UI/UX." },
  { title: "GHackathon — Champion", issuer: "Devpost", date: "March 2026", category: "Certifications & Hackathons", color: "#FFD700", description: "Won 1st Place at GHackathon 2026!" },
  { title: "Appcon 2024 — National Finalist", issuer: "Appcon Philippines", date: "November 2024", category: "Certifications & Hackathons", color: "#D32F2F", description: "National Finalist for EmberWatch — AI-powered fire detection and early warning system using computer vision and thermal cameras." },
  { title: "Dean's List Academic Excellence Award", issuer: "Holy Angel University", date: "AY 2023-2024", category: "Certifications & Hackathons", color: "#C5A059", description: "Recognized on Dean's List at Holy Angel University for outstanding academic performance in the School of Computing." },
  { title: "Best Project Award — HAU Tech Fest", issuer: "HAU College Tech Fest", date: "October 2023", category: "Certifications & Hackathons", color: "#FFD700", description: "Best Project Award for an AI-powered career counseling platform using ML to match students with job market trends." },
  { title: "Open Source Contributor — 500+ Contributions", issuer: "GitHub Community", date: "2022–Present", category: "Certifications & Hackathons", color: "#FFFFFF", description: "Active open-source contributor with 500+ contributions across AI repositories, bug fixes, feature development, and documentation." },
  // AI / ML
  { title: "Artificial Intelligence Fundamentals", issuer: "IBM", date: "March 2026", category: "AI / Machine Learning", color: "#054ADA", description: "Comprehensive foundation in AI — supervised/unsupervised/reinforcement learning, neural networks, NLP, and ethical AI deployment using IBM Watson." },
  { title: "Introduction to AI", issuer: "Google", date: "February 2026", category: "AI / Machine Learning", color: "#4285F4", description: "Google's AI overview covering ML, deep learning, generative AI, responsible AI, and practical applications across Google Cloud services." },
  { title: "AI & LLM Engineering Mastery: GenAI and RAG", issuer: "Udemy", date: "December 2025", category: "AI / Machine Learning", color: "#A435F0", description: "Advanced LLM engineering: RAG architectures, vector databases (Pinecone, ChromaDB), prompt engineering, fine-tuning, and AI agent deployment." },
  { title: "Machine Learning with Python", issuer: "freeCodeCamp", date: "February 2025", category: "AI / Machine Learning", color: "#0A0A23", description: "End-to-end ML skills: supervised/unsupervised learning, Scikit-Learn, TensorFlow, Keras. Five capstone projects including recommendation engines." },
  { title: "Machine Learning Foundations", issuer: "AWS", date: "April 2025", category: "AI / Machine Learning", color: "#FF9900", description: "AWS ML pipeline: SageMaker, Amazon Rekognition, Comprehend, Forecast. Optimizing training costs and model monitoring in production." },
  { title: "Introduction to Deep Learning with Keras", issuer: "DataCamp", date: "Recent", category: "AI / Machine Learning", color: "#05E3D4", description: "Neural network fundamentals with Keras: MLPs, CNNs, dropout regularization, batch normalization, early stopping, and learning rate scheduling." },
  { title: "Advanced Deep Learning with Keras", issuer: "DataCamp", date: "Recent", category: "AI / Machine Learning", color: "#05E3D4", description: "Advanced architectures: CNNs, RNNs/LSTMs, autoencoders, transfer learning (VGG16/ResNet), multi-input/output models, and ensembling." },
  { title: "Introduction to TensorFlow in Python", issuer: "DataCamp", date: "Recent", category: "AI / Machine Learning", color: "#05E3D4", description: "TensorFlow: computational graphs, eager execution, tf.data API, GradientTape, TensorBoard, TensorFlow Lite, and TensorFlow Serving." },
  { title: "Large Language Models Concepts", issuer: "DataCamp", date: "Recent", category: "AI / Machine Learning", color: "#05E3D4", description: "LLM architecture: transformer attention, BERT/GPT/T5, LoRA/QLoRA fine-tuning, tokenization, RLHF, and responsible AI deployment." },
  { title: "Supervised Learning with Scikit-Learn", issuer: "DataCamp", date: "Recent", category: "AI / Machine Learning", color: "#05E3D4", description: "Classification and regression: decision trees, SVMs, ensemble methods, feature engineering, cross-validation, and hyperparameter tuning." },
  { title: "Unsupervised Learning in Python", issuer: "DataCamp", date: "Recent", category: "AI / Machine Learning", color: "#05E3D4", description: "K-means, DBSCAN, PCA, NMF, hierarchical clustering, and t-SNE for dimensionality reduction and pattern discovery." },
  { title: "Machine Learning for Business", issuer: "DataCamp", date: "Recent", category: "AI / Machine Learning", color: "#05E3D4", description: "Translating business problems into ML solutions: model selection, ROI analysis, stakeholder communication, and production deployment decisions." },
  { title: "Image Processing in Python", issuer: "DataCamp", date: "Recent", category: "AI / Machine Learning", color: "#05E3D4", description: "scikit-image pipeline: filters, morphology, segmentation, color spaces, edge detection, and preprocessing for computer vision models." },
  { title: "Feature Engineering for Machine Learning", issuer: "DataCamp", date: "Recent", category: "AI / Machine Learning", color: "#05E3D4", description: "Advanced feature engineering: encoding, scaling, imputation, polynomial features, feature selection, and target encoding for improved model accuracy." },
  { title: "IBM AI Engineeri Professional Certificate", issuer: "IBM", date: "Recent", category: "AI / Machine Learning", color: "#05E3D4", description: "Master AI engineering from scratch: ML/DL/GenAI fundamentals, data science, MLOps, LangChain, RAG, model deployment, and real-world case studies." },
  { title: "Google AI Professional Certificate", issuer: "Google", date: "Recent", category: "AI / Machine Learning", color: "#05E3D4", description: "Define AI, ML, data science and how they work together, machine learning models, ML evaluation, ML use cases and applications." },
  { title: "Microsoft Generative AI Engineer Professional Certificate", issuer: "Microsoft", date: "Recent", category: "AI / Machine Learning", color: "#05E3D4", description: "Define GenAI, large language models, how they work together, LLM evaluation, LLM use cases and applications." },
  // CLOUD
  { title: "Azure Fundamentals (Architecture & Services)", issuer: "Microsoft", date: "Recent", category: "Cloud / DevOps", color: "#008AD7", description: "Azure compute (VMs, AKS, Functions), storage, networking (VNets, VPN, ExpressRoute), SQL, Cosmos DB, and architectural best practices." },
  { title: "Azure Fundamentals (Management & Governance)", issuer: "Microsoft", date: "Recent", category: "Cloud / DevOps", color: "#008AD7", description: "Azure AD, RBAC, Azure Policy, Cost Management, Azure Monitor, Sentinel, DDoS Protection, and disaster recovery." },
  { title: "MS-900 Microsoft 365 Fundamentals", issuer: "Microsoft", date: "Recent", category: "Cloud / DevOps", color: "#008AD7", description: "Microsoft 365 ecosystem: Exchange Online, SharePoint, Teams, OneDrive, ATP, eDiscovery, and Power Platform integration." },
  { title: "Introduction to Cloud Computing", issuer: "IBM", date: "Recent", category: "Cloud / DevOps", color: "#054ADA", description: "Cloud computing principles: IaaS/PaaS/SaaS, deployment models, virtualization, containers, serverless, and hands-on IBM Cloud labs." },
  { title: "Google Cloud Run Fundamentals", issuer: "Coursera", date: "Recent", category: "Cloud / DevOps", color: "#4285F4", description: "Containerized serverless deployment on Cloud Run: Docker, traffic splitting, canary deployments, Cloud SQL, Cloud Build CI/CD pipelines." },
  { title: "AWS Cloud Practitioner Essentials", issuer: "AWS", date: "Recent", category: "Cloud / DevOps", color: "#FF9900", description: "AWS core services, security model, pricing, EC2, S3, Lambda, RDS, and cloud architecture fundamentals for the AWS ecosystem." },
  // DATA SCIENCE
  { title: "Data Science Foundations Level 1 & 2", issuer: "IBM", date: "Recent", category: "Data Science", color: "#054ADA", description: "Full data science lifecycle: CRISP-DM, EDA, statistical analysis, ML modeling on Watson Studio and Cloud Pak for Data." },
  { title: "Data Science Tools", issuer: "IBM", date: "Recent", category: "Data Science", color: "#054ADA", description: "Jupyter, JupyterLab, RStudio, Apache Spark, Hadoop, Docker for data science environments, and Git for versioning." },
  { title: "Data Science Methodologies", issuer: "IBM", date: "Recent", category: "Data Science", color: "#054ADA", description: "CRISP-DM deep dive: business understanding, data preparation, modeling, evaluation, and deployment with iterative feedback loops." },
  { title: "Data Scientist Associate", issuer: "DataCamp", date: "Recent", category: "Data Science", color: "#05E3D4", description: "Professional certification validating pandas, NumPy, Scikit-Learn, feature engineering, EDA, and model evaluation across real-world scenarios." },
  { title: "Data Analyst Associate", issuer: "DataCamp", date: "Recent", category: "Data Science", color: "#05E3D4", description: "SQL, Python analysis, visualization (Matplotlib/Seaborn/Plotly), A/B testing, cohort analysis, and business decision support." },
  { title: "SQL Associate", issuer: "DataCamp", date: "Recent", category: "Data Science", color: "#05E3D4", description: "Advanced SQL: window functions (ROW_NUMBER, LAG, LEAD), CTEs, complex joins, DDL/DML/DCL, query optimization, and execution plans." },
  { title: "Data Literacy", issuer: "DataCamp", date: "Recent", category: "Data Science", color: "#05E3D4", description: "Critical thinking with data: evaluating sources, statistical fallacies, data storytelling, chart selection, and ethical data usage." },
  { title: "Data Manipulation with pandas", issuer: "DataCamp", date: "Recent", category: "Data Science", color: "#05E3D4", description: "Expert-level pandas: filtering, reshaping, pivot tables, GroupBy workflows, datetime operations, and performance optimization." },
  { title: "Joining Data with pandas", issuer: "DataCamp", date: "Recent", category: "Data Science", color: "#05E3D4", description: "Data integration: inner/outer/left/right joins, semi-joins, anti-joins, merge_asof for time-series, and concat with multi-index handling." },
  // WEB DEVELOPMENT
  { title: "Front-End Apps with React", issuer: "IBM", date: "Recent", category: "Web Development", color: "#61DAFB", description: "React hooks (useState, useEffect, useContext, useReducer), Redux, React Router, REST API integration, and component architecture." },
  { title: "Node.js & Express Backend", issuer: "IBM", date: "Recent", category: "Web Development", color: "#339933", description: "RESTful API design, Express.js middleware, JWT authentication, MongoDB integration, error handling, and deployment." },
  { title: "Introduction to Web Development", issuer: "IBM", date: "Recent", category: "Web Development", color: "#054ADA", description: "HTML5, CSS3, JavaScript fundamentals, DOM manipulation, responsive design, and modern web standards." },
  { title: "Developing Back-End Apps with Node.js and Express", issuer: "IBM", date: "Recent", category: "Web Development", color: "#339933", description: "Server-side development: REST APIs, authentication, database integration, testing, and production deployment." },
  // CYBERSECURITY
  { title: "Introduction to Cybersecurity Tools & Cyber Attacks", issuer: "IBM", date: "Recent", category: "Cybersecurity", color: "#FF6B35", description: "Security fundamentals: threat landscape, attack vectors, malware, phishing, SQL injection, XSS, and defensive strategies." },
  { title: "Cybersecurity Compliance Framework & System Administration", issuer: "IBM", date: "Recent", category: "Cybersecurity", color: "#FF6B35", description: "NIST, GDPR, HIPAA compliance, access control, vulnerability management, and incident response procedures." },
  { title: "Network Security & Database Vulnerabilities", issuer: "IBM", date: "Recent", category: "Cybersecurity", color: "#FF6B35", description: "Network security protocols, firewall configuration, SQL injection prevention, database encryption, and secure architecture." },
];

const CATEGORIES = [
  "All",
  "AI / Machine Learning",
  "Cloud / DevOps",
  "Data Science",
  "Web Development",
  "Cybersecurity",
  "Certifications & Hackathons",
];

export default function CertificationsSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = useMemo(() => {
    return CERTS_DATA.filter((cert) => {
      const matchesSearch =
        cert.title.toLowerCase().includes(search.toLowerCase()) ||
        cert.issuer.toLowerCase().includes(search.toLowerCase());
      const matchesCategory =
        activeCategory === "All" || cert.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [search, activeCategory]);

  const stats = useMemo(() => ({
    total: CERTS_DATA.length,
    aiml: CERTS_DATA.filter((c) => c.category === "AI / Machine Learning").length,
    cloud: CERTS_DATA.filter((c) => c.category === "Cloud / DevOps").length,
  }), []);

  return (
    <section id="certifications" ref={ref} className="section-base relative z-10">
      <div className="container-site">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="mb-12"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-px bg-crimson-400" />
            <span className="text-crimson-200 text-xs font-bold uppercase tracking-[0.2em]">Credentials</span>
            <div className="flex-1 h-px bg-white/5" />
          </div>
          <h2 className="text-headline text-white font-black">Certification Vault</h2>
          <p className="text-silver-400 text-sm mt-2">
            A collection of professional credentials spanning AI, Cloud, Data Science, and Software Engineering.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-3 gap-4 mb-8"
        >
          {[
            { label: "Total Credentials", value: stats.total + "+" },
            { label: "AI & ML", value: stats.aiml },
            { label: "Cloud / DevOps", value: stats.cloud },
          ].map((s) => (
            <div key={s.label} className="glass border border-white/5 rounded-lg p-4 text-center">
              <div className="text-2xl font-black text-white">{s.value}</div>
              <div className="text-silver-500 text-xs mt-0.5 uppercase tracking-wider">{s.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.15 }}
          className="mb-5"
        >
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-silver-600" size={15} />
            <input
              type="text"
              placeholder="Search certifications or issuers..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white/5 border border-white/8 rounded-sm pl-9 pr-4 py-2.5 text-sm text-silver-200 placeholder-silver-600 focus:outline-none focus:border-crimson-600/40 transition-colors"
              aria-label="Search certifications"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-silver-600 hover:text-silver-300"
                aria-label="Clear search"
              >
                <FiX size={14} />
              </button>
            )}
          </div>
        </motion.div>

        {/* Category Filters */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap gap-2 mb-8"
        >
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`filter-btn ${activeCategory === cat ? "active" : ""}`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Results count */}
        <p className="text-silver-600 text-xs mb-4">
          Showing {filtered.length} of {CERTS_DATA.length} credentials
        </p>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((cert, i) => (
              <motion.div
                key={`${cert.title}-${cert.issuer}-${i}`}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: i * 0.02 }}
                className="cert-card p-4"
              >
                <div className="flex items-start gap-3">
                  <div
                    className="w-2 flex-shrink-0 self-stretch rounded-full mt-1"
                    style={{ background: cert.color, opacity: 0.8 }}
                  />
                  <div className="min-w-0">
                    <h4 className="text-silver-100 text-sm font-bold leading-tight">{cert.title}</h4>
                    <p className="text-silver-500 text-xs mt-0.5">{cert.issuer}</p>
                    <p className="text-silver-600 text-xs">{cert.date}</p>
                    <p className="text-silver-500 text-xs leading-relaxed mt-2 line-clamp-2">{cert.description}</p>
                    <span
                      className="inline-block text-[10px] font-semibold uppercase tracking-wider mt-2 px-2 py-0.5 rounded-sm"
                      style={{ color: cert.color, background: `${cert.color}15`, border: `1px solid ${cert.color}30` }}
                    >
                      {cert.category}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filtered.length === 0 && (
          <p className="text-center text-silver-600 text-sm py-12">No certifications found. Try a different search or filter.</p>
        )}
      </div>
      <div className="section-divider mt-20" />
    </section>
  );
}
