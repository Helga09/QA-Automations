const request = require('supertest');
const { app, server } = require('./server');
const mongoose = require('mongoose');


  afterAll(async () => {
    await mongoose.connection.close();  
    server.close();  
  });

  describe('POST /login', () => {
    it('should login a user with correct credentials', async () => {
      const newUser = {
        email: 'testuser@example.com',
        username: 'testuser',
        password: 'password123',
      };
  
      await request(app).post('/register').send(newUser);
  
      const response = await request(app)
        .post('/login')
        .send({ email: 'testuser@example.com', password: 'password123' });
  
      expect(response.status).toBe(200);  // Перевіряємо, що статус 200
      expect(response.body.username).toBe('testuser');
      expect(response.body.email).toBe('testuser@example.com');
    });
  
    it('should return error with incorrect credentials', async () => {
      const response = await request(app)
        .post('/login')
        .send({ email: 'nonexistent@example.com', password: 'wrongpassword' });
  
      expect(response.status).toBe(401);  // Повинна бути помилка 401
      expect(response.body.error).toBe('Invalid email or password');
    });
  });

  describe('POST /posts', () => {
    it('should create a post for an authenticated user', async () => {
      const newUser = {
        email: 'testuser@example.com',
        username: 'testuser',
        password: 'password123',
      };
  
      await request(app).post('/register').send(newUser);
  
      const loginResponse = await request(app)
        .post('/login')
        .send({ email: 'testuser@example.com', password: 'password123' });
  
      const { email } = loginResponse.body;
  
      const newPost = {
        title: 'Test Post',
        content: 'This is a test post.',
        email: email,  
      };
  
      const postResponse = await request(app)
        .post('/posts')
        .send(newPost);
  
      expect(postResponse.status).toBe(201); 
      expect(postResponse.body.message).toBe('Post created successfully');
    });
  
    it('should return error if email is missing', async () => {
      const newPost = {
        title: 'Test Post Without Email',
        content: 'This post has no email.',
      };
  
      const postResponse = await request(app)
        .post('/posts')
        .send(newPost);
  
      expect(postResponse.status).toBe(400);  
      expect(postResponse.body.error).toBe('Email is required');
    });
  });

  describe('GET /posts', () => {
    it('should return all posts', async () => {
      const response = await request(app).get('/posts');
  
      expect(response.status).toBe(200);  
      expect(Array.isArray(response.body)).toBe(true);
    });
  });
  