# [Company Name] Interview Guide - Portfolio Showcase
**Date:** April 29, 2026 | **Time:** 11:00 AM  
**Interviewer:** Maryam (loves "why" behind hardware-software integration)

---

## ✅ Portfolio Status: INTERVIEW READY

### What We Built Tonight (1 AM - 3 AM)

1. **Visual Content System**
   - ✅ Images, videos, and code blocks now render in projects
   - ✅ MediaRenderer integrated into ContentRenderer
   - ✅ Syntax-highlighted code snippets (Python)

2. **Enhanced Existing Projects**
   - ✅ Auditory System: Added neuron code + real-time metrics
   - ✅ Cardiac Modeling: Added RK4 integration code + clinical timing specs
   - ✅ CausalBench: Added SCM intervention code + multi-agent framing

3. **New Research Projects**
   - ✅ NeuBody: Embodied AI for humanoid robotics (RED accent)
   - ✅ PhysNeRF: Physics-informed 3D reconstruction (CYAN accent)
   - ✅ CLARISNet: Causal reasoning architecture (INDIGO accent)

4. **Homepage Enhancement**
   - ✅ TechnicalSpotlight hero section (3 cards with icons)
   - ✅ Links to: Real-Time Systems, Hardware-Software Integration, Multi-Agent Intelligence

---

## 🎯 Strategic Narrative for [Company Name]

### Core Message
**"I build systems where hardware and software constraints force elegant solutions."**

### Three Pillars (Homepage Spotlight)

1. **Real-Time Systems** (Purple - Auditory System)
   - Microsecond-scale neural spike timing
   - Sub-millisecond temporal precision
   - Direct analog: robot sensor fusion latency

2. **Hardware-Software Integration** (Green - Cardiac Modeling)
   - Clinical timing constraints (cardioversion windows)
   - Millisecond-scale control loops
   - Direct analog: servo control, balance systems

3. **Multi-Agent Intelligence** (Yellow - CausalBench)
   - Distributed coordination via debate
   - Causal reasoning for interventions
   - Direct analog: multi-robot task planning

---

## 📋 10-Minute Presentation Structure

### Opening (1 min)
"I build systems where constraints force elegant solutions. [Show homepage] These three areas define my work: real-time systems at microsecond scale, hardware-software integration from silicon to clinical systems, and multi-agent coordination."

### Deep Dive 1: Auditory System (3 min)
**Route:** `/projects/auditory-system-emulation`

**Key Points:**
- Digital ear: sound → cochlear filtering → neuron spikes → reconstruction
- [Scroll to code] Leaky integrate-and-fire neuron implementation
- [Point to metrics] Sub-millisecond spike timing = sensor fusion precision
- **Connection:** "This temporal precision is what you need in robot audio localization"

**Code to Show:**
```python
class LeakyIntegrateFireNeuron:
    def integrate(self, input_current, dt, time):
        self.potential += input_current * dt
        self.potential *= (1 - self.leak * dt)
        if self.potential >= self.threshold:
            self.spike_times.append(time)
```

### Deep Dive 2: Cardiac Modeling (2 min)
**Route:** `/projects/computational-cardiac-modeling`

**Key Points:**
- ECG phase response curves for cardioversion timing
- [Show code] RK4 integration with adaptive timestep
- [Point to metrics] Optimal 35% intervention window, ±50ms tolerance
- **Connection:** "Missing the window by 50ms = failure. Same as robot control loops."

**Key Metric:** "1000 Hz sampling, sub-millisecond phase resolution"

### Deep Dive 3: Research Proposals (3 min)
**Routes:** Choose ONE based on conversation flow

**Option A: NeuBody (if they ask about embodied AI)**
Route: `/projects/neubody-embodied-ai`
- Embodied intelligence for humanoid robots
- Sample efficiency, sim-to-real transfer
- "Shipyards need robots that adapt, not just follow scripts"
- [Show PDF link] "This is my roadmap for the nervous system your robots need"

**Option B: CLARISNet (if they ask about multi-robot systems)**
Route: `/projects/clarisnet`
- Causal reasoning embedded in control loop
- Multi-robot coordination via shared causal models
- [Show code] Counterfactual planner with fallback to reactive control
- "Robots that predict consequences, not just react"

**Option C: PhysNeRF (if they ask about perception/3D)**
Route: `/projects/physnerf-3d-reconstruction`
- Physics-constrained neural rendering
- Sparse view reconstruction for robot vision
- "Robots can't capture 100 views—physics priors enable 10-view reconstruction"

### Bridge to [Company Name] (1 min)
"Why industrial humanoid robotics? It's the ultimate systems integration challenge. My neuroscience work taught me microsecond timing. My cardiac work taught me safety-critical constraints. My causal work taught me multi-agent coordination. I want to build the nervous system for machines that work in shipyards, construction sites, and extreme environments where structure doesn't exist."

---

## 🗣️ Anticipated Questions & Answers

### Q: "Tell me about your experience with Rust/embedded systems"
**A:** "I don't have production Rust yet, but here's my approach: [Open NeuBody proposal] This research explores real-time control for humanoid robots. The constraints—microsecond loop timing, memory safety, zero-cost abstractions—are exactly why embedded Rust is compelling. My neuroscience work already operates at this timescale [point to Auditory metrics], so I understand the mental model. I'm ready to translate that to embedded hardware."

### Q: "How do you handle unreliable transport in real-time systems?"
**A:** "Great question. [Open CausalBench] This multi-agent system has to coordinate despite API latencies and network jitter. The solution: fallback mechanisms [show causal_planner.py code]. Try causal reasoning with a 50ms timeout; if it fails, fall back to reactive control. Same pattern works for robot telemetry—UDP for speed, selective ACK for critical messages, graceful degradation when packets drop."

