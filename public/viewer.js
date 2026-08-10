/**
 * Virtual Lab AR - 3D Viewer JavaScript
 * Handles 3D model loading, AR functionality, and viewer interactions
 */

// 3D Viewer functionality
const Viewer3D = {
    // Configuration
    config: {
        defaultModel: {
            url: '',
            title: '3D Model Viewer',
            description: 'Interactive 3D visualization and exploration',
            category: 'Interactive',
            duration: '30 min'
        },
        
        experiments: {
            heart: {
                title: 'Human Heart 3D Model',
                description: 'Explore the anatomy and function of the human heart with detailed 3D visualization.',
                category: 'Biology',
                duration: '30 min',
                details: [
                    'Examine the four chambers of the heart in detail',
                    'Understand blood flow through the cardiovascular system', 
                    'Identify major blood vessels and their functions',
                    'Learn about heart valves and their mechanisms'
                ],
                objectives: [
                    'Identify the four chambers of the heart',
                    'Understand the cardiac cycle and blood circulation',
                    'Recognize major blood vessels and their roles',
                    'Analyze heart valve function and timing'
                ],
                modelUrl: '', // Would contain actual GLB/GLTF model URL
                relatedExperiments: ['dna', 'circuit']
            },
            
            circuit: {
                title: 'Circuit Simulation',
                description: 'Build and test electrical circuits with interactive components and real-time feedback.',
                category: 'Physics',
                duration: '25 min',
                details: [
                    'Learn basic electrical components and their symbols',
                    'Understand Ohm\'s law and electrical relationships',
                    'Build series and parallel circuits interactively',
                    'Measure voltage, current, and resistance'
                ],
                objectives: [
                    'Identify electrical components and their functions',
                    'Apply Ohm\'s law to solve circuit problems',
                    'Analyze series and parallel circuit behavior',
                    'Use virtual multimeters to measure electrical properties'
                ],
                modelUrl: '', // Would contain actual GLB/GLTF model URL
                relatedExperiments: ['atom', 'solar-system']
            },
            
            atom: {
                title: 'Atom Model Explorer',
                description: 'Discover atomic structure with interactive 3D models of electrons, protons, and neutrons.',
                category: 'Chemistry',
                duration: '20 min',
                details: [
                    'Explore the basic structure of atoms',
                    'Understand electron shells and energy levels',
                    'Learn about isotopes and atomic variations',
                    'Visualize chemical bonding principles'
                ],
                objectives: [
                    'Identify protons, neutrons, and electrons',
                    'Understand electron configuration and orbital shapes',
                    'Analyze atomic number and mass relationships',
                    'Explore how atoms form chemical bonds'
                ],
                modelUrl: '', // Would contain actual GLB/GLTF model URL
                relatedExperiments: ['molecule', 'circuit']
            },
            
            dna: {
                title: 'DNA Double Helix',
                description: 'Explore the structure of DNA and understand genetic coding through interactive visualization.',
                category: 'Biology',
                duration: '35 min',
                details: [
                    'Examine the double helix structure of DNA',
                    'Understand base pairing and hydrogen bonding',
                    'Learn about DNA replication and transcription',
                    'Explore genetic code and protein synthesis'
                ],
                objectives: [
                    'Identify the components of DNA structure',
                    'Understand complementary base pairing rules',
                    'Analyze DNA replication mechanisms',
                    'Explore the relationship between DNA and proteins'
                ],
                modelUrl: '', // Would contain actual GLB/GLTF model URL
                relatedExperiments: ['heart', 'molecule']
            },
            
            'solar-system': {
                title: 'Solar System Model',
                description: 'Journey through our solar system and learn about planetary motion and celestial mechanics.',
                category: 'Physics',
                duration: '40 min',
                details: [
                    'Explore the scale and structure of our solar system',
                    'Understand planetary orbits and Kepler\'s laws',
                    'Learn about gravity and celestial mechanics',
                    'Examine planetary characteristics and atmospheres'
                ],
                objectives: [
                    'Compare planetary sizes, distances, and characteristics',
                    'Understand orbital mechanics and gravitational forces',
                    'Analyze seasonal changes and planetary tilts',
                    'Explore the formation of the solar system'
                ],
                modelUrl: '', // Would contain actual GLB/GLTF model URL
                relatedExperiments: ['circuit', 'atom']
            },
            
            molecule: {
                title: 'Molecular Structure',
                description: 'Visualize complex molecular structures and understand chemical bonding in 3D space.',
                category: 'Chemistry',
                duration: '28 min',
                details: [
                    'Explore different types of chemical bonds',
                    'Understand molecular geometry and VSEPR theory',
                    'Examine intermolecular forces and properties',
                    'Learn about organic and inorganic molecules'
                ],
                objectives: [
                    'Identify covalent, ionic, and metallic bonds',
                    'Predict molecular shapes using VSEPR theory',
                    'Understand how structure affects molecular properties',
                    'Analyze functional groups in organic chemistry'
                ],
                modelUrl: '', // Would contain actual GLB/GLTF model URL
                relatedExperiments: ['atom', 'dna']
            }
        }
    },
    
    // Current viewer state
    state: {
        currentExperiment: null,
        modelViewer: null,
        isAutoRotating: true,
        isFullscreen: false
    },
    
    // Initialize the 3D viewer
    init: function() {
        this.loadExperimentFromURL();
        this.setupModelViewer();
        this.setupControls();
        this.setupKeyboardShortcuts();
        console.log('3D Viewer initialized');
    }
};

