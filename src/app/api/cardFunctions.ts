import card from "../../backend/models/card"
import connectDB from "../../backend/connections/connection"

export default async function createCard(
    user : string,
    font : number,
    shape : number,
    p_color : string,
    s_color : string,
    a_color : string
) {
    try{
        await connectDB();

        return await card.create({
            user: user,
            font: font,
            shape: shape, 
            p_color: p_color,
            s_color: s_color,
            a_color: a_color
        })
    }
    catch (error) {
        console.error("Error creating card:", error);
        throw new Error('Failed to create card');
    }
}