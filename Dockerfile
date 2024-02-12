# Image containing browser dependencies of playwright and latest node
FROM mcr.microsoft.com/playwright:v1.41.1-jammy as base

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .
RUN npm run build

FROM base as test
ENV NODE_ENV=test
RUN npm test

FROM base as prod
ENV NODE_ENV=production
EXPOSE 3000
CMD ["npm", "start"]
