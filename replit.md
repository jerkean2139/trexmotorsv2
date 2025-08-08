# Overview

This is a comprehensive used car dealership website for T-Rex Motors in Richmond. The application provides a customer-facing vehicle inventory browsing system with advanced search and filter capabilities, vehicle detail modals with inquiry forms, and a complete admin dashboard for vehicle management. The system is built as a full-stack web application using modern React and Node.js technologies with a PostgreSQL database.

## Recent Completion (August 2025)
✓ **Full Application Completed** - Professional dealership website with complete functionality
✓ **Vehicle Inventory System** - 21+ sample vehicles with comprehensive data
✓ **Search & Filter System** - Advanced filtering by make, year range, price range with real-time results
✓ **Admin Dashboard** - Complete vehicle management with authentication (admin/trex2025!)
✓ **Dual Image Management System** - Both local file upload and Google Drive URL integration
✓ **Database Integration** - Full PostgreSQL setup with proper schema and sample data
✓ **Hero Section** - Classic muscle car imagery representing T-Rex Motors brand

## Latest Updates (January 2025)
✓ **Frontend Deployment Complete** - Successfully deployed to Vercel with proper configuration
⚠️ **Backend Protection Issue** - admin-backend project still has Vercel authentication enabled, blocking API access
✓ **Admin Backend on Vercel** - Successfully deployed to `admin-backend-etkz45d8r-jeremys-projects-0f68a4ab.vercel.app`
✓ **Production Database Migration** - All 20 vehicles migrated to production PostgreSQL database
✓ **GitHub Integration** - Main branch pushed with all deployment configurations
✓ **Vercel Frontend Preparation** - Updated all API calls to use relative paths for unified deployment
✓ **Deployment Scripts** - Created automated Vercel deployment script and comprehensive documentation
✓ **Enhanced Image Upload** - Dual system supporting local files and Google Drive URLs
✓ **Smart URL Processing** - Automatic conversion of Google Drive sharing links to direct image URLs
✓ **Improved Form Handling** - Fixed textarea multiline support and proper form state management
✓ **Debug Console Integration** - Real-time logging for troubleshooting image loading issues
✓ **Image Management Features** - Individual image removal, clear all, and 10-image limit enforcement
✓ **Logo Integration** - Professional T-Rex Motors logo implementation across all pages
✓ **Navigation System** - Fully functional header navigation with About Us and Contact sections
✓ **Legal Pages** - Privacy Policy and Terms of Service pages with proper business information
✓ **Netlify Deployment** - Added Netlify configuration files for static site deployment
✓ **Real Vehicle Data Export** - All 20 vehicles from database exported for static deployment
✓ **Hybrid Data System** - Automatically falls back to exported data when API unavailable

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React 18 with TypeScript for type safety and modern component patterns
- **Styling**: Tailwind CSS with shadcn/ui component library for consistent, professional automotive branding
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack React Query for server state management and caching
- **Build Tool**: Vite for fast development and optimized production builds

## Backend Architecture
- **Runtime**: Node.js with Express.js for the REST API server
- **Language**: TypeScript throughout the entire stack for consistency
- **Database ORM**: Drizzle ORM with PostgreSQL for type-safe database operations
- **Authentication**: Session-based authentication for admin users
- **File Uploads**: Uppy.js integration with object storage for vehicle images

## Database Design
- **Primary Entities**: Users, Vehicles, and Inquiries
- **Vehicle Schema**: Comprehensive fields including make, model, year, price, mileage, colors, engine specs, features array, and image storage
- **Relationships**: Inquiries reference specific vehicles for customer interest tracking
- **Features**: Support for featured vehicles, status tracking, and rich metadata

## Project Structure
- `/client` - React frontend application with components, pages, and utilities
- `/server` - Express backend with API routes, database logic, and authentication
- `/shared` - Common TypeScript schemas and types used by both frontend and backend
- Single Vite configuration at project root for unified build process

## Development vs Production Strategy
- Development uses Vite dev server with hot module replacement
- Production serves static files from Express with proper MIME types
- Environment-based configuration for database connections and authentication

# External Dependencies

## Database
- **Neon Database**: Serverless PostgreSQL database with connection pooling
- **Drizzle Kit**: Database migration and schema management tools

## UI Components
- **Radix UI**: Headless component primitives for accessibility and keyboard navigation
- **shadcn/ui**: Pre-styled component library built on Radix UI with Tailwind CSS

## File Storage
- **Google Cloud Storage**: Object storage for vehicle images with ACL policy management
- **Uppy.js**: File upload interface with AWS S3 integration for direct uploads

## Authentication & Security
- **bcrypt**: Password hashing for admin authentication
- **express-session**: Session management for maintaining admin login state

## Development Tools
- **Replit Integration**: Development environment optimization with cartographer and error modal plugins
- **TypeScript**: Full-stack type safety with shared schema definitions
- **ESLint/Prettier**: Code quality and formatting (implied by modern React setup)