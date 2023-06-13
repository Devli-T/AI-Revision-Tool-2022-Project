# How to use

In order to run the application, simply open a terminal and run Start.bat (Windows), or Start.sh (Linux). These files contain all of the necessary intstructions in order to start both the front end and back end server. 

### Notes:
 - This app has not been deployed yet
 - The current build of this app contained in this project is highly outdated.

### How this app works:

There are 2 applications in this app. The front end server, which will run on localhost:3000, and the backend server, which will run non localhost:5000. CORS has been enabled from 3000 to 5000, so the front-end can call the API directly. 
// Any issues with this when deploying may be from the CORS not being set up for the external IP's. 

