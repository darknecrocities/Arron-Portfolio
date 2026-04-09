/**
 * Certifications Data
 * Structured for the Achievements & Certifications Section
 * Each entry includes an expanded professional description (150+ words).
 */

const CERTIFICATIONS_DATA = [
  // --- HACKATHONS ---
  {
    title: "Batang Techno: Building the Minds of Tomorrow's Innovators Hackathon",
    issuer: "Batangas State University",
    date: "March 2026",
    category: "Certifications & Hackathons",
    icon: "trophy-outline",
    type: "Hackathon",
    color: "#FFD700",
    description: "Participated in and competed at the Batang Techno hackathon hosted by Batangas State University, a prestigious competition focused on cultivating the next generation of technology innovators. During this intensive event, Arron demonstrated strong problem-solving abilities by designing and prototyping a technology-driven solution under strict time constraints. The hackathon challenged participants to address real-world problems through creative application of software engineering, data analytics, and emerging technologies. Key skills honed during this experience include rapid ideation, agile development under pressure, effective team coordination, and delivering compelling technical presentations to a panel of academic and industry judges. The event also provided invaluable networking opportunities with fellow developers, professors, and industry mentors, reinforcing the importance of collaboration and innovation in the tech ecosystem. This experience solidified Arron's ability to translate abstract ideas into functional prototypes within a competitive environment."
  },

  // --- AI / ML ---
  {
    title: "Artificial Intelligence Fundamentals",
    issuer: "IBM",
    date: "March 2026",
    category: "AI / Machine Learning",
    icon: "hardware-chip-outline",
    id: "N/A",
    color: "#054ADA",
    description: "This IBM certification provided Arron with a comprehensive foundation in artificial intelligence, covering the full spectrum of AI technologies and their real-world applications. The curriculum explored the history and evolution of AI, from rule-based expert systems to modern deep learning architectures. Core topics included machine learning algorithms such as supervised learning, unsupervised learning, and reinforcement learning, as well as neural network fundamentals and natural language processing. Arron gained hands-on experience with IBM Watson and other enterprise AI tools, learning how to build, train, and evaluate AI models for classification, prediction, and recommendation tasks. The certification also addressed critical ethical considerations in AI development, including bias detection, fairness, transparency, and responsible deployment practices. By completing this program, Arron developed a strong conceptual understanding of how AI systems are designed, trained, and integrated into business workflows to drive automation and intelligent decision-making at scale."
  },
  {
    title: "Introduction to AI",
    issuer: "Google",
    date: "February 2026",
    category: "AI / Machine Learning",
    icon: "logo-google",
    id: "ZGNSCXZVZ6V4",
    color: "#4285F4",
    description: "Google's Introduction to AI certification gave Arron a thorough overview of artificial intelligence as practiced at one of the world's leading technology companies. The course covered fundamental AI concepts including machine learning, deep learning, generative AI, and responsible AI principles. Arron learned how Google applies AI across its product suite — from Search and Google Photos to Google Cloud AI Platform — gaining insights into the scale and complexity of production AI systems. The curriculum explored neural network architectures, the transformer model that powers modern large language models, and the distinction between discriminative and generative AI approaches. Practical modules covered how to leverage Google Cloud's pre-trained APIs for vision, language, and speech tasks, as well as how to fine-tune models on custom datasets using Vertex AI. This certification deepened Arron's understanding of how AI is transforming industries and equipped him with the vocabulary and conceptual framework to design intelligent applications using Google's ecosystem."
  },
  {
    title: "AI & LLM Engineering Mastery: GenAI and RAG",
    issuer: "Udemy",
    date: "December 2025",
    category: "AI / Machine Learning",
    icon: "bulb-outline",
    color: "#A435F0",
    description: "This advanced Udemy certification provided Arron with deep expertise in Large Language Model engineering, focusing specifically on Generative AI and Retrieval-Augmented Generation (RAG) architectures. The course covered the complete lifecycle of LLM-based application development, from understanding transformer architectures and attention mechanisms to building production-ready AI pipelines. Arron learned advanced prompt engineering techniques, including chain-of-thought prompting, few-shot learning, and system prompt design for controlling model behavior. The RAG modules taught him how to build knowledge-grounded AI systems by integrating vector databases like Pinecone and ChromaDB with LLM inference pipelines, ensuring factual accuracy and reducing hallucinations. Additional topics included fine-tuning open-source models, implementing semantic search with embeddings, managing token budgets and API costs, and deploying conversational AI agents. This certification gave Arron the practical skills to architect sophisticated AI applications that combine the generative power of LLMs with structured knowledge retrieval for enterprise-grade accuracy and reliability."
  },
  {
    title: "Machine Learning with Python",
    issuer: "freeCodeCamp",
    date: "February 2025",
    category: "AI / Machine Learning",
    icon: "code-slash-outline",
    color: "#0A0A23",
    description: "freeCodeCamp's Machine Learning with Python certification equipped Arron with end-to-end practical skills for building, training, and evaluating machine learning models using Python's most powerful scientific computing libraries. The curriculum covered supervised learning techniques including linear regression, logistic regression, decision trees, random forests, and support vector machines, as well as unsupervised learning methods like K-means clustering and principal component analysis. Arron gained hands-on experience with Scikit-Learn for model building and evaluation, TensorFlow and Keras for neural network development, and Matplotlib and Seaborn for data visualization. The coursework included five capstone projects that required building real-world ML applications such as a book recommendation engine, a health cost predictor, and a neural network SMS text classifier. Through these projects, Arron developed strong proficiency in feature engineering, cross-validation, hyperparameter tuning, and model selection. This certification reinforced his ability to translate business problems into well-structured machine learning solutions using industry-standard Python tools."
  },
  {
    title: "Machine Learning Foundations",
    issuer: "AWS",
    date: "April 2025",
    category: "AI / Machine Learning",
    icon: "logo-amazon",
    color: "#FF9900",
    description: "Amazon Web Services' Machine Learning Foundations certification provided Arron with a solid understanding of cloud-native machine learning architecture and AWS's comprehensive ML service ecosystem. The course covered the full machine learning pipeline — from data collection and preparation through model training, evaluation, and deployment — all within the context of AWS infrastructure. Arron learned to use Amazon SageMaker for building, training, and deploying models at scale, as well as pre-built AI services like Amazon Rekognition for image analysis, Amazon Comprehend for natural language processing, and Amazon Forecast for time-series predictions. The curriculum also explored data engineering concepts including data lakes, ETL pipelines, and feature stores that feed ML workflows. Key takeaways included understanding when to use built-in algorithms versus custom models, how to optimize training costs with spot instances, and best practices for model monitoring and retraining in production environments. This certification gave Arron the cloud ML architecture skills to design scalable, cost-effective AI solutions on AWS infrastructure."
  },
  {
    title: "Introduction to Deep Learning with Keras",
    issuer: "DataCamp",
    date: "Recent",
    category: "AI / Machine Learning",
    icon: "analytics-outline",
    color: "#05E3D4",
    description: "DataCamp's Introduction to Deep Learning with Keras certification gave Arron a strong foundation in building neural networks using the Keras high-level API running on top of TensorFlow. The course covered the fundamental architecture of neural networks, including input layers, hidden layers, activation functions, and output layers for both regression and classification tasks. Arron learned how to construct sequential and functional models, implement forward propagation and backpropagation, and optimize network performance using gradient descent variants like Adam and RMSProp. Practical exercises included building multi-layer perceptrons for digit recognition, binary classification networks for customer churn prediction, and multi-output models for complex prediction tasks. The curriculum also covered essential techniques like dropout regularization, batch normalization, early stopping, and learning rate scheduling to prevent overfitting and accelerate convergence. By completing this certification, Arron gained the practical ability to design, train, and evaluate deep learning models for real-world applications using one of the most accessible and widely-adopted deep learning frameworks in the industry."
  },
  {
    title: "Advanced Deep Learning with Keras",
    issuer: "DataCamp",
    date: "Recent",
    category: "AI / Machine Learning",
    icon: "analytics-outline",
    color: "#05E3D4",
    description: "Building upon foundational deep learning knowledge, DataCamp's Advanced Deep Learning with Keras certification pushed Arron into sophisticated neural network architectures and cutting-edge techniques. The course covered convolutional neural networks (CNNs) for image recognition, recurrent neural networks (RNNs) and LSTMs for sequential data processing, and advanced architectures like autoencoders for dimensionality reduction and anomaly detection. Arron learned to build multi-input and multi-output models using Keras's functional API, enabling the creation of complex architectures that process heterogeneous data types simultaneously. The curriculum explored transfer learning using pre-trained models like VGG16 and ResNet, enabling fast adaptation to domain-specific tasks with limited training data. Advanced topics included custom loss functions, callback mechanisms for dynamic training control, and model ensembling techniques for improved prediction accuracy. Practical projects involved building image classifiers, text generators, and recommendation systems, reinforcing Arron's ability to architect production-grade deep learning solutions that handle real-world complexity and data variability."
  },
  {
    title: "Introduction to TensorFlow in Python",
    issuer: "DataCamp",
    date: "Recent",
    category: "AI / Machine Learning",
    icon: "analytics-outline",
    color: "#05E3D4",
    description: "DataCamp's Introduction to TensorFlow in Python certification provided Arron with comprehensive expertise in Google's flagship deep learning framework. The course covered TensorFlow's computational graph architecture, eager execution mode, and the tf.data API for building efficient input pipelines. Arron learned to construct neural networks using both low-level TensorFlow operations and the high-level Keras integration, understanding the trade-offs between control and convenience. Key topics included tensor manipulation, automatic differentiation with GradientTape, custom training loops, and model serialization for deployment. The curriculum covered building dense networks for tabular data, convolutional networks for image classification, and recurrent networks for time-series forecasting. Practical exercises involved training models on GPU-accelerated environments, implementing learning rate schedules, and using TensorBoard for training visualization and debugging. Arron also learned about TensorFlow Lite for mobile deployment, TensorFlow Serving for production inference, and TensorFlow Hub for leveraging pre-trained models. This certification solidified Arron's ability to build, optimize, and deploy deep learning models using the industry's most widely-adopted ML framework."
  },
  {
    title: "Large Language Models Concepts",
    issuer: "DataCamp",
    date: "Recent",
    category: "AI / Machine Learning",
    icon: "analytics-outline",
    color: "#05E3D4",
    description: "DataCamp's Large Language Models Concepts certification gave Arron a deep theoretical and practical understanding of the architecture, training methodologies, and applications of modern LLMs. The course explored the transformer architecture in detail, covering self-attention mechanisms, positional encoding, and the encoder-decoder framework that powers models like GPT, BERT, and T5. Arron learned about pre-training strategies including masked language modeling and causal language modeling, as well as fine-tuning techniques like LoRA, QLoRA, and instruction tuning that adapt foundation models to specific tasks. The curriculum covered critical concepts including tokenization strategies (BPE, SentencePiece), context window management, temperature and top-k/top-p sampling for controlling generation, and alignment techniques like RLHF (Reinforcement Learning from Human Feedback). Practical modules explored prompt engineering patterns, few-shot and zero-shot learning, and the emerging field of AI agents. Arron also gained insights into the ethical dimensions of LLMs, including bias mitigation, hallucination detection, and responsible deployment practices. This certification positioned Arron at the forefront of the generative AI revolution."
  },

  // --- CLOUD / DEVOPS ---
  {
    title: "Azure Fundamentals (Architecture & Services)",
    issuer: "Microsoft",
    date: "Recent",
    category: "Cloud / DevOps",
    icon: "cloud-outline",
    color: "#008AD7",
    description: "Microsoft's Azure Fundamentals certification in Architecture and Services provided Arron with a comprehensive understanding of cloud computing infrastructure on the Azure platform. The curriculum covered core Azure architectural components including regions, availability zones, resource groups, and subscriptions, establishing a strong foundation for designing resilient cloud solutions. Arron learned about Azure's compute services including Virtual Machines, App Services, Azure Kubernetes Service, and Azure Functions for serverless computing. Storage modules covered Azure Blob Storage, Azure Files, and Azure Disk Storage, along with data redundancy options for high availability. Networking topics included Virtual Networks, VPN Gateways, Azure DNS, and ExpressRoute for hybrid connectivity. The certification also explored Azure's database services including Azure SQL Database, Cosmos DB for globally distributed NoSQL, and Azure Database for PostgreSQL. Arron gained practical knowledge of how to select appropriate services based on workload requirements, cost optimization strategies, and architectural best practices for building scalable, fault-tolerant applications on Microsoft's cloud platform."
  },
  {
    title: "Azure Fundamentals (Management & Governance)",
    issuer: "Microsoft",
    date: "Recent",
    category: "Cloud / DevOps",
    icon: "cloud-outline",
    color: "#008AD7",
    description: "Microsoft's Azure Fundamentals certification in Management and Governance equipped Arron with essential skills for managing, securing, and governing cloud resources at enterprise scale. The course covered Azure's identity and access management through Azure Active Directory, including multi-factor authentication, conditional access policies, and role-based access control (RBAC) for implementing the principle of least privilege. Arron learned about Azure's governance tools including Azure Policy for enforcing organizational standards, Management Groups for hierarchical resource organization, and Azure Blueprints for repeatable environment deployments. Cost management modules covered Azure Cost Management tools, pricing calculators, reserved instances, and strategies for optimizing cloud spending across departments. The curriculum also explored monitoring and compliance through Azure Monitor, Azure Advisor, and Azure Service Health, as well as disaster recovery planning with Azure Site Recovery. Security modules covered Azure Security Center, Azure Sentinel for SIEM capabilities, and DDoS Protection. This certification gave Arron the governance expertise needed to manage cloud infrastructure responsibly, securely, and cost-effectively."
  },
  {
    title: "MS-900 Microsoft 365 Fundamentals",
    issuer: "Microsoft",
    date: "Recent",
    category: "Cloud / DevOps",
    icon: "logo-microsoft",
    color: "#008AD7",
    description: "The MS-900 Microsoft 365 Fundamentals certification provided Arron with a thorough understanding of Microsoft's comprehensive cloud productivity and collaboration platform. The course covered the full Microsoft 365 ecosystem including Office applications, Exchange Online for enterprise email, SharePoint Online for content management, Microsoft Teams for unified communication, and OneDrive for Business for cloud storage. Arron learned about Microsoft 365's security and compliance features including data loss prevention, information protection labels, eDiscovery, and Advanced Threat Protection for defending against sophisticated cyber attacks. The curriculum explored identity management through Azure Active Directory integration, conditional access policies, and enterprise mobility management for securing devices across the organization. Licensing and subscription models were covered in depth, enabling informed decisions about which Microsoft 365 plans best serve different organizational needs. Additional topics included Power Platform integration for low-code development, Microsoft Viva for employee experience, and analytics capabilities through Microsoft Graph. This certification positioned Arron to understand enterprise cloud productivity at scale."
  },
  {
    title: "Introduction to Cloud Computing",
    issuer: "IBM",
    date: "Recent",
    category: "Cloud / DevOps",
    icon: "cloud-upload-outline",
    color: "#054ADA",
    description: "IBM's Introduction to Cloud Computing certification gave Arron a vendor-neutral yet comprehensive understanding of cloud computing principles, service models, and deployment strategies. The course covered the essential characteristics of cloud computing as defined by NIST, including on-demand self-service, broad network access, resource pooling, rapid elasticity, and measured service. Arron learned the distinctions between Infrastructure as a Service (IaaS), Platform as a Service (PaaS), and Software as a Service (SaaS), understanding when each model is appropriate for different workloads. Deployment models including public, private, hybrid, and community clouds were explored with real-world case studies. The curriculum covered cloud architecture components including virtualization, hypervisors, virtual machines, containers, and bare metal servers. Arron also studied emerging cloud trends including microservices architecture, serverless computing, DevOps practices, and cloud-native application development. Security topics included shared responsibility models, encryption, and identity and access management. Through hands-on labs on IBM Cloud, Arron gained practical experience provisioning resources and deploying applications, bridging the gap between theoretical knowledge and real-world cloud operations."
  },
  {
    title: "Google Cloud Run Fundamentals",
    issuer: "Coursera",
    date: "Recent",
    category: "Cloud / DevOps",
    icon: "server-outline",
    color: "#4285F4",
    description: "This Coursera certification focused on Google Cloud Run, Google Cloud's fully managed serverless platform for containerized applications. Arron learned how to build, deploy, and scale containerized applications without managing the underlying infrastructure. The course covered Docker containerization fundamentals including writing Dockerfiles, building images, and pushing to Google Container Registry and Artifact Registry. Core Cloud Run concepts included service deployment, revision management, traffic splitting for canary deployments, and automatic scaling based on incoming request volume. Arron gained practical experience configuring environment variables, secrets management, and connecting Cloud Run services to other Google Cloud resources like Cloud SQL, Cloud Storage, and Pub/Sub. The curriculum also covered continuous deployment pipelines using Cloud Build, setting up custom domains, and implementing authentication and authorization for securing services. Performance optimization topics included concurrency settings, cold start reduction techniques, and memory and CPU allocation strategies. This certification equipped Arron with the skills to deploy production-grade, scalable web applications and APIs on Google Cloud's serverless container platform with minimal operational overhead."
  },

  // --- DATA SCIENCE ---
  {
    title: "Data Science Foundations Level 1 & 2",
    issuer: "IBM",
    date: "Recent",
    category: "Data Science",
    icon: "stats-chart-outline",
    color: "#054ADA",
    description: "IBM's Data Science Foundations certification program across Levels 1 and 2 provided Arron with a rigorous and comprehensive introduction to the data science discipline. Level 1 covered fundamental concepts including the data science methodology, data exploration techniques, descriptive statistics, and data visualization best practices. Arron learned to use industry-standard tools like Jupyter Notebooks, Python, and R for data analysis workflows. Level 2 expanded into advanced topics including predictive analytics, machine learning model building, and data-driven decision making. The curriculum explored the complete data science lifecycle from business understanding and data collection through modeling, evaluation, and deployment. Arron gained practical experience with IBM Watson Studio and Cloud Pak for Data, learning how enterprise organizations leverage data science platforms for collaborative analytics. Statistical concepts covered included hypothesis testing, confidence intervals, correlation analysis, and regression modeling. Through multiple hands-on labs and a capstone project, Arron demonstrated the ability to extract meaningful insights from complex datasets, communicate findings to stakeholders, and apply data science methodologies to solve real-world business problems systematically."
  },
  {
    title: "Data Science Tools",
    issuer: "IBM",
    date: "Recent",
    category: "Data Science",
    icon: "construct-outline",
    color: "#054ADA",
    description: "IBM's Data Science Tools certification equipped Arron with mastery of the essential software tools and platforms used by professional data scientists. The course covered Jupyter Notebooks as the primary interactive development environment, including magic commands, kernel management, and collaborative features. Arron learned to use JupyterLab, RStudio, and Apache Zeppelin for various data analysis workflows, understanding the strengths of each tool for different tasks. Version control with Git and GitHub was covered extensively, including repository management, branching strategies, and collaborative development practices specific to data science projects. The curriculum also explored IBM Watson Studio's cloud-based environment for end-to-end data science workflows, including data asset management, experiment tracking, and model deployment pipelines. Additional tools covered included Apache Spark for distributed computing, Hadoop for big data processing, and various data visualization libraries across Python and R ecosystems. Arron also learned about containerization with Docker for reproducible data science environments and package management with pip, conda, and virtual environments. This certification ensured proficiency across the complete data science toolchain."
  },
  {
    title: "Data Science Methodologies",
    issuer: "IBM",
    date: "Recent",
    category: "Data Science",
    icon: "git-merge-outline",
    color: "#054ADA",
    description: "IBM's Data Science Methodologies certification taught Arron the structured frameworks that guide professional data science projects from inception to deployment. The primary focus was on CRISP-DM (Cross-Industry Standard Process for Data Mining), the most widely adopted data science methodology in industry. Arron learned each phase in depth: Business Understanding for defining clear analytical objectives, Data Understanding for exploring and assessing data quality, Data Preparation for cleaning and transforming raw data into analysis-ready formats, Modeling for selecting and training appropriate algorithms, Evaluation for assessing model performance against business criteria, and Deployment for operationalizing models in production environments. The course also covered IBM's Foundational Methodology for Data Science, which adds emphasis on feedback loops, storytelling with data, and iterative refinement. Arron gained practical experience applying these methodologies to case studies spanning healthcare, finance, and retail, learning how to navigate ambiguity, manage stakeholder expectations, and iterate systematically toward solutions. This certification instilled a disciplined, repeatable approach to data science that ensures project success and clear communication of results to both technical and non-technical audiences."
  },
  {
    title: "Data Scientist Associate",
    issuer: "DataCamp",
    date: "Recent",
    category: "Data Science",
    icon: "ribbon-outline",
    color: "#05E3D4",
    description: "DataCamp's Data Scientist Associate certification validated Arron's proficiency across the entire data science pipeline through a rigorous practical examination. The certification assessed skills in data manipulation using pandas and NumPy, statistical analysis including hypothesis testing and probability distributions, and machine learning model development with Scikit-Learn. Arron demonstrated competency in exploratory data analysis, feature engineering, and building end-to-end predictive models for both classification and regression tasks. The examination required solving real-world business problems, including customer segmentation, demand forecasting, and risk assessment, using structured analytical approaches. Key competencies validated include data wrangling and cleaning, handling missing values and outliers, applying appropriate statistical tests, and communicating analytical findings through clear visualizations and written reports. Arron also demonstrated proficiency in model evaluation metrics including accuracy, precision, recall, F1-score, ROC-AUC, and RMSE, as well as cross-validation techniques for robust model assessment. This industry-recognized certification serves as professional validation of Arron's ability to independently deliver data science projects from raw data to actionable business insights."
  },
  {
    title: "Data Analyst Associate",
    issuer: "DataCamp",
    date: "Recent",
    category: "Data Science",
    icon: "pie-chart-outline",
    color: "#05E3D4",
    description: "DataCamp's Data Analyst Associate certification validated Arron's expertise in transforming raw data into actionable business insights through systematic analysis and compelling visualization. The certification assessed skills across multiple domains including SQL for database querying, Python for data manipulation and analysis, and visualization tools for creating impactful dashboards and reports. Arron demonstrated proficiency in writing complex SQL queries involving joins, subqueries, window functions, and common table expressions to extract data from relational databases. The examination tested ability to perform exploratory data analysis, identify patterns and trends, and apply appropriate statistical methods to support data-driven decision making. Key skills validated include data cleaning and preparation, descriptive and inferential statistics, A/B test analysis, and cohort analysis for understanding customer behavior. Arron also showed competency in creating publication-quality visualizations using libraries like Matplotlib, Seaborn, and Plotly, as well as building interactive dashboards. The practical exam required solving realistic business scenarios from industries like e-commerce, healthcare, and marketing, reinforcing the ability to bridge the gap between technical analysis and business strategy."
  },
  {
    title: "SQL Associate",
    issuer: "DataCamp",
    date: "Recent",
    category: "Data Science",
    icon: "list-outline",
    color: "#05E3D4",
    description: "DataCamp's SQL Associate certification validated Arron's advanced proficiency in Structured Query Language for relational database management and analysis. The certification covered the complete spectrum of SQL capabilities from basic SELECT statements through complex analytical queries. Arron demonstrated mastery of multi-table joins (INNER, LEFT, RIGHT, FULL OUTER, CROSS), subqueries (correlated and non-correlated), common table expressions (CTEs), and window functions including ROW_NUMBER, RANK, DENSE_RANK, LAG, and LEAD for sophisticated analytical processing. The examination tested data definition language (DDL) skills for creating and modifying table schemas, data manipulation language (DML) for inserting, updating, and deleting records, and data control language (DCL) for managing permissions. Advanced topics included aggregate functions with GROUP BY and HAVING clauses, CASE expressions for conditional logic, set operations (UNION, INTERSECT, EXCEPT), and query optimization techniques including index usage and execution plan analysis. Arron also demonstrated proficiency in handling NULL values, date and time functions, string manipulation, and converting between data types. This certification validates professional-level SQL competency essential for any data-driven role."
  },
  {
    title: "Data Literacy",
    issuer: "DataCamp",
    date: "Recent",
    category: "Data Science",
    icon: "book-outline",
    color: "#05E3D4",
    description: "DataCamp's Data Literacy certification provided Arron with the critical thinking framework needed to effectively read, understand, create, and communicate with data in professional contexts. The course went beyond technical skills to focus on the interpretive and communicative aspects of data work. Arron learned how to critically evaluate data sources for reliability, identify common statistical fallacies and misleading visualizations, and distinguish correlation from causation in analytical reports. The curriculum covered data collection methodologies including surveys, experiments, and observational studies, along with their respective strengths and limitations. Key topics included understanding different data types (categorical, ordinal, continuous), recognizing sampling bias, interpreting confidence intervals and p-values in context, and assessing the ethical implications of data collection and usage. Arron also developed skills in data storytelling — the art of structuring analytical narratives that resonate with diverse audiences, from executives to technical teams. Visualization literacy modules taught how to choose appropriate chart types, avoid chartjunk, and design dashboards that facilitate decision-making. This certification strengthened Arron's ability to be an effective data communicator and a more critical consumer of data-driven claims."
  },
  {
    title: "Joining Data with pandas",
    issuer: "DataCamp",
    date: "Recent",
    category: "Data Science",
    icon: "infinite-outline",
    color: "#05E3D4",
    description: "DataCamp's Joining Data with pandas certification equipped Arron with advanced data integration techniques using Python's most powerful data manipulation library. The course focused specifically on combining data from multiple sources — a critical skill for real-world data science where information is rarely contained in a single table. Arron mastered all types of pandas merge operations including inner, outer, left, and right joins, understanding how each handles matched and unmatched records. The curriculum covered merging on single and multiple columns, handling duplicate column names with suffixes, and performing ordered merges for time-series data. Advanced topics included semi-joins and anti-joins for filtering based on another dataset's contents, cross joins for generating all possible combinations, and merge_asof for approximate matching in financial and time-series contexts. Arron also learned to use pandas concat for vertical stacking with index alignment, append operations, and multi-index handling for hierarchical data structures. Practical exercises involved combining real-world datasets from sources like the World Bank, movie databases, and financial markets, reinforcing the importance of data validation after merging and strategies for handling data quality issues that arise during integration."
  },
  {
    title: "Data Manipulation with pandas",
    issuer: "DataCamp",
    date: "Recent",
    category: "Data Science",
    icon: "options-outline",
    color: "#05E3D4",
    description: "DataCamp's Data Manipulation with pandas certification gave Arron expert-level proficiency in Python's premier data analysis library for transforming, cleaning, and reshaping datasets. The course covered the complete pandas API for Series and DataFrame operations, from basic indexing and selection through advanced vectorized computations. Arron mastered data inspection techniques, filtering rows with boolean masks, selecting columns with loc and iloc, and applying conditional logic across datasets. The curriculum covered essential data cleaning operations including handling missing values with fillna, dropna, and interpolation methods, detecting and removing duplicates, and converting data types. Reshaping modules taught pivot tables, melt operations, stack/unstack for multi-level indices, and cross-tabulations for summarizing categorical data. GroupBy operations were covered extensively, including split-apply-combine workflows, multiple aggregation functions, transformation, and filtering within groups. Arron also learned about categorical data handling, string methods for text processing, datetime operations for time-series analysis, and performance optimization through vectorized operations instead of Python loops. Practical projects involved analyzing real-world datasets covering retail sales, weather data, and demographic statistics, strengthening Arron's ability to efficiently process and analyze large-scale tabular data for professional analytics workflows."
  },

  // --- DEVELOPMENT / SOFTWARE ---
  {
    title: "Front-End Apps with React",
    issuer: "IBM",
    date: "Recent",
    category: "Web Development",
    icon: "logo-react",
    color: "#61DAFB",
    description: "IBM's Front-End Apps with React certification provided Arron with comprehensive skills for building modern, dynamic single-page applications using React, the world's most popular JavaScript UI library. The course covered React's core concepts including JSX syntax, component architecture, props for data flow, and state management for interactive interfaces. Arron gained deep understanding of React's component lifecycle and the modern Hooks API including useState for local state, useEffect for side effects, useContext for global state, useReducer for complex state logic, and useMemo/useCallback for performance optimization. The curriculum covered client-side routing with React Router for building multi-page experiences, form handling with controlled and uncontrolled components, and asynchronous data fetching with fetch API and Axios. Advanced topics included context API for avoiding prop drilling, custom hooks for reusable logic, error boundaries for graceful failure handling, and React.lazy with Suspense for code-splitting. Arron also learned testing strategies with React Testing Library and Jest, along with build tooling using Create React App and Webpack. This certification equipped Arron to independently architect and build production-quality React applications following industry best practices."
  },
  {
    title: "HTML, CSS, JavaScript",
    issuer: "IBM",
    date: "Recent",
    category: "Web Development",
    icon: "code-outline",
    color: "#E34F26",
    description: "IBM's HTML, CSS, and JavaScript certification provided Arron with a robust foundation in the three pillars of web development. The HTML modules covered semantic markup using HTML5 elements like header, nav, main, article, section, and footer for accessible, SEO-friendly document structure. Arron learned to build forms with validation, embed multimedia content, and implement responsive images with srcset. The CSS curriculum covered the box model, Flexbox and CSS Grid for modern responsive layouts, CSS transitions and animations for engaging user experiences, and CSS custom properties for maintainable design systems. Advanced CSS topics included media queries for responsive design, pseudo-classes and pseudo-elements, specificity rules, and CSS architecture methodologies. JavaScript modules covered ES6+ features including arrow functions, destructuring, template literals, modules, and async/await for asynchronous programming. Arron gained proficiency in DOM manipulation, event handling, fetch API for HTTP requests, and local storage for client-side persistence. The course culminated in building complete responsive web applications that integrate all three technologies, solidifying Arron's understanding of how HTML structure, CSS presentation, and JavaScript interactivity work together."
  },
  {
    title: "Software Engineering",
    issuer: "IBM",
    date: "Recent",
    category: "Web Development",
    icon: "terminal-outline",
    color: "#054ADA",
    description: "IBM's Software Engineering certification provided Arron with a professional-grade understanding of the principles, methodologies, and best practices that govern the development of high-quality software systems. The course covered the complete Software Development Life Cycle (SDLC) including requirements gathering, system design, implementation, testing, deployment, and maintenance phases. Arron learned multiple development methodologies including Waterfall, Agile, Scrum, Kanban, and DevOps, understanding when each approach is most appropriate. The curriculum covered software architecture and design patterns including MVC, microservices, event-driven architecture, and API design principles for building scalable, maintainable systems. Version control with Git was taught extensively, including branching strategies like GitFlow and trunk-based development, pull request workflows, and code review best practices. Testing modules covered unit testing, integration testing, system testing, and test-driven development (TDD) methodologies. Additional topics included CI/CD pipeline design, containerization with Docker, code quality metrics, technical debt management, and documentation practices. Arron also learned project estimation techniques, requirement traceability, and stakeholder communication strategies. This certification instilled the engineering discipline needed to build professional software that is reliable, scalable, and maintainable over time."
  },
  {
    title: "Responsive Web Design",
    issuer: "freeCodeCamp",
    date: "Recent",
    category: "Web Development",
    icon: "desktop-outline",
    color: "#0A0A23",
    description: "freeCodeCamp's Responsive Web Design certification equipped Arron with comprehensive skills for building websites that deliver optimal user experiences across all device sizes, from mobile phones to large desktop monitors. The curriculum covered HTML5 semantic elements for accessible markup, CSS Flexbox for one-dimensional layouts, and CSS Grid for complex two-dimensional layouts. Arron learned mobile-first design philosophy, writing progressive media queries that add complexity for larger screens rather than removing features for smaller ones. The course covered accessibility best practices including ARIA roles, keyboard navigation, color contrast ratios, and screen reader compatibility, ensuring websites are usable by people with diverse abilities. Typography modules taught responsive font sizing, fluid typography using clamp(), and web font loading strategies. Visual design topics included color theory, whitespace management, and visual hierarchy principles. The certification required building five responsive web projects: a tribute page, a survey form, a product landing page, a technical documentation page, and a personal portfolio. Each project was evaluated against automated test suites for both functionality and accessibility compliance. This intensive, project-based certification gave Arron the confidence to build fully responsive, accessible websites from scratch."
  },
  {
    title: "GitHub Foundations",
    issuer: "GitHub",
    date: "Recent",
    category: "Web Development",
    icon: "logo-github",
    color: "#FFFFFF",
    description: "GitHub's Foundations certification provided Arron with an authoritative understanding of Git version control and the GitHub platform directly from the source. The course covered core Git concepts including repositories, commits, branches, merging, rebasing, and resolving merge conflicts, establishing a deep understanding of distributed version control workflows. Arron learned GitHub-specific features including pull requests with code review workflows, Issues and Projects for project management, GitHub Actions for CI/CD automation, and GitHub Pages for static site hosting. The curriculum covered collaboration best practices including branch protection rules, required status checks, CODEOWNERS files, and conventional commit message conventions. Advanced topics included GitHub's security features like Dependabot for dependency vulnerability scanning, secret scanning, and code scanning with CodeQL for identifying potential security issues. Arron also learned about GitHub Organizations for team management, repository templates for standardizing project structure, and GitHub API for automation. The certification validated understanding of open-source contribution workflows including forking, upstream synchronization, and contributing to large codebases. This credential demonstrates professional-level Git and GitHub proficiency essential for modern collaborative software development."
  },
  {
    title: "JavaScript Essentials 1",
    issuer: "Cisco",
    date: "Recent",
    category: "Web Development",
    icon: "logo-javascript",
    color: "#F7DF1E",
    description: "Cisco's JavaScript Essentials 1 certification provided Arron with a rigorous, structured education in the fundamental building blocks of JavaScript, the world's most widely-used programming language. The curriculum covered JavaScript's core data types (strings, numbers, booleans, null, undefined, symbols, and BigInt), variable declarations with var, let, and const, and the critical differences between them in terms of scope and hoisting. Arron gained thorough understanding of control flow structures including if/else chains, switch statements, for/while/do-while loops, and the modern for...of and for...in iteration patterns. Functions were covered extensively, from function declarations and expressions through arrow functions, closures, higher-order functions, and the arguments object. The course explored JavaScript's object-oriented capabilities including object literals, constructor functions, prototypal inheritance, and the class syntax introduced in ES6. Error handling was taught through try/catch/finally blocks and custom error types. Additional topics included array methods (map, filter, reduce, find, some, every), string manipulation, regular expressions, and JSON parsing. The certification assessed understanding through challenging coding exercises that required applying multiple concepts simultaneously to solve complex problems, ensuring genuine competency rather than surface-level familiarity."
  },
  {
    title: "Python Essentials 1 & 2",
    issuer: "Cisco",
    date: "Recent",
    category: "Web Development",
    icon: "logo-python",
    color: "#3776AB",
    description: "Cisco's Python Essentials 1 and 2 certifications provided Arron with a comprehensive, structured education in Python programming from beginner to intermediate proficiency. Python Essentials 1 covered fundamental concepts including data types, variables, operators, control flow with conditional statements and loops, functions with parameters and return values, and basic data structures like lists, tuples, dictionaries, and sets. Arron learned string formatting, list comprehensions, and file I/O operations for reading and writing text and CSV files. Python Essentials 2 advanced into object-oriented programming with classes, inheritance, polymorphism, encapsulation, and special methods (dunder methods). The curriculum covered exception handling hierarchies, generator functions and iterators, decorators for function modification, and context managers for resource management. Module development was taught including creating packages, using pip for dependency management, and understanding Python's import system. Additional topics included lambda expressions, closures, regular expressions, and working with standard library modules like os, sys, datetime, json, and collections. The combined certification validated Arron's ability to write clean, Pythonic code following PEP 8 style guidelines and professional coding standards used in industry and academic settings."
  },
  {
    title: "Python for Data Science and AI",
    issuer: "Coursera",
    date: "Recent",
    category: "Web Development",
    icon: "logo-python",
    color: "#3776AB",
    description: "Coursera's Python for Data Science and AI certification focused specifically on applying Python to data science workflows and artificial intelligence applications. The course covered Python's scientific computing ecosystem, starting with NumPy for high-performance numerical operations including array creation, indexing, broadcasting, and linear algebra operations. Arron learned pandas for tabular data manipulation including DataFrames, Series, data cleaning, merging datasets, and time-series handling. Data visualization was taught using Matplotlib for static plots, Seaborn for statistical graphics, and Plotly for interactive dashboards. The curriculum covered web scraping with BeautifulSoup and Requests for collecting data from websites, and API integration for accessing data from services like Twitter, IBM Watson, and financial data providers. Statistical analysis modules covered descriptive statistics, probability distributions, hypothesis testing, and correlation analysis. Machine learning introduction covered supervised learning with Scikit-Learn including linear regression, logistic regression, and decision trees. Arron also learned about Jupyter Notebooks as the primary development environment, including magic commands, markdown documentation, and sharing reproducible analyses. This certification bridged general Python programming with the specialized skills needed for data science and AI application development."
  },
  {
    title: "Python Project for AI",
    issuer: "Coursera",
    date: "Recent",
    category: "Web Development",
    icon: "logo-python",
    color: "#3776AB",
    description: "Coursera's Python Project for AI certification focused on the practical application of Python programming skills to build a complete, deployment-ready artificial intelligence project. Unlike theoretical courses, this project-based certification required Arron to independently architect, implement, test, and document a full AI application from concept to completion. The project involved integrating multiple Python libraries and APIs to create an intelligent system capable of processing natural language, making predictions, and delivering results through a user-facing interface. Arron applied software engineering best practices including modular code organization, virtual environment management, requirements documentation, and comprehensive error handling. The development process covered data collection and preprocessing, feature engineering, model selection and training, hyperparameter optimization, and performance evaluation using appropriate metrics. Deployment considerations included API design with Flask for serving model predictions, input validation, and response formatting. The project also required creating clear documentation including a README with setup instructions, architectural diagrams, and usage examples. Through this hands-on experience, Arron demonstrated the ability to independently deliver a complete AI solution that bridges the gap between academic machine learning and production-ready software, a critical skill for professional AI engineering roles."
  },

  // --- CYBERSECURITY ---
  {
    title: "Introduction to Cybersecurity",
    issuer: "Cisco",
    date: "Recent",
    category: "Cybersecurity",
    icon: "shield-lock-outline",
    color: "#00BCEB",
    description: "Cisco's Introduction to Cybersecurity certification provided Arron with a comprehensive foundation in information security principles, threat landscapes, and defensive strategies. The course covered the evolving nature of cyber threats including malware (viruses, worms, trojans, ransomware), social engineering attacks (phishing, spear-phishing, pretexting), denial-of-service attacks, and advanced persistent threats used by nation-state actors and organized criminal groups. Arron learned network security fundamentals including firewalls, intrusion detection and prevention systems, VPNs, and network segmentation strategies for defense-in-depth architecture. The curriculum covered cryptography concepts including symmetric and asymmetric encryption, hashing algorithms, digital signatures, and PKI infrastructure for secure communications. Access control models were explored including discretionary, mandatory, and role-based access control, along with authentication mechanisms from passwords through multi-factor authentication and biometrics. Arron also gained understanding of security governance frameworks including CIA triad (Confidentiality, Integrity, Availability), risk assessment methodologies, incident response planning, and compliance requirements like GDPR and HIPAA. The course highlighted emerging security challenges in cloud computing, IoT devices, and mobile platforms, preparing Arron to think defensively about security across the full technology stack."
  },
  {
    title: "Cybersecurity for Everyone",
    issuer: "University of Maryland",
    date: "Recent",
    category: "Cybersecurity",
    icon: "eye-off-outline",
    color: "#E03A3E",
    description: "The University of Maryland's Cybersecurity for Everyone certification provided Arron with a strategic and policy-oriented perspective on cybersecurity that extends beyond technical implementation. Taught by experts from one of America's leading cybersecurity research institutions, the course explored how cybersecurity impacts every level of an organization, from individual employees to C-suite executives and board members. The curriculum covered the historical evolution of cyber warfare, from early computer viruses to sophisticated state-sponsored attacks and the geopolitics of cyber conflict. Arron learned about cybersecurity governance frameworks including NIST Cybersecurity Framework, ISO 27001, and CIS Controls for establishing organizational security programs. Risk management modules taught how to identify, assess, and prioritize cybersecurity risks using qualitative and quantitative methodologies, and how to communicate risk to non-technical stakeholders using business-relevant language. Privacy regulations including GDPR, CCPA, and sector-specific requirements were covered in depth. The course also explored the human factors in cybersecurity, including security culture development, awareness training effectiveness, and the psychology of social engineering. Arron gained insights into incident response planning, business continuity strategies, and the legal and ethical dimensions of cybersecurity including responsible disclosure and cyber insurance. This certification provided a holistic view that complements technical security skills."
  },

  // --- TOOLS / OTHERS ---
  {
    title: "API Fundamentals Student Expert",
    issuer: "Postman",
    date: "Recent",
    category: "Certifications & Hackathons",
    icon: "rocket-outline",
    color: "#FF6C37",
    description: "Postman's API Fundamentals Student Expert certification validated Arron's comprehensive understanding of API architecture, design, and testing using the industry-leading API development platform. The course covered RESTful API principles including HTTP methods (GET, POST, PUT, PATCH, DELETE), status codes, headers, and request/response body formats with JSON and XML. Arron learned API authentication mechanisms including API keys, OAuth 2.0, Bearer tokens, and Basic authentication, understanding the security implications of each approach. The curriculum covered Postman's full feature set including creating and organizing requests in collections, using environment and global variables for managing different deployment contexts, and writing pre-request scripts and test scripts in JavaScript for automated validation. Arron gained proficiency in building comprehensive API test suites that verify response status codes, body content, headers, and response times. The course also explored API documentation generation, sharing collections through Postman workspaces, and using Collection Runner for batch execution. Advanced topics included mock servers for API prototyping, monitors for scheduled API testing, and Postman Flows for visual API workflow design. This certification positioned Arron as a proficient API developer and tester capable of integrating and validating web services professionally."
  },
  {
    title: "API Testing Learning Path",
    issuer: "Postman",
    date: "Recent",
    category: "Certifications & Hackathons",
    icon: "bug-outline",
    color: "#FF6C37",
    description: "Postman's API Testing Learning Path certification deepened Arron's expertise in automated API testing strategies and quality assurance methodologies. Building on API fundamentals, this advanced path covered systematic testing approaches including functional testing, integration testing, performance testing, and security testing for web APIs. Arron learned to write comprehensive test scripts using Postman's pm.test() framework, implementing assertions for response validation, data type checking, schema validation against JSON Schema, and response time thresholds. The curriculum covered test-driven API development, where test suites are defined before implementation to ensure contract compliance. Advanced scripting modules taught dynamic data generation using faker libraries, chaining requests where one request's response feeds into another's parameters, and implementing conditional test workflows using Postman's scripting environment. Arron gained experience integrating Postman tests into CI/CD pipelines using Newman (Postman's command-line runner) with Jenkins, GitHub Actions, and GitLab CI for continuous API validation. The course also covered contract testing for microservices architectures, ensuring backward compatibility when APIs evolve. Performance testing modules taught load testing concepts and monitoring API endpoints for uptime and reliability. This certification established Arron's ability to implement professional API quality assurance practices in modern software development workflows."
  },
  {
    title: "Working with OpenAI API",
    issuer: "DataCamp",
    date: "Recent",
    category: "Certifications & Hackathons",
    icon: "sparkles-outline",
    color: "#05E3D4",
    description: "DataCamp's Working with OpenAI API certification gave Arron practical, hands-on expertise in integrating OpenAI's powerful language models into Python applications. The course covered the complete OpenAI API ecosystem including the Chat Completions API for conversational AI, the Embeddings API for semantic search and similarity analysis, and the Assistants API for building stateful AI agents. Arron learned the nuances of model selection across the GPT family, understanding the trade-offs between capability, latency, and cost for different use cases. Prompt engineering was covered extensively, including system messages for setting model behavior, temperature and top_p parameters for controlling creativity and determinism, and structured output techniques for generating JSON and formatted responses. The curriculum covered token management including counting tokens with tiktoken, managing context window limits, and implementing truncation strategies for long conversations. Arron gained experience building practical applications including chatbots, document summarizers, code generators, and content classifiers. Advanced topics included streaming responses for real-time user experience, function calling for tool-augmented AI agents, and fine-tuning models on custom datasets for domain-specific applications. Error handling, rate limiting, and cost optimization strategies were also covered, ensuring Arron can build production-ready AI applications that are both powerful and economically sustainable."
  },
  {
    title: "Introduction to ChatGPT",
    issuer: "DataCamp",
    date: "Recent",
    category: "Certifications & Hackathons",
    icon: "chatbubble-ellipses-outline",
    color: "#05E3D4",
    description: "DataCamp's Introduction to ChatGPT certification provided Arron with a thorough understanding of ChatGPT's underlying technology, effective usage strategies, and its transformative potential across industries. The course explained the transformer architecture that powers ChatGPT, including self-attention mechanisms, pre-training on massive text corpora, and the RLHF (Reinforcement Learning from Human Feedback) alignment process that makes the model helpful and safe. Arron learned systematic prompt engineering techniques including zero-shot, few-shot, and chain-of-thought prompting for solving complex problems. The curriculum covered practical applications across numerous domains including content creation, code generation and debugging, data analysis assistance, language translation, summarization, and educational tutoring. Arron explored strategies for overcoming ChatGPT's limitations including hallucination mitigation through explicit instruction and verification prompts, context management for maintaining coherent multi-turn conversations, and persona-based prompting for specialized expertise. The course also addressed responsible AI usage including understanding model biases, copyright considerations, factual verification requirements, and privacy implications when sharing data with AI systems. Business applications covered included customer support automation, marketing content generation, and workflow optimization. Arron also learned about the competitive landscape of LLMs including comparisons with Claude, Gemini, and open-source alternatives, enabling informed technology selection for different project requirements."
  },
  {
    title: "Software Engineering Principles in Python",
    issuer: "DataCamp",
    date: "Recent",
    category: "Certifications & Hackathons",
    icon: "layers-outline",
    color: "#05E3D4",
    description: "DataCamp's Software Engineering Principles in Python certification taught Arron how to elevate Python code from functional scripts to professional, maintainable software using industry-standard engineering practices. The course covered writing clean, readable code following PEP 8 style guidelines, meaningful variable and function naming conventions, and docstring documentation standards (Google, NumPy, and Sphinx formats). Arron learned modular programming principles including function decomposition, the Single Responsibility Principle, and DRY (Don't Repeat Yourself) for eliminating code duplication. The curriculum covered Python packaging including creating distributable packages with setup.py and pyproject.toml, publishing to PyPI, and managing dependencies with requirements files and virtual environments. Testing was covered comprehensively, from unit testing with pytest and unittest through test fixtures, parameterized tests, mocking external dependencies, and measuring code coverage. Object-oriented design principles were applied including encapsulation, inheritance, composition over inheritance, and the SOLID principles. Arron also learned about continuous integration setup for Python projects, pre-commit hooks for code quality enforcement using tools like Black, Flake8, and mypy for static type checking. Version control best practices, code review workflows, and semantic versioning for library releases completed the curriculum. This certification transformed Arron's approach to Python development from writing individual scripts to building robust, testable, and shareable software systems."
  },
  {
    title: "Introduction to Figma",
    issuer: "Simplilearn",
    date: "Recent",
    category: "Certifications & Hackathons",
    icon: "logo-figma",
    color: "#F24E1E",
    description: "Simplilearn's Introduction to Figma certification equipped Arron with professional UI/UX design skills using the industry's leading collaborative design platform. The course covered Figma's complete design workflow from creating new files and setting up frames for different device sizes through designing polished, production-ready interfaces. Arron learned fundamental design principles including visual hierarchy, typography pairing, color theory, spacing systems, and grid-based layouts that ensure consistent, aesthetically pleasing designs. The curriculum covered Figma's core features including layers management, constraints and auto-layout for responsive design, boolean operations for complex shape creation, and styles for maintaining design consistency across projects. Component architecture was taught extensively, including creating reusable components with variants, building interactive prototypes with transitions and animations, and organizing design files with pages and sections. Arron also learned collaborative features including real-time multi-user editing, comments and feedback workflows, design handoff to developers with inspect mode, and CSS code generation. Advanced topics included building and maintaining design systems using shared libraries, creating style guides for brand consistency, and using plugins to accelerate workflows. The certification included designing a complete mobile application interface from wireframes through high-fidelity mockups, demonstrating the full UI design process used by professional product designers at top technology companies."
  }
];

window.CERTIFICATIONS_DATA = CERTIFICATIONS_DATA;
