# Use an official Node.js runtime as a parent image
FROM node:20.7.0

# Set the working directory to /app
WORKDIR /uploadService

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install any needed packages specified in package.json
RUN npm install

# Copy the current directory contents into the container at /app
COPY . .

# Make port 5001 available to the world outside this container
EXPOSE 3001

# Make port available to the world outside this container
ENV PORT=3001
ENV ENVIRONMENT=Production

# Run the compiled JavaScript file when the container launches
CMD ["node", "app.js"]
