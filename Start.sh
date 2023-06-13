#!/bin/bash
cd server && npm install && node server.js &

cd src && npm install && npm start
