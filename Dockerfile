FROM node

WORKDIR /app

ADD . /app

#EXPOSE 80

#CMD ["npm install"]

CMD ["npm", "start"]
