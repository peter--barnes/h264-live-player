rm ./public/bundle.js
browserify ./public/main.js > ./public/bundle.js
node server-tcp.js
