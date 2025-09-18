# Liora - AI Career & Skills Advisor

## Project Overview

Liora is an AI-powered career guidance platform that helps professionals discover their potential, explore opportunities, and accelerate their career growth through personalized AI guidance.

## Features

- **AI Career Chat**: Interactive chat interface for personalized career advice
- **User Authentication**: Secure login and signup system
- **Profile Management**: Comprehensive user profile with settings and preferences
- **Theme Support**: Light and dark mode switching
- **Responsive Design**: Works seamlessly across all devices

## Technologies Used

This project is built with:

- **Vite** - Fast build tool and development server
- **TypeScript** - Type-safe JavaScript
- **React** - Modern UI library
- **shadcn/ui** - Beautiful and accessible UI components
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **Lucide React** - Beautiful icons

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <YOUR_GIT_URL>
cd liora-ai-pathfinder
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:8080`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # shadcn/ui components
│   ├── Header.tsx      # Navigation header
│   ├── Sidebar.tsx     # User sidebar with profile
│   ├── ChatInput.tsx   # Chat interface
│   └── HeroSection.tsx # Landing page hero
├── pages/              # Page components
│   ├── Index.tsx       # Home/landing page
│   ├── Chat.tsx        # Chat page
│   ├── Login.tsx       # Login page
│   └── SignUp.tsx      # Registration page
├── lib/                # Utility functions
└── hooks/              # Custom React hooks
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is private and proprietary.