import mountain from "./icons/mountain.png";
import garden from "./icons/garden.png";
import car from "./icons/car.png";
import bath from "./icons/bathtub.png";
import washer from "./icons/washer.png";
import workspace from "./icons/workspace.png";
import pets from "./icons/footstep.png";
import hottub from "./icons/hottub.png";
import pool from "./icons/pool.png";
import ice from "./icons/ice.png";
import TV from "./icons/TV.png";
import balcony from "./icons/balcony.png";
import cctv from "./icons/cctv.png";
import beach from "./icons/beach.png";
import windmill from "./icons/windmill.png";
import modern from "./icons/modern.png";
import outside from "./icons/outside.png";
import island from "./icons/island.png";
import lake from "./icons/lake.png";
import skiing from "./icons/skiing.png";
import castles from "./icons/castles.png";
import caves from "./icons/caves.png";
import camping from "./icons/camping.png";
import arctic from "./icons/arctic.png";
import desert from "./icons/desert.png";
import barns from "./icons/barns.png";
import lux from "./icons/Lux.png";

export default function Perks({selected,onChange}){

    function handelCBClick(e){
        const {checked,name}=e.target;
        if(checked){
            onChange([...selected,name]);
        }else{
            onChange([...selected.filter(selectedName=>selectedName!==name)]);
        }
    }
    return(
        <>
            <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
                            <input type="checkbox" checked={selected.includes("wifi")} name="wifi" onClick={handelCBClick}></input>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"W="1.5" stroke="currentColor" class="size-6">
                            <path stroke-linecap="round"L="round" d="M8.288 15.038a5.25 5.25 0 0 1 7.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 0 1 1.06 0Z" />
                            </svg>
                            <span>Wifi</span>
                        </label>
                        <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
                        <input type="checkbox" checked={selected.includes("Mountain view")} name="Mountain view" onClick={handelCBClick}></input>
                        <img className="size-7" src={mountain}></img>
                        <span>Mountain view</span>
                    </label>
                    <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
                        <input type="checkbox" checked={selected.includes("Garden view")} name="Garden view" onClick={handelCBClick}></input>
                        <img className="size-7" src={garden}></img>
                        <span>Garden view</span>
                    </label>
                    <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
                        <input type="checkbox" checked={selected.includes("Car view")} name="Car view" onClick={handelCBClick}></input>
                        <img className="size-7" src={car}></img>
                        <span>Car view</span>
                    </label>
                    <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
                        <input type="checkbox" checked={selected.includes("Bath")} name="Bath" onClick={handelCBClick}></input>
                        <img className="size-7" src={bath}></img>
                        <span>Bath</span>
                    </label>
                    <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
                        <input type="checkbox" checked={selected.includes("Paid washer – In building")} name="Paid washer – In building" onClick={handelCBClick}></input>
                        <img className="size-7" src={washer}></img>
                        <span>Paid washer – In building</span>
                    </label>
                    <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
                        <input type="checkbox" checked={selected.includes("Dedicated workspace")} name="Dedicated workspace" onClick={handelCBClick}></input>
                        <img className="size-7" src={workspace}></img>
                        <span>Dedicated workspace</span>
                    </label>
                    <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
                        <input type="checkbox" checked={selected.includes("Pets allowed")} name="Pets allowed" onClick={handelCBClick}></input>
                        <img className="size-7" src={pets}></img>
                        <span>Pets allowed</span>
                    </label>
                    <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
                        <input type="checkbox" checked={selected.includes("Private hot tub")} name="Private hot tub" onClick={handelCBClick}></input>
                        <img className="size-7" src={hottub}></img>
                        <span>Private hot tub</span>
                    </label>
                    <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
                        <input type="checkbox" checked={selected.includes("Pool")} name="Pool" onClick={handelCBClick}></input>
                        <img className="size-7" src={pool}></img>
                        <span>Pool</span>
                    </label>
                    <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
                        <input type="checkbox" checked={selected.includes("AC – split-type system")} name="AC – split-type system" onClick={handelCBClick}></input>
                        <img className="size-7" src={ice}></img>
                        <span>AC – split-type system</span>
                    </label>
                    <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
                        <input type="checkbox" checked={selected.includes("Private back garden")} name="Private back garden" onClick={handelCBClick}></input>
                        <img className="size-7" src={garden}></img>
                        <span>Private back garden</span>
                    </label>
                    <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
                        <input type="checkbox" checked={selected.includes("Free parking")} name="Free parking" onClick={handelCBClick}></input>
                        <img className="size-7" src={car}></img>
                        <span>Free parking</span>
                    </label>
                    <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
                        <input type="checkbox" checked={selected.includes("38-inch HDTV")} name="38-inch HDTV" onClick={handelCBClick}></input>
                        <img className="size-7" src={TV}></img>
                        <span>38-inch HDTV</span>
                    </label>
                    <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
                        <input type="checkbox" checked={selected.includes("Private balcony")} name="Private balcony" onClick={handelCBClick}></input>
                        <img className="size-7" src={balcony}></img>
                        <span>Private balcony</span>
                    </label>
                    <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
                        <input type="checkbox" checked={selected.includes("Exterior security")} name="Exterior security" onClick={handelCBClick}></input>
                        <img className="size-7" src={cctv}></img>
                        <span>Exterior security</span>
                    </label>
                    <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
                        <input type="checkbox" checked={selected.includes("Beach")} name="Beach" onClick={handelCBClick}></input>
                        <img className="size-7" src={beach}></img>
                        <span>Beach</span>
                    </label>
                    <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
                        <input type="checkbox" checked={selected.includes("Windmill")} name="Windmill" onClick={handelCBClick}></input>
                        <img className="size-7" src={windmill}></img>
                        <span>Windmill</span>
                    </label>
                    <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
                        <input type="checkbox" checked={selected.includes("Modern")} name="Modern" onClick={handelCBClick}></input>
                        <img className="size-7" src={modern}></img>
                        <span>Modern</span>
                    </label>
                    <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
                        <input type="checkbox" checked={selected.includes("Outside")} name="Outside" onClick={handelCBClick}></input>
                        <img className="size-7" src={outside}></img>
                        <span>Outside</span>
                    </label>
                    <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
                        <input type="checkbox" checked={selected.includes("Island")} name="Island" onClick={handelCBClick}></input>
                        <img className="size-7" src={island}></img>
                        <span>Island</span>
                    </label>
                    <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
                        <input type="checkbox" checked={selected.includes("Lake")} name="Lake" onClick={handelCBClick}></input>
                        <img className="size-7" src={lake}></img>
                        <span>Lake</span>
                    </label>
                    <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
                        <input type="checkbox" checked={selected.includes("Skiing")} name="Skiing" onClick={handelCBClick}></input>
                        <img className="size-7" src={skiing}></img>
                        <span>Skiing</span>
                    </label>
                    <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
                        <input type="checkbox" checked={selected.includes("Castles")} name="Castles" onClick={handelCBClick}></input>
                        <img className="size-7" src={castles}></img>
                        <span>Castles</span>
                    </label>
                    <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
                        <input type="checkbox" checked={selected.includes("Camping")} name="Camping" onClick={handelCBClick}></input>
                        <img className="size-7" src={camping}></img>
                        <span>Camping</span>
                    </label>
                    <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
                        <input type="checkbox" checked={selected.includes("Arctic")} name="Arctic" onClick={handelCBClick}></input>
                        <img className="size-7" src={arctic}></img>
                        <span>Arctic</span>
                    </label>
                    <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
                        <input type="checkbox" checked={selected.includes("Desert")} name="Desert" onClick={handelCBClick}></input>
                        <img className="size-7" src={desert}></img>
                        <span>Desert</span>
                    </label>
                    <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
                        <input type="checkbox" checked={selected.includes("Barns")} name="Barns" onClick={handelCBClick}></input>
                        <img className="size-7" src={barns}></img>
                        <span>Barns</span>
                    </label>
                    <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
                        <input type="checkbox" checked={selected.includes("Luxurious")} name="Luxurious" onClick={handelCBClick}></input>
                        <img className="size-7" src={lux}></img>
                        <span>Luxurious</span>
                    </label>

        </>
    );
}