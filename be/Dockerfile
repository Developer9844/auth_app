FROM python:3.10-slim

WORKDIR /app

RUN adduser --disabled-password --home /app appuser 

COPY ./requirements.txt .

RUN pip install -r requirements.txt

COPY . .

RUN chown -R appuser:appuser /app

USER appuser

EXPOSE 5000

CMD [ "python3", "app.py" ]
