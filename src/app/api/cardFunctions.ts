'use server';
import card from '../../backend/models/card';
import connectDB from '../../backend/connections/connection';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { DatabaseCard } from '../components/InfiniteCanvas';
import { revalidatePath } from 'next/cache';

const validBorders = ['rectangular', 'rounded', 'beveled', 'squircle'];
const validFonts = [
  'Jaro',
  'Bungee',
  'SF Pro',
  'Jersey 15',
  'Gotham Ultra',
  'Porkys',
  'Erica',
  'Calistoga',
  'Keania',
  'Adversal',
  'Rozha',
  'Aventena',
  'Ga Maamli',
  'Poetsen',
  'Silkscreen',
  'Hanalei',
  'Racing Sans',
  'Bonbon',
  'Workbench',
  'Nico Moji'
];

type UpdateCard = {
  id: string;
  user?: string;
  author?: string;
  fontFamily?: string;
  borderStyle?: string;
  primary?: string;
  accent?: string;
  lastUpdated?: Date;
};

const requireAuth = async () => {
  'use server';
  const session = await auth.api.getSession({
    headers: await headers()
  });

  if (!session) {
    console.log('No session found');
    return null;
  }

  return session;
};

export default async function createCard({
  fontFamily,
  borderStyle,
  primary,
  accent
}: {
  fontFamily: string;
  borderStyle: string;
  primary: string;
  accent: string;
}) {
  try {
    await connectDB();

    if (!validFonts.includes(fontFamily)) {
      console.error('Invalid font family');
      return null;
    } else if (!validBorders.includes(borderStyle)) {
      console.error('Invalid border style');
      return null;
    }

    const session = await requireAuth();

    if (!session) {
      return null;
    }

    const user_cards = await card.find({ user: session.user.id });
    if (user_cards.length >= 3) {
      return { error: 'You can only create up to 3 cards.' };
    } else {
      const new_card = await card.create({
        user: session.user.id,
        author: session.user.name,
        fontFamily: fontFamily,
        borderStyle: borderStyle,
        primary: primary,
        accent: accent,
        lastUpdated: new Date()
      });

      return new_card.toObject({ flattenObjectIds: true });
    }
  } catch (error) {
    console.error('Error creating card:', error);
    // TODO: Handle error appropriately
    return null;
  }
}

export async function getAllCards() {
  try {
    await connectDB();

    const cards = await card.find().lean();

    const serializedCards = cards.map(doc => ({
      ...doc,
      _id: doc._id!.toString()
    }));
    return serializedCards as unknown as DatabaseCard[];
  } catch (error) {
    console.error('Error fetching cards:', error);
    return null;
  }
}

export async function getRandomCards(limit = 50, excludeUserId?: string) {
  try {
    await connectDB();

    const randomCards = await card
      .aggregate([
        {
          $match: {
            user: { $ne: excludeUserId }
          }
        }, // Exclude cards from the specified user
        { $sample: { size: limit } } // Then take a random sample
      ])
      .exec();

    const serializedCards = randomCards.map(doc => ({
      ...doc,
      _id: doc._id.toString()
    }));

    return serializedCards as unknown as DatabaseCard[];
  } catch (error) {
    console.error('Error fetching random filtered cards:', error);
    return null;
  }
}

export async function getCardByID(id: string) {
  try {
    await connectDB();

    const found = await card.findOne({ _id: id });
    if (!found) {
      return null;
    }
    return found.toObject({ flattenObjectIds: true });
  } catch (error) {
    console.error('Error fetching card by user:', error);
    return null;
  }
}

export async function getCardByUser() {
  try {
    await connectDB();

    const session = await requireAuth();
    if (!session) {
      return null;
    }
    const cards = await card.find({ user: session.user.id }).lean();
    const serializedCards = cards.map(doc => ({
      ...doc,
      _id: doc._id!.toString()
    }));
    return serializedCards as unknown as DatabaseCard[];
  } catch (error) {
    console.error('Error fetching card by user:', error);
    return null;
  }
}

export async function removeCardByID(id: string) {
  try {
    await connectDB();

    const session = await requireAuth();
    if (!session) {
      return null;
    }
    const foundCard = await card.findById(id);
    if (!foundCard) {
      console.error('Card not found');
      return null;
    }
    if (foundCard.user !== session.user.id) {
      console.error('Unauthorized');
      return null;
    }
    const removed = await card.deleteOne({ _id: id });
    revalidatePath('/my-cards');
    return removed.deletedCount;
  } catch (error) {
    console.error('Error deleting card by id:', error);
    console.error('Failed to delete card by id');
    return null;
  }
}

/**
 * Updates a card by mongoID id from the database
 * @param id : id from mongoDB
 * @param font : a int the indicates which type to use for title
 * @param shape : a int that indicates with of the corner shapes to use
 * @param p_color : hex for primary color
 * @param s_color : hex for secondary color
 * @returns Update parameters
 */

export async function updateCardByID({
  id,
  fontFamily,
  borderStyle,
  primary,
  accent
}: {
  id: string;
  fontFamily?: string;
  borderStyle?: string;
  primary?: string;
  accent?: string;
}) {
  try {
    await connectDB();

    if (!id) {
      console.error('ID is required');
      return null;
    }
    const session = await requireAuth();

    if (!session) {
      return null;
    }

    const foundCard = await card.findById(id);
    if (!foundCard) {
      console.error('Card not found');
      return null;
    }
    if (foundCard.user !== session.user.id) {
      console.error('Unauthorized');
      return null;
    }
    const updateData: UpdateCard = { id: id };

    if (fontFamily !== undefined) {
      if (!validFonts.includes(fontFamily)) {
        console.error('Invalid font family');
        return null;
      }
      updateData.fontFamily = fontFamily;
    }

    if (borderStyle !== undefined) {
      if (!validBorders.includes(borderStyle)) {
        console.error('Invalid border style');
        return null;
      }
      updateData.borderStyle = borderStyle;
    }

    if (primary !== undefined) updateData.primary = primary;
    if (accent !== undefined) updateData.accent = accent;
    updateData.lastUpdated = new Date();

    const cardData = await card.findByIdAndUpdate(id, { $set: updateData }, { new: true });
    revalidatePath('/my-cards');

    if (!cardData) {
      console.error('Card not found');
      return null;
    }
    return cardData.toObject({ flattenObjectIds: true });
  } catch (error) {
    console.error('Error updating card by id:', error);
    return;
  }
}
