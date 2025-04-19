import {NextRequest, NextResponse} from 'next/server';
import { getAllCards } from '../../cardFunctions';

/**
 * GET /api/get/allCards
 * @returns NextResponse
 */
export async function GET(req: NextRequest) {
    try {
        const cards = await getAllCards();
        console.log("Fetched cards:", cards);
        return NextResponse.json(cards);
    } catch (error) {
        console.error("Error fetching cards:", error);
        return NextResponse.json({error: 'Failed to fetch cards'}, {status: 500});
    }
}