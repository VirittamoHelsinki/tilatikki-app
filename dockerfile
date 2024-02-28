FROM node:20

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies for the entire project
RUN npm install

# Copy the entire project
COPY . .

# Install dependencies for the client
WORKDIR /app/client
RUN npm install

# Build the client for production
RUN npm run build:docker

# Go back to the root directory
WORKDIR /app

# Install dependencies for the server
WORKDIR /app/server
RUN npm install

# Expose the port
EXPOSE 5050

# Start the server
CMD ["npm", "run", "dev"]














# FROM node:18

# WORKDIR /app

# COPY package.json .
# COPY package-lock.json .

# # Install dependencies for the entire project
# RUN npm install

# # Copy the entire project
# COPY . .

# # Install dependencies for the client
# RUN cd client && npm install

# # Build the client for production
# RUN cd client && npm run build:docker

# # Expose the port
# EXPOSE 5001

# # Start the server
# CMD ["npm", "run", "dev"]







# FROM node:14-alpine

# WORKDIR .

# COPY . .


# RUN npm install

# RUN cd client  && npm install && npm run build:docker


# COPY . /app
# ADD . /app

# EXPOSE 5001

# CMD ["npm", "run", "docker:build"]
