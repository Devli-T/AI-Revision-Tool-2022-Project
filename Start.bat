@echo off
REM Start Backend on seperate thread
start "Server Backend Console" cmd /k "cd server && npm install && node server.js" 

REM Start Frontend on this thread
start "Server Frontend Console" cmd /k "cd src && npm install && npm start"