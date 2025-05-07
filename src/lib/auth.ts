import { betterAuth } from 'better-auth';
import { MongoClient } from 'mongodb';
import { mongodbAdapter } from 'better-auth/adapters/mongodb';
import { createAuthMiddleware } from 'better-auth/api';
import { cookies } from 'next/headers';
import createCard from '@/app/api/cardFunctions';
import { nextCookies } from 'better-auth/next-js';
import { deleteCookie } from '@/app/util/cookieFunctions';

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
    after: createAuthMiddleware(async ctx => {
      const cookieStore = await cookies();
      const cardData = cookieStore.get('cardData');

      if (cardData && ctx.path.startsWith('/callback')) {
        deleteCookie('cardData');
        const newSession = ctx.context.newSession;
        if (newSession) {
          const cardDataParsed = JSON.parse(cardData.value);
          const newCard = await createCard({
            primary: cardDataParsed.cardData.primary,
            accent: cardDataParsed.cardData.accent,
            fontFamily: cardDataParsed.cardData.fontFamily,
            borderStyle: cardDataParsed.cardData.borderStyle,
            middlewareSession: newSession
          });

          let newCardStatus = 'success';
          let newCardMessage = 'Card created successfully';

          if (newCard.error) {
            newCardStatus = 'error';
            newCardMessage = newCard.error;
          }

          cookieStore.set(
            'new_card_status',
            JSON.stringify({ status: newCardStatus, message: newCardMessage }),
            { secure: true, maxAge: 30 }
          );
        }
      }
    })
  },
  plugins: [nextCookies()]
});

export type Session = typeof auth.$Infer.Session;
