# Virtual Lab Simulator using AR (for Rural Schools)

## Project Overview
- **Name**: Virtual Lab Simulator using AR
- **Goal**: Democratize science education in rural schools through immersive AR technology and interactive 3D learning experiences
- **Features**: Interactive 3D models, AR visualization, mobile-friendly platform, curriculum-aligned content

## URLs
- **Production**: *To be deployed*
- **GitHub**: *To be set up*

## Current Features ✅

### 🏠 Homepage
- Hero section with compelling call-to-action
- Feature highlights (Interactive Experiments, Accessible Learning, Mobile-First)
- Clean blue/white theme with modern design
- Responsive navigation with mobile menu

### 🧪 Experiments Page  
- 6 interactive science experiments across Biology, Physics, and Chemistry:
  - **Biology**: Human Heart 3D, DNA Double Helix
  - **Physics**: Circuit Simulation, Solar System Model  
  - **Chemistry**: Atom Model Explorer, Molecular Structure
- Category filtering system (All, Biology, Physics, Chemistry)
- Experiment cards with ratings, duration, and quick start buttons
- Hover animations and visual feedback

### 🔬 3D Model Viewer
- Interactive 3D model display using `<model-viewer>` component
- Camera controls (rotate, zoom, reset)
- Auto-rotation toggle
- Fullscreen mode support
- AR mode capability (ARCore/ARKit compatible)
- Experiment-specific content loading
- Related experiments suggestions
- Keyboard shortcuts (R=reset, Space=rotate, F=fullscreen)

### ℹ️ About Page
- Comprehensive problem statement for rural education challenges
- Detailed solution overview with AR technology benefits
- Project objectives, scope, and target audience
- Technology stack information
- Projected impact statistics
- FAQ section addressing common questions

### 📞 Contact Page
- Multi-field contact form with validation
- Role-based inquiry categorization
- FAQ section for quick answers
- Contact information and office hours
- Social media integration
- Real-time form validation and feedback

## Data Architecture
- **Data Models**: Experiment metadata, user interactions, form submissions
- **Storage Services**: Static file hosting via Cloudflare Pages
- **Data Flow**: Client-side JavaScript handling navigation, 3D models served via CDN

## Functional Entry URIs

| Path | Description | Parameters |
|------|-------------|------------|
| `/` | Homepage with hero section and features | - |
| `/experiments.html` | Browse all science experiments | - |
| `/viewer.html` | 3D model viewer and AR experience | `?experiment={id}` |
| `/about.html` | Project details and mission | - |
| `/contact.html` | Contact form and information | - |

### Viewer Parameters
- `?experiment=heart` - Human Heart 3D Model
- `?experiment=circuit` - Circuit Simulation  
- `?experiment=atom` - Atom Model Explorer
- `?experiment=dna` - DNA Double Helix
- `?experiment=solar-system` - Solar System Model
- `?experiment=molecule` - Molecular Structure

## User Guide

### For Students
1. **Browse Experiments**: Visit `/experiments.html` to see available experiments
2. **Filter by Subject**: Use category buttons to filter by Biology, Physics, or Chemistry
3. **Start Experiment**: Click "Start" button on any experiment card
4. **Interact with 3D Model**: Use mouse/touch to rotate and zoom models
5. **Enable AR**: Click "View in AR" button for immersive experience

### For Teachers
1. **Explore Content**: Review experiment descriptions and learning objectives
2. **Integrate with Curriculum**: Use experiments to supplement existing lessons  
3. **Demonstrate to Class**: Use fullscreen mode for classroom presentations
4. **Assign to Students**: Share direct experiment links for homework

### Controls & Navigation
- **Mouse**: Click and drag to rotate, scroll to zoom
- **Touch**: Pinch to zoom, drag to rotate on mobile devices
- **Keyboard**: R (reset camera), Space (toggle rotation), F (fullscreen)
- **AR Mode**: Available on compatible mobile devices

## Technology Stack

