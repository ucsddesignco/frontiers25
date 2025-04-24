import { createAuthClient } from 'better-auth/react';
export const authClient = createAuthClient({
  //baseURL: "https://authentication-test-roan.vercel.app/", // the base url of your auth server
  baseURL: 'http://localhost:3000/'
});
