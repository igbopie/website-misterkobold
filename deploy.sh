#!/bin/bash
node_modules/.bin/gulp prod
git add -A
git commit -am "Deploy"
git push heroku master
rm -fR build
git commit -am "Postdeploy"
git push origin master