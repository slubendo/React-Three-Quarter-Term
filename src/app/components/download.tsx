import { Suspense } from "react"
import DownloadCoreSkeleton from "./downloadSkeleton"
import DownloadCore from "./downloadCore"

interface DownloadProps {
    id: number
    key:string
}

export default function Download({ id, key }: DownloadProps) {

    return (
            <Suspense fallback={<DownloadCoreSkeleton/>}>
                <DownloadCore id={id} key={key} />
            </Suspense>
    )
}