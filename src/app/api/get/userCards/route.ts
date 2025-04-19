import { NextResponse, NextRequest } from "next/server";
import { getCardByUser } from "../../cardFunctions";

/**
 * TODO: add security 
 * GET /api/get/card
 * @param req : NextRequest
 * @returns NextResponse
 */
export async function GET(req: NextRequest) {
    const userID = new URL(req.url).searchParams.get("user");
    console.log("Searching for card with ID:", userID);
    if (!userID) {
        return NextResponse.json({ error: "Missing ID" }, { status: 400 });
    }
    try {
        const card = await getCardByUser(userID);
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