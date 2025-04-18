import { NextResponse, NextRequest } from 'next/server';
import createCard from '../cardFunctions';
import { fakeCardData } from '@/app/fake-data/data';

/**
 * 
 * @param req - JSON with all of the card properties
 * @returns 
 */
export async function POST(req: NextRequest){
    try{
        /** Validate the request body **/
        const body = await req.json();
        const requiredFields = ['user', 'font', 'shape', 'p_color', 's_color', 'a_color'];
        for (const field of requiredFields) {
            if (!(field in body)) {
                return NextResponse.json({error: `Missing field: ${field}`}, {status: 400});
            }
        }
        /** Create the card **/
        console.log("Received data:", { user: body.user, font: body.font, shape: body.shape, p_color: body.p_color, s_color: body.s_color, a_color: body.a_color });
        const card = await createCard(body.user, body.font, body.shape, body.p_color, body.s_color, body.a_color);
        return NextResponse.json(card);
    }
    catch (error) {
        console.error("Error creating card:", error);
        return NextResponse.json({error: 'Failed to create card'}, {status: 500});
    }
} 