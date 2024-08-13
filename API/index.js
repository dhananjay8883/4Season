import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import User from "./Models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import imageDownloader from "image-downloader";
import path, { resolve } from "path";
import { fileURLToPath } from 'url';
import multer from "multer";
import fs from "fs";
import Place from "./Models/place.js";
import BookingModel from "./Models/booking.js";
import Wishlist from "./Models/Wishlist.js";


// Function to get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use('/upload', express.static(__dirname + '/upload'));
const secret = bcrypt.genSaltSync(10);
const jwtSecret = "efesfewfewfesfeserfrrfe";

// Use CORS before defining routes
app.use(cors({
    credentials: true,
    origin: "http://localhost:5173"
}));

mongoose.connect("mongodb+srv://virajsurve:1gy3JDrqYLDptMlc@cluster0.hc9gkg7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");

app.get("/test", (req, res) => {
    res.json("test ok");
});

async function getUserDataFromToken(req) {
    const { token } = req.cookies;
    if (!token) {
        return null; // Return null if no token is provided
    }
    return new Promise((resolve, reject) => {
        jwt.verify(token, jwtSecret, (err, userData) => {
            if (err) return reject(err);
            resolve(userData);
        });
    });
}


app.post("/register", async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const UserDoc = await User.create({
            name,
            email,
            password: bcrypt.hashSync(password, secret),
        });
        res.json(UserDoc);
    } catch (e) {
        res.status(422).json(e);
    }
});

app.post("/login", async (req, res) => {
    const { email, password } = req.body;
    const UserDoc = await User.findOne({ email: email });
    if (UserDoc) {
        const passOK = bcrypt.compareSync(password, UserDoc.password);
        if (passOK) {
            jwt.sign({ email: UserDoc.email, id: UserDoc._id, name: UserDoc.name }, jwtSecret, {}, (err, token) => {
                if (err) {
                    console.error("JWT Sign Error:", err);
                    res.status(500).json("Error signing token");
                } else {
                    res.cookie("token", token).json({ UserDoc });
                }
            });
        } else {
            res.status(422).json("Password NOT OK");
        }
    } else {
        res.status(404).json("User not found");
    }
});

app.get("/profile", (req, res) => {
    const { token } = req.cookies;
    if (token) {
        jwt.verify(token, jwtSecret, {}, (err, user) => {
            if (err) {
                res.status(403).json("Invalid token");
            } else {
                res.json(user);
            }
        });
    } else {
        res.status(401).json("No token provided");
    }
});

app.post("/logout", (req, res) => {
    res.cookie("token", "").json(true);
});

app.post("/upload-by-link", async (req, res) => {
    const { link } = req.body;
    const newName = 'photo' + Date.now() + '.jpg';
    try {
        await imageDownloader.image({
            url: link,
            dest: path.join(__dirname, "upload", newName),
        });
        res.json(path.join(newName));
    } catch (error) {
        console.error("Image download error:", error);
        res.status(500).json("Image download failed");
    }
});

const photosMiddleware = multer({ dest: 'upload/' });
app.post('/upload', photosMiddleware.array('photos', 100), (req, res) => {
    const uploadedFiles = [];
    for (let i = 0; i < req.files.length; i++) {
        const { path, originalname } = req.files[i];
        const parts = originalname.split('.');
        const ext = parts[parts.length - 1];
        const newPath = path + '.' + ext;
        fs.renameSync(path, newPath);
        uploadedFiles.push(newPath.replace('upload\\', ''));
    }
    res.json(uploadedFiles);
});

app.post("/places", (req, res) => {
    const { token } = req.cookies;
    const {
        title,
        address,
        addedPhotoes,
        photoLink,
        description,
        perks,
        extraInfo,
        checkIn,
        checkOut,
        maxGuests,
        price,
        rate,
        reviews,
        X,
        Y,
        name,
    } = req.body;

    // Ensure checkIn and checkOut are numbers
    const checkInNumber = Number(checkIn);
    const checkOutNumber = Number(checkOut);
    const maxGuestNumber = Number(maxGuests);
    const priceNumber = Number(price);

    if (isNaN(checkInNumber) || isNaN(checkOutNumber) || isNaN(maxGuestNumber) || isNaN(priceNumber)) {
        return res.status(400).json({ error: "checkIn, checkOut and maxGuest must be numbers" });
    }

    jwt.verify(token, jwtSecret, {}, async (err, user) => {
        if (err) {
            console.error("JWT Verify Error:", err);
            return res.status(403).json("Invalid token");
        } else {
            try {
                const placeDoc = await Place.create({
                    owner: user.id,
                    title,
                    address,
                    photos: addedPhotoes,
                    photoLink,
                    description,
                    perks,
                    extraInfo,
                    checkIn: checkInNumber,
                    checkOut: checkOutNumber,
                    maxGuests: maxGuestNumber,
                    price: priceNumber,
                    rate,
                    reviews,
                    X,
                    Y,
                    name,
                });
                res.json(placeDoc);
            } catch (error) {
                console.error("Error creating Place document:", error);
                res.status(500).json("Error creating Place document");
            }
        }
    });
});

