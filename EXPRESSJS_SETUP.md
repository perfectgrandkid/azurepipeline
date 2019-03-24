# ExpressJS Setup Notes

[ExpressJS Starter Generator](https://expressjs.com/en/starter/generator.html)

## Initialize Project

```
$ (sudo) npm install express-generator -g
$        express -h
$ (sudo) express --view=ejs expressjsapp
```

## Directory Structure

```
expressjsapp
├── app.js
├── bin
│   └── www
├── package.json
├── public
│   ├── images
│   ├── javascripts
│   └── stylesheets
│       └── style.css
├── routes
│   ├── index.js
│   └── users.js
└── views
    ├── error.ejs
    ├── index.ejs
```

## npm

```
$ cd expressjsapp
$ npm install
$ npm start
```