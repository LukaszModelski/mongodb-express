# API with Mongodb and Express
## Client
React Native App with Expo CLI Quickstart.  
https://reactnative.dev/docs/environment-setup  
Go to `client/` directory.
* `npm run web` - to start local dev, and open it in web
### Building app for android
Docs: https://docs.expo.dev/classic/building-standalone-apps/  
Go to `client/` directory.
* `expo build:android -t apk` - building apk standalone file.

Open .apk file on android device and just install aplication.

## Server
Go to `server/` directory.
* **npm run server** - runs server
* **npm run build-dev** - build development bundle in dist/index.js 
* **npm run build-prod** - build production bundle in dist/index.js
### MongoDB
* Using mongoose to connect to MongoDB.
* Allowed all IPs to have access to DB for now.
* You can switch between local and external in connectDB.js
### Heroku
You can see logs locally with `heroku logs --tail` command from  `./server/dist/`.
#### API adress
* https://nodejs-expenses.herokuapp.com/
* https://nodejs-expenses.herokuapp.com/api/expense - to get list of expesnses
#### Deploy
Docs: https://devcenter.heroku.com/articles/git  
* There is separate repo inside dist/ folder to push your changes directly to Heroku. You need to set proper remote. Every new build you need to commit changes and push.
  * build new dist verision first!  
  * `git add *` or  `git add .`
  * `git commit -m "new build"`
  * `git push heroku master`
* Configuration **Procfile** defines the command to start server in node.  
* There must be at least empty package.json file to let Heroku know this is node.js app.

## Additional info
### JSDoc
Docs: https://jsdoc.app/about-getting-started.html  
If you want to run JSDoc for particural file:  
* `jsdoc ./client/src/js/utils.js`
* it will generate `out/` directory with docs