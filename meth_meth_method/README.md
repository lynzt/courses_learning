https://www.youtube.com/channel/UC8A0M0eDttdB11MHxX58vXQ

docker build -t js/meth_meth .
docker run -it --rm -v "$PWD":/usr/src/app -v /usr/src/app/node_modules js/meth_meth node scripts/01_currying.js
