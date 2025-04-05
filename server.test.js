const mongoose = require('mongoose');
const { connectToDB } = require('./db'); // Імпортуємо функцію підключення до БД

beforeAll(async () => {
  await connectToDB('mongodb://localhost:27017/blog'); // Підключення до MongoDB перед всіма тестами
});

afterAll(async () => {
  await mongoose.disconnect(); // Закриваємо з'єднання після всіх тестів
});

test('should register a new user', async () => {
  // Твій тест для реєстрації користувача
});
