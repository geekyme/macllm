import React, { useState } from 'react'
import ollamaModelsData from './data/ollamaModels.json'

const macModels = [
  { id: 'macbook-air', name: 'MacBook Air' },
  { id: 'macbook-pro', name: 'MacBook Pro' },
  { id: 'imac', name: 'iMac' },
  { id: 'mac-mini', name: 'Mac mini' },
  { id: 'mac-studio', name: 'Mac Studio' },
  { id: 'mac-pro', name: 'Mac Pro' },
]

const specs = {
  'macbook-air': [
    { id: 'm1', name: 'M1', ram: [8, 16] },
    { id: 'm2', name: 'M2', ram: [8, 16, 24] },
    { id: 'm3', name: 'M3', ram: [8, 16, 24] },
    { id: 'm4', name: 'M4', ram: [16, 24, 32] },
  ],
  'macbook-pro': [
    { id: 'm1', name: 'M1', ram: [8, 16] },
    { id: 'm1-pro', name: 'M1 Pro', ram: [16, 32] },
    { id: 'm1-max', name: 'M1 Max', ram: [32, 64] },
    { id: 'm2', name: 'M2', ram: [8, 16] },
    { id: 'm2-pro', name: 'M2 Pro', ram: [16, 32] },
    { id: 'm2-max', name: 'M2 Max', ram: [32, 64, 96] },
    { id: 'm3', name: 'M3', ram: [8, 16] },
    { id: 'm3-pro', name: 'M3 Pro', ram: [18, 36] },
    { id: 'm3-max', name: 'M3 Max', ram: [36, 48, 64, 96, 128] },
    { id: 'm4', name: 'M4', ram: [16, 24, 32] },
    { id: 'm4-pro', name: 'M4 Pro', ram: [18, 36, 48] },
    { id: 'm4-max', name: 'M4 Max', ram: [36, 48, 64, 96, 128] },
  ],
  'imac': [
    { id: 'm1', name: 'M1', ram: [8, 16] },
    { id: 'm3', name: 'M3', ram: [8, 16, 24] },
    { id: 'm4', name: 'M4', ram: [8, 16, 24, 32] },
  ],
  'mac-mini': [
    { id: 'm1', name: 'M1', ram: [8, 16] },
    { id: 'm2', name: 'M2', ram: [8, 16] },
    { id: 'm2-pro', name: 'M2 Pro', ram: [16, 32] },
    { id: 'm4', name: 'M4', ram: [8, 16, 24, 32] },
    { id: 'm4-pro', name: 'M4 Pro', ram: [16, 32, 48, 64] },
  ],
  'mac-studio': [
    { id: 'm1-max', name: 'M1 Max', ram: [32, 64] },
    { id: 'm1-ultra', name: 'M1 Ultra', ram: [64, 128] },
    { id: 'm2-max', name: 'M2 Max', ram: [32, 64, 96] },
    { id: 'm2-ultra', name: 'M2 Ultra', ram: [64, 128, 192] },
    { id: 'm3-max', name: 'M3 Max', ram: [32, 64, 96] },
    { id: 'm3-ultra', name: 'M3 Ultra', ram: [96, 256, 512] },
    { id: 'm4-max', name: 'M4 Max', ram: [32, 64, 96, 128] },
  ],
  'mac-pro': [
    { id: 'm2-ultra', name: 'M2 Ultra', ram: [64, 128, 192] },
  ]
}

const ollamaModels = ollamaModelsData || [];