// Load experiment based on URL parameter
Viewer3D.loadExperimentFromURL = function() {
    const experimentId = VirtualLabAR.utils.getQueryParam('experiment');
    
    if (experimentId && this.config.experiments[experimentId]) {
        this.loadExperiment(experimentId);
    } else {
        this.loadDefaultExperiment();
    }
};

// Load specific experiment
Viewer3D.loadExperiment = function(experimentId) {
    const experiment = this.config.experiments[experimentId];
    if (!experiment) return;
    
    this.state.currentExperiment = experimentId;
    this.updateUI(experiment);
    this.loadModel(experiment.modelUrl);
    this.setupRelatedExperiments(experiment.relatedExperiments);
    
    // Announce to screen readers
    VirtualLabAR.announce(`Loaded ${experiment.title} experiment`);
};

// Load default experiment view
Viewer3D.loadDefaultExperiment = function() {
    const defaultExperiment = this.config.defaultModel;
    this.updateUI(defaultExperiment);
    this.loadPlaceholderModel();
};

// Update UI with experiment data
Viewer3D.updateUI = function(experiment) {
    // Update title and description
    const titleElement = document.getElementById('experiment-title');
    const descriptionElement = document.getElementById('experiment-description');
    const categoryElement = document.getElementById('experiment-category');
    const durationElement = document.getElementById('experiment-duration');
    
    if (titleElement) titleElement.textContent = experiment.title;
    if (descriptionElement) descriptionElement.textContent = experiment.description;
    if (categoryElement) {
        categoryElement.textContent = experiment.category;
        // Update category color based on subject
        this.updateCategoryColor(categoryElement, experiment.category);
    }
    if (durationElement) durationElement.textContent = experiment.duration;
    
    // Update experiment details
    const detailsElement = document.getElementById('experiment-details');
    if (detailsElement && experiment.details) {
        detailsElement.innerHTML = experiment.details.map(detail => 
            `<p class="text-gray-600 mb-2">• ${detail}</p>`
        ).join('');
    }
    
    // Update learning objectives
    const objectivesElement = document.getElementById('learning-objectives');
    if (objectivesElement && experiment.objectives) {
        objectivesElement.innerHTML = experiment.objectives.map(objective => 
            `<li class="flex items-start">
                <i class="fas fa-check-circle text-green-500 mr-2 mt-0.5"></i>
                ${objective}
            </li>`
        ).join('');
    }
    
    // Update page title
    document.title = `${experiment.title} - Virtual Lab Simulator using AR`;
};

// Update category color
Viewer3D.updateCategoryColor = function(element, category) {
    // Remove existing category classes
    element.className = element.className.replace(/bg-\w+-100 text-\w+-800/g, '');
    
    // Add appropriate color based on category
    const colors = {
        'Biology': 'bg-red-100 text-red-800',
        'Physics': 'bg-yellow-100 text-yellow-800', 
        'Chemistry': 'bg-purple-100 text-purple-800',
        'Interactive': 'bg-blue-100 text-blue-800'
    };
    
    const colorClass = colors[category] || 'bg-gray-100 text-gray-800';
    element.className += ` ${colorClass} px-3 py-1 rounded-full text-sm font-medium`;
};

