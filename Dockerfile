# Use official lightweight Node.js image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy root configurations
COPY package.json .npmrc ./

# Install backend dependencies
RUN npm install

# Copy frontend source files and its local .npmrc
COPY frontend/package.json frontend/.npmrc ./frontend/
RUN npm install --prefix frontend

# Copy the rest of frontend files
COPY frontend/ ./frontend/

# Build the frontend React app (generates /app/frontend/dist/)
RUN npm run build --prefix frontend

# Copy backend files
COPY backend/ ./backend/

# Expose port (Cloud Run defaults to 8080)
EXPOSE 8080

# Environment variables
ENV NODE_ENV=production
ENV PORT=8080

# Start the server
CMD ["npm", "start"]
