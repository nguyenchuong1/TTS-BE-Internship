# Use the official Node.js image as the base image
FROM node:20

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install the application dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Build the NestJS application
RUN npm run build 

# Expose the application port
EXPOSE 3000

# Command to run the application
CMD ["npm", "run" , "start:dev"]

#docker build -t my-nestjs-app .
#docker run -p 3000:3000 my-nestjs-app
#docker stop/kill my-nestjs-app
#sudo docker rmi (-f) my-nestjs-app : Dùng -f sẽ ép xóa image và tự động xóa luôn container đang dùng nó — nên dùng khi bạn biết rõ mình đang làm gì.
#sudo docker ps -a
#