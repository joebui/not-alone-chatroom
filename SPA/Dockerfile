FROM node:boron

# Create directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json /usr/src/app/
RUN npm install
RUN npm install pm2 -g
RUN npm install gulp -g

# Bundle source code
COPY . /usr/src/app

# Build the project
RUN npm run build

# Expose port and run app
ENV NODE_ENV=production
EXPOSE 8000
CMD ["pm2", "start", "server.js", "-i max", "--no-daemon"]