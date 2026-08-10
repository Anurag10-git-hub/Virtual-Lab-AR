// webapp/public/experiments-data.js

const EXPERIMENTS_DATA = {
    'atom': {
        title: 'Atom Model Explorer (Oxygen)',
        description: 'Explore the fundamental structure of an Oxygen atom with its nucleus, protons, and electrons. This model helps visualize atomic shells.',
        category: 'Chemistry',
        duration: '15 min',
        modelPath: '/models/atom-oxygen.glb', // Your new model!
        objectives: [
            'Identify the components of an atom (nucleus, electron, shell).',
            'Understand the basic principles of atomic structure.',
            'Visualize the 3D arrangement of subatomic particles.'
        ]
    },
    'heart': {
        title: 'Human Heart 3D',
        description: 'A detailed anatomical model of the human heart showing all four chambers and major blood vessels.',
        category: 'Biology',
        duration: '30 min',
        modelPath: '/models/placeholder-heart.glb', // Placeholder (replace later)
        objectives: [
            'Identify the four chambers of the heart.',
            'Trace the path of blood circulation.',
            'Locate major arteries and veins.'
        ]
    }
    // Add data for 'circuit', 'dna', 'solar-system', 'molecule' later
};