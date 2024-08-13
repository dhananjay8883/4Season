import { useState } from "react";
import axios from "axios";

export default function PhotosUploader({ addedPhotoes, onChange }) {
    const [photoLink, setPhotoLink] = useState("");

    async function addPhotoByLink(e) {
        e.preventDefault();
        const { data: filename } = await axios.post("http://localhost:4000/upload-by-link", { link: photoLink });
        onChange(prev => [...prev, filename]);
        setPhotoLink("");
    }

    function upload(e) {
        const files = e.target.files;
        const data = new FormData();
        for (let i = 0; i < files.length; i++) {
            data.append('photos', files[i]);
        }

        axios.post('http://localhost:4000/upload', data, {
            headers: { 'Content-type': 'multipart/form-data' }
        }).then(response => {
            const { data: filenames } = response;
            onChange(prev => [...prev, ...filenames]);
        });
    }

    function removePhoto(e, fileName) {
        e.preventDefault();
        onChange([...addedPhotoes.filter(photo => photo !== fileName)]);
    }

    function selectAsMain(e, fileName) {
        e.preventDefault();
        const addedPhotosWithoutSelected = addedPhotoes.filter(photo => photo !== fileName);
        const newAddedPhotos = [fileName, ...addedPhotosWithoutSelected];
        onChange(newAddedPhotos);
    }

    return (
        <>
            <div className="flex gap-2 mb-4">
                <input
                    className="bg-gray-200 rounded-full py-1 px-2 w-full border my-1"
                    type="text"
                    placeholder="Add using a link..."
                    value={photoLink}
                    onChange={e => setPhotoLink(e.target.value)}
                />
                <button
                    onClick={addPhotoByLink}
                    className="bg-gray-200 px-4 rounded-2xl"
                >
                    Add photo
                </button>
            </div>
            <div className="grid grid-cols-3 gap-2 md:grid-cols-4 lg:grid-cols-6 mt-4">
                {addedPhotoes.length > 0 && addedPhotoes.map(link => (
                    <div className="h-32 flex relative" key={link}>
                        <img className="w-full rounded-2xl object-cover" src={"http://localhost:4000/upload/" + link} alt="Uploaded" />
                        <button
                            onClick={e => removePhoto(e, link)}
                            className="cursor-pointer absolute bottom-2 right-2 text-white bg-black bg-opacity-50 rounded-xl p-1"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                            </svg>
                        </button>
                        <button
                            onClick={e => selectAsMain(e, link)}
                            className="cursor-pointer absolute bottom-2 left-2 text-white bg-black bg-opacity-50 rounded-xl p-1"
                        >
                            {link === addedPhotoes[0] ? (
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                    <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
                                </svg>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                                </svg>
                            )}
                        </button>
                    </div>
                ))}
                <label className="h-32 flex justify-center items-center gap-2 border-2 bg-transparent rounded-2xl p-8 text-2xl text-gray-600 cursor-pointer">
                    <input onChange={upload} multiple type="file" className="hidden" />
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
                    </svg>
                    Upload
                </label>
            </div>
        </>
    );
}
