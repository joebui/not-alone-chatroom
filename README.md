# Not Alone Chatroom

<img src="http://seeklogo.com/images/N/nodejs-logo-FBE122E377-seeklogo.com.png" width="100" height="100" /> <img src="https://avatars2.githubusercontent.com/u/6412038?v=3&s=200" width="100" height="100" /> <img src="https://raw.githubusercontent.com/mattleibow/Socket.IO.Client/master/icons/socketio_256x256.png" width="100" height="100" /> <img src="https://e1ven.files.wordpress.com/2011/11/newimage.png?w=600&h=200" width="300" height="100" />

A chat application created by NodeJS, React Redux, Socker.IO, MongoDB. The application is divided into 3 services: REST folder contains 
the RESTful web service written in NodeJS, SPA folder contains the single-page application written in ReactJS and a MongoDB database.

# Setting up and running the project

-   Ensure that you have the LTS version of NodeJS (6.x.x)
-   Go to REST/config/default.json and configure url to your MongoDB database
-   Ensure that you create database "not-alone" and 2 collections named "user" and "chat" respectively for that datbase
-   Go to REST folder and type this command to install packages (apply the same procedure for SPA folder)
```
$ npm install
```
-   Go to REST folder and run the RESTful web service
```
$ npm start
```
-   Go to SPA folder, build the project then run the application
```
$ npm run build
$ npm start
```
-   Open web browser and go to: http://localhost:8000

# Deploy and run the project on Docker

If you don't want to manually setup the project like that, you can deploy and run the project on Docker with just some simple commands. 
**Remember to install Docker before proceeding**. Now direct to the main folder and follow these steps:
```
$ docker-compose up -d
```

-   After finishing, open the MongoDB database then create the necessary database and collections mentioned above
```
$ docker exec -it notalonechatroom_mongo_1 mongo
```

-   Open web browser and go to: http://localhost:8000