app.get('/user-places', (req, res) => {
    const { token } = req.cookies;
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
        const { id } = userData;
        res.json(await Place.find({ owner: id }));
    });
});

app.get('/places/:id', async (req, res) => {
    const { id } = req.params;
    res.json(await Place.findById(id));
});

app.put('/places', async (req, res) => {
    const { token } = req.cookies;
    const {
        id,
        title,
        address,
        addedPhotoes,
        photoLink,
        description,
        perks,
        extraInfo,
        checkIn,
        checkOut,
        maxGuests,
        price,
        rate,
        reviews,
        X,
        Y,
        name,
    } = req.body;
    // Ensure checkIn and checkOut are numbers
    const checkInNumber = Number(checkIn);
    const checkOutNumber = Number(checkOut);
    const maxGuestNumber = Number(maxGuests);
    const priceNumber = Number(price);
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
        if (err) throw err;
        const placeDoc = await Place.findById(id);
        if (userData.id === placeDoc.owner.toString()) {
            placeDoc.set({
                title,
                address,
                photos: addedPhotoes,
                photoLink,
                description,
                perks,
                extraInfo,
                checkIn: checkInNumber,
                checkOut: checkOutNumber,
                maxGuests: maxGuestNumber,
                price: priceNumber,
                rate,
                reviews,
                X,
                Y,
                name,
            });
            await placeDoc.save();
            res.json('ok');
        }
    });
});

app.get('/places', async (req, res) => {
    res.json(await Place.find());
});

app.post('/booking', async (req, res) => {
    const userData = await getUserDataFromToken(req);
    const { place, startDate, endDate, guests, name, mobile, price } = req.body;

    try {
        const booking = await BookingModel.create({
            place,
            startDate,
            endDate,
            guests,
            name,
            mobile,
            price,
            user: userData.id,
        });

        res.json(booking);
    } catch (err) {
        console.error('Error creating booking:', err);
        res.status(500).json({ error: 'An error occurred while creating the booking.' });
    }
});

app.get('/booking', async (req, res) => {
    const userData = await getUserDataFromToken(req);
    res.json(await BookingModel.find({ user: userData.id }).populate('place'));
});

// server.js

// Add to wishlist
app.post('/wishlist', async (req, res) => {
    const userData = await getUserDataFromToken(req);
    const { placeId } = req.body;
  
    try {
      const wishlistItem = await Wishlist.create({
        userId: userData.id,
        place: placeId,
      });
      res.json(wishlistItem);
    } catch (err) {
      console.error('Error adding to wishlist:', err);
      res.status(500).json({ error: 'An error occurred while adding to the wishlist.' });
    }
  });
  
  // Get wishlist items for a user
  app.get('/wishlist', async (req, res) => {
    const userData = await getUserDataFromToken(req);
    try {
      const wishlistItems = await Wishlist.find({ userId: userData.id }).populate('place');
      res.json(wishlistItems);
    } catch (err) {
      console.error('Error fetching wishlist:', err);
      res.status(500).json({ error: 'An error occurred while fetching the wishlist.' });
    }
  });
  
// Remove from wishlist

app.delete('/wishlist/:id', async (req, res) => {
    const userData = await getUserDataFromToken(req);
    const { id } = req.params;
    console.log("User ID from token:", userData.id);
    console.log("Wishlist item ID:", id);

    try {
        const objectId = new mongoose.Types.ObjectId(id); // Use 'new' keyword to instantiate ObjectId
        const item = await Wishlist.findOne({ _id: objectId });
        console.log("Item found:", item);

        if (item) {
            console.log("Item userId:", item.userId);
            console.log("User ID from token:", userData.id);

            if (item.userId.toString() === userData.id.toString()) { // Ensure both IDs are strings for comparison
                await Wishlist.findOneAndDelete({ _id: objectId });
                res.json({ message: 'Removed from wishlist' });
                console.log("***Deleted item***");
            } else {
                console.log("Not authorized to delete this item");
                res.status(403).json({ error: 'Not authorized to delete this item' });
            }
        } else {
            console.log("Wishlist item not found");
            res.status(404).json({ error: 'Wishlist item not found' });
        }
    } catch (err) {
        console.error('Error removing from wishlist:', err);
        res.status(500).json({ error: 'An error occurred while removing from the wishlist.' });
    }
});

// Check if a place exists in the wishlist
app.get('/wishlist/exists', async (req, res) => {
    const userData = await getUserDataFromToken(req);
    const { placeId } = req.query;

    try {
        const item = await Wishlist.findOne({ userId: userData.id, place: placeId }).populate('place');
        if (item) {
            res.status(200).json({ exists: true, item });
        } else {
            res.status(200).json({ exists: false });
        }
    } catch (error) {
        res.json(null);
    }
});

app.listen(4000, () => {
    console.log("Server started on port 4000");
});
