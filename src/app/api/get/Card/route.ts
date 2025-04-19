import { NextResponse, NextRequest } from "next/server";
import { getCardByID } from "../../cardFunctions";

/**
 * TODO: add security 
 * GET /api/get/card
 * @param req : MongoDB Object _id
 * @returns JSON object with _id
 */
export async function GET(req: NextRequest) {
    const searchID = new URL(req.url).searchParams.get("id");
    if (!searchID) {
        return NextResponse.json({ error: "Missing ID" }, { status: 400 });
    }
    try {
        const card = await getCardByID(searchID);
        if (!card) {
            return NextResponse.json({ error: "Card not found" }, { status: 404 });
        }
        return NextResponse.json(card);
    }
    catch (error) {
        console.error("Error fetching card:", error);
        return NextResponse.json({ error: "Failed to fetch card" }, { status: 500 });
    }
}   