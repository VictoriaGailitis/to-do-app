# TO-DO LIST

![scheme](https://github.com/user-attachments/assets/f4477133-6b52-41e1-8080-5b2d38266da7)

*Автор - Гайлитис Виктория*

## Ссылки

[SPA](178.253.55.46:3030)

[Swagger API](178.253.55.46:8000/api/docs#/)

## Описание решения

- Backend написан на языке Python с помощью фреймворка FastAPI
- Frontend написан на HTML+CSS+JS с помощью библиотек Bootstrap и Axios
- В качестве базы данных используется PostgreSQL
- Реализован CRUD для управления задачами, а также добавлена фильтрация по статусам задач в эндпоинт получения всех задач
- Реализованы тесты всех эндпоинтов API на pytest
- Реализован механизм управления (создания, удаления и очищения) тестовой базой данных PostgreSQL для тестов pytest
- Выполнена докеризация решения (описан Dockerfile API и docker-compose для API, PostgreSQL, фронтенда и nginx)
- Наличие документации Swagger с примерами запросов и ответов сервера
- SPA без перезагрузки страницы
- Минималистичный UI и доступный UX

### Структура проекта:

![scheme](https://github.com/user-attachments/assets/91f606eb-b611-4626-9b99-5cb47af83e5b)

Проект использует File-Based структуру, когда проект структурируется в зависимости от предназначения файлов, объединяя их в папки.

## Инструкция по запуску решения

Данная инструкция подходит как для разворачивания на сервере, так и локального запуска, благодаря докеризации.

### 1. Клонируйте репозиторий
Склонируйте репозиторий с помощью команды:
```bash
git clone https://github.com/VictoriaGailitis/to-do-app.git
cd to-do-app
```

### 2. Проверьте, установлен ли docker
При возникновении ошибок с кодом 403 - стоит воспользоваться прокси или зеркалами (при работе с docker hub)

### 3. Заполните .env файл по шаблону .env.sample

### 4. Запустите docker compose
Откройте терминал и напишите данную компанду в корне проекта 
```
docker compose -f docker-compose.yml up --build -d
```

### 5. Проверьте запуск
После перехода по {Ваш ip сервера или localhost}:8000/api/docs - должна отобразиться документация `Swagger`

### Примеры запросов curl

### 1. Получение всех задач
```
curl -X 'GET' \
  'http://178.253.55.46:8000/api/tasks/' \
  -H 'accept: application/json'
```

### 2. Получение всех выполненных задач
```
curl -X 'GET' \
  'http://178.253.55.46:8000/api/tasks/?status=done' \
  -H 'accept: application/json'
```

### 3. Добавление новой задачи
```
curl -X 'POST' \
  'http://178.253.55.46:8000/api/tasks/' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
   "title": "Записаться к врачу",
   "description": "На следующий понедельник в 21:00",
   "status": "todo"
}'
```

### 4. Получение задачи по индексу
```
curl -X 'GET' \
  'http://178.253.55.46:8000/api/tasks/2' \
  -H 'accept: application/json'
```

### 5. Изменение статуса задачи
```
curl -X 'PUT' \
  'http://178.253.55.46:8000/api/tasks/1' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "status": "done"
}'
```

### 6. Удаление задачи
```
curl -X 'DELETE' \
  'http://178.253.55.46:8000/api/tasks/3' \
  -H 'accept: */*'
```
