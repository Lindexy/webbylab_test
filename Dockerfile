FROM node:16
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app
EXPOSE 8080
ENV PORT=8080
ENV JWT_SECRET=secret
ENV DB_DIALECT=sqlite
ENV DB_STORAGE=database.sqlite
CMD [ "npm", "start" ]