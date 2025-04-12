FROM python:3.12

WORKDIR /app

COPY . .
RUN pip install flask flask-cors pymongo bcrypt pyjwt python-dotenv
EXPOSE 8001
CMD ["python", "cmd/app.py"]
