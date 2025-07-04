FROM node:20

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build 

EXPOSE 3000

CMD ["npm", "run" , "start:dev"]

#docker build -t my-nestjs-app .
#docker run -p 3000:3000 my-nestjs-app
#docker stop/kill my-nestjs-app
#sudo docker rmi (-f) my-nestjs-app : Dùng -f sẽ ép xóa image và tự động xóa luôn container đang dùng nó — nên dùng khi bạn biết rõ mình đang làm gì.
#sudo docker ps -a
#