'use server';
import card from '../../backend/models/card';
import connectDB from '../../backend/connections/connection';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { DatabaseCard } from '../components/InfiniteCanvas';
import mongoose from 'mongoose';

await connectDB();

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
    throw new Error('Unauthorized');
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
    if (!validFonts.includes(fontFamily)) {
      throw new Error('Invalid font family');
    } else if (!validBorders.includes(borderStyle)) {
      throw new Error('Invalid border style');
    }

    const session = await requireAuth();

    const user_cards = await card.find({ user: session.user.id });
    if (user_cards.length >= 3) {
      return { error: 'You can only have up to 3 cards.' };
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
    const cards = await card.find().lean();

    const serializedCards = cards.map(doc => ({
      ...doc,
      _id: doc._id!.toString()
    }));
    return serializedCards as unknown as DatabaseCard[];
  } catch (error) {
    console.error('Error fetching cards:', error);
    throw new Error('Failed to fetch cards');
  }
}

export async function getCardByID(id: string) {
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      console.warn('Invalid id');
      return null;
    }

    const found = await card.findOne({ _id: id });
    if (!found) {
      return null;
    }
    return found.toObject({ flattenObjectIds: true });
  } catch (error) {
    console.error('Error fetching card by user:', error);
    throw new Error('Failed to fetch card by user');
  }
}

export async function getCardByUser() {
  try {
    const session = await requireAuth();
    const cards = await card.find({ user: session.user.id });
    const serializedCards = cards.map(doc => ({
      ...doc,
      _id: doc._id!.toString()
    }));
    return serializedCards as unknown as DatabaseCard[];
  } catch (error) {
    console.error('Error fetching card by user:', error);
    throw new Error('Failed to fetch card by user');
  }
}

export async function removeCardByID(id: string) {
  try {
    await requireAuth();
    const removed = await card.deleteOne({ _id: id });
    return JSON.stringify(removed);
  } catch (error) {
    console.error('Error deleting card by id:', error);
    throw new Error('Failed to delete card by id');
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
export async function updateCardByID(
  id: string,
  fontFamily?: string,
  borderStyle?: string,
  primary?: string,
  accent?: string
) {
  try {
    await requireAuth();
    if (!id) {
      throw new Error('ID is required');
    }

    const updateData: UpdateCard = { id: id };

    if (fontFamily !== undefined) {
      if (!validFonts.includes(fontFamily)) {
        throw new Error('Invalid font family');
      }
      updateData.fontFamily = fontFamily;
    }

    if (borderStyle !== undefined) {
      if (!validBorders.includes(borderStyle)) {
        throw new Error('Invalid border style');
      }
      updateData.borderStyle = borderStyle;
    }

    if (primary !== undefined) updateData.primary = primary;
    if (accent !== undefined) updateData.accent = accent;
    updateData.lastUpdated = new Date();

    const doc = await card.findByIdAndUpdate(id, { $set: updateData }, { new: true });

    if (!doc) {
      throw new Error('Card not found');
    }
    return JSON.stringify(doc);
  } catch (error) {
    console.error('Error updating card by id:', error);
    throw new Error('Failed to update card by id');
  }
}
