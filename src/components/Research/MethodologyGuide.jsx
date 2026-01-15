import React, { useState } from 'react';
import { CheckCircle, ArrowRight, Book, FileText, Target, TrendingUp } from 'lucide-react';

export default function MethodologyGuide() {
  const [selectedMethod, setSelectedMethod] = useState('quantitative');

  const methodologies = [
    {
      id: 'quantitative',
      name: 'Quantitative Research',
      icon: TrendingUp,
      description: 'Research that uses numerical data and statistical analysis',
      characteristics: [
        'Uses structured data collection methods',
        'Large sample sizes',
        'Statistical analysis',
        'Objective and measurable',
        'Generalizable results',
      ],
      methods: [
        {
          name: 'Experimental Design',
          description: 'Controlled experiments with randomization and control groups',
          steps: ['Define hypothesis', 'Design experiment', 'Randomize participants', 'Collect data', 'Analyze results'],
        },
        {
          name: 'Survey Research',
          description: 'Questionnaires and surveys to collect data from respondents',
          steps: ['Design survey', 'Select sample', 'Distribute survey', 'Collect responses', 'Analyze data'],
        },
        {
          name: 'Correlational Research',
          description: 'Examines relationships between variables without manipulation',
          steps: ['Identify variables', 'Collect data', 'Calculate correlations', 'Interpret relationships'],
        },
      ],
    },
    {
      id: 'qualitative',
      name: 'Qualitative Research',
      icon: Target,
      description: 'Research that explores phenomena through words, observations, and experiences',
      characteristics: [
        'In-depth understanding',
        'Small sample sizes',
        'Narrative and descriptive',
        'Subjective perspectives',
        'Context-rich insights',
      ],
      methods: [
        {
          name: 'Interviews',
          description: 'One-on-one or group conversations to gather detailed information',
          steps: ['Prepare questions', 'Recruit participants', 'Conduct interviews', 'Transcribe data', 'Analyze themes'],
        },
        {
          name: 'Case Studies',
          description: 'In-depth investigation of a single case or multiple cases',
          steps: ['Select case', 'Gather data', 'Analyze context', 'Identify patterns', 'Draw conclusions'],
        },
        {
          name: 'Ethnography',
          description: 'Immersive observation of cultures and social groups',
          steps: ['Enter field', 'Observe participants', 'Take field notes', 'Analyze culture', 'Write ethnography'],
        },
      ],
    },
    {
      id: 'mixed',
      name: 'Mixed Methods Research',
      icon: Book,
      description: 'Combines quantitative and qualitative approaches',
      characteristics: [
        'Comprehensive understanding',
        'Triangulation of data',
        'Both numerical and narrative data',
        'Addresses multiple research questions',
        'Validates findings',
      ],
      methods: [
        {
          name: 'Sequential Explanatory',
          description: 'Quantitative data collection followed by qualitative exploration',
          steps: ['Collect quantitative data', 'Analyze quantitative', 'Design qualitative', 'Collect qualitative', 'Integrate findings'],
        },
        {
          name: 'Convergent Parallel',
          description: 'Simultaneous collection and analysis of both types of data',
          steps: ['Collect both types', 'Analyze separately', 'Compare results', 'Integrate findings'],
        },
        {
          name: 'Sequential Exploratory',
          description: 'Qualitative exploration followed by quantitative validation',
          steps: ['Collect qualitative data', 'Analyze themes', 'Develop quantitative', 'Collect quantitative', 'Integrate'],
        },
      ],
    },
  ];

  const currentMethodology = methodologies.find((m) => m.id === selectedMethod);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Research Methodology Guide</h2>
        <p className="text-lg text-gray-700 leading-relaxed">
          Understanding different research methodologies is crucial for conducting rigorous and valid research. This guide provides comprehensive information about various research approaches, their characteristics, and when to use them.
        </p>
      </div>

      {/* Methodology Selector */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Select Research Methodology</h3>
        <div className="grid md:grid-cols-3 gap-4">
          {methodologies.map((method) => {
            const Icon = method.icon;
            return (
              <button
                key={method.id}
                onClick={() => setSelectedMethod(method.id)}
                className={`p-6 rounded-lg border-2 transition-all text-left ${
                  selectedMethod === method.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center gap-3 mb-3">
                  <Icon className={`w-6 h-6 ${selectedMethod === method.id ? 'text-blue-600' : 'text-gray-600'}`} />
                  <h4 className={`font-bold text-lg ${selectedMethod === method.id ? 'text-blue-900' : 'text-gray-900'}`}>
                    {method.name}
                  </h4>
                </div>
                <p className="text-sm text-gray-600">{method.description}</p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Methodology Details */}
      {currentMethodology && (
        <div className="space-y-6">
          {/* Characteristics */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Key Characteristics</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {currentMethodology.characteristics.map((char, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{char}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Methods */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900">Common Methods</h3>
            {currentMethodology.methods.map((method, methodIndex) => (
              <div
                key={methodIndex}
                className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-500"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h4 className="text-xl font-bold text-gray-900 mb-2">{method.name}</h4>
                    <p className="text-gray-600">{method.description}</p>
                  </div>
                </div>

                <div className="mt-4">
                  <p className="text-sm font-semibold text-gray-700 mb-3">Steps:</p>
                  <div className="flex flex-wrap gap-2">
                    {method.steps.map((step, stepIndex) => (
                      <div
                        key={stepIndex}
                        className="flex items-center gap-2 px-3 py-2 bg-blue-50 rounded-lg"
                      >
                        <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
                          {stepIndex + 1}
                        </span>
                        <span className="text-sm text-gray-700">{step}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Methodology Comparison */}
      <div className="bg-gradient-to-r from-blue-600 to-sky-600 rounded-2xl shadow-lg p-8 text-white">
        <h3 className="text-2xl font-bold mb-4">Choosing the Right Methodology</h3>
        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <h4 className="font-bold mb-2">Use Quantitative When:</h4>
            <ul className="space-y-1 text-sm text-blue-100">
              <li>• You need measurable, numerical data</li>
              <li>• You want to generalize findings</li>
              <li>• Testing hypotheses</li>
              <li>• Large sample sizes available</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-2">Use Qualitative When:</h4>
            <ul className="space-y-1 text-sm text-blue-100">
              <li>• Exploring new phenomena</li>
              <li>• Understanding experiences</li>
              <li>• Context is important</li>
              <li>• Building theories</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-2">Use Mixed Methods When:</h4>
            <ul className="space-y-1 text-sm text-blue-100">
              <li>• Need comprehensive understanding</li>
              <li>• Validating findings</li>
              <li>• Complex research questions</li>
              <li>• Multiple research objectives</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}