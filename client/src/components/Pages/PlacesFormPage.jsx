import { useContext, useEffect, useState } from "react";
import Perks from "../../Perks";
import PhotosUploader from "../../PhotosUploader";
import AccountNav from "../../AccountNav";
import { Navigate, useParams } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../../UserContext";

export default function PlacesFormPage(){
    const { id } = useParams();
    console.log({ id });
    const [title, setTitle] = useState("");
    const [address, setAddress] = useState("");
    const [addedPhotoes, setAddedPhotoes] = useState([]);
    const [description, setDiscription] = useState("");
    const [perks, setPerks] = useState([]);
    const [extraInfo, setExtraInfo] = useState("");
    const [checkIn, setCheckIn] = useState("");
    const [checkOut, setCheckOut] = useState("");
    const [maxGuests, setMaxGuest] = useState(5);
    const [redirect, setRedirect] = useState(false);
    const [price, setPrice] = useState(100);
    const [rate, setRate] = useState(1);
    const [reviews, setReviews] = useState(1);
    const [X, setX] = useState(0);
    const [Y, setY] = useState(0);
    // const [name,setName]=useState("owner");
    const { user } = useContext(UserContext);

    useEffect(() => {
        if (id) {
          axios.get(`http://localhost:4000/places/${id}`).then(({ data }) => {
            setTitle(data.title);
            setAddress(data.address);
            setAddedPhotoes(data.photos);
            setDiscription(data.description);
            setPerks(data.perks);
            setExtraInfo(data.extraInfo);
            setCheckIn(data.checkIn);
            setCheckOut(data.checkOut);
            setMaxGuest(data.maxGuests);
            setPrice(data.price);
            setRate(data.rate);
            setReviews(data.reviews);
            setX(data.X);
            setY(data.Y);
            setName(data.name);
          });
        }
      }, [id]);

    async function savePlace(e) {
        e.preventDefault();
        const placeData = {
          title,
          address,
          addedPhotoes,
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
          name: user.name // Assuming `user.name` is where you get the owner's name
      };
      
        if (id) {
            // update
            await axios.put('http://localhost:4000/places', {
                id, ...placeData
            });
        } else {
            // new place
            await axios.post("http://localhost:4000/places", {
                ...placeData
            }); 
        }
        setRedirect(true);
    }

    function preInput(header, description) {
        return (
          <>
            {inputHeader(header)}
            {inputDescription(description)}
          </>
        );
    }
      
    function inputHeader(text) {
        return (
          <h2 className="text-2xl mt-4">{text}</h2>
        );
    }
    
    function inputDescription(text) {
        return (
          <p className="text-sm text-gray-500">{text}</p>
        );
    }

    if (redirect) {
        return <Navigate to={'/account/places'} />
    }

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <AccountNav />
            <div className="mx-4 sm:mx-6 md:mx-8 lg:mx-12">
                <form onSubmit={savePlace}>
                    {/* {setName(user.name)} */}
                    <h1>Uploaded By {user.name}</h1>
                    {preInput("Title", "Title for your place it should be short and catchy as in advertisement.")}
                    <div className="mb-4">
                        <input className="bg-gray-200 rounded-full py-1 px-2 w-full border my-1" type="text" placeholder="Title for you apt..." value={title} onChange={e => { setTitle(e.target.value) }} />
                    </div>

                    {preInput("Address", "Address to this place ")}
                    <div className="mb-4">
                        <input className="bg-gray-200 rounded-full py-1 px-2 w-full border my-1" type="text" placeholder="Address..." value={address} onChange={e => { setAddress(e.target.value) }} />
                    </div>

                    {preInput("Photos", "more = better")}
                    <div className="mb-4 ">
                        <PhotosUploader addedPhotoes={addedPhotoes} onChange={setAddedPhotoes} />
                    </div>

                    {preInput("Description", "Description about that place")}
                    <div className="mb-4">
                        <textarea className="bg-gray-200 rounded-xl py-1 px-2 w-full border my-1" value={description} onChange={e => { setDiscription(e.target.value) }} />
                    </div>

                    {preInput("Perks", "Please tick your amenities")}
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 mb-4">
                        <Perks selected={perks} onChange={setPerks} />
                    </div>

                    {preInput("Extra Info", "House Rules, Do's and Don't")}
                    <div className="mb-4">
                        <textarea className="bg-gray-200 rounded-xl py-1 px-2 w-full border my-1" value={extraInfo} onChange={e => { setExtraInfo(e.target.value) }} />
                    </div>

                    {preInput("CheckIn & CheckOut", "Add check-in and check-out time. Remember to have some time for cleaning between guests")}
                    <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-2 mb-4">
                        <div className="mb-4">
                            <h3 className="mt-2 -mb-1">Check in Time</h3>
                            <input className="bg-gray-200 rounded-full py-1 px-2 w-full border my-1" type="text" placeholder="12:00" value={checkIn} onChange={e => { setCheckIn(e.target.value) }} />
                        </div>
                        <div className="mb-4">
                            <h3 className="mt-2 -mb-1">Check out Time</h3>
                            <input className="bg-gray-200 rounded-full py-1 px-2 w-full border my-1" type="text" placeholder="12:00" value={checkOut} onChange={e => { setCheckOut(e.target.value) }} />
                        </div>
                        <div className="mb-4">
                            <h3 className="mt-2 -mb-1">Max Guests</h3>
                            <input className="bg-gray-200 rounded-full py-1 px-2 w-full border my-1" type="number" placeholder="" value={maxGuests} onChange={e => { setMaxGuest(e.target.value) }} />
                        </div>
                        <div className="mb-4">
                            <h3 className="mt-2 -mb-1">Price per Night</h3>
                            <input className="bg-gray-200 rounded-full py-1 px-2 w-full border my-1" type="number" placeholder="" value={price} onChange={e => { setPrice(e.target.value) }} />
                        </div>
                        <div className="mb-4">
                            <h3 className="mt-2 -mb-1">Rating</h3>
                            <input className="bg-gray-200 rounded-full py-1 px-2 w-full border my-1" type="number" placeholder="" value={rate} onChange={e => { setRate(e.target.value) }} />
                        </div>
                        <div className="mb-4">
                            <h3 className="mt-2 -mb-1">Reviews</h3>
                            <input className="bg-gray-200 rounded-full py-1 px-2 w-full border my-1" type="number" placeholder="" value={reviews} onChange={e => { setReviews(e.target.value) }} />
                        </div>
                        <div className="mb-4">
                            <h3 className="mt-2 -mb-1">X</h3>
                            <input className="bg-gray-200 rounded-full py-1 px-2 w-full border my-1" type="number" placeholder="" value={X} onChange={e => { setX(e.target.value) }} />
                        </div>
                        <div className="mb-4">
                            <h3 className="mt-2 -mb-1">Y</h3>
                            <input className="bg-gray-200 rounded-full py-1 px-2 w-full border my-1" type="number" placeholder="" value={Y} onChange={e => { setY(e.target.value) }} />
                        </div>
                    </div>
                    <div className="text-center mb-4">
                        <button className="bg-primary rounded-full py-2 px-4 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 text-white">Save</button>
                    </div>
                </form>
            </div>
        </>
    )
}
