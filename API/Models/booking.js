import mongoose, { Schema } from "mongoose";

const bookingSchema = new Schema({
    user: { type: mongoose.Schema.ObjectId, required: true, ref: 'User' },
    place: { type: mongoose.Schema.ObjectId, required: true, ref: 'Place' },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    name: { type: String, required: true },
    mobile: { type: String, required: true },
    price: { type: Number, required: true },
});

const BookingModel = mongoose.model('Booking', bookingSchema);

export default BookingModel;
