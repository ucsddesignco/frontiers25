'use server';
import card from '../../backend/models/card';
import connectDB from '../../backend/connections/connection';

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

/**
 * Creates a new card in the database
 * @returns JSON of created card
 */
export default async function createCard(
  user: string,
  author: string,
  fontFamily: string,
  borderStyle: string,
  primary: string,
  accent: string
) {
  try {
    await connectDB();
    const new_card = await card.create({
      user: user,
      author: author,
      fontFamily: fontFamily,
      borderStyle: borderStyle,
      primary: primary,
      accent: accent,
      lastUpdated: new Date()
    });
    if (!validFonts.includes(fontFamily)) {
      throw new Error('Invalid font family');
    } else if (!validBorders.includes(borderStyle)) {
      throw new Error('Invalid border style');
    } else {
      return JSON.stringify(new_card);
    }
  } catch (error) {
    console.error('Error creating card:', error);
    throw new Error('Failed to create card');
  }
}

/**
 * Gets all cards from the database
 * @returns Array of card JSON objects
 */
export async function getAllCards() {
  try {
    await connectDB();
    const cards = await card.find();
    return JSON.stringify(cards);
  } catch (error) {
    console.error('Error fetching cards:', error);
    throw new Error('Failed to fetch cards');
  }
}

/**
 * Gets a card by user id from the database
 * @param user : user id from session
 * @returns Card with _id
 */
export async function getCardByID(id: string) {
  try {
    await connectDB();
    const found = await card.find({ _id: id });
    return JSON.stringify(found);
  } catch (error) {
    console.error('Error fetching card by user:', error);
    throw new Error('Failed to fetch card by user');
  }
}

/**
 * Gets a card by user id from the database
 * @param user : user id from session
 * @returns All user cards
 */
export async function getCardByUser(user: string) {
  try {
    await connectDB();
    const found = await card.find({ user: user });
    return JSON.stringify(found);
  } catch (error) {
    console.error('Error fetching card by user:', error);
    throw new Error('Failed to fetch card by user');
  }
}

/**
 * Deletes a card by mongoID id from the database
 * @param id : id from mongoDB
 * @returns JSON of removed card
 */
export async function removeCardByID(id: string) {
  try {
    await connectDB();
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
    await connectDB();
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
