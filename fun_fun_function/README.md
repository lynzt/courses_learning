docker build -t js/fun_fun .
docker run -it --rm -v "$PWD":/usr/src/app -v /usr/src/app/node_modules js/fun_fun node 11_composition_v_inheritance.js
