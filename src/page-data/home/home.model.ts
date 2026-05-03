import { projects } from "@/page-data/projects/projects.model";
import { Theme } from "../../Theme";
import { ArrowBigRight, ExternalLink, FileText, Activity, Cpu, Network } from "lucide-react";
import { MdEmail } from "react-icons/md";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { title } from "process";

export const homeData = {
  marquee:
    "MOHAK SHARMA • COLUMBIA UNIVERSITY • NEUROSCIENCE • HEALTHTECH • FULL STACK",
  hero: {
    title: ["Mohak", "Sharma"],
    subtitle: {
      prefix:
        "Product engineer with 3+ years shipping systems that scale—combining expertise in",
      highlight1: "User Psychology & Growth Engineering",
      and: "with research in",
      highlight2: "BCI, Embodied AI & VLA Models",
    },
    buttons: [
      { text: "Contact Me", type: "primary" as const },
      { text: "Download Resume", type: "secondary" as const, href: "/mohak_sharma_resume.pdf" },
    ],
  },
  status: {
    title: "Current Status",
    lines: [
      { text: "MSCS @ Columbia", color: "text-green-400" },
      { text: "Researcher @ LIINC Lab", color: "text-purple-400" },
    ],
  },
  meta: [
    { label: "Location", value: "New York, NY" },
    // { label: "Focus", value: "Healthcare, Environment, Finance" },
  ],
  researchSpotlight: {
    title: "Long-Term Research Projects",
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
        year: "2025 - 2027",
        degree: "M.S. Computer Science",
        courses:
          "Coursework: Machine Learning, Causal Inference, Computational Neuroscience, Quantum Computing, Mechanistic Interpretibility of Neural Nets, Computer Vision, Storage Systems, Deep Learning.",
        bgColor: Theme.colors.blue[100],
      },
      {
        university: "GGSIPU (Delhi, India)",
        year: "2019 - 2023",
        degree: "B.Tech Computer Science",
        courses:
          "Coursework: Advanced Math, Physics, OOPS, Data Structures, Networks, OS, DBMS, Engineering Mechanics, Circuits & Systems, Computer Organisation & Architecture, Theory of Computation, Agile Methodologies, Switching Theory & Logical Design.",
      },
    ],
  },
  footer: {
    beyondTheCode: {
      title: "Beyond the Code",
      subtitle: "Leadership & Impact",
      sections: [
        {
          title: "Graduate Admissions Ambassador, Columbia University",
          duration: "Oct 2025 - Present",
          points: [
            "Begun outreach & mentoring efforts impacting over 2,000 potential graduate candidates annually.",
            "Serves as a primary resource during major admissions events guiding students toward informed enrollment decisions.",
          ],
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
          hoverClass: "hover:px-1 hover:bg-[#ff90e8]",
        },
        {
          text: "LinkedIn Profile",
          icon: FaLinkedin,
          href: "https://www.linkedin.com/in/sharma-mohak/",
          hoverClass: "hover:px-1 hover:bg-[#0077b5] hover:text-white",
        },
        {
          text: "Github Profile",
          icon: FaGithub,
          href: "https://github.com/Mohak327",
          hoverClass: "hover:px-1 hover:bg-[#5b21b6] hover:text-white",
        },
      ],
    },
    copyright: "© 2025 Mohak Sharma.",
  },
};
