# How to use

In order to run the application, simply open a terminal and run Start.bat (Windows), or Start.sh (Linux). These files contain all of the necessary intstructions in order to start both the front end and back end server. 

### Notes:
 - This app has not been deployed yet
 - The current build of this app contained in this project is highly outdated.

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
Once the user has submitted their text (which is the _input_ for the python program), this will be saved to a document in the [UserGivenInfo](/server/UserGivenInfo/) under {username}.txt. (_Note: this needs to be later changed into the format {username}{subject}.txt, but for now, this is ok..._). Next, the server will run the [pythonProj.py](/ExternalResources/pythonProj.py), which is the location of the python code which needs to be run. Currently, the python code just does basic database managing. There is a comment in [pythonProj.py](/ExternalResources/pythonProj.py) which will tell you where to put your code. The "input" to the dev program is then the `inputData` variable found in the program. Once the dev program successfully outputs into the database, the python project should close. From there, the rest is sorted out through the [viewQuiz.js](/src/component/viewQuiz.js).

### What the program needs to output. How does this fit?
A sample output has been made just for convenience. The line 
```py
insert_data(database_name, table_name, subject, generate_random_string(), generate_random_string())
```
is the sample output. This line needs to be kept mostly the same. This line should be run <span style="font-style: bold;">ONCE</span> per output'd data. The `database_name`, `table_name`, and `subject` variables should be kept the same. the first `generate_random_string()` function should be replaced with the _question_, and the second `generate_random_string()` should be replaced with the corresponding _answer_. Once this has been changed, you can remove the `generate_random_string()` function, as it will not be required (along with the random / rnd references at the top of the file). Once this is all done; the program should work as intended.

## Contributors

- [AnUnsocialPigeon](https://github.com/AnUnsocialPigeon)
- [Devli-T](https://github.com/Devli-T)