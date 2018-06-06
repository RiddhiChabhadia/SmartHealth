# final-project-champions

Smart Health App

# Abstract
Smart Health Web Application facilitates user to keep his/her fitness and diet track and motivates to stay fit and healthy 

# Functions
- To access the application, user needs to signup with basic information. Upon completion, he/she will receive Signup confirmation email on his registered email address
- User then needs to login using unique email address and password(decrypted back from MongoDB)
- User will be able to see the dashboard page from where he can add any exercise he worked out for any day, also he can add meal consumption for any particular day
- Dashboard also provides user to view all his previously added records and he can also modify or delete them
- Quick Search can be done based upon any Exercise name (Partial & Full Match)
- Soritng can be achieved over Exercise Name(Ascending Order) and Date Performed (Most Recent)
- Show Chart function will give an Amazing graphical representation of all his workout with respect to No.of Repetitions Vs Date
- User will be able to locate nearby Gyms based on Area name using Google Maps API
- User can update his profile easily by navigating to My Profile section upon successful login
- Easy logout from the application

# Setup Instructions

- Technology Stack Used 
1. Angular-cli
2. NodeJS
3. MongoDB
4. Express Framework

Follow below steps in order to run Smart Health App in your Local Machine
- Download [NodeJS](https://nodejs.org/en/download/)
- Download [MongoDB](https://www.mongodb.com/download-center#enterprise)
- Install **angular-cli** using
```
npm install -g @angular/cli
```
- Open Terminal and run below command to run Mongo
```
mongo.exe
```
- Navigate to main project folder from terminal and run below command to update node modules dependency and other packages
```
npm install
```
- To start Node Server, run below command in Terminal by navigating to server folder (cd server)
```
npm start
```
- Open a new Terminal window and navigate to client api folder (cd client-api)
```
ng serve
```
- Access the application here [Smart Health App](http://http://localhost:4200/homepage)

# Contributors
**Team Name: Champions**
- Riddhi Chabhadia
- Siddhant Chandiwal
- Kinjal Patel
- Akul Nigam