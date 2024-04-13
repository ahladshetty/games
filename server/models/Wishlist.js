import mongoose from 'mongoose';

const wishlistSchema = new mongoose.Schema({
    userId: {
        type: String,
        ref: 'User'
        },
    games: [{
        type: String,
        ref: 'Game'
    }]
    });

const Wishlist = mongoose.model('Wishlist', wishlistSchema);

export default Wishlist;
