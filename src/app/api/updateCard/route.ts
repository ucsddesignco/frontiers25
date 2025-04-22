import { NextResponse, NextRequest } from "next/server";
import { updateCardByID } from '../cardFunctions';

/**
 *  @param 
 *  The JSON object structure expected in the request body:
 * {
 *   _id: string,       // Required 
 *   font: string,       // The font style for the card
 *   shape: string,      // The shape of the card
 *   p_color: string,    // The primary color of the card
 *   a_color: string,    // The accent color of the card
 * }
 * @returns a json of what has been updated
 * PUT /api/updateCard
*/
export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const requiredFields = ['id']
        for(const field of requiredFields) {
            if (!(field in body)) {
                return NextResponse.json({ error: `Missing field: ${field}` }, { status: 400 });
            }
        }
        const updatedCard = await updateCardByID(body.id, body.font, body.shape, body.p_color, body.a_color);
        return NextResponse.json(updatedCard);
    }
    catch (error) {
        console.error('Error updating card:', error);
        return NextResponse.json({error: 'Failed to update card'}, {status: 500});
    }
}
