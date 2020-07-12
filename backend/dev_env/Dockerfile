FROM python:3

WORKDIR /usr/app


RUN curl -sSL https://raw.githubusercontent.com/python-poetry/poetry/master/get-poetry.py | python

RUN apt-get update && apt-get upgrade -y && apt-get install -y \
    vim


RUN echo "source $HOME/.poetry/env" >> ~/.bashrc

COPY ./requirements.txt /usr/requirements.txt

RUN pip3 install -r /usr/requirements.txt

ENTRYPOINT ["/bin/bash"]
