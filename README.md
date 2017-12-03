# hockey-reservation-checker
Sniff the status of Helsinki Ice Hall reservation list

Currently hard-coded for Siili Solutions' reservation.

# Installation
`npm install`

# Running
`node index.js`

# Creating a Heroku app
```
heroku login
heroku create [app-name]
git push heroku master
heroku ps:scale web=1
heroku open
```

# Deploying a new version
`git push heroku master`
