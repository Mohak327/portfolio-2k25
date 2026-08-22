import { projects } from "@/page-data/projects/projects.model";
import { Theme } from "../../Theme";
import { ArrowBigRight, ExternalLink, FileText, Activity, Cpu, Network } from "lucide-react";
import { MdEmail } from "react-icons/md";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { title } from "process";

export const homeData = {
  marquee:
    "MOHAK SHARMA • FOUNDING ENGINEER @ SUBCONSCIOUSAI • MSCS @ COLUMBIA UNIVERSITY • USER PSYCHOLOGY • GROWTH ENGINEERING • BCI • NEUROSCIENCE",
  hero: {
    title: ["Mohak", "Sharma"],
    subtitle: {
      prefix:
        "Product engineer with 3+ years shipping systems that scale, combining expertise in",
      highlight1: "User Psychology & Growth Engineering",
      and: "with research in",
      highlight2: "BCI, Embodied AI & VLA Models",
    },
    buttons: [
      { text: "Contact Me", type: "primary" as const },
      { text: "Resume", type: "secondary" as const, href: "/mohak_sharma_resume.pdf" },
      { text: "Research CV", type: "secondary" as const, href: "/mohak_sharma_research_cv.pdf" },
    ],
  },
  status: {
    title: "Current Status",
    lines: [
      { text: "MSCS @ Columbia University", color: "text-green-400" },
      { text: "Researcher @ LIINC Lab", color: "text-purple-400" },
      { text: "Founding Engineer @ SubconsciousAI", color: "text-pink-400" },
    ],
  },
  meta: [
    { label: "Location", value: "New York, NY" },
    // { label: "Focus", value: "Healthcare, Environment, Finance" },
  ],
  researchSpotlight: {
    title: "Research Spotlight",
    items: [
      {
        title: "NeuBody",
        subtitle: "Humanoid Avatar Control in Physics Simulation",
        description: "End-to-end BCI system translating EEG motor imagery into physics-grounded humanoid actions with <100ms latency.",
        link: "/projects/neubody-embodied-ai",
        icon: Cpu,
        accentColor: Theme.colors.pink[400],
      },
      {
        title: "CLARIS-Net",
        subtitle: "Neural-Driven Control Pipeline",
        description: "BCI + RL pipeline: EEG → decoded intent → PPO/SAC refinement → natural bipedal gaits for 17-DOF agents.",
        link: "/projects/clarisnet",
        icon: Activity,
        accentColor: Theme.colors.cyan[400],
      },
      {
        title: "PhysNeRF",
        subtitle: "Physics-Grounded Perception",
        description: "Neural rendering with stratified sampling and importance sampling for physics-aware 3D scene understanding.",
        link: "/projects/physnerf-3d-reconstruction",
        icon: Network,
        accentColor: Theme.colors.yellow[400],
      },
    ],
  },
  techArsenal: {
    title: "Technical Arsenal",
    ctaLink: "/skills",
    ctaText: "Full Skill Matrix",
    ctaIcon: ArrowBigRight,
    skills: [
      // Core Competencies - High Priority
      { name: "Neural Rendering (NeRFs)", category: "vision", priority: "high" as const, color: Theme.colors.cyan[400] },
      { name: "Sim-to-Real Transfer", category: "robotics", priority: "high" as const, color: Theme.colors.purple[400] },
      { name: "EEG Signal Processing", category: "bci", priority: "high" as const, color: Theme.colors.indigo[400] },
      { name: "Reinforcement Learning (PPO/SAC)", category: "ml", priority: "high" as const, color: Theme.colors.pink[400] },
      { name: "PyTorch", category: "ml", priority: "high" as const, color: Theme.colors.pink[400] },

      // Specialized Skills - High Priority
      { name: "MuJoCo/PyBullet", category: "robotics", priority: "high" as const, color: Theme.colors.purple[400] },
      { name: "3D Reconstruction (COLMAP)", category: "vision", priority: "high" as const, color: Theme.colors.cyan[400] },
      { name: "Motor Control Systems", category: "bci", priority: "high" as const, color: Theme.colors.indigo[400] },
      { name: "Transformers/CNNs", category: "ml", priority: "high" as const, color: Theme.colors.pink[400] },

      // Supporting Technical - Medium Priority
      { name: "Volume Rendering", category: "vision", priority: "medium" as const, color: Theme.colors.cyan[400] },
      { name: "Domain Randomization", category: "robotics", priority: "medium" as const, color: Theme.colors.purple[400] },
      { name: "Contrastive Learning", category: "ml", priority: "medium" as const, color: Theme.colors.pink[400] },
      { name: "UMAP/Manifold Analysis", category: "scientific", priority: "medium" as const, color: Theme.colors.teal[400] },
      { name: "Real-Time Control", category: "bci", priority: "medium" as const, color: Theme.colors.indigo[400] },

      // Full-Stack Engineering - Medium Priority
      { name: "TypeScript/React", category: "fullstack", priority: "medium" as const, color: Theme.colors.yellow[400] },
      { name: "Next.js", category: "fullstack", priority: "medium" as const, color: Theme.colors.yellow[400] },
      { name: "GraphQL", category: "fullstack", priority: "medium" as const, color: Theme.colors.yellow[400] },
      { name: "AWS/FastAPI", category: "systems", priority: "medium" as const, color: Theme.colors.orange[400] },

      // Product & Growth - Low Priority (but relevant)
      { name: "A/B Testing", category: "product", priority: "low" as const, color: Theme.colors.lime[400] },
      { name: "SEO Optimization", category: "product", priority: "low" as const, color: Theme.colors.lime[400] },
      { name: "User Analytics", category: "product", priority: "low" as const, color: Theme.colors.lime[400] },

      // Additional Technical Depth
      { name: "OpenCV/PyTorch3D", category: "vision", priority: "medium" as const, color: Theme.colors.cyan[400] },
      { name: "Imitation Learning", category: "robotics", priority: "medium" as const, color: Theme.colors.purple[400] },
      { name: "POMDPs", category: "robotics", priority: "low" as const, color: Theme.colors.purple[400] },
      { name: "Signal Processing", category: "scientific", priority: "medium" as const, color: Theme.colors.teal[400] },
      { name: "AlphaFold2", category: "scientific", priority: "low" as const, color: Theme.colors.teal[400] },
      { name: "MongoDB/Redis", category: "systems", priority: "low" as const, color: Theme.colors.orange[400] },
    ],
  },
  experience: {
    title: "Experience",
    jobs: [
      {
        role: "Founding Causal AI Engineer",
        company: "SubconsciousAI, (New York, USA)",
        duration: "Apr 2026 - Present",
        link: undefined,
        tasks: [
          "Working directly with founder <a href='https://www.linkedin.com/in/aviyashchin'>Avi Yashchin</a> (ex-IBM Watson Research, Two Sigma; two prior exits) on a causal-inference platform for policy and market research.",
          "Rebuilt the <span class='highlight'>hierarchical Bayes conjoint estimator</span> from scratch in NumPy: a Train-style hierarchical Bayes multinomial logit with Gibbs sampling on the population mean and full covariance, Metropolis-Hastings on respondent-level coefficients, and 10k burn-in / 10k retained draws, with no PyMC or Stan. Enforced sign and monotonicity constraints inside the sampler by selecting each coefficient's distributional family (normal, lognormal, truncated-normal, negative-truncated-normal) from a constraints vector and ordering group, rather than filtering violations post-hoc, plus adaptive MH step-size targeting 30% acceptance.",
          "Implemented per-respondent willingness-to-pay in currency units from hierarchical Bayes part-worths, producing a full WTP distribution rather than a point estimate. Built the guardrail that matters more than the formula: when no monetary attribute exists, or respondents disagree on its direction, WTP is suppressed entirely rather than approximated, and flips to willingness-to-accept for benefit-direction attributes.",
          "Designed and shipped the Market Simulator, <span class='highlight'>an interactive what-if engine for market share, revenue, and price-sensitivity analysis</span>. Its Pareto Frontier view ranks every re-priced scenario by layered non-dominated sorting across three objectives (maximize share, maximize revenue, minimize price), exposing not just the efficient frontier but each point's dominance depth. Chart math included axis-break detection for sparse price ranges, sqrt-scaled bubble sizing so marker area tracks price, and log-scale flooring so near-zero-revenue scenarios stay visible.",
          "Built the <span class='highlight'>human-baseline fidelity reporting layer</span> over a <span class='highlight'>154-study social-science replication corpus</span>, plotting each paper's published AMCEs against four independent estimators (OLS, conditional logit, MNL, hierarchical Bayes) at attribute and level granularity, replacing a single correlation coefficient with auditable per-level comparison. Reused the scoring pipeline's own estimator and summary functions so report figures cannot drift from the canonical score output.",
          "Shipped Concept Testing, a second experiment type alongside conjoint that replaces attribute trade-offs with <span class='highlight'>direct concept evaluation</span>: respondents view a product concept (image, text, or A/B image pair), rate Likert statements about it, and results return as top-box scores and net endorsement, broken down by behavioral segment and the traits that over-index within each.",
          "Hardened experiment lifecycle state with a stale-pending utility dropping pending experiments by status and age, plus new killed and crashed terminal statuses threaded through the progress store and local-storage cache, resolving experiments that hung indefinitely in the UI after backend termination.",
          "Migrated the legacy R Shiny analytics stack to native Next.js: WTP distributions, importance scores, effect sizes, and demographic segmentation, unifying every chart component under one Plotly configuration with centralized Excel/PNG export.",
          "Owned LLM provider migration across Bedrock, Grok, and Databricks in the core inference path and SSE endpoints, and consolidated the Chat Agent service back to a monolith after <i>the modular split cost more than it returned</i>. Designed a unified client/server network layer replacing per-route auth wrappers, adding request-abort and SSE stream lifecycle handling.",
          "Delivered enterprise auth and access control: Auth0 organization SSO with custom-domain issuer plus fallback token verification, a role-based access endpoint, a custom login template with deploy script, and subscription tiers.",
          "Authored unit and regression tests alongside feature work: LangSmith trace fixtures, S3 failure paths, artifact-upload errors, empty-population validation, and Pareto and WTP math golden tests.",
        ],
        accent: Theme.colors.pink[400],
        bgColor: Theme.colors.white,
        doc: {
          type: "website",
          url: "https://subconscious.ai",
          title: "SubconsciousAI",
          icon: ExternalLink,
        },
      },
      {
        role: "Graduate Researcher",
        company: "Laboratory for Intelligent Imaging and Neural Computing (LIINC), Columbia University",
        duration: "Spring 2026, Fall 2026 - Present",
        link: undefined,
        tasks: [
          "Designed and ran user studies on intention decoding across multiple interaction modalities: task and stimulus design, IRB protocol support, participant recruitment, instrumentation, and synchronized multi-stream capture of <i>EEG, gaze, and behavior</i>.",
          "Built out the physiological inference pipeline over multimodal neural signals: EEG preprocessing (filtering, artifact rejection, re-referencing, epoching), gaze and pupil feature extraction, temporal alignment across asynchronous streams, and decoders mapping the fused signal onto a <span class='highlight'>latent representation of user intent</span>, with cross-participant generalization as an explicit evaluation criterion.",
          "Integrated decoded intent with embodied foundation models so downstream robot action selection and adaptation follow the operator's inferred goal rather than an explicit command.",
        ],
        accent: Theme.colors.indigo[400],
        bgColor: Theme.colors.white,
        doc: undefined,
      },
      {
        role: "Student Research Assistant",
        company:
          "Complex Resilient Intelligent Systems Laboratory (CRIS), Columbia University",
        duration: "2025 - Present",
        link: undefined,
        tasks: [
          "Leveraged <b>statistical</b> and <i>machine learning</i> models and protein structure visualization tools like ChimeraX to analyze Predicted Aligned Error (PAE) matrices, uncovering mechanistic insights into protein interactions and structural uncertainty in 400-dimensional protein structures.",
          "Probed embeddings from <span class='highlight'>200K+</span> protein structures (AlphaFold DB) across <span class='highlight'>48 transformer layers</span>.",
        ],
        accent: Theme.colors.purple[400],
        bgColor: Theme.colors.white,
        doc: {
          type: "pdf",
          url: "https://jaxfrkr4qbmgij7d.public.blob.vercel-storage.com/Mechanistic_Interpretability_of_AlphaFold2.pdf",
          title: "Mechanistic Interpretability of AlphaFold2",
          icon: FileText,
        },
      },
      {
        role: "Fullstack Growth Engineer (Forward Deployed)",
        company: "Outscal, (Delhi, India)",
        duration: "2023 - 2025",
        link: undefined,
        tasks: [
          "Overhauled a scalable web architecture with Next.js, GraphQL and software design principles, boosting page performance by 35% for 400K+ users, aligning with standards for robust, client-facing systems.",
          "Integrated Strapi as an end-to-end CMS and UI builder for real-time page creation and deployment, saving 60+ dev hours/week.",
          "Developed JIT code compiler for large-scale SaaS, cutting execution time by 40% and enabling secure, scalable, and real-time computation for users.",
          "Optimized SEO by refactoring codebase, generating XML sitemaps, and embedding structured data, resulting in improved search engine rankings and Web Vitals scores (CLS, TBT, LCP, Speed Index) by up to 800%, down to 100ms for some pages.",
          "Led risk and issue management initiatives integrating AWS CloudWatch/Lambda, reducing downtime alerts by 50%, and optimizing operational resilience with 99.99% uptime.",
          "Spearheaded targeted product A/B experiments by analyzing user funnel data, shaping business requirements with stakeholders, and collaborating across teams driving 15% conversion lift and directly impacting platform growth, sales pipeline, and customer lifetime value.",
          "Migrated JavaScript codebase into TypeScript leveraging Jules AI, Codex, and Google Gemini; leveraged AI tools to streamline code reviews and prototyping, enhancing developer productivity by ~50%."
        ],
        accent: Theme.colors.yellow[400],
        bgColor: Theme.colors.white,
        doc: {
          type: "website",
          url: "https://outscal.com",
          title: "Outscal",
          icon: ExternalLink,
        },
      },
      {
        role: "Frontend Web Developer",
        company: "Travclan, (Delhi, India)",
        duration: "2022 - 2023",
        link: undefined,
        tasks: [
          "Partnered with cross-functional teams (product, finance, operations) to translate business needs and pain points into a React-based internal admin panel, accelerating output efficiency for 250+ teammates by 40% in under 4 months.",
          "Ideated and developed features for Flight and Hotel portals of TravClan based on customer needs and inferences from user analytics, being operated by 5000+ travel agents to manage bookings of over 100,000 customers.",
          "Formulated and worked on a micro-frontend architecture in a team of two, catalyzing multi-tech stack adoption, cut build sizes by ~35%, and increased deployment frequency by 40%, boosting developer productivity.",
        ],
        accent: Theme.colors.yellow[400],
        bgColor: Theme.colors.white,
        doc: {
          type: "website",
          url: "https://www.travclan.com/home",
          title: "Travclan",
          icon: ExternalLink,
        },
      },
    ],
  },
  projects: {
    title: "Projects",
    items: projects.map((p) => ({
      id: p.id,
      link: `/projects/${p.id}`,
      focus: p.focus,
      title: p.title,
      description: p.summary,
      tags: p.tags,
      accent: p.accentColor,
      bgColor: p.accentColor,
    })),
  },
  education: {
    title: "Education",
    degrees: [
      {
        university: "Columbia University (NY, USA)",
        year: "2025 - Dec 2026",
        degree: "M.S. Computer Science",
        courses:
          "Coursework: Machine Learning, Causal Inference, Computational Neuroscience, Quantum Computing, Mechanistic Interpretibility of Neural Nets, Computer Vision, Storage Systems, Deep Learning.",
        link: undefined,
        accent: Theme.colors.blue[400],
        bgColor: Theme.colors.blue[100],
      },
      {
        university: "Guru Gobind Singh Indraprastha University (Delhi, India)",
        year: "2019 - 2023",
        degree: "B.Tech Computer Science",
        courses:
          "Coursework: Advanced Math, Physics, OOPS, Data Structures, Networks, OS, DBMS, Engineering Mechanics, Circuits & Systems, Computer Organisation & Architecture, Theory of Computation, Agile Methodologies, Switching Theory & Logical Design.",
        link: undefined,
        accent: Theme.colors.orange[400],
        bgColor: Theme.colors.white,
      },
    ],
  },
  footer: {
    beyondTheCode: {
      title: "Beyond the Code",
      subtitle: "Leadership & Impact",
      sections: [
        {
          title: "Professional Development and Leadership (PDL) Fellow, Columbia Engineering",
          duration: "Jan 2026 - Present",
          points: [
            "Selected by nomination into an invite-only cohort of under 35 graduate fellows, chosen at the end of Fall 2025 for the Jan-Dec fellowship year.",
            "Mentored directly by PDL faculty <a href='https://www.linkedin.com/in/hfgarcia' target='_blank' rel='noopener noreferrer' class='font-bold underline decoration-2 underline-offset-2 hover:bg-black hover:text-white transition-colors'>Helio Fred Garcia</a> and <a href='https://www.linkedin.com/in/chuck-garcia-015128' target='_blank' rel='noopener noreferrer' class='font-bold underline decoration-2 underline-offset-2 hover:bg-black hover:text-white transition-colors'>Chuck Garcia</a>, with standing access to a wider network of faculty, practitioners, and industry leaders through the program.",
            "Granted an expanded set of PDL offerings and direct, hands-on access to Columbia Engineering faculty and staff beyond the standard MS curriculum.",
          ],
          accent: Theme.colors.teal[400],
          bgColor: Theme.colors.white,
        },
        {
          title: "ISSO GLASS (Global Leadership Advancing Student Success), Columbia University",
          duration: "Jan 2026 - Present",
          points: [
            "Earned the Tier 1 Digital Badge by completing 5+ leadership, professional development, and intercultural-communication workshops plus the Cultural Intelligence course, across all three ISSO GLASS focus areas.",
            "Currently advancing through Tier 2 toward the Tier 3 distinction, which requires a capstone project on top of the full Tier 1-2 workshop series.",
          ],
          accent: Theme.colors.cyan[400],
          bgColor: Theme.colors.white,
        },
        {
          title: "Graduate Admissions Ambassador, Columbia University",
          duration: "Oct 2025 - Present",
          points: [
            "Begun outreach & mentoring efforts impacting over 2,000 potential graduate candidates annually.",
            "Serves as a primary resource during major admissions events guiding students toward informed enrollment decisions.",
          ],
          accent: Theme.colors.green[400],
          bgColor: Theme.colors.white,
        },
        {
          title: "Student Volunteer (Rotary Intl. Dist. 3012, NSS, GGSIPU)",
          duration: "2019 - 2024",
          points: [
            "District Editor & Events Coordinator; awarded “Pillar of the District” & “Best OC” at Rotary Youth Leadership Summit 2023.",
            "Chaired Project Aashayein; curated syllabus for 60+ children (2020–21), taught Science & Economics, trained 12 teaching volunteers.",
            "Oversaw 400% member growth, organized 300+ events, donated 100,000+ medical/sanitary kits, collected 300 kg plastic waste as ecobricks.",
            "Co-founded CodeFlux tech community scaled to 1000+ members; organized 8+ coding workshops.",
            "Co-Founded & Events Head (Cultural Committee BPIT); led 30+ technical & cultural events engaging 20,000+ students; secured $25,000 sponsorship.",
            "Redressal Committee Student Representative, responsible for over 2000 students on campus.",
            "Led cancer awareness team for Project Power of Ponytails: 10+ mammography sessions & 30+ awareness events.",
          ],
          accent: Theme.colors.orange[400],
          bgColor: Theme.colors.white,
        },
      ],
    },
    contact: {
      title: "Let's Build The Future.",
      links: [
        {
          text: "ms7306@columbia.edu",
          icon: MdEmail,
          href: "mailto:ms7306@columbia.edu",
          hoverClass: "hover:bg-[#ff90e8] hover:text-black",
        },
        {
          text: "LinkedIn Profile",
          icon: FaLinkedin,
          href: "https://www.linkedin.com/in/sharma-mohak/",
          hoverClass: "hover:bg-[#0077b5] hover:text-white",
        },
        {
          text: "Github Profile",
          icon: FaGithub,
          href: "https://github.com/Mohak327",
          hoverClass: "hover:bg-[#5b21b6] hover:text-white",
        },
      ],
    },
    copyright: "© 2026 Mohak Sharma.",
  },
};
