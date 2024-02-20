FROM node:21.1.0-alpine 
WORKDIR /app 
COPY package*.json ./ 
RUN npm install 
COPY . . 
ENV VITE_REACT_APP_BACKEND_URL=http://44.205.244.15:8000 /// change it according to ur backend 
RUN npm run build 
RUN npm install -g serve 
EXPOSE 3000 
CMD ["serve", "-s", "dist"]
