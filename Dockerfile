FROM node:14

# Create app directory
WORKDIR /backend

COPY . .

# Bundle app source
ENV PORT=3000

RUN npm install

EXPOSE $PORT

ENTRYPOINT ["npm", "start"]
