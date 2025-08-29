# Настройка EmailJS для отправки email

## 🚀 Что такое EmailJS?

EmailJS - это сервис, который позволяет отправлять email прямо из JavaScript без необходимости создания backend сервера. Это идеальное решение для статических сайтов.

## 📋 Пошаговая настройка

### 1. Регистрация на EmailJS

1. Перейдите на [https://www.emailjs.com/](https://www.emailjs.com/)
2. Нажмите "Sign Up" и создайте аккаунт
3. Войдите в свой аккаунт

### 2. Создание Email Service

1. В панели управления перейдите в раздел "Email Services"
2. Нажмите "Add New Service"
3. Выберите провайдера email (Gmail, Outlook, Yahoo и др.)
4. Следуйте инструкциям для подключения вашего email аккаунта
5. Запомните **Service ID** (например: `service_abc123`)

### 3. Создание Email Template

1. Перейдите в раздел "Email Templates"
2. Нажмите "Create New Template"
3. Настройте шаблон письма:

```html
Новая заявка с сайта

Имя: {{from_name}}
Телефон: {{from_phone}}
Email: {{from_email}}
Сообщение: {{message}}

Дата: {{date}}
```

4. Сохраните шаблон и запомните **Template ID** (например: `template_xyz789`)

### 4. Получение Public Key

1. В разделе "Account" найдите ваш **Public Key**
2. Скопируйте его (например: `user_def456`)

### 5. Обновление кода

Замените в файле `backend.js` следующие значения:

```javascript
// Замените YOUR_PUBLIC_KEY на ваш публичный ключ
emailjs.init("user_def456");

// Замените YOUR_SERVICE_ID на ID вашего сервиса
emailjs.send('service_abc123', 'template_xyz789', templateParams)
```

### 6. Финальная настройка

В файле `backend.js` найдите и замените:

```javascript
// Строка 2
emailjs.init("YOUR_PUBLIC_KEY"); // Замените на ваш публичный ключ

// Строка 95
emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams)

// Строка 95 (в функции testEmailJS)
emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', testParams)
```

## 🔧 Пример настройки

```javascript
// Инициализация EmailJS
(function() {
    emailjs.init("user_def456"); // Ваш публичный ключ
})();

// Отправка email
emailjs.send('service_abc123', 'template_xyz789', templateParams)
    .then(function(response) {
        console.log('SUCCESS!', response.status, response.text);
        showNotification('Email отправлен успешно!', 'success');
    }, function(error) {
        console.log('FAILED...', error);
        showNotification('Ошибка отправки email', 'error');
    });
```

## 📧 Настройка Gmail (рекомендуется)

### Для Gmail:

1. Включите двухфакторную аутентификацию
2. Создайте пароль приложения:
   - Перейдите в настройки Google аккаунта
   - Безопасность → Двухэтапная аутентификация → Пароли приложений
   - Создайте новый пароль для "EmailJS"
3. Используйте этот пароль при настройке EmailJS

## 🧪 Тестирование

1. Откройте консоль браузера (F12)
2. Введите: `testEmailJS()`
3. Проверьте, пришел ли email

## ⚠️ Важные замечания

- **Бесплатный план**: 200 email в месяц
- **Безопасность**: Не публикуйте ваш Private Key
- **Лимиты**: Соблюдайте лимиты EmailJS
- **Спам**: Настройте правильные заголовки письма

## 🆘 Решение проблем

### Email не отправляется:
1. Проверьте консоль браузера на ошибки
2. Убедитесь, что все ID указаны правильно
3. Проверьте настройки email сервиса

### Ошибка аутентификации:
1. Пересоздайте пароль приложения
2. Проверьте настройки двухфакторной аутентификации
3. Убедитесь, что email сервис активен

### Письма попадают в спам:
1. Настройте SPF, DKIM записи для домена
2. Используйте качественный email сервис
3. Добавьте правильные заголовки письма

## 📱 Альтернативы EmailJS

Если EmailJS не подходит, рассмотрите:

1. **Formspree** - простые формы
2. **Netlify Forms** - для сайтов на Netlify
3. **Getform** - современный сервис форм
4. **Собственный backend** - полный контроль

## 🔗 Полезные ссылки

- [EmailJS Документация](https://www.emailjs.com/docs/)
- [Примеры использования](https://www.emailjs.com/examples/)
- [Поддержка](https://www.emailjs.com/support/)

---

**После настройки EmailJS ваша форма будет отправлять реальные email!** 🎉
