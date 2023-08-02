FROM node:18.16.0-alpine

WORKDIR /app/test

COPY package*.json ./

RUN npm i

COPY . .

ENV PORT = 8002
# ENV DB_HOST = localhost
# ENV DB_PORT = 5432
# ENV DB_PASS = harshit@123
# ENV DB_USER = postgres
# ENV DB_DIALECT = postgres
# ENV DB_NAME = advertisement_mngmnt_db
# ENV SECRET_KEY = secret_key
# ENV EMAIL_ADDRESS = forgotpass010@gmail.com
# ENV EMAIL_PASSWORD = ndwiqgovnnmjvfae

EXPOSE 8002

CMD [ "npm", "start" ] 