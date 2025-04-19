import http from 'k6/http';
import { sleep, check } from 'k6';

export const options = {
  stages: [
    { duration: '30s', target: 20 },  
    { duration: '1m', target: 100 },  
    { duration: '30s', target: 0 },   
  ],
};

export default function () {
  const baseUrl = 'http://localhost:3000';

  // Унікальні дані
  const userId = Math.floor(Math.random() * 100000);
  const email = `user${userId}@example.com`;
  const username = `user${userId}`;
  const password = 'password123';

  const registerRes = http.post(`${baseUrl}/register`, JSON.stringify({
    email,
    username,
    password,
  }), { headers: { 'Content-Type': 'application/json' } });

  check(registerRes, {
    'registry successful': (res) => res.status === 200 || res.status === 201,
  });

  const loginRes = http.post(`${baseUrl}/login`, JSON.stringify({
    email,
    password,
  }), { headers: { 'Content-Type': 'application/json' } });

  check(loginRes, {
    'login successful': (res) => res.status === 200,
  });

  const token = loginRes.json('token');
  const authHeaders = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };

  sleep(1);
}
