# 1. Base Image: Node 20 on lightweight Alpine Linux (~150MB)
FROM node:20-alpine

# 2. Set working directory inside the container
WORKDIR /usr/src/app

# 3. Copy package manifests first (Crucial for Docker layer caching)
COPY package*.json ./

# 4. Install dependencies inside Linux environment
RUN npm install

# 5. Copy the remaining application source code
COPY . .

# 6. Document the port the container listens on
EXPOSE 5400

# 7. Start command
CMD ["npm", "./app.js"]