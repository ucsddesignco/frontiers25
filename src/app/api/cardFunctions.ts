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
 * @returns JSON of created card
 */
export default async function createCard(
    user : string,
    author : string,
    font : number,
    shape : number,
    p_color : string,
    a_color : string,
) {
    try{
        await connectDB();
        return await card.create({
            user: user,
            author: author,
            font: font,
            shape: shape, 
            p_color: p_color,
            a_color: a_color,
            last_updated: new Date()
        })
    }
    catch (error) {
        console.error("Error creating card:", error);
        throw new Error('Failed to create card');
    }
}

/**
 * Gets all cards from the database
 * @returns Array of card JSON objects
 */
export async function getAllCards() {
    try {
        await connectDB();
        return await card.find({});
    }
    catch (error) {
        console.error("Error fetching cards:", error);
        throw new Error('Failed to fetch cards');
    }
}

/**
 * Gets a card by user id from the database
 * @param user : user id from session
 * @returns Card with _id
 */
export async function getCardByID(id: string) {
    try {
        await connectDB();
        return await card.find({_id: id});
    }
    catch (error) {
        console.error("Error fetching card by user:", error);
        throw new Error('Failed to fetch card by user');
    }
}

/**
 * Gets a card by user id from the database
 * @param user : user id from session
 * @returns All user cards
 */
export async function getCardByUser(user: string) {
    try {
        await connectDB();
        return await card.find({user: user});
    }
    catch (error) { 
        console.error("Error fetching card by user:", error);
        throw new Error('Failed to fetch card by user');
    }
}

/**
 * Deletes a card by mongoID id from the database
 * @param id : id from mongoDB
 * @returns JSON of removed card
 */
export async function removeCardByID(id: string) {
    try {
        await connectDB();
        return await card.deleteOne({_id: id});
    }
    catch (error) { 
        console.error("Error deleting card by id:", error);
        throw new Error('Failed to delete card by id');
    }
}

/**
 * Updates a card by mongoID id from the database
 * @param id : id from mongoDB
 * @param font : a int the indicates which type to use for title
 * @param shape : a int that indicates with of the corner shapes to use
 * @param p_color : hex for primary color
 * @param s_color : hex for secondary color   
 * @returns Update parameters   
 */
export async function updateCardByID(
    id: string,
    font?: number,
    shape?: number,
    p_color?: string,
    a_color?: string,
) {
    try {
        await connectDB();
        const updateData: any = {};
        if (font !== undefined) updateData.font = font;
        if (shape !== undefined) updateData.shape = shape;
        if (p_color !== undefined) updateData.p_color = p_color;
        if (a_color !== undefined) updateData.a_color = a_color;
        updateData.last_updated = new Date();
        const doc = await card.findByIdAndUpdate(id, { $set: updateData }, { new: true });
        
        if (!doc) {
            throw new Error('Card not found');
        }
        return doc;
    } catch (error) {
        console.error("Error updating card by id:", error);
        throw new Error('Failed to update card by id');
    }
}