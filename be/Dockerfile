FROM python:3.10

WORKDIR /app

COPY . .

RUN pip install -r requirements.txt

EXPOSE 5000

CMD [ "python3", "app.py" ]




apiVersion: apps/v1
kind: Deployment
metadata:
name: flask-app
spec:
replicas: 1
selector:
matchLabels:
app: flask-app
template:
metadata:
labels:
app: flask-app
spec:
containers:
- name: flask-app
image: your-docker-image:latest
ports:
- containerPort: 5000
env:
- name: DB_HOST
value: "mysql-service"
- name: DB_USER
value: "your_user"
- name: DB_PASSWORD
value: "your_password"
- name: DATABASE
value: "your_database"
command: ["python3", "app.py"]

initContainers:
- name: db-migration
image: your-docker-image:latest
command: ["python3", "-c", "from app import migrate; migrate()"]
env:
- name: DB_HOST
value: "mysql-service"
- name: DB_USER
value: "your_user"
- name: DB_PASSWORD
value: "your_password"
- name: DATABASE
value: "your_database"
