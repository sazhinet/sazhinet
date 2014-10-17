sazhi.net
=========

<http://sazhi.net> corporate site

[![Build Status](http://img.shields.io/travis/sazhinet/sazhinet/master.svg)](https://travis-ci.org/sazhinet/sazhinet)
[![devDependency Status](http://img.shields.io/david/dev/sazhinet/sazhinet.svg)](https://david-dm.org/sazhinet/sazhinet#info=devDependencies)
[![Dependency Status](http://img.shields.io/david/sazhinet/sazhinet.svg)](https://david-dm.org/sazhinet/sazhinet)

Development
-----------

### Install

````bash
nvm use 0 && cd /path/to/sazhinet && npm install
````

### Run

Start server on 8080 port

````bash
npm start
````

### Deploy

````bash
npm test && `npm bin`/divshot push && production
rsync --checksum \
      --human-readable \
      --archive \
      --verbose \
      --compress \
      --partial \
      --progress \
      --stats \
      --delete \
      --skip-compress=jpg,gif,png,ico \
      ./dist/* example.com:/path/to/sazhinet
````
