# Use an official Node.js runtime as a parent image
FROM node:20.7.0


# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install any needed packages specified in package.json
RUN npm install

# Copy the current directory contents into the container at /app
COPY . .

# Compile TypeScript code
RUN npm run build

# Make port 3000 available to the world outside this container
EXPOSE 3000

# Define environment variable
ENV PORT=3000
ENV UPLOADSERVICE_URL=http://localhost:3001/api/file/upload

# Run the compiled JavaScript file when the container launches
CMD ["npm", "app.js"]