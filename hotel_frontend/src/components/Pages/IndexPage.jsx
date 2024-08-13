import Nav from "../Nav";
import Header from "../Header/Header.jsx";
import Appp from "../Appp.jsx";
import { useEffect, useState } from "react";
import axios from "axios";
import Button from "../Button.jsx";
import "../../App.css";
import { Link } from "react-router-dom";
import "./IndexPage.css";
function IndexPage(){
    const [places,setPlaces]=useState([]);
    useEffect(()=>{
        axios.get("http://localhost:4000/places").then(response=>{
            setPlaces([...response.data]);
        });
    },[]);
    
    return(
        <>
        <Nav />
        <div className="ml-10 mr-10">
        <div className="each-card">
        
        {places.length > 0 && places.map(place => (
            <div className="container" key={place._id}>
                <div className="heart"><Button/></div>
                    <Link to={'/place/' + place._id} key={place._id} >
                    {place.photos?.[0] && (
                        <img className="box-img" src={'http://localhost:4000/upload/'+place.photos?.[0]} alt="" />
                    )}
                    </Link>

                    
                    <div className="varad">
                    <h2 className="place">{place.address}</h2>
                    {/* <h3 className="place">{place.title}</h3> */}
                    {/* <p className="rate"><i className="bi bi-star-fill"></i>{rate}</p> */}
                    </div>
                

                    <p className="side">{}</p>
                    <p className="price">${place.price}<span id="period">night</span></p>
               </div> 
            ))}
            </div>
            </div>
        </>
    );
}

export default IndexPage;