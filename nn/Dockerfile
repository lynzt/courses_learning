FROM jupyter/tensorflow-notebook

WORKDIR /usr/src/app

COPY requirements.txt /usr/src/app
RUN pip install --upgrade -r requirements.txt

COPY . /usr/src/app
