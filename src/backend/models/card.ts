import mongoose from 'mongoose';

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
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
    //validator TODO
  },
  fontFamily: {
    type: String,
    required: true
  },
  borderStyle: {
    type: String,
    required: true
  },
  primary: {
    type: String,
    required: true
    //validator TODO
  },
  accent: {
    type: String,
    required: true
    //validator TODO
  },
  lastUpdated: {
    type: Date,
    required: true
  }
});

export default mongoose.models?.Card || mongoose.model('Card', Card, 'CardData');
