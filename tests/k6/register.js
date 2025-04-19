import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 50, 
  duration: '30s', 
};

export default function () {
  const url = 'http://localhost:3000/register';

  const payload = JSON.stringify({
    email: `user_${__VU}_${__ITER}@test.com`,
    username: `user${__VU}${__ITER}`,
    password: 'test123',
  });

  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const res = http.post(url, payload, params);

  check(res, {
    'status is 201': (r) => r.status === 201,
    'response has message': (r) => JSON.parse(r.body).message === 'User registered successfully',
  });

  sleep(1); 
}
