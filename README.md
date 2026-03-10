# Portfolio

A modern, interactive portfolio website built with Angular 21, featuring a sleek design with animated elements, multilingual support, and an embedded browser game.

## ✨ Features

- **Modern Angular Architecture**: Built with Angular 21 using standalone components and signals
- **Responsive Design**: Fully responsive layout that works on all devices
- **Multilingual Support**: English and Chinese language support with easy switching
- **Interactive Elements**: 
  - Animated hero section with typing effect and particle animations
  - Smooth scrolling navigation
  - Interactive tech badges
- **GPU Defender Game**: A fully functional browser game where you defend your GPU cluster from bugs and errors
- **Modern UI/UX**: 
  - Material Design components
  - SCSS styling with custom animations
  - Terminal-style aesthetic elements
- **Touch Support**: Mobile-friendly touch controls for the game

## 🛠️ Tech Stack

- **Framework**: Angular 21.2.0
- **UI Library**: Angular Material 21.2.1
- **Styling**: SCSS
- **Language**: TypeScript 5.9.2
- **Package Manager**: npm 10.8.2
- **Build Tool**: Angular CLI 21.2.1

## 📁 Project Structure

```
src/
├── app/
│   ├── components/
│   │   ├── navbar/          # Navigation component
│   │   ├── hero/            # Hero section with animations
│   │   ├── about/           # About section
│   │   ├── skills/          # Skills showcase
│   │   ├── projects/        # Projects portfolio
│   │   ├── game/            # GPU Defender game
│   │   ├── contact/         # Contact form
│   │   └── footer/          # Footer component
│   ├── services/
│   │   ├── language.service.ts    # i18n service
│   │   └── i18n.data.ts           # Translation data
│   ├── app.ts              # Main app component
│   ├── app.routes.ts       # App routing
│   └── app.config.ts       # App configuration
├── main.ts                 # Application bootstrap
├── styles.scss             # Global styles
└── index.html              # Main HTML template
```

## 🚀 Getting Started

### Prerequisites

- Node.js (version 18 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd Portfolio
```

2. Install dependencies:
```bash
npm install
```

### Development Server

To start a local development server, run:

```bash
npm start
```

or

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## 🎮 GPU Defender Game

The portfolio includes an interactive browser game called "GPU Defender" where players:
- Defend their GPU cluster from incoming bugs, errors, and OOM crashes
- Use keyboard (WASD/Arrow keys) or touch controls for movement
- Shoot projectiles with spacebar or fire button
- Track score, lives, and high score
- Toggle sound effects on/off

## 🌐 Internationalization

The application supports multiple languages:
- **English** (default)
- **Chinese** (简体中文)

Language switching is handled through the `LanguageService` and all UI text is properly internationalized.

## 🎨 Design Features

### Hero Section
- Animated terminal tag with typing effect
- Particle animation system with CSS variables
- Grid background with glow effects
- Smooth scroll indicator

### Game Component
- Canvas-based rendering
- Real-time game loop
- Touch-friendly mobile controls
- Sound effects toggle
- Score tracking system

### Responsive Design
- Mobile-first approach
- Flexible grid layouts
- Touch-optimized interactions
- Adaptive typography

## 🔧 Development

### Code Generation

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

### Building

To build the project for production:

```bash
npm run build
```

or

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. The production build optimizes your application for performance and speed.

### Testing

#### Unit Tests

To execute unit tests, use:

```bash
npm test
```

or

```bash
ng test
```

#### End-to-End Tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Note: End-to-end testing framework needs to be configured separately based on your preferences.

## 📱 Browser Support

This application supports all modern browsers:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🔗 Additional Resources

- [Angular Documentation](https://angular.dev)
- [Angular Material](https://material.angular.io)
- [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli)
- [TypeScript Documentation](https://www.typescriptlang.org)

---

Built with ❤️ using Angular 21
