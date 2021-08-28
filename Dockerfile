FROM node:14-alpine AS builder
# set environment for production
ENV NODE_ENV production
# Add a work directory
WORKDIR /app

COPY package.json .

COPY yarn.lock .
# Install dependencies
RUN yarn install --production
# Copy all app files
COPY . .
# Build
RUN yarn build

# Bundle static assets
FROM nginx:1.21.0-alpine as production

ENV NODE_ENV production
# Copy built assets above
COPY --from=builder /app/build /usr/share/nginx/html
# Add your nginx.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf
# Expose port
EXPOSE 80
# Finally start nginx
CMD ["nginx", "-g", "daemon off;"]
