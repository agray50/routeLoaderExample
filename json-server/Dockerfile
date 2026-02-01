# JSON Server Dockerfile
FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy database file
COPY db.json ./

# Expose port
EXPOSE 3001

# Start json-server
CMD ["npm", "start"]