// Setup model viewer
Viewer3D.setupModelViewer = function() {
    this.state.modelViewer = document.getElementById('model-viewer');
    
    if (!this.state.modelViewer) return;
    
    // Model loading events
    this.state.modelViewer.addEventListener('load', () => {
        this.hideModelPlaceholder();
        VirtualLabAR.announce('3D model loaded successfully');
    });
    
    this.state.modelViewer.addEventListener('error', (event) => {
        console.error('Model loading error:', event);
        this.showModelError();
    });
    
    // Progress events
    this.state.modelViewer.addEventListener('progress', (event) => {
        const progressBar = document.querySelector('.progress-bar .update-bar');
        if (progressBar) {
            const progress = event.detail.totalProgress * 100;
            progressBar.style.width = `${progress}%`;
        }
    });
    
    // AR events
    this.state.modelViewer.addEventListener('ar-status', (event) => {
        const status = event.detail.status;
        if (status === 'session-started') {
            VirtualLabAR.announce('AR session started');
        } else if (status === 'not-presenting') {
            VirtualLabAR.announce('AR session ended');
        }
    });
};

// Load 3D model
Viewer3D.loadModel = function(modelUrl) {
    if (!this.state.modelViewer || !modelUrl) {
        this.loadPlaceholderModel();
        return;
    }
    
    this.showModelPlaceholder();
    this.state.modelViewer.src = modelUrl;
    this.state.modelViewer.style.display = 'block';
};

// Load placeholder when no model is available
Viewer3D.loadPlaceholderModel = function() {
    const placeholder = document.getElementById('model-placeholder');
    if (placeholder) {
        placeholder.style.display = 'flex';
        placeholder.innerHTML = `
            <div class="text-center">
                <i class="fas fa-cube text-6xl text-gray-400 mb-4 animate-pulse"></i>
                <h3 class="text-xl font-semibold text-gray-700 mb-2">3D Model Preview</h3>
                <p class="text-gray-500 mb-4">Select an experiment to load its 3D model</p>
                <a href="/experiments.html" class="inline-flex items-center bg-primary text-white px-4 py-2 rounded-lg hover:bg-secondary transition duration-300">
                    <i class="fas fa-flask mr-2"></i>
                    Browse Experiments
                </a>
            </div>
        `;
    }
    
    if (this.state.modelViewer) {
        this.state.modelViewer.style.display = 'none';
    }
};

// Show model placeholder during loading
Viewer3D.showModelPlaceholder = function() {
    const placeholder = document.getElementById('model-placeholder');
    if (placeholder) {
        placeholder.style.display = 'flex';
        placeholder.innerHTML = `
            <div class="text-center">
                <div class="loading-spinner"></div>
                <h3 class="text-xl font-semibold text-gray-700 mb-2 mt-4">Loading 3D Model</h3>
                <p class="text-gray-500">Please wait while the model loads...</p>
            </div>
        `;
    }
};

// Hide model placeholder when loaded
Viewer3D.hideModelPlaceholder = function() {
    const placeholder = document.getElementById('model-placeholder');
    if (placeholder) {
        placeholder.style.display = 'none';
    }
};

// Show model error
Viewer3D.showModelError = function() {
    const placeholder = document.getElementById('model-placeholder');
    if (placeholder) {
        placeholder.style.display = 'flex';
        placeholder.innerHTML = `
            <div class="text-center">
                <i class="fas fa-exclamation-triangle text-6xl text-red-400 mb-4"></i>
                <h3 class="text-xl font-semibold text-gray-700 mb-2">Error Loading Model</h3>
                <p class="text-gray-500 mb-4">There was a problem loading the 3D model</p>
                <button onclick="location.reload()" class="inline-flex items-center bg-primary text-white px-4 py-2 rounded-lg hover:bg-secondary transition duration-300">
                    <i class="fas fa-refresh mr-2"></i>
                    Try Again
                </button>
            </div>
        `;
    }
    
    VirtualLabAR.announce('Error loading 3D model');
};

