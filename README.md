## Getting Started

### Prerequisites
Make sure you have the following installed on your system:
- Node.js (latest stable version recommended)
- npm or yarn

### Installation
1. Clone the repository:
   ```sh
   git clone https://github.com/NutchaponSr/game24.git
   cd game24
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
### Database Management
Game24 uses Prisma ORM for database interactions. Use the following commands to manage the database:

- Generate Prisma client:
  ```sh
  npm run db:generate
  ```
- Open Prisma Studio for database exploration:
  ```sh
  npm run db:studio
  ```
- Push schema changes to the database:
  ```sh
  npm run db:push
  ```

### Running the Development Server
To start the development environment:
```sh
npm run dev
```
This will start the Next.js development server.

To start the Hono server:
```sh
npm run dev:hono
```
Or run both concurrently:
```sh
npm run dev:all
```

### Building the Project
To build the project for production:
```sh
npm run build
```

### Starting the Production Server
To start the production build:
```sh
npm start
```

### Linting and Formatting
To lint and format the codebase:
```sh
npm run lint
```

### Preparing for Git Hooks
To install Husky for pre-commit hooks:
```sh
npm run prepare
```


## Dependencies
### Main Dependencies
- 🚀 Next.js (15.2.4)
- ⚛️ React (19.0.0)
- 🔥 Hono (4.7.5)
- 🛠️ Prisma (6.5.0)
- 🎨 TailwindCSS (4)
- 🔄 Zustand for state management
- 📋 React Hook Form for form handling
- ✅ Zod for schema validation
- 🔐 JSON Web Tokens (JWT) for authentication

### Development Dependencies
- 📝 TypeScript
- 📏 ESLint and Prettier
- 🦊 Husky for Git hooks
- ⚡ Concurrently for running multiple scripts

## Environment Variables
Create a `.env` file in the root directory and add the following environment variables:

```env
# Database connection string
DATABASE_URL="postgresql://your_database_user:your_database_password@your_database_host/your_database_name?sslmode=require"

# JWT Secret Key
JWT_SECRET=your_secret_key_here

# Backend and Frontend URLs
NEXT_PUBLIC_BACKEND_URL=http://localhost:3001
NEXT_PUBLIC_FRONTEND_URL=http://localhost:3000
```

## Workflow

![Game24 Banner](public/workflow.png)