function App() {
  const [selectedModel, setSelectedModel] = useState('')
  const [selectedSpec, setSelectedSpec] = useState('')
  const [selectedRam, setSelectedRam] = useState('')
  const [selectedCategories, setSelectedCategories] = useState(['tiny', 'small', 'medium', 'large', 'extra-large', 'uncategorized'])
  const [selectedStatuses, setSelectedStatuses] = useState(['Compatible', 'May not run well', 'Not compatible'])

  // Get compatibility status for a model based on RAM
  const getModelCompatibilityStatus = (parameterSize, ram) => {
    const usage = (parameterSize / ram) * 100;

    if (usage <= 80) {
      return { status: "Compatible", color: "text-green-600" };
    } else if (usage <= 110) {
      return { status: "May not run well", color: "text-yellow-600" };
    } else {
      return { status: "Not compatible", color: "text-red-600" };
    }
  };

  // Get background color for status badge
  const getStatusColor = (status) => {
    switch (status) {
      case "Compatible":
        return "bg-green-100 text-green-800";
      case "May not run well":
        return "bg-yellow-100 text-yellow-800";
      case "Not compatible":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Assign models to categories based on parameter size
  const categorizeModel = (parameterSize) => {
    if (parameterSize < 4) return 'tiny';
    if (parameterSize < 8) return 'small';
    if (parameterSize < 35) return 'medium';
    if (parameterSize < 73) return 'large';
    return 'extra-large';
  };

  // Group models by category for display
  const groupedModels = ollamaModels.reduce((acc, model) => {
    // Categorize based on parameter size
    const category = categorizeModel(model.parameterSize);
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(model);
    return acc;
  }, {});

  // Display categories in order
  const categoryOrder = ['tiny', 'small', 'medium', 'large', 'extra-large', 'uncategorized'];
  
  // Format the category name for display
  const formatCategoryName = (category) => {
    switch(category) {
      case 'tiny': return 'Tiny models (under 4B parameters)';
      case 'small': return 'Small models (4-7B parameters)';
      case 'medium': return 'Medium models (8-34B parameters)';
      case 'large': return 'Large models (35-72B parameters)';
      case 'extra-large': return 'Extra large models (73B+ parameters)';
      default: return 'Other models';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 w-full">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-semibold text-gray-800 tracking-wide pb-1 w-fit">
            Model Compatibility Checker
          </h1>
          <a 
            href="https://github.com/geekyme/macllm" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-gray-700 transition-colors self-center"
            aria-label="View source on GitHub"
            title="View source on GitHub"
          >
            <svg className="w-6 h-6" viewBox="0 0 16 16" fill="currentColor">
              <path fillRule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path>
            </svg>
          </a>
        </div>
        
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mac Model
              </label>
              <select
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={selectedModel}
                onChange={(e) => {
                  setSelectedModel(e.target.value)
                  setSelectedSpec('')
                  setSelectedRam('')
                }}
              >
                <option value="">Select a model</option>
                {macModels.map((model) => (
                  <option key={model.id} value={model.id}>
                    {model.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Chip
              </label>
              <select
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={selectedSpec}
                onChange={(e) => {
                  setSelectedSpec(e.target.value)
                  setSelectedRam('')
                }}
                disabled={!selectedModel}
              >
                <option value="">Select a chip</option>
                {selectedModel && specs[selectedModel].map((spec) => (
                  <option key={spec.id} value={spec.id}>
                    {spec.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                RAM
              </label>
              <select
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={selectedRam}
                onChange={(e) => setSelectedRam(e.target.value)}
                disabled={!selectedSpec}
              >
                <option value="">Select RAM</option>
                {selectedSpec && specs[selectedModel].find(s => s.id === selectedSpec).ram.map((ram) => (
                  <option key={ram} value={ram}>
                    {ram}GB
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {!selectedRam && (
          <div className="w-full flex items-center justify-center py-20">
            <div className="text-center text-gray-500 p-10">
              <svg className="mx-auto h-16 w-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <h3 className="mt-2 text-lg font-medium text-gray-900">Select your Mac configuration</h3>
              <p className="mt-1 text-base text-gray-500">
                Choose your Mac model, chip, and RAM to see compatible <a href="https://ollama.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Ollama</a> models.
              </p>
            </div>
          </div>
        )}

        {selectedRam && (
          <div className="w-full">
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-yellow-700">
                    <strong>Note:</strong> RAM requirements are estimates and may vary based on model quantization, implementation, and system load. 
                    Actual performance may differ. See <a href="https://ollama.com/" target="_blank" rel="noopener noreferrer" className="text-yellow-800 font-medium hover:underline">Ollama.com</a> for more information.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mb-6 bg-white rounded-lg shadow-lg p-6 w-full">
              <div className="mb-4">
                <h3 className="font-medium text-gray-700 mb-2">Filter by model size:</h3>
                <div className="flex flex-wrap gap-2">
                  {categoryOrder.map(category => {
                    const isSelected = selectedCategories.includes(category);
                    const displayName = 
                      category === 'tiny' ? 'Tiny' :
                      category === 'small' ? 'Small' :
                      category === 'medium' ? 'Medium' :
                      category === 'large' ? 'Large' :
                      category === 'extra-large' ? 'Extra Large' : 'Other';
                    
                    return (
                      <button
                        key={category}
                        onClick={() => {
                          if (isSelected) {
                            setSelectedCategories(selectedCategories.filter(c => c !== category));
                          } else {
                            setSelectedCategories([...selectedCategories, category]);
                          }
                        }}
                        className={`px-3 py-1 rounded-full text-sm font-medium border ${
                          isSelected
                            ? 'bg-white text-blue-600 border-blue-600 hover:bg-blue-50'
                            : 'bg-gray-50 text-gray-600 border-gray-200 hover:border-gray-400'
                        }`}
                      >
                        {displayName}
                      </button>
                    );
                  })}
                  <button
                    onClick={() => {
                      if (selectedCategories.length === categoryOrder.length) {
                        setSelectedCategories([]);
                      } else {
                        setSelectedCategories([...categoryOrder]);
                      }
                    }}
                    className={`px-3 py-1 rounded-full text-sm font-medium border ${
                      selectedCategories.length === categoryOrder.length 
                        ? 'bg-white text-blue-600 border-blue-600 hover:bg-blue-50' 
                        : 'bg-gray-50 text-gray-600 border-gray-200 hover:border-gray-400'
                    }`}
                  >
                    {selectedCategories.length === categoryOrder.length ? 'Clear All' : 'Select All'}
                  </button>
                </div>
              </div>
              
              <div>
                <h3 className="font-medium text-gray-700 mb-2">Filter by status:</h3>
                <div className="flex flex-wrap gap-2">
                  {['Compatible', 'May not run well', 'Not compatible'].map(status => {
                    const isSelected = selectedStatuses.includes(status);
                    const getButtonStyle = () => {
                      if (!isSelected) return 'bg-gray-50 text-gray-600 border-gray-200 hover:border-gray-400';
                      
                      // Use blue borders and text for all selected status filters
                      return 'bg-white text-blue-600 border-blue-600 hover:bg-blue-50';
                    };
                    
                    return (
                      <button
                        key={status}
                        onClick={() => {
                          if (isSelected) {
                            setSelectedStatuses(selectedStatuses.filter(s => s !== status));
                          } else {
                            setSelectedStatuses([...selectedStatuses, status]);
                          }
                        }}
                        className={`px-3 py-1 rounded-full text-sm font-medium border ${getButtonStyle()}`}
                      >
                        {status}
                      </button>
                    );
                  })}
                  <button
                    onClick={() => {
                      if (selectedStatuses.length === 3) {
                        setSelectedStatuses([]);
                      } else {
                        setSelectedStatuses(['Compatible', 'May not run well', 'Not compatible']);
                      }
                    }}
                    className={`px-3 py-1 rounded-full text-sm font-medium border ${
                      selectedStatuses.length === 3 
                        ? 'bg-white text-blue-600 border-blue-600 hover:bg-blue-50' 
                        : 'bg-gray-50 text-gray-600 border-gray-200 hover:border-gray-400'
                    }`}
                  >
                    {selectedStatuses.length === 3 ? 'Clear All' : 'Select All'}
                  </button>
                </div>
              </div>
            </div>
          
            <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-6 w-full">
              <div className="overflow-x-auto w-full">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr className="bg-gray-800 text-white">
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                        Model
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                        Size
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {categoryOrder.filter(category => selectedCategories.includes(category)).map(category => {
                      const modelsInCategory = groupedModels[category] || [];
                      const ramGB = parseInt(selectedRam);
                      
                      // Filter models based on status selection
                      const filteredModels = modelsInCategory.filter(model => {
                        const status = getModelCompatibilityStatus(model.parameterSize, ramGB);
                        return selectedStatuses.includes(status.status);
                      });
                      
                      if (filteredModels.length === 0) {
                        return null;
                      }
                      
                      return (
                        <React.Fragment key={category}>
                          <tr>
                            <td colSpan="3" className="px-6 py-3 bg-gray-100 text-sm font-medium text-gray-800">
                              {formatCategoryName(category)} ({filteredModels.length}/{modelsInCategory.length} shown)
                            </td>
                          </tr>
                          {filteredModels.map((model) => {
                            const status = getModelCompatibilityStatus(model.parameterSize, ramGB);
                            const statusColor = getStatusColor(status.status);
                            return (
                              <tr key={`${model.name}-${model.size}`}>
                                <td className="px-6 py-4 whitespace-nowrap">{model.name}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{model.size}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusColor}`}>
                                    {status.status}
                                  </span>
                                </td>
                              </tr>
                            );
                          })}
                        </React.Fragment>
                      );
                    })}
                    {/* Show a message if no models match the filter criteria */}
                    {categoryOrder.filter(category => selectedCategories.includes(category))
                      .flatMap(category => groupedModels[category] || [])
                      .filter(model => {
                        const status = getModelCompatibilityStatus(model.parameterSize, parseInt(selectedRam));
                        return selectedStatuses.includes(status.status);
                      }).length === 0 && (
                        <tr>
                          <td colSpan="3" className="px-6 py-6 text-center text-gray-500">
                            No models match your current filter criteria. Try adjusting your filters.
                          </td>
                        </tr>
                      )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default App
