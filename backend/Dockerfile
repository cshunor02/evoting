FROM python

ADD . /backend

WORKDIR /backend

RUN pip install -r requirements.txt

CMD python3 main.py 0.0.0.0 8080
