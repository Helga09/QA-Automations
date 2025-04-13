import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 30,
  duration: '30s',
};

export default function () {
  const url = 'http://localhost:3000/login';

  const payload = JSON.stringify({
    email: 'test@example.com',
    password: 'test123',
  });

  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const res = http.post(url, payload, params);

  check(res, {
    'status is 200': (r) => r.status === 200,
    'contains username': (r) => JSON.parse(r.body).username !== undefined,
  });

  sleep(1);
}
