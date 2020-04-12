# dev-challenge-node

This is intended to be used as backend api for frontend application in another repo

# Prerequisites 
1. Mongo database installed
1. Nodejs installed

# Configuration
All of the configuration variables can be set in the .env file

* MONGODB_URI=mongodb://localhost:27017/DevChallenge
* PORT=8080
* INITIAL_ADMIN_EMAIL=admin@admin.com
* DEFAULT_PASSWORD=test123
* TOKEN_SECRED=shhhh

# Initialization
1. npm install
1. npm run start

# Route generation
All route behaviours are defined in controller classes ('user.controller.tsx')
In order to generate routes following command must be run:
**npm run generate**
