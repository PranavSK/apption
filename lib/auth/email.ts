import { db } from '@/db';

export function getExistingDbUserByEmail(searchEmail: string) {
  return db.query.user.findFirst({
    where({ email }, { eq }) {
      return eq(email, searchEmail);
    },
  });
}

export function isValidEmail(value: string) {
  const re = /^[a-z0-9_\.\-]*@[a-z0-9\.\-]+\.[a-z]{2,4}$/i;
  return value && value.match(re);
}
