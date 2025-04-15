import mongoose from "mongoose";

/**
 * @user {String} - the user id
 * @font {Number} - an int that indicates which type to use for title
 * @shape {Number} - an int that indicates with of the corner shapes to use
 * @p_color {String} - hex for primary color
 * @s_color {String} - hex for secondary color
 * @a_color {String} - hex for acescent color
 */
const Card = new mongoose.Schema({
    user: {
        type: Number,
        required : true
    },
    font: {
        type: Number,
        required : true
    },
    shape: {
        type: Number,
        required: true
    },
    p_color: {
        type: String,
        required: true,
        //validator TODO
    },
    s_color: {
        type: String,
        required: true,
        //validator TODO
    },
    a_color: {
        type: String,
        required: true,
        //validator TODO
    }
});

export default mongoose.models.Card || mongoose.model('Card', Card);