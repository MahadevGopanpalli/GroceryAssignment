# Use an existing Node.js 12 Alpine image as a base
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy the contents of the current directory into the container
COPY . .

# Expose any necessary ports (if applicable)
EXPOSE 3000

RUN npm install
# Define the command to run your application
CMD ["npm", "start"]
