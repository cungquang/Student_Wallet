# Use an official Node.js runtime as a parent image
FROM node:20.7.0

# Set the working directory to /app
WORKDIR /authService

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install any needed packages specified in package.json
RUN npm install

# Copy the current directory contents into the container at /app
COPY . .

# Compile TypeScript code

# Make port 3000 available to the world outside this container
EXPOSE 3000

# Define environment variable
ENV PORT=3000

# Run the compiled JavaScript file when the container launches
CMD ["node", "app.js"]