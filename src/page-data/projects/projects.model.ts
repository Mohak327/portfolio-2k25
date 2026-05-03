import { Theme } from "../../Theme";
import { ProjectInterface } from "./projects.interface";

export const projects: ProjectInterface[] = [
  {
    id: "spectrum-consumer-segmentation",
    title: "Spectrum: AI-Powered Consumer Segmentation SWOT Explorer",
    subtitle: "Business Intelligence for Product Strategists",
    focus: "Product Strategy / Business Intelligence",
    summary:
      "An LLM-powered business intelligence platform that generates strategic SWOT analyses for consumer segments, enabling product strategists to explore market opportunities, compare segment behaviors, and export actionable insights.",
    tags: [
      "Business Intelligence",
      "Product Strategy",
      "LLM Applications",
      "SWOT Analysis",
      "Consumer Segmentation",
      "Strategic Planning",
    ],
    github: new URL("https://github.com/Mohak327/consumer-segmentation"),
    accentColor: Theme.colors.violet[400],
    sections: [
      {
        heading: "Overview",
        content: [
          {
            type: "paragraph",
            data: "Product strategists face a recurring challenge: <b>how do you systematically evaluate market opportunities across different consumer segments without spending weeks on manual research?</b> Traditional SWOT analysis is time-consuming, subjective, and difficult to compare across multiple segments.",
          },
          {
            type: "paragraph",
            data: "<b>Spectrum</b> transforms this process by leveraging large language models to generate <span class='highlight'><b>structured, comparative SWOT analyses on demand</b></span>. Select your product, business objective (market entry, growth, retention, expansion, disruption), and target segments (Gen Z, Millennials, Early Adopters, etc.), and the system generates detailed strategic insights in seconds.",
          },
          {
            type: "paragraph",
            data: "This isn't just automated report generation—it's a <b>strategic exploration tool</b> that enables rapid hypothesis testing: 'What if we target Boomers instead of Gen Z?', 'How does our growth strategy differ between early adopters and mainstream consumers?', 'Which segment has the strongest opportunities for our product?'",
          },
        ],
      },
      {
        heading: "Why This Matters for Product Strategy",
        content: [
          {
            type: "paragraph",
            data: "Product strategy decisions are expensive. Launching a product to the wrong segment, misunderstanding competitive threats, or missing key opportunities can cost months of development time and significant capital. Yet traditional market analysis is often:",
          },
          {
            type: "list",
            data: [
              "<b>Slow:</b> Manual research and analysis takes weeks, delaying decision-making",
              "<b>Siloed:</b> Different teams produce inconsistent analyses, making comparison difficult",
              "<b>Static:</b> Once created, analyses quickly become outdated as markets evolve",
              "<b>Expensive:</b> Requires analyst time or expensive consulting engagements",
              "<b>Opaque:</b> Difficult to trace reasoning or update assumptions",
            ],
          },
          {
            type: "paragraph",
            data: "Spectrum addresses these limitations by providing <b>on-demand, structured strategic intelligence</b> that product teams can generate, compare, iterate on, and export in real-time. The system maintains consistency across analyses while allowing strategists to explore 'what-if' scenarios rapidly.",
          },
        ],
      },
      {
        heading: "Core Capabilities",
        content: [
          {
            type: "paragraph",
            data: "<b>1. Multi-Segment SWOT Generation</b>",
          },
          {
            type: "paragraph",
            data: "Input your product context (e.g., 'AI-powered fitness app'), select business objective (growth), and target segments (Gen Z, Millennials, Gen X). The system generates parallel SWOT analyses for each segment, structured around:",
          },
          {
            type: "list",
            data: [
              "<b>Strengths:</b> What advantages does your product have for this segment?",
              "<b>Weaknesses:</b> What limitations or barriers exist?",
              "<b>Opportunities:</b> What market trends or unmet needs can you capitalize on?",
              "<b>Threats:</b> What competitive or external risks should you monitor?",
            ],
          },
          {
            type: "paragraph",
            data: "Each insight includes a <b>confidence score</b> (0-1 scale) indicating how strongly the LLM believes in that assessment, enabling prioritization of high-confidence opportunities.",
          },
          {
            type: "paragraph",
            data: "<b>2. Strategic Recommendations</b>",
          },
          {
            type: "paragraph",
            data: "Beyond raw SWOT data, Spectrum generates actionable strategy documents for each segment:",
          },
          {
            type: "list",
            data: [
              "<b>Marketing OKRs:</b> Measurable objectives tailored to segment characteristics",
              "<b>Market Positioning:</b> How to differentiate your product for this audience",
              "<b>Buyer Persona:</b> Detailed demographic and psychographic profile",
              "<b>Investment Opportunities:</b> Where to allocate resources for maximum impact",
              "<b>Channels & Distribution:</b> Optimal go-to-market strategies per segment",
            ],
          },
          {
            type: "paragraph",
            data: "<b>3. Comparative Analysis</b>",
          },
          {
            type: "paragraph",
            data: "The comparison view enables side-by-side evaluation of two segments across all SWOT dimensions. This reveals critical strategic questions:",
          },
          {
            type: "list",
            data: [
              "Which segment has stronger opportunities?",
              "Where do competitive threats differ?",
              "Which segment requires less investment to reach product-market fit?",
              "How do positioning strategies need to adapt across segments?",
            ],
          },
          {
            type: "paragraph",
            data: "<b>4. Save & Export Workflow</b>",
          },
          {
            type: "paragraph",
            data: "Strategists can mark valuable insights for later reference, building a curated library of segment intelligence. Export saved insights as JSON for integration with business intelligence dashboards, presentation tools, or strategic planning documents.",
          },
        ],
      },
      {
        heading: "Technical Architecture",
        content: [
          {
            type: "paragraph",
            data: "Spectrum is built as a <b>Next.js 14 application</b> with careful separation of concerns:",
          },
          {
            type: "list",
            data: [
              "<b>Frontend:</b> React components with Zustand state management for responsive filtering and real-time updates",
              "<b>Prompt Engineering:</b> Structured prompt templates that enforce output consistency and quality across multiple LLM providers",
              "<b>LLM Integration:</b> Multi-provider architecture supporting Claude (Anthropic), GPT-4 (OpenAI), and Llama via unified client interface",
              "<b>Server Actions:</b> Next.js server actions handle prompt construction, LLM invocation, and response parsing server-side",
              "<b>Type Safety:</b> Full TypeScript implementation with strict domain contracts (SwotInsight, GenerateSwotInput, WorkspaceFilters)",
              "<b>UI Components:</b> shadcn/ui + Radix UI primitives for accessible, polished interface",
            ],
          },
          {
            type: "code",
            data: {
              language: "typescript",
              filename: "swot.ts",
              code: `// Core domain types
export type SwotInsight = {
  id: string;
  category: SwotCategory; // strengths | weaknesses | opportunities | threats
  title: string;
  detail: string;
  confidence: number; // 0..1
  segmentId: SegmentType;
  product: string;
  objective: ObjectiveType;
  createdAt: Date;
  savedAt?: Date;
};

export type GenerateSwotInput = {
  product: string;
  objective: ObjectiveType; // market_entry | growth | retention | expansion | disruption
  segments: SegmentType[]; // millennial | gen_x | gen_z | early_adopter | mainstream
  categories?: SwotCategory[];
};

export type SwotStrategyAnswers = {
  marketingOkrs: string[];
  strengths: string;
  weaknesses: string;
  opportunities: string;
  threats: string;
  marketPositioning: string;
  buyerPersona: string;
  investmentOpportunities: string;
  channelsDistribution: string;
};`,
            },
          },
          {
            type: "paragraph",
            data: "The architecture prioritizes <b>modularity and extensibility</b>: adding new LLM providers, segment types, or analysis dimensions requires minimal changes due to clean separation between prompt logic, LLM invocation, and UI rendering.",
          },
        ],
      },
      {
        heading: "Real-World Use Cases",
        content: [
          {
            type: "paragraph",
            data: "<b>Scenario 1: Market Entry Decision</b>",
          },
          {
            type: "paragraph",
            data: "A startup building an AI-powered personal finance app needs to decide which demographic to target first. Using Spectrum, they generate SWOT analyses for Gen Z, Millennials, and Gen X. The comparison reveals that while Gen Z shows high engagement potential, Millennials have stronger immediate monetization opportunities due to higher disposable income and existing fintech adoption. The team pivots their launch strategy accordingly.",
          },
          {
            type: "paragraph",
            data: "<b>Scenario 2: Competitive Threat Analysis</b>",
          },
          {
            type: "paragraph",
            data: "An established e-commerce platform wants to understand how competitive threats differ across segments. Spectrum's threat analysis reveals that Early Adopters are vulnerable to new decentralized marketplace platforms, while Mainstream consumers remain loyal due to switching costs. This insight informs differentiated retention strategies per segment.",
          },
          {
            type: "paragraph",
            data: "<b>Scenario 3: Rapid Hypothesis Testing</b>",
          },
          {
            type: "paragraph",
            data: "During a product planning meeting, the team debates whether their B2B SaaS tool should target startups or enterprises. Instead of scheduling weeks of analyst research, they generate Spectrum analyses in real-time, comparing opportunities, threats, and go-to-market strategies. The exercise surfaces non-obvious insights (e.g., enterprise sales cycles are longer but churn is lower) that shape the roadmap discussion.",
          },
        ],
      },
      {
        heading: "Technical Challenges & Solutions",
        content: [
          {
            type: "paragraph",
            data: "<b>Challenge 1: Output Consistency</b>",
          },
          {
            type: "paragraph",
            data: "LLMs are probabilistic—running the same prompt twice can yield different results. For business intelligence, this variability is problematic. <b>Solution:</b> Structured prompt templates with explicit output format requirements, JSON schema validation, and confidence scoring to flag low-quality generations.",
          },
          {
            type: "paragraph",
            data: "<b>Challenge 2: Context Window Management</b>",
          },
          {
            type: "paragraph",
            data: "Generating SWOT analyses for multiple segments with rich context can exceed token limits. <b>Solution:</b> Modular prompt construction that includes only relevant segment definitions, dynamic batching of segment analyses, and efficient caching of product context.",
          },
          {
            type: "paragraph",
            data: "<b>Challenge 3: Latency vs. Quality</b>",
          },
          {
            type: "paragraph",
            data: "Product strategists need fast iteration, but rushing LLM generation degrades output quality. <b>Solution:</b> Asynchronous generation with real-time progress indicators, client-side state management that maintains UI responsiveness, and background pre-computation for common segment combinations.",
          },
          {
            type: "paragraph",
            data: "<b>Challenge 4: Multi-Provider Reliability</b>",
          },
          {
            type: "paragraph",
            data: "Different LLM providers have different strengths, rate limits, and failure modes. <b>Solution:</b> Provider abstraction layer with unified interface, automatic fallback between providers, and provider-specific prompt tuning while maintaining consistent output schemas.",
          },
        ],
      },
      {
        heading: "Impact & Future Directions",
        content: [
          {
            type: "paragraph",
            data: "Spectrum demonstrates how <b>LLMs can augment strategic decision-making</b> without replacing human judgment. The tool accelerates the research phase, surfaces non-obvious patterns, and structures thinking—but final decisions still require domain expertise, market knowledge, and business context that humans provide.",
          },
          {
            type: "paragraph",
            data: "<b>Next Steps:</b>",
          },
          {
            type: "list",
            data: [
              "<b>Temporal Analysis:</b> Track how segment opportunities evolve over time (quarterly SWOT snapshots)",
              "<b>Competitive Intelligence:</b> Integrate competitor analysis into SWOT framework",
              "<b>Data Integration:</b> Connect to real market data (search trends, social sentiment, sales data) for grounded insights",
              "<b>Collaborative Features:</b> Multi-user workspaces where teams can comment, vote on insights, and build consensus",
              "<b>Automated Monitoring:</b> Alert strategists when significant SWOT factors change based on market signals",
            ],
          },
          {
            type: "paragraph",
            data: "The broader vision: as LLMs become more sophisticated, tools like Spectrum evolve from <b>analysis generators</b> to <b>strategic reasoning assistants</b>—systems that not only produce insights but explain their reasoning, challenge assumptions, and propose novel strategic alternatives humans might miss.",
          },
        ],
      },
    ],
  },
  {
    id: "clarisnet",
    title: "CLARISNet: Real-Time Motor Intent Decoding for Virtual Embodiment",
    subtitle: "Translating Human Movement into Naturalistic Avatar Control",
    focus: "VR/XR / Human-Computer Interaction",
    summary:
      "Decodes human motor intent in real-time and translates it into smooth, naturalistic avatar actions within richly detailed, physics-accurate virtual worlds.",
    tags: [
      "VR/XR",
      "Motor Intent Decoding",
      "Real-Time Systems",
      "Avatar Control",
      "Human-Computer Interaction",
      "Physics Simulation",
    ],
    accentColor: Theme.colors.cyan[400],
    sections: [
      {
        heading: "Overview",
        content: [
          {
            type: "paragraph",
            data: "Virtual reality promises immersive experiences, but the connection between human movement and digital embodiment often feels <b>disconnected</b>. Traditional VR systems rely on direct controller mapping or simplified gesture recognition, creating a gap between what your body intends and what your avatar does.",
          },
          {
            type: "paragraph",
            data: "<b>CLARISNet</b> bridges this gap by <span class='highlight'><b>decoding motor intent in real-time</b></span>—translating the subtle signals of human movement into smooth, naturalistic avatar actions within physics-accurate virtual worlds. The result: embodiment that feels genuinely responsive, not just reactive.",
          },
          // {
          //   type: "embed",
          //   data: {
          //     url: "https://drive.google.com/file/d/1S8pLMAydkZlm6H_Q2PF8tnhyo5Uv8GAG/view?usp=sharing",
          //     title: "CLARISNet System Demonstration",
          //     aspectRatio: "16/9",
          //   },
          // },
        ],
      },
      {
        heading: "Real-Time Motor Intent Decoding",
        content: [
          {
            type: "paragraph",
            data: "The core challenge: <b>how do we translate the rich, continuous space of human movement into avatar actions without introducing latency or jerkiness?</b>",
          },
          {
            type: "paragraph",
            data: "CLARISNet approaches this as a <b>real-time signal processing problem</b>:",
          },
          {
            type: "list",
            data: [
              "<b>Intent Extraction:</b> Capture high-fidelity movement signals (IMUs, depth cameras, hand tracking) at 90+ Hz",
              "<b>Temporal Modeling:</b> Neural networks learn temporal patterns in movement—anticipating intent from motion trajectories",
              "<b>Latency Minimization:</b> End-to-end pipeline operates in < 20ms to maintain immersion (below human perception threshold)",
              "<b>Smoothness Constraints:</b> Avatar motions follow natural biomechanical constraints, avoiding impossible transitions",
              "<b>Context Awareness:</b> System adapts based on virtual environment (running vs. climbing vs. manipulating objects)",
            ],
          },
          {
            type: "paragraph",
            data: "The key insight: <b>motor intent isn't just about what you're doing now—it's about predicting what you're about to do</b>, enabling proactive avatar control that feels effortless.",
          },
        ],
      },
      {
        heading: "Physics-Accurate Virtual Worlds",
        content: [
          {
            type: "paragraph",
            data: "Naturalistic avatar control isn't just about decoding intent—it's about <b>integrating that intent with physics simulation</b> so movements feel grounded, not floating.",
          },
          {
            type: "paragraph",
            data: "CLARISNet operates within physics engines (Unity, Unreal, custom simulators) that enforce:",
          },
          {
            type: "list",
            data: [
              "<b>Collision Detection:</b> Avatars can't clip through walls; hands must physically interact with objects",
              "<b>Force & Momentum:</b> Jumping, pushing, lifting follow Newtonian mechanics",
              "<b>Balance & Stability:</b> Avatars maintain center-of-mass constraints, preventing impossible poses",
              "<b>Material Properties:</b> Surfaces have friction, elasticity, weight—interactions feel authentic",
            ],
          },
          {
            type: "paragraph",
            data: "The challenge: <b>motor intent signals must be translated into physics-compatible actions</b>. You can't just teleport an avatar's hand to match your real hand—the system must compute a physically valid trajectory that respects collisions and dynamics.",
          },
          {
            type: "paragraph",
            data: "This integration enables applications where <b>physical realism matters</b>: surgical training simulations, industrial assembly practice, accessibility interfaces where users with limited mobility control avatars with full range of motion.",
          },
        ],
      },
      {
        heading: "Technical Challenges",
        content: [
          {
            type: "paragraph",
            data: "Building a real-time motor intent system for VR involves navigating multiple technical constraints:",
          },
          {
            type: "list",
            data: [
              "<b>Latency Budget:</b> End-to-end system must process signals, decode intent, compute physics, and render in < 20ms (for 90 Hz VR)",
              "<b>Signal Noise:</b> IMU drift, occlusion in depth cameras, jittery hand tracking—robust filtering without adding lag",
              "<b>Individual Variability:</b> People move differently—calibration and personalization without lengthy setup",
              "<b>Ambiguous Intent:</b> Is the user reaching for an object or just gesturing? Context-aware disambiguation in real-time",
              "<b>Physics Solver Stability:</b> Bridging discrete control inputs with continuous physics simulation without instability",
              "<b>Multimodal Fusion:</b> Combining heterogeneous sensor streams (vision, inertial, audio) with different sampling rates and noise profiles",
            ],
          },
          {
            type: "paragraph",
            data: "These constraints mirror the challenges in <b>robotics teleoperation and control</b>: translating human commands into robot actions under strict timing constraints, noisy sensing, and physics constraints.",
          },
        ],
      },
      {
        heading: "Applications & Impact",
        content: [
          {
            type: "paragraph",
            data: "Real-time motor intent decoding enables applications where <b>embodiment quality directly impacts outcomes</b>:",
          },
          {
            type: "list",
            data: [
              "<b>Medical Training Simulations:</b> Surgeons practice procedures in VR with haptic feedback—intent decoding ensures tool control feels precise, not laggy",
              "<b>Industrial Training:</b> Workers learn complex assembly tasks in virtual factories—naturalistic hand movements translate to virtual tool manipulation",
              "<b>Telepresence & Remote Work:</b> Control remote avatars or robotic proxies with your body—low latency enables real-time collaboration across distances",
              "<b>Accessibility Interfaces:</b> Users with limited mobility control full-body avatars—motor intent extracted from smaller movements (head tracking, eye gaze, residual limb motion)",
              "<b>Entertainment & Social VR:</b> Expressive avatars that mirror subtle body language—enhancing social presence and immersion",
            ],
          },
          {
            type: "paragraph",
            data: "The broader impact: as VR/XR becomes more prevalent in work, education, and social interaction, <b>the quality of embodiment determines whether these experiences feel empowering or alienating</b>. CLARISNet pushes toward the former.",
          },
          {
            type: "paragraph",
            data: "The techniques developed here—real-time signal processing, latency-constrained ML, physics-aware control—translate directly to <b>robotics teleoperation</b>, where human operators control robots in real-world environments with similar constraints.",
          },
        ],
      },
    ],
  },
  {
    id: "neubody-embodied-ai",
    title: "NeuBody: Embodied AI for Humanoid Robotics",
    subtitle: "PhD Research Proposal",
    focus: "Embodied AI / Robotics",
    summary:
      "Research proposal exploring embodied artificial intelligence for humanoid robots, integrating perception, control, and learning in physical environments.",
    tags: [
      "Embodied AI",
      "Humanoid Robotics",
      "Sensorimotor Control",
      "Robot Learning",
      "Physical Intelligence",
    ],
    accentColor: Theme.colors.pink[400],
    sections: [
      {
        heading: "Research Vision",
        content: [
          {
            type: "paragraph",
            data: "This PhD research proposal explores the frontiers of <b>embodied artificial intelligence</b>—building machines that don't just think, but act intelligently in physical space. Unlike pure software AI, embodied systems must bridge the gap between digital computation and messy, real-world physics.",
          },
          {
            type: "paragraph",
            data: "The focus on humanoid robotics is deliberate: <span class='highlight'><b>human environments were designed for human bodies</b></span>. Shipyards, construction sites, factories—these spaces don't need to be redesigned if the robot shares our form factor. But humanoid morphology brings unique challenges: balance, dexterity, redundant degrees of freedom, and the curse of dimensionality in control spaces.",
          },
        ],
      },
      {
        heading: "Core Research Questions",
        content: [
          {
            type: "list",
            data: [
              "<b>Sensorimotor Integration:</b> How do robots learn coordinated actions from high-dimensional sensory input (vision, proprioception, force sensors)?",
              "<b>Sample Efficiency:</b> Real robots can't train for millions of episodes like simulations—how do we learn from sparse real-world data?",
              "<b>Sim-to-Real Transfer:</b> What simulation fidelity is sufficient for policies to generalize to physical hardware?",
              "<b>Safety & Robustness:</b> How do humanoid robots operate safely around humans in unstructured environments?",
              "<b>Physical Reasoning:</b> Can robots predict the consequences of their actions on deformable objects, fluids, or articulated structures?",
            ],
          },
        ],
      },
      {
        heading: "Connection to Industrial Robotics",
        content: [
          {
            type: "paragraph",
            data: "This research directly addresses deploying humanoid robots in industrial settings where structured environments don't exist. Shipyards, construction zones, and energy infrastructure present challenges that wheeled robots or fixed manipulators can't solve:",
          },
          {
            type: "list",
            data: [
              "Navigating cluttered, dynamic workspaces (debris, tools, human workers)",
              "Manipulating heavy, awkward objects that require whole-body coordination",
              "Operating in extreme conditions (temperature, vibration, confined spaces)",
              "Adapting to novel tasks without extensive reprogramming",
            ],
          },
          {
            type: "paragraph",
            data: "The key insight: <b>embodied intelligence isn't just about better algorithms—it's about tight coupling between perception, planning, and control at every timescale</b>, from millisecond reflexes to minute-scale task planning.",
          },
        ],
      },
      {
        heading:
          "The Scientific Foundation: Body Ownership & Visuomotor Contingency",
        content: [
          {
            type: "paragraph",
            data: "<b>The Key Scientific Insight:</b>",
          },
          {
            type: "paragraph",
            data: "Body ownership—the feeling that a body part belongs to you—requires <b>visuomotor contingency</b>: the visual system must see the body respond <i>exactly as the motor system predicted</i>. The classic rubber hand illusion (Botvinick & Cohen, 1998) demonstrates this: when a fake hand is stroked in synchrony with your real (hidden) hand, your brain attributes ownership to the fake hand. But introduce a 300ms delay, and ownership breaks entirely.",
          },
          {
            type: "paragraph",
            data: "<span class='highlight'><b>No existing BCI or avatar system models this computationally. NeuBody does.</b></span>",
          },
          {
            type: "paragraph",
            data: "The core principle: <b>the brain predicts sensory consequences of motor commands</b> (forward models). When visual feedback matches predictions within ~100ms, ownership occurs. When latency exceeds ~200-300ms, the prediction-feedback loop desynchronizes, and the sense of embodiment collapses.",
          },
          {
            type: "paragraph",
            data: "NeuBody computationally models this prediction-feedback loop, enabling systems that maintain embodiment under real-world constraints: network jitter, sensor noise, computational latency.",
          },
        ],
      },
      {
        heading: "Why This Is Exactly the Teleoperation Problem",
        content: [
          {
            type: "paragraph",
            data: "Shipyard operators piloting a humanoid robot face the same neuroscience constraint: <b>they need to inhabit the robot, not puppet it</b>.",
          },
          {
            type: "paragraph",
            data: "The moment XR latency breaks visuomotor contingency—when the operator commands the robot's hand to move but visual feedback arrives 300ms late—the operator loses spatial confidence. They're no longer <i>in</i> the robot; they're watching a delayed video feed and guessing. <span class='highlight'><b>This is a safety risk</b></span>.",
          },
          {
            type: "paragraph",
            data: "Consider the operational scenario:",
          },
          {
            type: "list",
            data: [
              "Operator in VR headset controls humanoid robot 100 meters away in a shipyard",
              "Network latency: 50-150ms variable (wireless in industrial environment)",
              "Robot sensor → video encode → network → decode → VR display: adds 30-80ms",
              "Motor command → robot actuator → visual feedback loop: 80-230ms total",
              "Threshold for body ownership breakdown: ~200-300ms",
            ],
          },
          {
            type: "paragraph",
            data: "NeuBody's computational framework addresses this by:",
          },
          {
            type: "list",
            data: [
              "<b>Predictive Rendering:</b> Generate predicted visual feedback locally (< 20ms) while waiting for actual robot sensor data",
              "<b>Forward Model Correction:</b> When real sensor data arrives, compute prediction error and smoothly update rendered view",
              "<b>Latency Compensation:</b> Operator's brain receives timely visuomotor contingency even when physical robot lags",
              "<b>Degradation Gracefully:</b> When latency exceeds thresholds, system explicitly signals loss of embodiment rather than creating false confidence",
            ],
          },
          {
            type: "paragraph",
            data: "This isn't abstract neuroscience—it's <b>the scientific framework for safe, effective robotic teleoperation</b>. I'm building the computational models of embodiment. I want to apply them to real metal in real shipyards.",
          },
        ],
      },
      {
        heading: "Technical Approach",
        content: [
          {
            type: "paragraph",
            data: "The research combines insights from neuroscience, control theory, and machine learning:",
          },
          {
            type: "list",
            data: [
              "<b>Hierarchical Control:</b> Low-level stabilization (balance, contact management) + high-level task planning (object manipulation, locomotion)",
              "<b>Model-Based + Model-Free RL:</b> Physics models for sample efficiency, learned policies for adaptation",
              "<b>Multimodal Perception:</b> Fusion of vision, force, and proprioceptive feedback for robust state estimation",
              "<b>Teleoperation as Supervision:</b> Learning from human demonstrations in real environments",
            ],
          },
        ],
      },
      {
        heading: "Why This Matters for Industrial Robotics",
        content: [
          {
            type: "paragraph",
            data: "Industrial humanoid robotics is the <b>ultimate test of embodied AI</b>. Academic benchmarks (pick-and-place, locomotion on flat ground) don't capture the complexity of real deployment:",
          },
          {
            type: "list",
            data: [
              "Shipyard welding requires sub-millimeter precision while compensating for ship motion and vibration",
              "Construction tasks involve unpredictable object properties (weight distribution, friction, rigidity)",
              "Energy infrastructure inspection demands climbing, crawling, and operating in GPS-denied environments",
            ],
          },
          {
            type: "paragraph",
            data: "This research proposal isn't just theoretical—it's a roadmap for building the <b>nervous system</b> that industrial humanoid robots need to operate autonomously in the real world.",
          },
        ],
      },
    ],
  },

  {
    id: "auditory-system-emulation",
    title: "Sing Me A Song: Building A Digital Human Ear",
    subtitle: "From Sound Wave To Spikes",
    focus: "Computational Neuroscience",
    summary:
      'An end-to-end digital model of the human auditory pathway that takes raw sound, passes it through cochlear-like filtering, hair cell transduction, and spiking neuron populations, and then attempts to reconstruct what the ear "hears" from those neural signals.',
    tags: ["Auditory Signal Processing", "Neural Encoding"],
    role: "Researcher / Engineer",
    github: new URL("https://github.com/Mohak327/sing-me-a-song"),
    accentColor: Theme.colors.indigo[400],
    sections: [
      {
        heading: "Overview",
        content: [
          {
            type: "paragraph",
            data: 'Hearing starts long before the brain ever "recognizes" a voice or a melody; it begins as raw air pressure ripples hitting the eardrum and being mechanically and electrically transformed by the ear into spikes along the auditory nerve. This project is an attempt to turn that entire chain into code: a digital ear that takes in a waveform and walks it through the same conceptual stages as the human auditory periphery.',
          },
          {
            type: "paragraph",
            data: "Instead of stopping at a spectrogram or a simple transform, the pipeline explicitly models cochlear filterbanks, inner hair cell nonlinearities, and spiking neuron populations, treating them as successive encoding layers. The goal is not just to analyze sound, but to emulate how the ear itself might encode that sound into patterns of spikes that the brain can read.",
          },
        ],
      },
      {
        heading: "Why A Digital Ear?",
        content: [
          {
            type: "paragraph",
            data: "Most audio projects treat the ear as an invisible black box: they feed in a waveform, compute some features, and train a model, without ever asking how biological hearing actually transforms that waveform. This project came from wanting to trace that path explicitly, step by step, from basilar membrane motion to neural firing, and to see what information survives each transformation.",
          },
          {
            type: "paragraph",
            data: "By implementing a simplified version of each stage—filterbanks for the cochlea, nonlinear transduction for hair cells, and leaky integrate-and-fire or Hodgkin–Huxley neurons for the auditory nerve—the code becomes a sandbox for asking concrete questions. What does a voice look like as cochlear channel outputs, how do spikes tile time and frequency, and how much of the original sound can be recovered if all you are given is the neural activity?",
          },
        ],
      },
      {
        heading: "Inside The Pipeline",
        content: [
          {
            type: "paragraph",
            data: "The system begins with loading and preprocessing audio, then feeds it through a bank of bandpass filters that approximate tonotopic organization along the cochlea, producing multiple frequency channels that mimic basilar membrane motion. Inner hair cell models then apply nonlinear transformations to convert these mechanical-like signals into receptor potentials.",
          },
          {
            type: "paragraph",
            data: "These processed signals drive a population of model neurons—implemented as leaky integrate-and-fire or Hodgkin–Huxley units—whose spikes stand in for auditory nerve activity. From there, the project can derive neurograms, spike rasters, and, crucially, attempt audio reconstruction via vocoder-style decoding from channel-wise envelopes and firing rates, closing the loop from sound to spikes and back.",
          },
          {
            type: "code",
            data: {
              language: "python",
              filename: "neuron_model.py",
              code: `class LeakyIntegrateFireNeuron:
    def __init__(self, threshold=1.0, leak=0.1):
        self.threshold = threshold
        self.leak = leak
        self.potential = 0.0
        self.spike_times = []

    def integrate(self, input_current, dt, time):
        # Leak and integrate
        self.potential += input_current * dt
        self.potential *= (1 - self.leak * dt)

        # Check for spike
        if self.potential >= self.threshold:
            self.spike_times.append(time)
            self.potential = 0.0  # Reset
            return True
        return False`,
            },
          },
        ],
      },
      {
        heading: "Real-Time Performance Characteristics",
        content: [
          {
            type: "paragraph",
            data: "<b>System Specifications:</b>",
          },
          {
            type: "list",
            data: [
              "<b>Temporal Resolution:</b> Sub-millisecond spike timing precision (< 1 ms)",
              "<b>Cochlear Channels:</b> 128 independent frequency bands (50 Hz - 8 kHz)",
              "<b>Reconstruction Quality:</b> SNR 30-40 dB for bandlimited signals",
              "<b>Processing Latency:</b> Real-time encoding with microsecond-scale neuron dynamics",
              "<b>Spike Rate:</b> Up to 200 spikes/sec per neuron (physiologically realistic)",
              "<b>Audio Sampling:</b> 44.1 kHz input → neural spike trains → reconstructed waveform",
            ],
          },
          {
            type: "paragraph",
            data: "These metrics demonstrate that the digital ear achieves biologically plausible temporal coding—the same precision required for real-time audio processing in robotics applications like speech recognition, environmental sound localization, and acoustic event detection.",
          },
        ],
      },
      {
        heading: "What Next?",
        content: [
          {
            type: "paragraph",
            data: "<b>Toward Perception-Aware Audio And Neural Experiments</b>",
          },
          {
            type: "paragraph",
            data: "Right now, the model is a deliberately simplified but end-to-end pipeline; it captures the main stages of the auditory periphery without yet modeling all the biophysical and adaptive complexity of real ears. Next steps include richer cochlear mechanics, more realistic hair cell dynamics, adaptive gain and compression, and more detailed auditory nerve coding strategies such as phase locking limits and multiple fiber types.",
          },
          {
            type: "paragraph",
            data: "Beyond biological fidelity, this digital ear can serve as a front-end for machine learning models that work on neural-like representations instead of raw waveforms, or as a testbed for questions about information loss, robustness, and perception. How much intelligibility survives different lesions or noise levels, where in the pipeline resolution is most precious, and what kinds of synthetic sounds emerge if one optimizes directly in spike space are all experiments this project is designed to eventually make possible.",
          },
        ],
      },
    ],
  },
  {
    id: "dft-image-reconstruction",
    title: "WYSIWYG: Image Reconstruction with 2D Fourier Transform",
    subtitle: "Visualizing Image Reconstruction with Fourier Transform",
    focus: "Computational Imaging",
    summary:
      "Exploring the decomposition and reconstruction of images using 2D Fourier Transform (DFT) to understand the role of frequency components in image structure.",
    tags: [
      "Signal Processing",
      "Fourier Transform",
      "Computer Vision",
      "Signal Processing",
      "Computational Imaging",
    ],
    // role: "Researcher / Engineer",
    github: new URL("https://github.com/Mohak327/2D-DFT-Visualisation"),
    accentColor: Theme.colors.red[400],
    sections: [
      {
        heading: "Overview",
        content: [
          {
            type: "paragraph",
            data: "There is something wild about realizing that <span class='highlight'><b>every scene, every photograph, every pattern your eyes can register is, at some level, just a particular mixture of waves</b></span>. Even beyond what humans can see, there is an endless spectrum of frequencies, and yet with the right combination of them, you can recreate any image, any signal, with almost absurd precision. The idea that an image of a face, a galaxy, or a handwritten digit can all be broken down into oscillations—and then rebuilt from those oscillations—makes the Fourier transform feel less like a technical tool and more like a fundamental language of structure and pattern.",
          },
          {
            type: "paragraph",
            data: "Encountering the discrete and fast Fourier transform in a quantum computing class made this even more striking: here was the same mathematical idea quietly real-world signal processing and the inner workings of quantum algorithms. The leap from <b>“here is a beautiful equation”</b> to <b>“this is the backbone of how we analyze, compress, and reconstruct information”</b> was what made the topic feel genuinely powerful rather than just exam material. It suggested that underneath the complexity of images and signals, there is a very clean, almost musical structure waiting to be exposed by the right transform.",
          },
        ],
      },
      {
        heading: "Why Visualize Image Reconstruction?",
        content: [
          {
            type: "paragraph",
            data: "This project grew out of wanting to see that structure in action instead of only trusting the theory. If a 2D Fourier transform can really decompose an image into a sum of oscillations, then an equally important part of the story is watching those oscillations put the image back together. Building a simple visualizer that reconstructs an image step by step from its frequency components became the first thing to try: a way to watch low frequencies paint the broad strokes and high frequencies carve in the details, frame by frame. It was a small, concrete experiment to feel the power of the Fourier transform, not just admire it on the page.",
          },
        ],
      },
      {
        heading: "What Next?",
        content: [
          {
            type: "paragraph",
            data: "<b>Image Quality, Super-Resolution, and Generation</b>",
          },
          {
            type: "paragraph",
            data: "While this project focuses on visualizing reconstruction from existing frequency components, the same ideas extend to improving or generating images by learning to <b>“fill in”</b> missing frequencies. In modern computer vision, many super-resolution and inpainting methods explicitly operate in, or are constrained by, the frequency domain to recover high-frequency details that make images look sharper and more realistic.",
          },
          {
            type: "paragraph",
            data: "Conceptually, one can train ML models on images’ frequency representations to predict or refine high-frequency components, effectively adding back detail that was lost due to downsampling, blur, or corruption—this is the core of frequency-aware <b><span class='highlight'>“image super-resolution”</span></b> and <b><span class='highlight'>frequency-guided inpainting</span></b>. This project sits as a foundational step in that direction: it builds intuition for how frequencies encode structure and detail, which is exactly what these models learn to manipulate when improving image quality or reconstructing missing content.",
          },
        ],
      },
    ],
  },
  {
    id: "nerf-3d-reconstruction",
    title: "Neural Radiance Fields: 2D & 3D Scene Reconstruction",
    subtitle: "From Image Fitting to Multi-View 3D Rendering",
    focus: "Computer Vision / 3D Reconstruction",
    summary:
      "Implemented coordinate-based neural fields for 2D image reconstruction and full NeRF pipeline for 3D scene reconstruction from multi-view images.",
    tags: [
      "Neural Radiance Fields",
      "3D Reconstruction",
      "Computer Vision",
      "Positional Encoding",
      "Volume Rendering",
      "PyTorch",
    ],
    github: new URL(
      "https://github.com/Mohak327/computer-vision-projects/tree/reconstruction-using-nerf",
    ),
    accentColor: Theme.colors.teal[400],
    sections: [
      {
        heading: "Overview",
        content: [
          {
            type: "paragraph",
            data: "Neural Radiance Fields (NeRFs) represent a paradigm shift in 3D scene representation—instead of explicit geometry like meshes or point clouds, NeRF learns a <b>continuous volumetric function</b> that maps 3D coordinates to color and density. This project implements the full NeRF pipeline from scratch, starting with 2D neural field fitting and scaling to full 3D multi-view reconstruction.",
          },
          {
            type: "paragraph",
            data: "The work demonstrates two core insights: (1) <span class='highlight'><b>coordinate-based neural networks can represent complex signals</b></span> by learning implicit continuous functions, and (2) volumetric rendering with hierarchical sampling enables photorealistic novel view synthesis from sparse training views.",
          },
        ],
      },
      {
        heading: "Part 1: 2D Neural Field Fitting",
        content: [
          {
            type: "paragraph",
            data: "Before tackling 3D, the project starts with fitting a neural network to a 2D image—a conceptually simpler problem that builds intuition for coordinate-based representations. The network learns a mapping from pixel coordinates <code>(x, y)</code> to RGB values <code>(r, g, b)</code>.",
          },
          {
            type: "paragraph",
            data: "<b>Technical Implementation:</b>",
          },
          {
            type: "list",
            data: [
              "<b>Sinusoidal Positional Encoding:</b> Raw pixel coordinates lack high-frequency detail. Applied positional encoding with frequency level L=12 to enable the MLP to capture fine textures",
              "<b>MLP Architecture:</b> 5 hidden layers with 384 neurons each, ReLU activations, Sigmoid output layer to constrain RGB to [0, 1]",
              "<b>Random Pixel Sampling:</b> Train on 10K randomly sampled pixels per iteration to handle high-resolution images within GPU memory constraints",
              "<b>Optimization:</b> Adam optimizer with learning rate decay from 0.008 to 0.0002 over 2600 steps",
              "<b>Hyperparameter Grid Search:</b> Evaluated 2x2 grid across L (frequency levels) and network width to find optimal configuration",
            ],
          },
          {
            type: "paragraph",
            data: "<b>Results:</b> Baseline PSNR 25.43 dB → Optimized 27.37 dB (+1.95 dB improvement). Best grid config: L=10, width=256 (25.70 dB).",
          },
        ],
      },
      {
        heading: "Part 2: Full NeRF 3D Reconstruction",
        content: [
          {
            type: "paragraph",
            data: "The 3D extension uses the classic NeRF formulation: represent a scene as a continuous 5D function <code>F(x, y, z, θ, φ) → (r, g, b, σ)</code> that maps 3D position and 2D viewing direction to RGB color and volume density.",
          },
          {
            type: "list",
            data: [
              "<b>Camera Ray Generation:</b> Convert multi-view camera poses and intrinsics into 3D rays through each pixel",
              "<b>Coarse-to-Fine Sampling:</b> Initial uniform sampling along rays (32 points), then importance sampling (32 additional points) based on coarse density",
              "<b>Volume Rendering:</b> Numerically integrate color and density along rays using quadrature to produce final pixel RGB",
              "<b>Hierarchical Training:</b> Train coarse and fine networks jointly, with fine network focusing on high-density regions",
            ],
          },
          {
            type: "paragraph",
            data: "<b>Results:</b> Best Validation PSNR 23.95 dB (step 4000), Final Loss 0.00514. Successfully reconstructs complex geometry with photorealistic quality and accurate depth maps.",
          },
        ],
      },
      {
        heading: "Key Takeaways & Applications",
        content: [
          {
            type: "paragraph",
            data: "<b>Coordinate-based neural representations</b> offer powerful advantages over explicit 3D geometry: arbitrary resolution rendering, compact storage, differentiable rendering, and view-dependent effects.",
          },
          {
            type: "paragraph",
            data: "<b>Applications:</b>",
          },
          {
            type: "list",
            data: [
              "<b>Robotics:</b> 3D environment mapping for navigation from helmet-cam footage",
              "<b>AR/VR:</b> Photorealistic scene reconstruction for mixed-reality applications",
              "<b>Digital Twins:</b> Virtual replicas of construction sites and factories for planning",
              "<b>Medical Imaging:</b> 3D reconstruction from sparse CT/MRI slices",
            ],
          },
        ],
      },
    ],
  },
  {
    id: "causalbench-llm-reasoning",
    title: "Teaching LLMs to Think Causally: CausalBench",
    subtitle: "Exposing AI's Causal Reasoning Gaps",
    focus: "Causal ML / AI Safety",
    summary:
      "A benchmark and training platform for evaluating and improving causal reasoning in large language models through systematic testing of counterfactual inference capabilities.",
    tags: [
      "Causal Inference",
      "Large Language Models",
      "Structural Causal Models",
      "Counterfactual Reasoning",
      "AI Safety",
      "Multi-Agent Systems",
    ],
    github: new URL("https://github.com/Mohak327/llm-causal-bench"),
    accentColor: Theme.colors.orange[400],
    sections: [
      {
        heading: "Overview",
        content: [
          {
            type: "paragraph",
            data: "As the academic semester wrapped up in late December, we took on a winter break project from Professor Elias Bareinboim to evaluate whether state-of-the-art LLMs (GPT-4, Claude Sonnet 4.5, Gemini Pro) can perform proper causal inference. What seemed straightforward revealed a fascinating gap: <span class='highlight'><b>modern AI systems excel at pattern matching but struggle with the logical structure of cause and effect</b></span>.",
          },
          {
            type: "paragraph",
            data: "The project began with handcrafting 25 scenarios, each designed to expose one of three fundamental causal reasoning errors that LLMs consistently make when attempting counterfactual inference. What made this challenging was designing scenarios that truly test causal understanding without linguistic ambiguity or loopholes—an exercise that gave me new appreciation for how sophisticated modern LLMs are, even when they fail in subtle ways.",
          },
        ],
      },
      {
        heading: "The Three Types of Causal Errors",
        content: [
          {
            type: "paragraph",
            data: "<b>Type I - Ignoring Downstream Effects:</b> Models change an intervention variable but fail to update the consequences that should logically follow. For example, intervening to set 'rain = true' while leaving 'ground = dry' unchanged.",
          },
          {
            type: "paragraph",
            data: "<b>Type II - Backtracking on Fixed Causes:</b> Models 'rewrite history' by altering upstream variables that were explicitly held constant in the counterfactual scenario. This violates the fundamental principle that interventions don't change their causes.",
          },
          {
            type: "paragraph",
            data: "<b>Type III - Correlation ≠ Causation:</b> Models confuse statistical patterns with causal relationships, often due to training biases. They see that X and Y co-occur frequently and assume one causes the other, missing confounders or reverse causality.",
          },
        ],
      },
      {
        heading: "Building CausalBench",
        content: [
          {
            type: "paragraph",
            data: "To systematize and scale this evaluation, I built <b>CausalBench</b>, an application for generating Structural Causal Models (SCMs), posing counterfactual queries, and benchmarking multiple LLMs against ground-truth causal logic. The platform allows researchers to:",
          },
          {
            type: "list",
            data: [
              "Generate SCMs with explicit causal structures and functional relationships",
              "Pose counterfactual queries that test specific reasoning capabilities",
              "Evaluate multiple LLM responses against formal causal inference algorithms",
              "Classify errors into the three causal violation types",
              "Track performance across different model families and versions",
            ],
          },
          {
            type: "paragraph",
            data: "The real value of CausalBench isn't just measurement—it's that <span class='highlight'><b>every failure becomes a labeled training signal</b></span> about how the model is mis-tracking the underlying causal structure of a system.",
          },
        ],
      },
      {
        heading: "Multi-Agent Coordination & Distributed Intelligence",
        content: [
          {
            type: "paragraph",
            data: "Beyond evaluation, the next phase transforms CausalBench into a training platform through a multi-agent self-learning loop—a distributed system where multiple AI agents coordinate, debate, and refine causal reasoning:",
          },
          {
            type: "ordered-list",
            data: [
              "<b>Generation:</b> Use one model to propose diverse SCMs and counterfactual scenarios",
              "<b>Council Debate:</b> Pass SCMs to multiple models that independently compute interventional answers and debate their responses",
              "<b>Error Classification:</b> Identify disagreements and mistakes, classifying them into the three causal error types using CausalBench's evaluation layer",
              "<b>Policy Training:</b> Train a policy to answer scenarios correctly, explicitly rewarding SCM-consistent reasoning and penalizing causal violations",
            ],
          },
          {
            type: "paragraph",
            data: "This architecture mirrors <b>distributed robot coordination</b>: multiple agents (robots/LLMs) observe the same environment (SCM), independently compute actions (causal interventions), reach consensus through debate (error detection), and refine their control policies. The challenge isn't just individual intelligence—it's coordinating multiple reasoning systems to achieve collective correctness.",
          },
          {
            type: "paragraph",
            data: "The long-term goal is a benchmark that not only measures causal reasoning, but <b>trains future LLMs to reason about causality</b>, not just give statistically likely answers. This shifts from 'what patterns appear in training data' to 'what would happen if we changed this variable, holding everything else fixed'—the same mental model required for robot manipulation planning.",
          },
        ],
      },
      {
        heading: "Technical Implementation",
        content: [
          {
            type: "list",
            data: [
              "SCM Framework: Built a flexible system for representing causal graphs, functional equations, and intervention operators",
              "Query Generation: Automated creation of counterfactual scenarios that systematically test different reasoning capabilities",
              "LLM Integration: API connectors for GPT-4, Claude, and Gemini with structured output parsing",
              "Ground Truth Computation: Implementation of Pearl's do-calculus and counterfactual inference algorithms",
              "Error Analysis: Automated classification system that maps LLM responses to specific causal violation patterns",
              "Visualization: Interactive displays of causal graphs, intervention results, and model comparison dashboards",
            ],
          },
          {
            type: "code",
            data: {
              language: "python",
              filename: "scm_intervention.py",
              code: `class StructuralCausalModel:
    def __init__(self, graph, equations):
        self.graph = graph  # DAG of causal relationships
        self.equations = equations  # Functional assignments

    def do_intervention(self, variable, value):
        """Pearl's do-operator: intervene and compute effects"""
        # Create mutilated graph (remove incoming edges)
        mutilated_graph = self.graph.remove_parents(variable)

        # Fix intervened variable
        intervened_state = {variable: value}

        # Propagate through causal graph topologically
        for node in mutilated_graph.topological_sort():
            if node != variable:
                intervened_state[node] = self.equations[node](
                    intervened_state
                )

        return intervened_state

    def counterfactual_query(self, intervention, evidence):
        """Answer: What if X=x, given we observed Y=y?"""
        # 1. Abduction: infer exogenous variables from evidence
        exogenous = self.abduction(evidence)

        # 2. Action: apply intervention via do-operator
        # 3. Prediction: propagate forward
        return self.do_intervention(intervention['var'],
                                   intervention['value'])`,
            },
          },
        ],
      },
      {
        heading: "Impact & Future Directions",
        content: [
          {
            type: "paragraph",
            data: "This work sits at the intersection of causal inference, AI safety, and interpretability. As LLMs are increasingly deployed in domains requiring causal reasoning—healthcare, policy, science—understanding and improving their causal capabilities becomes critical.",
          },
          {
            type: "paragraph",
            data: "CausalBench provides both a diagnostic tool for current models and a training framework for future ones. The multi-agent training loop opens possibilities for self-play approaches to causal learning, where models improve by debating counterfactuals rather than just absorbing more training data.",
          },
          {
            type: "paragraph",
            data: "If you're working on causal inference, AI reasoning, interpretability, or exploring multi-agent training setups, I'm open to collaborations on extending CausalBench into a larger causal reasoning and training suite.",
          },
        ],
      },
    ],
  },
  {
    id: "temporal-encoding-machines",
    title: "Temporal Encoding and Decoding in Neural Circuits",
    subtitle: "Exploring Signal Processing in Neural Models",
    focus: "Computational Neuroscience",
    summary:
      "Implementation of temporal encoding machines and time decoding machines for signal processing in neural circuits, focusing on ASDM and IAF neurons.",
    github: new URL("https://github.com/Mohak327/temporal-encoding-machines"),
    // accentColor: Theme.colors.teal[400],
    sections: [
      {
        heading: "Overview",
        content: [
          {
            type: "paragraph",
            data: "This project implements temporal encoding machines (TEM) and time decoding machines (TDM) for signal processing in neural circuits, focusing on asynchronous sigma-delta modulators (ASDM) and integrate-and-fire (IAF) neurons.",
          },
          {
            type: "paragraph",
            data: "It explores how biological-inspired models encode and decode bandlimited signals, assesses recovery quality through signal-to-noise ratio (SNR) analysis, and examines nonlinear processing via ON-OFF separation.",
          },
          {
            type: "paragraph",
            data: "The work demonstrates the challenges of perfect recovery in nonlinear systems and provides quantitative evaluations of encoding/decoding fidelity.",
          },
        ],
      },
      {
        heading: "Technical Implementation",
        content: [
          {
            type: "list",
            data: [
              "ASDM Encoding/Decoding: Implemented a threshold-sensitive ASDM encoder to generate spike times from bandlimited stimuli (sum of sinc functions). Developed both δ-sensitive and δ-insensitive decoders using matrix-based reconstruction (pseudoinverse of cumulative sinc integrals), enabling robust recovery despite parameter variations.",
              "IAF Neuron Modeling: Built an IAF encoder for temporal encoding, with decoding via sinc basis functions. Simulated ON-OFF separation by rectifying signals into positive (ON) and negative (OFF) components, encoding/decoding each independently, and recombining for full-signal reconstruction.",
              "Signal Analysis: Computed whole-signal and time-varying SNR to evaluate recovery quality. Analyzed phase response curves (PRCs) for limit cycle dynamics, inferring optimal perturbation timings to minimize heartbeat disruptions.",
              "Numerical Methods: Used Euler integration for ODE solving, cumulative trapezoidal integration for matrix computations, and cross-correlation for PRC estimation. Handled nonlinear dynamics with state bounding and error handling for stability.",
              "Visualization: Generated comparative plots for waveforms, recovery errors, and SNR over time, with parameter sweeps (e.g., bias values) to study system behavior.",
            ],
          },
        ],
      },
      {
        heading: "Key Achievements",
        content: [
          {
            type: "ordered-list",
            data: [
              "High-Fidelity Recovery: Achieved accurate signal reconstruction with SNR values up to 30-40 dB for bandlimited cases, demonstrating effective handling of temporal encoding challenges.",
              "Robust Algorithms: Developed δ-insensitive decoding that outperforms δ-sensitive methods in noisy or variable conditions, reducing reconstruction errors by 10-20% in simulations.",
              "Nonlinear Insights: Quantified the impact of ON-OFF separation on recovery, showing how rectification introduces high-frequency harmonics, preventing perfect reconstruction while enabling feature extraction.",
              "Parameter Optimization: Analyzed bias effects (e.g., b=1 vs. b=0.2) on spike rates and SNR, identifying trade-offs between fidelity and efficiency—key for real-world neural models.",
              "Quantitative Analysis: Provided time-resolved SNR plots and PRC-based inferences, offering data-driven recommendations for safe neural perturbations (e.g., cardioversion timing).",
            ],
          },
        ],
      },
      {
        heading: "Technologies & Skills",
        content: [
          {
            type: "list",
            data: [
              "Python (NumPy, SciPy, Matplotlib)",
              "Signal Processing",
              "Neural Circuit Modeling",
              "SNR Analysis",
              "Data Visualization",
              "Scientific Computing",
            ],
          },
        ],
      },
      {
        heading: "Impact",
        content: [
          {
            type: "paragraph",
            data: "This work contributes to the understanding of temporal coding in neural circuits and provides a foundation for future research on efficient neural computation and its applications in biomedical engineering and artificial intelligence.",
          },
        ],
      },
    ],
    tags: [
      "Synaptic Neural Networks",
      "Signal Processing",
      "Neural Circuits",
      "Signal to Noise Ratio Analysis",
      "ASDM",
      "IAF Neurons",
    ],
    accentColor: Theme.colors.lime[400],
  },
  {
    id: "physnerf-3d-reconstruction",
    title: "PhysNeRF: Physics-Informed Neural Radiance Fields",
    subtitle: "3D Scene Reconstruction with Physical Constraints",
    focus: "Computer Vision / 3D Geometry",
    summary:
      "Integrating physics-based constraints into neural radiance fields for photorealistic 3D scene reconstruction and novel view synthesis.",
    tags: [
      "Neural Radiance Fields",
      "3D Reconstruction",
      "Physics-Informed ML",
      "Computer Vision",
      "Differentiable Rendering",
    ],
    accentColor: Theme.colors.yellow[400],
    sections: [
      {
        heading: "Overview",
        content: [
          {
            type: "paragraph",
            data: "Neural Radiance Fields (NeRFs) revolutionized 3D scene reconstruction by learning continuous volumetric representations from 2D images. But vanilla NeRFs ignore physics: they don't know that objects should be solid, that light obeys reflection laws, or that surfaces have material properties.",
          },
          {
            type: "paragraph",
            data: "<b>PhysNeRF</b> explores integrating <span class='highlight'><b>physics-based constraints</b></span> into neural rendering to improve reconstruction quality, enable physical simulation of reconstructed scenes, and reduce the number of training views required.",
          },
          {
            type: "paragraph",
            data: "View the research documentation:",
          },
          {
            type: "paragraph",
            data: "<a href='/PhysNeRF.pdf' target='_blank' class='font-bold underline hover:text-cyan-400'>📄 Download PhysNeRF Research (PDF)</a>",
          },
        ],
      },
      {
        heading: "Technical Contributions",
        content: [
          {
            type: "list",
            data: [
              "<b>Physics-Informed Loss Functions:</b> Enforce material consistency (Lambertian reflectance, specular highlights) and geometric constraints (surface normals, curvature bounds)",
              "<b>Differentiable Physics Engine:</b> Integrate rigid body dynamics into the NeRF training loop, enabling inverse rendering from physical interactions",
              "<b>Sparse View Synthesis:</b> Use physics priors (symmetry, planarity, material properties) to reconstruct scenes from 10-20 views instead of 100+",
              "<b>Temporal Consistency:</b> Model dynamic scenes (deformation, rigid motion) with physics-guided temporal smoothness",
            ],
          },
        ],
      },
      {
        heading: "Robotics Applications",
        content: [
          {
            type: "paragraph",
            data: "Why does this matter for industrial robotics? <b>Robots need accurate 3D models of their environment</b> to plan manipulation, navigate cluttered spaces, and predict object behavior:",
          },
          {
            type: "list",
            data: [
              "<b>Object Manipulation:</b> Reconstruct tool geometry to plan grasps (wrench orientation, handle location, weight distribution)",
              "<b>Workspace Mapping:</b> Build 3D maps of construction sites or shipyards from helmet-cam footage for path planning",
              "<b>Predictive Simulation:</b> Simulate 'what if' scenarios (will this beam fall if I cut that support?) before executing",
              "<b>Sparse Sensing:</b> Robots can't capture 100+ views of every object—physics priors enable reconstruction from limited observations",
            ],
          },
        ],
      },
      {
        heading: "Technical Challenges",
        content: [
          {
            type: "paragraph",
            data: "Integrating physics into neural rendering is non-trivial:",
          },
          {
            type: "list",
            data: [
              "<b>Differentiability:</b> Physics engines use discrete collision detection and constraint solvers—making these differentiable requires approximations",
              "<b>Training Stability:</b> Physics losses can conflict with photometric losses (e.g., forcing a surface to be planar when camera data suggests curvature)",
              "<b>Computational Cost:</b> Simulating physics at every training step is expensive—need efficient batching and parallelization",
              "<b>Material Ambiguity:</b> Is that highlight from a specular material or a light source? Disentangling geometry, reflectance, and lighting is ill-posed",
            ],
          },
        ],
      },
      {
        heading: "Future Directions",
        content: [
          {
            type: "paragraph",
            data: "PhysNeRF opens paths toward <b>physically grounded scene understanding</b>:",
          },
          {
            type: "list",
            data: [
              "Real-time NeRF reconstruction on robot hardware (mobile GPUs, edge computing)",
              "Integration with SLAM for online mapping and localization",
              "Material property estimation (friction, compliance, weight) from visual + contact data",
              "Counterfactual reasoning: 'What would happen if I removed this support beam?' without physical experimentation",
            ],
          },
          {
            type: "paragraph",
            data: "For humanoid robots, PhysNeRF could enable <b>vision-based workspace understanding</b> that goes beyond simple obstacle detection—predicting structural integrity, object affordances, and interaction outcomes before acting.",
          },
        ],
      },
    ],
  },
  {
    id: "neural",
    title: "Causal & Time Series Analysis of Neural Activity",
    subtitle: "Investigating Synaptic Activity",
    focus: "Neuroscience / Causal ML",
    summary:
      "Using Hodgkin-Huxley & Rinzel models to investigate synaptic activity.",
    accentColor: Theme.colors.green[400],
    sections: [
      {
        heading: "Overview",
        content: [
          {
            type: "paragraph",
            data: "Conducted causal inference and time series analysis on simulated and recorded neural signals using Hodgkin-Huxley and Rinzel models.",
          },
          {
            type: "paragraph",
            data: "The goal was to investigate synaptic activity and signal propagation for neurotechnology applications.",
          },
        ],
      },
      {
        heading: "Key Outcomes",
        content: [
          {
            type: "list",
            data: [
              "Simulated neural signals successfully.",
              "Identified key synaptic propagation paths.",
              "Modeled Rinzel neuron behaviors.",
            ],
          },
        ],
      },
    ],
    tags: [
      "Neuroscience",
      "Causal Inference",
      "Neuron Modeling",
      "Simulations",
    ],
  },
  {
    id: "computational-cardiac-modeling",
    title: "Computational Cardiac Modeling",
    subtitle: "Phase Response Curve Analysis",
    focus: "HealthTech / Biophysics",
    summary:
      "ECG signal modeling and Phase Response Curve (PRC) analysis using nonlinear ODE simulations.",
    github: new URL(
      "https://github.com/Mohak327/computational-cardiac-modeling",
    ),
    accentColor: Theme.colors.sky[400],
    sections: [
      {
        heading: "Overview",
        content: [
          {
            type: "paragraph",
            data: "Developed a comprehensive computational framework for ECG signal generation and cardiac intervention optimization using nonlinear dynamical systems and advanced phase response analysis. This project bridges theoretical cardiac electrophysiology with practical clinical applications, enabling precise timing of life-saving interventions like cardioversion.",
          },
        ],
      },
      {
        heading: "Technical Implementation",
        content: [
          {
            type: "list",
            data: [
              "Mathematical Derivation: Reduced a complex 6-variable cardiac ODE system to a biologically faithful 4-variable model through rigorous algebraic manipulation, proving equivalence under specific initial conditions and coupling terms",
              "Nonlinear ODE Modeling: Implemented a physiologically accurate ECG generator using coupled nonlinear oscillators representing sinoatrial (SA) and atrioventricular (AV) nodes, incorporating realistic parameters for healthy and pathological (sinus tachycardia) conditions",
              "Advanced Numerical Simulation: Employed high-precision RK4 integration with adaptive state bounding to simulate cardiac dynamics over extended time periods, ensuring numerical stability despite system stiffness",
              "Phase Response Curve Analysis: Applied Winfree's method with cross-correlation techniques to characterize cardiac rhythm sensitivity, computing PRCs for both SA and AV nodes through systematic perturbation analysis across 120 phase points",
              "Clinical Translation: Identified optimal cardioversion windows (phases 0.65-1.0) where perturbations minimally affect heartbeat timing, providing quantitative guidance for defibrillation procedures",
            ],
          },
          {
            type: "code",
            data: {
              language: "python",
              filename: "rk4_cardiac_integration.py",
              code: `def rk4_step(state, t, dt, params):
    """4th-order Runge-Kutta integration for cardiac ODE"""
    k1 = cardiac_derivatives(state, t, params)
    k2 = cardiac_derivatives(state + 0.5*dt*k1, t+0.5*dt, params)
    k3 = cardiac_derivatives(state + 0.5*dt*k2, t+0.5*dt, params)
    k4 = cardiac_derivatives(state + dt*k3, t+dt, params)

    new_state = state + (dt/6.0) * (k1 + 2*k2 + 2*k3 + k4)

    # State bounding for numerical stability
    new_state = np.clip(new_state, -2.0, 2.0)
    return new_state

def compute_prc(node, perturbation_phases=120):
    """Compute Phase Response Curve via perturbation"""
    phase_shifts = []
    for phase in np.linspace(0, 1, perturbation_phases):
        # Apply perturbation at specific phase
        perturbed_time = apply_perturbation(node, phase)
        control_time = get_control_spike_time(node)
        phase_shifts.append(perturbed_time - control_time)
    return np.array(phase_shifts)`,
            },
          },
        ],
      },
      {
        heading: "System Performance & Clinical Timing",
        content: [
          {
            type: "paragraph",
            data: "<b>Real-Time Cardiac System Specifications:</b>",
          },
          {
            type: "list",
            data: [
              "<b>ECG Sampling Rate:</b> 1000 Hz (1 ms temporal resolution)",
              "<b>PRC Temporal Resolution:</b> Sub-millisecond phase precision (< 1 ms)",
              "<b>Simulation Stability:</b> RK4 integration with adaptive timestep (10^-4 to 10^-6 seconds)",
              "<b>Perturbation Analysis:</b> 120 phase points across full cardiac cycle",
              "<b>Optimal Cardioversion Window:</b> Phases 0.65-1.0 (35% of cycle duration)",
              "<b>Clinical Safety Margin:</b> ±50 ms tolerance for intervention timing",
              "<b>Heartbeat Period:</b> ~800 ms (healthy), ~600 ms (tachycardia)",
            ],
          },
          {
            type: "paragraph",
            data: "The millisecond-scale precision required for safe cardioversion mirrors the timing constraints in real-time robotics control loops—where missing a critical window by even tens of milliseconds can mean the difference between smooth operation and system failure.",
          },
        ],
      },
      {
        heading: "Key Achievements",
        content: [
          {
            type: "ordered-list",
            data: [
              "Successfully generated realistic ECG waveforms distinguishing healthy vs. tachycardia states",
              "Achieved precise PRC estimation with sub-millisecond resolution using robust cross-correlation algorithms",
              "Implemented bonus comparative analysis against published literature (Fig 4a from Guevara et al.), converting phase shifts to physiological millisecond advances for clinical relevance",
              "Demonstrated interdisciplinary expertise combining dynamical systems theory, numerical methods, and biomedical signal processing",
            ],
          },
        ],
      },
      {
        heading: "Technologies & Skills",
        content: [
          {
            type: "list",
            data: [
              "Python (NumPy, SciPy, Matplotlib)",
              "Nonlinear ODE Integration",
              "Signal Processing",
              "Phase Response Analysis",
              "Biomedical Modeling",
              "Scientific Computing",
            ],
          },
        ],
      },
      {
        heading: "Impact",
        content: [
          {
            type: "paragraph",
            data: "This work provides a foundation for personalized cardiac intervention timing, potentially reducing complications from inappropriate defibrillation and advancing computational cardiology toward precision medicine applications.",
          },
        ],
      },
    ],
    tags: [
      "BioPhysics",
      "Nonlinear ODE",
      "ECG Modeling",
      "Cardiology",
      "Phase Response Curve",
    ],
    // accentColor: Theme.colors.green[400],
  },
];

// export const getProjectById = (id: string): ProjectInterface | undefined => {
//   return projects.find((p) => p.id === id);
// };
