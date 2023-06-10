FROM python:3.12.0b1-alpine3.18
WORKDIR /app
COPY requirements.txt /app
RUN python -m pip install -r requirements.txt

COPY . /app
EXPOSE 5000

CMD ["python", "main.py"]