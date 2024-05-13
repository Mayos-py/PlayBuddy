1. Create db folder in PlayBuddy Directory
    mkdir db

2. Run the mongod command to run the mongo server on port 3000
    mongod --port 3000 --dbpath ./db

3. Connect the same port on Mongo Compass

4. Run the mongo shell to perform actions on db 
    mongosh --port 3000 --authenticationDatabase admin

5. In Mongo Shell load the data population script and create the db admin user for further node server connectivity
    load ('createDB/createPlayBuddySampleData.js')
    load ('createDB/createAdminUser.js')

6. Verify that the data is populated on the compass

7. Compile the typescript files
    tsc

8. Run the node server
    node AppServer.js


For test cases:

   1. npm install
   2. To run the test:
        1. For Mac :- node node_modules/mocha/bin/_mocha --reporter spec test/informationHubTest.js (Change the file name for specific test)
        2. For Windows  :- node node_modules\mocha\bin\_mocha --reporter spec test\informationHubTest.js
   3. To run all the test cases: 
        npm test
        
For Front End:
 
    1. Download angular cli -  npm install -g @angular/cli -force
    2. Change the directory to playBuddyFrontend
    2. To create component - ng g component <componentName>
        4 files would be created.
     3. To run the project - ng serve
 
    

    
