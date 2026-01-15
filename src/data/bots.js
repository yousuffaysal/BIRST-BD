import { Quote, Lightbulb, MessageSquare, FileSearch, Microscope, PenTool, ClipboardList, Calculator, BarChart2 } from 'lucide-react';
import React from 'react';

export const bots = [
    {
        id: "citation",
        name: "Citation Formatter",
        description: "Instantly convert BibTeX citations into any academic style (APA, MLA, IEEE, etc.) with perfect accuracy.",
        icon: Quote,
        category: "Utility",
        version: "v1.0",
        features: ["BibTeX Input", "Multi-style Support", "Instant Format", "Copy to Clipboard"],
        gradient: "from-blue-500 to-indigo-600",
        external: false
    },
    {
        id: "idea",
        name: "Idea Generator",
        description: "Overcome writer's block by generating novel research topics and hypotheses tailored to your specific field.",
        icon: Lightbulb,
        category: "Creativity",
        version: "v2.1",
        features: ["Field Specific", "Novelty Settings", "Hypothesis Gen", "Venue Targeting"],
        gradient: "from-amber-400 to-orange-600",
        external: false
    },
    {
        id: "conference",
        name: "Conference Profile Bot",
        description: "Your personal guide to conference details. Ask questions about schedules, speakers, and paper topics.",
        icon: MessageSquare,
        category: "Assistant",
        version: "v2.0",
        features: ["Q&A Interface", "Schedule Search", "Speaker Info", "Context Aware"],
        gradient: "from-purple-500 to-pink-600",
        external: false
    },
    {
        id: "reviewer",
        name: "Paper Reviewer",
        description: "Get a structured, critical review of your research paper before submission. Identifies strengths and weaknesses.",
        icon: FileSearch,
        category: "Review",
        version: "v1.5",
        features: ["PDF Upload", "Critical Analysis", "Weakness Detection", "Improvement Tips"],
        gradient: "from-emerald-400 to-teal-600",
        external: false
    },
    {
        id: "analyst",
        name: "Paper Analyst",
        description: "Deep dive into any research paper. Extract key insights, methodologies, and contributions automatically.",
        icon: Microscope,
        category: "Analysis",
        version: "v3.0",
        features: ["Auto-Summary", "Method Extraction", "Data Analysis", "Key Findings"],
        gradient: "from-cyan-400 to-blue-600",
        external: false
    },
    {
        id: "writer",
        name: "Paper Writer Agent",
        description: "An AI co-author that helps draft sections of your paper, ensuring academic tone and clarity.",
        icon: PenTool,
        category: "Writing",
        version: "v2.2",
        features: ["Draft Generation", "Tone Adjustment", "Section Expansion", "Academic Style"],
        gradient: "from-rose-400 to-red-600",
        external: false
    },
    {
        id: "questionaire",
        name: "Questionnaire Designer",
        description: "Design robust research questionnaires tailored to your study population, culture, and specific variables.",
        icon: ClipboardList,
        category: "Design",
        version: "v1.0",
        features: ["Variable Integration", "Cultural Adaptation", "Scale Selection", "Demographic Targeting"],
        gradient: "from-teal-400 to-emerald-600",
        external: false
    },
    {
        id: "sample_size",
        name: "Sample Size Calculator",
        description: "Calculate the ideal sample size for your study based on prevalence, mean estimation, or regression models.",
        icon: Calculator,
        category: "Planning",
        version: "v1.0",
        features: ["Prevalence Mode", "Mean Estimation", "Regression Rules", "Population Adjustment"],
        gradient: "from-violet-400 to-purple-600",
        external: false
    },
    {
        id: "statistical",
        name: "Statistical Test Selector",
        description: "Unsure which test to run? Input your variable types and study design to get the correct statistical test recommendation.",
        icon: BarChart2,
        category: "Analysis",
        version: "v1.0",
        features: ["Variable Type Logic", "Group Analysis", "Assumption Checks", "Hypothesis Matching"],
        gradient: "from-amber-400 to-yellow-600",
        external: false
    }
];