### Q: "What's your experience with hardware-software integration?"
**A:** "Every project here is constrained by physics. [Open Cardiac] This ECG model isn't just math—it's simulating ion channels, action potentials, and mechanical contractions. The integration challenge is keeping numerical stability [point to RK4 code] while maintaining real-time performance. [Open Auditory] Here, the constraint is biological plausibility—128 cochlear channels processing 44.1 kHz audio. The software has to respect hardware limitations: memory, bandwidth, latency."

### Q: "Can you explain this code snippet?"
**A (Auditory Neuron):** "This is a leaky integrate-and-fire model. The neuron accumulates input current, leaks over time, and fires when it crosses threshold. The key insight: the leak term prevents runaway integration. In robots, this maps to sensor filtering—you want responsiveness but not noise amplification."

**A (Cardiac RK4):** "Fourth-order Runge-Kutta for stiff ODEs. Four intermediate slope calculations give us accuracy without tiny timesteps. The state bounding [point to np.clip] prevents numerical explosion—critical in long-running simulations. For robots, this is your inner control loop: accurate, stable, bounded."

**A (CLARISNet Planner):** "Counterfactual reasoning loop. For each candidate action, we predict the outcome via Pearl's do-operator, evaluate expected reward, pick the best. The timeout fallback is key—if planning takes > 50ms, abort and use the reactive policy. Real-time systems can't afford unbounded computation."

### Q: "How would you approach [specific technical problem]?"
**A Framework:**
1. Clarify constraints (latency, accuracy, safety margins)
2. Identify the physics/hardware limits
3. Propose a layered solution (fast reactive + slower reasoning)
4. Mention fallback mechanisms
5. Connect to a project: "I did something similar in [project name]"

---

## 🎨 Visual Flow During Presentation

### Pre-Open Tabs (in order):
1. Homepage (http://localhost:3000)
2. Auditory System (/projects/auditory-system-emulation)
3. Cardiac Modeling (/projects/computational-cardiac-modeling)
4. NeuBody (/projects/neubody-embodied-ai)
5. CLARISNet (/projects/clarisnet)

### Browser Settings:
- Zoom: 125% (for readability during screen share)
- Full screen mode (F11) to hide browser chrome
- Dark mode OFF (portfolio is light themed)

### Navigation Tips:
- Use browser back/forward buttons (don't retype URLs)
- Scroll smoothly to code sections
- Pause on metrics sections for emphasis

---

## 📊 Key Metrics to Memorize

### Auditory System
- Temporal resolution: **< 1 ms**
- Cochlear channels: **128**
- Reconstruction SNR: **30-40 dB**
- Sampling rate: **44.1 kHz**

### Cardiac Modeling
- ECG sampling: **1000 Hz** (1 ms resolution)
- PRC resolution: **< 1 ms**
- Optimal cardioversion window: **35% of cycle**
- Safety margin: **±50 ms**

### CausalBench
- Multi-agent: **GPT-4, Claude, Gemini**
- Error types: **3** (downstream, backtracking, correlation)
- Training loop: **4 stages** (generation → debate → classify → train)

---

## 🚨 Pitfalls to Avoid

1. **Don't oversell Rust experience** - Be honest: "I understand the constraints, ready to learn"
2. **Don't claim hardware you don't have** - Frame as proposals, not deployed systems
3. **Don't get lost in math** - Focus on WHY, not just HOW
4. **Don't ignore the interviewer** - Watch for engagement signals, adjust depth
5. **Don't run over time** - 10-12 minutes max, leave time for Q&A

---

## ✨ Closing Statement (if time permits)

"I've spent three years building systems where milliseconds matter—neural spike timing, cardiac interventions, multi-agent coordination. But I want to take that precision into the physical world. [Company Name] is building robots for environments that don't accommodate them. That's the hard problem. Not labs, not warehouses—shipyards with ship motion, construction sites with debris, energy infrastructure with extreme conditions. I want to work on robots that adapt to the world, not the other way around. Let's talk about how my real-time systems thinking translates to your hardware-software challenges."

---

## 🔗 Quick Reference URLs

- Homepage: http://localhost:3000
- Projects: http://localhost:3000/projects/[project-id]
- Skills: http://localhost:3000/skills

### Project IDs:
- `auditory-system-emulation`
- `computational-cardiac-modeling`
- `causalbench-llm-reasoning`
- `neubody-embodied-ai`
- `physnerf-3d-reconstruction`
- `clarisnet`
- `temporal-encoding-machines`
- `neural` (Causal & Time Series)
- `dft-image-reconstruction`

---

## ⏰ Timeline (You Have 8 Hours)

**3:00 AM - 4:00 AM:** Sleep (you need it!)
**8:00 AM - 9:00 AM:** Wake up, review this guide
**9:00 AM - 10:00 AM:** Practice presentation (aim for 10 min)
**10:00 AM - 10:45 AM:** Final prep, test screen share
**11:00 AM:** INTERVIEW TIME

---

## 💪 You've Got This

You've built:
- ✅ 9 projects showcasing real-time systems, hardware-software integration, multi-agent coordination
- ✅ Code examples demonstrating millisecond-scale precision
- ✅ Performance metrics quantifying temporal constraints
- ✅ Research proposals connecting to embodied AI and robotics
- ✅ A visual portfolio that shows "how things work"

**Your portfolio now speaks [Company Name]'s language: real-time, hardware-constrained, multi-agent, safety-critical systems.**

Go nail this interview! 🚀
