# How to use

In order to run the application, simply open a terminal and run Start.bat (Windows), or Start.sh (Linux). These files contain all of the necessary intstructions in order to start both the front end and back end server. 

### Notes:
 - The current build of this app contained in this project is outdated.

### How this app works:

There are 2 applications in this app. The front end server, which will run on localhost:3000, and the backend server, which will run non localhost:5000. CORS has been enabled from 3000 to 5000, so the front-end can call the API directly. 

<span style="color: red; font-style: italic;">Note: Any issues with this when deploying may be from the CORS not being set up for the external IP's.</span>

The front-end application is all the funky React stuff. The [component](/src/component/) folder stores all of the "parts" to the webpage. Each should be quite self explanitory. All of the linking to the server is done through the back-end API, where requests are sent to it. The requests have been modularised into the [apiUtils.js](/src/utils/apiUtils.js) file, which will handle all of the requests to and from the server. The [css](/src/css/) folder contains all the linked css. [App](/src/App.js) is the vital "pivot" point of the application, where it will handle all routing through it's routing table. 

The back-end application is just the [server](/server/) folder, the key item in it being [server.js](/server/server.js). This is then the express server which is run parrallel to the front-end. The key information about [server.js](/server/server.js) is the 
```js
app.post('/{route}', (req, res) => {
    ...
}
```
lines. These lines of code are the API routes, where any code run on the other side of it is handled server-side. ([src](/src/) files are all handled client-side). The [server.js](/server/server.js) is aided through its various script classes which have been used to modularise code easier. 


### Lifecycle of the program
Once the user has submitted their text (which is the _input_ for the python program), this will be saved to a document in the [UserGivenInfo](/server/UserGivenInfo/) under {username}.txt. Next, the server will run the [pythonProj.py](/ExternalResources/pythonProj.py), which is the location of the python code which needs to be run. The "input" to the dev program is then the `inputData` variable found in the program. Then the dev program successfully outputs into the database. From there, the rest is sorted out through the [viewQuiz.js](/src/component/viewQuiz.js).


## Contributors

- [AnUnsocialPigeon](https://github.com/AnUnsocialPigeon)
- [Devli-T](https://github.com/Devli-T)
