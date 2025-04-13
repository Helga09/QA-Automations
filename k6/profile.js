import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 10,
  duration: '10s',
};

export default function () {
  const url = 'http://localhost:3000/profile?email=admin@gmail.com';

  const res = http.get(url);

  check(res, {
    'status is 200': (r) => r.status === 200,
    'user exists': (r) => JSON.parse(r.body).user !== undefined,
  });

  sleep(1);
}
