"use client"
import { getSignedDownloadURL } from '../actions';


interface DownloadCoreProps {
    id: number;
    keyProp: string;
}

export default function DownloadCore({ id, keyProp }: DownloadCoreProps) {

    const handleClick = async (e: React.FormEvent) => {
        e.preventDefault();

        const signedDownloadURLResult = await getSignedDownloadURL({ id, keyProp })
        if (signedDownloadURLResult.failure !== undefined) {
            console.error(signedDownloadURLResult.failure)
            return
        }

        const { url } = signedDownloadURLResult.success


        const fileResponse = await fetch(url);
        const fileBlob = await fileResponse.blob();
        // Create a Blob URL for the file content
        const blobUrl = URL.createObjectURL(fileBlob);
        // Create a hidden anchor element
        const downloadLink = document.createElement('a');
        downloadLink.href = blobUrl;
        document.body.appendChild(downloadLink);
        // Trigger a click on the anchor element to initiate the download
        downloadLink.click();
        // Remove the anchor element and revoke the Blob URL
        document.body.removeChild(downloadLink);
        URL.revokeObjectURL(blobUrl);
    }


    return (
        <button className="download" onClick={handleClick}>Download Recipe</button>
    )
}