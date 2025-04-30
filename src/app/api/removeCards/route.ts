import { NextRequest, NextResponse } from 'next/server';
import { removeCardByID } from '../cardFunctions';

/**
 * remove a card object with _id
 * @param MongoDB _id
 * @returns JSON object of the removed card
 */
export async function GET(req: NextRequest) {
  const cardID = new URL(req.url).searchParams.get('id');
  if (!cardID) {
    return NextResponse.json({ error: 'Missing ID' }, { status: 400 });
  }
  try {
    const card = await removeCardByID(cardID);
    if (!card) {
      return NextResponse.json({ error: 'Card not found' }, { status: 404 });
    }
    return NextResponse.json(card);
  } catch (error) {
    console.error('Error fetching card:', error);
    return NextResponse.json({ error: 'Failed to fetch card' }, { status: 500 });
  }
}
