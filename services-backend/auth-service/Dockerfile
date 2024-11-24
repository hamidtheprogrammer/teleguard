# Use a lightweight Node.js image
FROM node:20-slim

# Set the working directory
WORKDIR /app

# Copy necessary files
COPY dist/ ./dist
COPY package.json package-lock.json ./
COPY prisma ./prisma 
# Include the Prisma schema directory

# Install only production dependencies
RUN npm install --production

# Run Prisma generate to build the Prisma client
RUN npx prisma generate

# Expose the application port
EXPOSE 8000

# Start the application
CMD ["node", "dist/index.js"]
