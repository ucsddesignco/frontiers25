'use server';

import { cookies } from 'next/headers';

export async function deleteCookie(name: string) {
  const cookieStore = await cookies();
  if (cookieStore.has(name)) {
    cookieStore.delete(name);
  }
}

export async function setCookie(
  name: string,
  value: string,
  options: { secure?: boolean; maxAge?: number }
) {
  const cookieStore = await cookies();
  cookieStore.set(name, value, options);
}
