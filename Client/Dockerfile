FROM node:lts

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host"]

# Production mode (commented out)
# RUN npm run build
# FROM nginx:alpine
# COPY --from=0 /app/dist /usr/share/nginx/html
# COPY ./nginx.conf /etc/nginx/conf.d/default.conf
# EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]