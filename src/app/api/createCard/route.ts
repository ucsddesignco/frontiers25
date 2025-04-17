import { NextResponse, NextRequest } from 'next/server';
import createCard from '../cardFunctions';
import { fakeCardData } from '@/app/fake-data/data';

/**
 * 
 * @param req - JSON with all of the card properties
 * @returns 
 */
export async function POST(req: NextRequest){
    const fakeCard: {
        user: string;
        font: number;
        shape: number;
        p_color: string;
        s_color: string;
        a_color: string;
    } = {
        user: "test",
        font: 1,
        shape: 2,
        p_color: "#000000",
        s_color: "#FFFFFF",
        a_color: "#FF0000"
    };
    try{
        // const {user, font, shape, p_color, s_color, a_color} = await req.json();
        // const card = await createCard(user, font, shape, p_color, s_color, a_color);
        const card = await createCard(fakeCard.user, fakeCard.font, fakeCard.shape, fakeCard.p_color, fakeCard.s_color, fakeCard.a_color);
        return NextResponse.json(card);
    }
    catch (error) {
        console.error("Error creating card:", error);
        return NextResponse.json({error: 'Failed to create card'}, {status: 500});
    }
} 