"use client"

import { createPost, getSignedURL } from "../actions";
import { useState } from "react";


interface FormProps {
    userId: string
}
export default function Form({ userId }: FormProps) {

    const [recipeName, setRecipeName] = useState("");
    const [mins, setMins] = useState(0);
    const [servings, setServings] = useState(0);
    const [description, setDescription] = useState("");
    const [image, setImage] = useState<File | null>(null);
    const [file, setFile] = useState<File | null>(null);
    const [previewImageUrl, setPreviewImageUrl] = useState<string | null>(null);
    const [previewFileUrl, setPreviewFileUrl] = useState<string | null>(null);
    const [statusMessage, setStatusMessage] = useState("");
    const [loading, setLoading] = useState(false);


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatusMessage("creating");
        setLoading(true);
        
        let submitButton = document.getElementById('submitButton') as HTMLButtonElement | null;
        if(submitButton){
            submitButton.disabled = true
            submitButton.classList.remove("bg-blue-500")
            submitButton.classList.add("bg-gray-300")
        }
        

        const computeSHA256 = async (file: File) => {
            const buffer = await file.arrayBuffer();
            const hashBuffer = await crypto.subtle.digest("SHA-256", buffer);
            const hashArray = Array.from(new Uint8Array(hashBuffer));
            const hashHex = hashArray
              .map((b) => b.toString(16).padStart(2, "0"))
              .join("");
            return hashHex;
          };

          let signedFileURLResult;
          let fileId;
        if (file) {
            setStatusMessage("uploading");
                signedFileURLResult = await getSignedURL({
                fileSize: file.size,
                fileType: file.type,
                checksum: await computeSHA256(file),
              })
            if (signedFileURLResult.failure !== undefined) {
                console.error(signedFileURLResult.failure)
                return
            }

            const { url, id }  = signedFileURLResult.success
            fileId = id;
            console.log({ url })
            await fetch(url, {
                method: "PUT",
                headers: {
                    "Content-Type": file.type,
                },
                body: file,
            })
        }

        let signedImageURLResult;
        let imageId;
        if (image) {
                signedImageURLResult = await getSignedURL({
                fileSize: image.size,
                fileType: image.type,
                checksum: await computeSHA256(image),
              })
            if (signedImageURLResult.failure !== undefined) {
                console.error(signedImageURLResult.failure)
                return
            }

            const { url, id }  = signedImageURLResult.success
            imageId = id;
            console.log({ url })
            await fetch(url, {
                method: "PUT",
                headers: {
                    "Content-Type": image.type,
                },
                body: image,
            })
            
        }

        console.log("test" + userId)
        console.log("test" + signedFileURLResult)
        console.log("test" + signedImageURLResult )
        if (userId && signedFileURLResult?.success.id && signedImageURLResult?.success.id) {
            console.log("testing")
            const result = await createPost(recipeName, mins, servings, description, userId, fileId ?? 0, imageId ?? 0)
        }

        if(submitButton){
            submitButton.disabled = false
            submitButton.classList.remove("bg-gray-300")
            submitButton.classList.add("bg-blue-500")
        }

        setStatusMessage("created");
        setLoading(false);
        setRecipeName("");
        setMins(0);
        setServings(0);
        setDescription("");
        setImage(null);
        setFile(null);
    };


    function handleFileClick(e: React.FormEvent) {
        e.preventDefault()
        document.getElementById('getImage')?.click()
    }

    function handleImageClick(e: React.FormEvent) {
        e.preventDefault()
        document.getElementById('getFile')?.click()
    }

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] ?? null;
        setImage(file);
        if (previewImageUrl) {
            URL.revokeObjectURL(previewImageUrl);
        }
        if (file) {
            const url = URL.createObjectURL(file);
            setPreviewImageUrl(url);
        } else {
            setPreviewImageUrl(null);
        }
    };
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] ?? null;
        setFile(file);
        if (previewFileUrl) {
            URL.revokeObjectURL(previewFileUrl);
        }
        if (file) {
            const url = URL.createObjectURL(file);
            setPreviewFileUrl(url);
        } else {
            setPreviewFileUrl(null);
        }
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
                        <div className="text-sm font-bold text-gray-500 tracking-wide">Attach an Image</div>
                        <div className="flex items-center justify-center w-full">
                            <div className="flex flex-col rounded-lg border-4 border-dashed w-full p-10 group text-center">
                                <div className="h-full w-full te    xt-center flex flex-col items-center justify-center">
                                    <div className="flex flex-auto max-h-48 w-2/5 mx-auto -mt-10">
                                    </div>
                                    {
                                        previewImageUrl && image && (
                                            <div className="mt-4">
                                                {image.type.startsWith("image/") ? (
                                                    <img src={previewImageUrl} alt="Selected file" />
                                                ) : image.type.startsWith("video/") ? (
                                                    <video src={previewImageUrl} controls />
                                                ) : null}
                                            </div>
                                        )
                                    }
                                    <div className="pointer-none text-blue-600 hover:underline ">
                                        <button style={{ display: "block", width: "120px", height: "30px" }} onClick={handleFileClick}>Upload Image</button>
                                        <input type="file" id="getImage" accept="image/jpeg,image/png,image/webp,image/gif,video/mp4,video/webm" style={{ display: "none" }} onChange={(e) => handleImageChange(e)} className="" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 space-y-2">
                        <div className="text-sm font-bold text-gray-500 tracking-wide">Attach a Recipe</div>
                        <div className="flex items-center justify-center w-full">
                            <div className="flex flex-col rounded-lg border-4 border-dashed w-full p-10 group text-center">
                                <div className="h-full w-full text-center flex flex-col items-center justify-center">
                                    <div className="flex flex-auto max-h-48 w-2/5 mx-auto -mt-10">
                                    </div>
                                    <div className="pointer-none text-blue-600 hover:underline ">
                                        <button style={{ display: "block", width: "120px", height: "30px" }} onClick={handleImageClick}>Upload Recipe</button>
                                        <input type="file" id="getFile" accept=".docx,.txt,.pdf" style={{ display: "none" }} onChange={(e) => handleFileChange(e)} className="" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <p className="text-sm text-gray-300">
                        <span>File type: doc,pdf,types of images</span>
                    </p>
                    <div>
                        <button type="submit" id="submitButton" className="my-5 w-full flex justify-center bg-blue-500 text-gray-100 p-4  rounded-full tracking-wide
                                        font-semibold  focus:outline-none focus:shadow-outline shadow-lg cursor-pointer transition ease-in duration-300">
                            Upload
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}