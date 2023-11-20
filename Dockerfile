FROM node:21-alpine
WORKDIR /Wall-Ecart/
COPY public/ /Wall-Ecart/public
COPY src/ /Wall-Ecart/src
COPY package.json /Wall-Ecart/
RUN npm install
RUN npm install react-responsive-carousel
RUN npm install axios
CMD ["npm", "start"]