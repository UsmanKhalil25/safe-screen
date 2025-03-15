# SafeScreen

SafeScreen is a secure file storage and sharing platform that prioritizes data protection and user privacy. Built with modern web technologies, it offers an intuitive interface for managing and sharing files securely.

![SafeScreen Logo](public/placeholder.svg)

## Features

- **End-to-End Encryption**: Files are encrypted before leaving your device
- **Secure File Sharing**: Share files with password protection and expiration dates
- **File Version History**: Access and restore previous versions of your files
- **Team Collaboration**: Work together with granular permission controls
- **Access Controls**: Set detailed permissions for viewing, editing, and sharing
- **Activity Monitoring**: Track file access and changes with detailed logs

## Tech Stack

- **Frontend Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS with custom animations
- **UI Components**: Shadcn/ui
- **Animations**: Framer Motion
- **Forms**: React Hook Form with Zod validation
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 18.x or later
- npm or yarn

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/safe-screen.git
   cd safe-screen
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server:

   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
src/
├── app/                    # Next.js app directory
│   ├── (public)/          # Public routes
│   │   ├── (auth)/       # Authentication routes
│   │   └── (landing)/    # Landing page routes
│   └── layout.tsx         # Root layout
├── components/            # Shared components
│   ├── ui/               # UI components
│   └── icons/            # Icon components
└── lib/                  # Utilities and schemas
```

## Development

### Code Style

- Use TypeScript for type safety
- Follow the component structure in `src/components`
- Use Tailwind CSS for styling
- Implement responsive design for all components
- Add proper aria labels and roles for accessibility

### Component Guidelines

- Keep components small and focused
- Use TypeScript interfaces for props
- Implement proper error handling
- Add loading states where necessary
- Follow accessibility best practices

### Animations

- Use Framer Motion for complex animations
- Keep animations subtle and purposeful
- Ensure animations don't impact usability
- Provide reduced-motion alternatives

## Security Features

- End-to-end encryption for file storage
- Secure password hashing
- Rate limiting for API endpoints
- CSRF protection
- XSS prevention
- Secure session management

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a pull request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Shadcn/ui](https://ui.shadcn.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [Lucide Icons](https://lucide.dev/)
