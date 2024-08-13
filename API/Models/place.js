import mongoose, { Schema } from "mongoose";

const placeSchema = new Schema({
    owner: { type: mongoose.Schema.ObjectId, ref: 'User' },
    title: { type: String, required: true },
    address: { type: String, required: true },
    photos: [String],
    photoLink: String,
    description: String,
    perks: [String],
    extraInfo: String,
    checkIn: Number,
    checkOut: Number,
    maxGuests: Number,
    price: Number,
    rate: Number,
    reviews: [String],
    X: Number,
    Y: Number,
    name: String,
});

const Place = mongoose.model('Place', placeSchema);

export default Place;
