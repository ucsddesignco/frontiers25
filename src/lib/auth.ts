import { betterAuth } from 'better-auth';
import { MongoClient } from 'mongodb';
import { mongodbAdapter } from 'better-auth/adapters/mongodb';
import { createAuthMiddleware, APIError } from 'better-auth/api';

const client = new MongoClient(process.env.DATABASE_URL as string);
const db = client.db();

export const auth = betterAuth({
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
    }
  },
  database: mongodbAdapter(db),
  hooks: {
    before: createAuthMiddleware(async ctx => {
      if (ctx.path !== '/sign-in/social') {
        return;
      }

      console.log(ctx);
      // if (!ctx.body?.email.endsWith("@ucsd.edu")) {
      //     throw new APIError("BAD_REQUEST", {
      //         message: "Email must end with @example.com",
      //     });
      // }
    }),

    after: createAuthMiddleware(async ctx => {
      if (ctx.path !== '/sign-in/social') {
        return;
      }

      console.log(ctx.context.newSession);
      if (!ctx.body?.email.endsWith('@ucsd.edu')) {
        throw new APIError('BAD_REQUEST', {
          message: 'Email must end with @example.com'
        });
      }
    })
  }
});
