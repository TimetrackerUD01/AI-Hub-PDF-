#!/bin/bash

# Create project structure
mkdir -p aihub-pdf/{client,server}
cd aihub-pdf

# Initialize root package.json
npm init -y

# Setup server
cd server
npm init -y
npm install express multer pdf-lib pdf2pic jimp cors helmet compression express-rate-limit node-cron axios

# Setup client  
cd ../client
npx create-react-app . --template typescript
npm install react-router-dom axios react-dropzone @heroicons/react react-helmet-async framer-motion

# Create build script
cd ..
echo "Project setup complete! 🚀"
echo "To run development:"
echo "npm run dev"
echo ""
echo "To deploy to Render:"
echo "1. Push to GitHub"
echo "2. Connect to Render"
echo "3. Set build command: cd client && npm install && npm run build && cd ../server && npm install"
echo "4. Set start command: cd server && npm start"