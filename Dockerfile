# syntax=docker/dockerfile:1

ARG NODE_VERSION=18.18.2

################################################################################
# Use node image for base image for all stages.
FROM node:${NODE_VERSION}-alpine as base

# Set working directory for all build stages.
WORKDIR /usr/src/app

################################################################################
# Create a stage for installing production dependecies.
FROM base as deps

# Install dependencies
COPY package.json package-lock.json ./
RUN npm install

################################################################################
# Create a stage for building the application.
FROM deps as build

# Install additional development dependencies if needed
COPY tsconfig.json ./
COPY . .
RUN npm run build

################################################################################
# Create a new stage to run the application with minimal runtime dependencies
# where the necessary files are copied from the build stage.
FROM base as final

# Set production environment
ENV NODE_ENV production

# Install ts-node-dev globally
RUN npm install -g ts-node-dev

# Copy production dependencies and built application from build stage
COPY --from=deps /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/dist ./dist

# Expose the port that the application listens on.
EXPOSE 3000

# Run the application using ts-node-dev
CMD ["ts-node-dev", "--respawn", "--transpile-only", "src/index.ts"]
