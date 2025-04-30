import { NextResponse, NextRequest } from 'next/server';
import createCard from '../cardFunctions';
/**
 * POST /api/createCard
 * The JSON object structure expected in the request body:
 * {
 *   user: string,       // The user identifier
 *   author: string     // The author of the card
 *   font: string,       // The font style for the card
 *   shape: string,      // The shape of the card
 *   p_color: string,    // The primary color of the card
 *   s_color: string,    // The secondary color of the card
 * }
 *
 * @param req - JSON object containing the above fields
 * @returns NextResponse - JSON of the card that was created
 */
export async function POST(req: NextRequest) {
  try {
    /** Validate the request body **/
    const body = await req.json();
    const requiredFields = ['user', 'author', 'fontFamily', 'borderStyle', 'primary', 'accent'];
    for (const field of requiredFields) {
      if (!(field in body)) {
        return NextResponse.json({ error: `Missing field: ${field}` }, { status: 400 });
      }
    }
    /** Create the card **/
    const card = await createCard(
      body.user,
      body.author,
      body.fontFamily,
      body.borderStyle,
      body.primary,
      body.accent
    );
    return NextResponse.json(card);
  } catch (error) {
    console.error('Error creating card:', error);
    return NextResponse.json({ error: 'Failed to create card' }, { status: 500 });
  }
}
