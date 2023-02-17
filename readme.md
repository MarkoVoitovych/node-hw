# Node.js Course Homework

## Опис:

Node.js Course Homework - це інтернет-ресурс, що дозволяє додавати, зберігати,
змінювати та видаляти контакти. Користувач отримує доступ до ресурсу за
допомогою процедури реєстрації.

## Aутентифікація (endpoints):

POST /api​/auth​/register

POST /api​/auth​/login

POST ​/api/auth​/logout

POST /api/auth/refresh

## Користувачі (endpoints):

GET /api/users/current

PATCH /api/users/subscription

## Контакти (endpoints):

GET /api/contacts

GET /api/contacts/:contactId

POST /api/contacts

PUT /api/contacts/:contactId

PATCH /api/contacts/:contactId/favourite

DELETE /api/contacts/:contactId

## Команди запуску сервера:

```python
# старт сервера в режимі 'production'
npm start

# старт сервера в режимі 'development'
npm run start:dev

# запуск виконання перевірки коду з eslint
npm run lint

# запуск виконання перевірки коду з eslint з автоматичними виправленнями простих помилок
npm run lint
```
