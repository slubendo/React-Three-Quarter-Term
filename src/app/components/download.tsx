import { Suspense } from "react"
import DownloadCoreSkeleton from "./downloadSkeleton"
import DownloadCore from "./downloadCore"

interface DownloadProps {
    id: number
}

export default function Download({ id }: DownloadProps) {

    let downloadId = id
    return (
            <Suspense fallback={<DownloadCoreSkeleton/>}>
                <DownloadCore id={downloadId} />
            </Suspense>
    )
}