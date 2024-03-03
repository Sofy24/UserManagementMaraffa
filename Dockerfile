FROM node:20-alpine as base

WORKDIR /app
 
COPY yarn.lock package.json /app/
 
RUN yarn install
 
COPY . /app
 
RUN yarn build

FROM node:20-alpine

WORKDIR /app    

EXPOSE 3001

COPY --from=base /app/package.json /app/package.json
COPY --from=base /app/node_modules /app/node_modules
COPY --from=base /app/dist /app/dist
 
EXPOSE 3001
 
CMD ["node","dist/main.js"]