### Frontend
- **HTML5**: Semantic markup with accessibility features
- **CSS3**: Custom styles with Tailwind CSS framework
- **JavaScript**: Vanilla ES6+ with modular architecture
- **Responsive Design**: Mobile-first approach with Flexbox/Grid

### 3D & AR Technology
- **Model Viewer**: Google's `<model-viewer>` web component
- **Three.js**: 3D graphics library for advanced interactions
- **WebXR**: AR/VR web standards for immersive experiences
- **GLB/GLTF**: Optimized 3D model formats

### Hosting & Deployment
- **Cloudflare Pages**: Edge-optimized static site hosting
- **Hono Framework**: Lightweight web framework for edge runtime
- **Wrangler**: Cloudflare CLI for deployment and development
- **Vite**: Modern build tool with hot module replacement

## Features Not Yet Implemented 🚧

### Core Functionality
- [ ] **Actual 3D Models**: Replace placeholder content with real GLB/GLTF models
- [ ] **Backend API**: Contact form submission endpoint
- [ ] **User Authentication**: Student/teacher accounts and progress tracking
- [ ] **Content Management**: Admin interface for managing experiments

### Enhanced Features  
- [ ] **Interactive Simulations**: Real-time physics and chemistry simulations
- [ ] **Progress Tracking**: Save user progress and completion status
- [ ] **Collaboration Tools**: Multi-user sessions and sharing capabilities
- [ ] **Offline Support**: Progressive Web App with offline functionality
- [ ] **Analytics**: Usage tracking and learning outcome measurements
- [ ] **Multi-language**: Internationalization for global accessibility

### Advanced AR/VR
- [ ] **Hand Tracking**: Advanced gesture controls for AR interactions
- [ ] **Voice Commands**: Audio-based navigation and controls
- [ ] **Haptic Feedback**: Physical sensation integration
- [ ] **WebRTC**: Real-time collaboration in shared AR spaces

## Recommended Next Steps

### Immediate (Next Sprint)
1. **Add Real 3D Models**: Source or create GLB/GLTF models for each experiment
2. **Implement Contact Form Backend**: Set up API endpoint for form submissions
3. **Deploy to Production**: Set up Cloudflare Pages deployment
4. **User Testing**: Gather feedback from target users (students/teachers)

### Short Term (1-2 Months)
1. **Content Expansion**: Add more experiments and subjects
2. **User Accounts**: Implement authentication and progress tracking  
3. **Performance Optimization**: Optimize model loading and rendering
4. **Accessibility Audit**: Ensure full WCAG compliance

### Long Term (3-6 Months)
1. **Interactive Simulations**: Build dynamic physics/chemistry simulations
2. **Teacher Dashboard**: Create tools for educators to track student progress
3. **Mobile App**: Consider native iOS/Android applications
4. **Partnerships**: Collaborate with schools for pilot programs

## Development Commands

```bash
# Development
npm run dev              # Start Vite dev server
npm run dev:sandbox      # Start Wrangler dev server (for sandbox)
npm run build            # Build for production
npm run preview          # Preview production build

# Deployment  
npm run deploy           # Deploy to Cloudflare Pages
npm run deploy:prod      # Deploy to production project

# Utilities
npm run clean-port       # Kill processes on port 3000
npm run test            # Test local server
npm run git:status      # Check git status
```

## Deployment Status
- **Platform**: Static website (ready for Cloudflare Pages deployment)
- **Status**: ✅ Fully functional local development server running
- **Tech Stack**: HTML5 + CSS3 + Vanilla JavaScript + TailwindCSS + Model-Viewer
- **Local URL**: http://localhost:3000
- **Public URL**: https://3000-iwvbay0xjprd3earwo2ou-6532622b.e2b.dev
- **Last Updated**: 2024-09-26

## Contributing
This project aims to bridge the educational gap between urban and rural schools. Contributions welcome for:
- 3D model creation and optimization
- Educational content development  
- Accessibility improvements
- Performance enhancements
- User experience testing

## License
MIT License - Building open education technology for everyone.