# Codebase Structure

This document outlines the current structure of the Hairstyle Visualization App project.

```
hairstyles-app/
├── assets/                    # Directory for static assets
│   └── Screenshot 2025-05-08 164947.png
├── client/                    # Frontend application
│   ├── src/                  # Source code
│   ├── public/              # Static assets
│   ├── node_modules/        # Frontend dependencies
│   ├── package.json         # Frontend dependencies
│   ├── package-lock.json    # Frontend lock file
│   ├── tailwind.config.js   # Tailwind configuration
│   ├── postcss.config.cjs   # PostCSS configuration
│   ├── vite.config.js       # Vite configuration
│   ├── eslint.config.js     # ESLint configuration
│   ├── index.html           # Entry HTML file
│   └── .gitignore          # Git ignore rules
├── server/                    # Backend application
│   ├── server.js            # Main server file
│   ├── vercel.json          # Vercel configuration
│   ├── node_modules/        # Backend dependencies
│   ├── package.json         # Backend dependencies
│   ├── package-lock.json    # Backend lock file
│   └── .gitignore          # Git ignore rules
├── .cursor/                   # Cursor IDE configuration
├── .git/                      # Git repository
├── node_modules/              # Project-level node_modules
├── package.json               # Project-level package.json
├── package-lock.json          # Project-level package-lock.json
├── FUTURE_IMPROVEMENTS.md     # Future improvements documentation
├── PROGRESS.md               # Progress tracking
├── FULL_PROGRESS.md          # Detailed progress tracking
├── README.md                 # Project documentation
└── .gitignore                # Git ignore rules
```

## Directory Descriptions

### Root Level

- `assets/`: Contains static assets like images and screenshots
- `client/`: Frontend application built with Vite and React
- `server/`: Backend application using Express.js
- `.cursor/`: Configuration files for the Cursor IDE
- `.git/`: Git repository data
- `node_modules/`: Project-level dependencies
- `package.json`: Project-level package configuration
- `package-lock.json`: Project-level dependency lock file

### Documentation

- `FUTURE_IMPROVEMENTS.md`: Tracks planned enhancements and improvements
- `PROGRESS.md`: Current progress tracking
- `FULL_PROGRESS.md`: Detailed progress history
- `README.md`: Main project documentation

### Client Directory

- `src/`: Source code for the frontend application
- `public/`: Static assets served directly
- Configuration files for various tools (Tailwind, PostCSS, Vite, ESLint)

### Server Directory

- `server.js`: Main server application file
- `vercel.json`: Deployment configuration for Vercel
- Backend-specific package management files

## Notes

- Each major component (client/server) has its own `node_modules` and package management
- Configuration files are kept close to their respective applications
- Documentation is maintained at the root level for easy access
