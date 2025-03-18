
import { api } from '@/services/api';
 async function registerUser(formData: any) {
  const res = await api('users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData)
  });
  return res.json();
}
 async function signIn(formData: any) {
  const res = await api('auth/signin', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData)
  });
  return res.json();
}

export { registerUser, signIn };