# TO-DO LIST

*Автор - Гайлитис Виктория*

## Описание сервиса

- Backend написан на языке Python с помощью фреймворка FastAPI
- В качестве базы данных используется PostgreSQL
- Реализован CRUD для управления задачами, а также добавлена фильтрация по статусам задач в эндпоинт получения всех задач
- Реализованы тесты всех эндпоинтов API на pytest
- Реализован механизм управления (создания, удаления и очищения) тестовой базой данных PostgreSQL для тестов pytest
- Выполнена докеризация решения (описан Dockerfile API и docker-compose для API и PostgreSQL)

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
