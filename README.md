sazhi.net
=========

<http://sazhi.net> chimney and vent lining

[![Build Status](http://img.shields.io/travis/sazhinet/sazhinet/master.svg?style=flat)](https://travis-ci.org/sazhinet/sazhinet)
[![devDependency Status](http://img.shields.io/david/dev/sazhinet/sazhinet.svg?style=flat)](https://david-dm.org/sazhinet/sazhinet#info=devDependencies)
[![Dependency Status](http://img.shields.io/david/sazhinet/sazhinet.svg?style=flat)](https://david-dm.org/sazhinet/sazhinet)

Development
-----------

### Install

If node.js is not installed get
[nvm](https://github.com/creationix/nvm#installation)
(node version manager)

Then

````bash
nvm install 0 && nvm use 0
````

And then

````bash
cd /path/to/sazhinet && npm install
````

### Run

Start server on port 8080

````bash
npm start
````

### Deploy

````bash
`npm bin`/gulp rsync --destination=example.com:/path/to/sazhinet
````

License
-------

Copyright (c) 2014 Vladimir Shelkovskiy <leon_v80@mail.ru>,
Danil Kutkevich <danil@kutkevich.org>.  
See the LICENSE file for license rights and limitations (MIT).
