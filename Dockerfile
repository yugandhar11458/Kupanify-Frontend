FROM node:21.1.0-alpine 
WORKDIR /app 
COPY package*.json ./ 
RUN npm install 
COPY . . 
ENV VITE_REACT_APP_BACKEND_URL=http://13.201.4.234:8000
RUN npm run build 
RUN npm install -g serve 
EXPOSE 3000 
CMD ["serve", "-s", "dist"]
