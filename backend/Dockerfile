FROM python:3.12-alpine

ENV PYTHONBUFFERED 1
ENV PYTHONDONTWRITEBYTECODE 1

WORKDIR /synod/backend/

COPY requirements.txt /synod/backend/
RUN pip install --no-cache-dir -r requirements.txt

COPY . /synod/backend/

CMD [ "python", "manage.py", "runserver", "0.0.0.0:8000" ]
