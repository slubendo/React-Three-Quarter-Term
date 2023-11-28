"use client"

import { createPost } from "../actions";
import { useState } from "react";
import { auth } from "@/auth"



function handleClick(e: React.FormEvent) {
    e.preventDefault()
    document.getElementById('getFile')?.click()
}

export default function Form() {
    
    const [recipeName, setRecipeName] = useState("");
    const [mins, setMins] = useState(0);
    const [servings, setServings] = useState(0);
    const [description, setDescription] = useState("");
    const [image, setImage] = useState("");
    const [file, setFile] = useState("");
    // const [loading, setLoading] = useState(true);


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        const session = await auth()
        const result = await createPost(recipeName, mins, servings, description, image, file, session?.user.id ?? "")

        setRecipeName("");
        setMins(0);
        setServings(0);
        setDescription("");
        setImage("");
        setFile("");
    };

    return (
        <div className="relative flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-no-repeat bg-cover">
            <div className="sm:max-w-lg w-full p-10 bg-white rounded-xl z-10">
                <div className="text-center">
                    <h2 className="mt-5 text-3xl font-bold text-gray-900">
                        Upload a Recipe!
                    </h2>
                    <p className="mt-2 text-sm text-gray-400">Lorem ipsum is placeholder text.</p>
                </div>
                <form className="mt-8 space-y-3" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 space-y-2">
                        <input className="w-full text-base p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500" type="text" placeholder="Recipe Name"
                        onChange={(e) => setRecipeName(e.target.value)}
                        />
                        <div className="flex justify-between w-full">
                            <input className="text-base p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500" type="number" placeholder="Cooking Time"
                            onChange={(e) => setMins(parseInt(e.target.value))}
                            />
                            <input className="text-base p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500" type="number" placeholder="Servings" 
                            onChange={(e) => setServings(parseInt(e.target.value))}
                            />
                        </div>
                        <textarea className="w-full text-base p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500" placeholder="Description" 
                        onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                    <div className="grid grid-cols-1 space-y-2">
                        <div className="text-sm font-bold text-gray-500 tracking-wide">Attach Document</div>
                        <div className="flex items-center justify-center w-full">
                            <div className="flex flex-col rounded-lg border-4 border-dashed w-full p-10 group text-center">
                                <div className="h-full w-full text-center flex flex-col items-center justify-center">
                                    <div className="flex flex-auto max-h-48 w-2/5 mx-auto -mt-10">
                                    </div>
                                    <div className="pointer-none text-blue-600 hover:underline ">
                                        <button style={{ display: "block", width: "120px", height: "30px" }} onClick={handleClick}>Upload Recipe</button>
                                        <input type="file" id="getFile" style={{ display: "none" }} className="" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <p className="text-sm text-gray-300">
                        <span>File type: doc,pdf,types of images</span>
                    </p>
                    <div>
                        <button type="submit" className="my-5 w-full flex justify-center bg-blue-500 text-gray-100 p-4  rounded-full tracking-wide
                                        font-semibold  focus:outline-none focus:shadow-outline hover:bg-blue-600 shadow-lg cursor-pointer transition ease-in duration-300">
                            Upload
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}