// Setup viewer controls
Viewer3D.setupControls = function() {
    // Reset camera button
    const resetCameraBtn = document.getElementById('reset-camera');
    if (resetCameraBtn) {
        resetCameraBtn.addEventListener('click', () => {
            if (this.state.modelViewer) {
                this.state.modelViewer.resetTurntableRotation();
                this.state.modelViewer.cameraOrbit = '45deg 55deg 4m';
                VirtualLabAR.announce('Camera view reset');
            }
        });
    }
    
    // Toggle auto-rotation
    const toggleRotationBtn = document.getElementById('toggle-rotation');
    if (toggleRotationBtn) {
        toggleRotationBtn.addEventListener('click', () => {
            this.state.isAutoRotating = !this.state.isAutoRotating;
            
            if (this.state.modelViewer) {
                if (this.state.isAutoRotating) {
                    this.state.modelViewer.setAttribute('auto-rotate', '');
                    toggleRotationBtn.innerHTML = '<i class="fas fa-pause mr-1"></i>Stop Rotation';
                    VirtualLabAR.announce('Auto rotation enabled');
                } else {
                    this.state.modelViewer.removeAttribute('auto-rotate');
                    toggleRotationBtn.innerHTML = '<i class="fas fa-play mr-1"></i>Auto Rotate';
                    VirtualLabAR.announce('Auto rotation disabled');
                }
            }
        });
    }
    
    // Fullscreen toggle
    const fullscreenBtn = document.getElementById('fullscreen-btn');
    if (fullscreenBtn) {
        fullscreenBtn.addEventListener('click', () => {
            this.toggleFullscreen();
        });
    }
    
    // Handle fullscreen change
    document.addEventListener('fullscreenchange', () => {
        this.state.isFullscreen = !!document.fullscreenElement;
        this.updateFullscreenButton();
    });
};

// Toggle fullscreen mode
Viewer3D.toggleFullscreen = function() {
    const container = document.getElementById('model-container');
    if (!container) return;
    
    if (!this.state.isFullscreen) {
        if (container.requestFullscreen) {
            container.requestFullscreen();
        } else if (container.webkitRequestFullscreen) {
            container.webkitRequestFullscreen();
        } else if (container.msRequestFullscreen) {
            container.msRequestFullscreen();
        }
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
    }
};

// Update fullscreen button appearance
Viewer3D.updateFullscreenButton = function() {
    const fullscreenBtn = document.getElementById('fullscreen-btn');
    if (fullscreenBtn) {
        if (this.state.isFullscreen) {
            fullscreenBtn.innerHTML = '<i class="fas fa-compress mr-1"></i>Exit Fullscreen';
        } else {
            fullscreenBtn.innerHTML = '<i class="fas fa-expand mr-1"></i>Fullscreen';
        }
    }
};

// Setup related experiments
Viewer3D.setupRelatedExperiments = function(relatedIds) {
    const container = document.getElementById('related-experiments');
    if (!container || !relatedIds) return;
    
    const relatedHtml = relatedIds.map(id => {
        const experiment = this.config.experiments[id];
        if (!experiment) return '';
        
        return `
            <a href="/viewer.html?experiment=${id}" class="block p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition duration-300">
                <div class="flex items-center">
                    <i class="fas fa-flask text-primary mr-2"></i>
                    <span class="text-gray-700 text-sm">${experiment.title}</span>
                </div>
            </a>
        `;
    }).join('');
    
    container.innerHTML = relatedHtml;
};

// Setup keyboard shortcuts
Viewer3D.setupKeyboardShortcuts = function() {
    document.addEventListener('keydown', (event) => {
        // Don't trigger shortcuts when typing in inputs
        if (event.target.tagName === 'INPUT' || event.target.tagName === 'TEXTAREA') return;
        
        switch(event.key) {
            case 'r':
            case 'R':
                // Reset camera
                document.getElementById('reset-camera')?.click();
                break;
                
            case ' ':
                // Toggle auto rotation
                event.preventDefault();
                document.getElementById('toggle-rotation')?.click();
                break;
                
            case 'f':
            case 'F':
                // Toggle fullscreen
                event.preventDefault();
                this.toggleFullscreen();
                break;
                
            case 'Escape':
                // Exit fullscreen
                if (this.state.isFullscreen) {
                    this.toggleFullscreen();
                }
                break;
        }
    });
};

// Initialize viewer when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => Viewer3D.init());
} else {
    Viewer3D.init();
}

// Export for global access
window.Viewer3D = Viewer3D;