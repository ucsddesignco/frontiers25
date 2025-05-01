import { NextResponse, NextRequest } from 'next/server';
import { getCardByUser } from '../../cardFunctions';

/**
 * TODO: add security
 * GET /api/get/card
 * @param req : User Id
 * @returns returns a JSON array of all users cards
 */
export async function GET(req: NextRequest) {
  const userID = new URL(req.url).searchParams.get('user');
  if (!userID) {
    return NextResponse.json({ error: 'Missing ID' }, { status: 400 });
  }
  try {
    const card = await getCardByUser(userID);
    if (!card) {
      return NextResponse.json({ error: `Card not found` }, { status: 404 });
    }
    return NextResponse.json(card);
  } catch (error) {
    return NextResponse.json({ error: `Failed to fetch card ${error}` }, { status: 500 });
  }
}
