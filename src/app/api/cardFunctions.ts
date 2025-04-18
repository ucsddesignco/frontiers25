import card from "../../backend/models/card"
import connectDB from "../../backend/connections/connection"


/**
 * Creates a new card in the database
 * @param user : user id from session
 * @param font : a int the indicates which type to use for title
 * @param shape : a int that indicates with of the corner shapes to use
 * @param p_color : hex for primary color
 * @param s_color : hex for secondary color
 * @param a_color : hex for acescent color
 * @returns 
 */
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