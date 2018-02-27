https://hub.docker.com/r/jupyter/datascience-notebook/
http://jupyter.org/install

docker pull jupyter/datascience-notebook


docker-compose up



permission denied
[W 17:21:05.100 NotebookApp] 403 POST /api/contents (172.20.0.1): Permission denied: Untitled.ipynb
datascience             | [W 17:21:05.101 NotebookApp] Permission denied: Untitled.ipynb

docker exec -it 7f5c40f9085f bash



Writing notebook server cookie secret to /home/jovyan/.local/share/jupyter/runtime/notebook_cookie_secret




docker run -d -p 8888:8888 -v ./Users/lynzt/coding/courses/learning:/home/jovyan/work jupyter/tensorflow-notebook start-notebook.sh NotebookApp.iopub_data_rate_limit=10000000

-v /some/host/folder/for/work:/home/jovyan/work

jupyter notebook --NotebookApp.iopub_data_rate_limit=10000000  Showcase.ipynb


short jupyter
https://www.youtube.com/watch?v=jZ952vChhuI

hp txt: http://www.glozman.com/textpages.html
