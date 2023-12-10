import { Suspense } from "react"
import DownloadCoreSkeleton from "./downloadSkeleton"
import DownloadCore from "./downloadCore"

interface DownloadProps {
    id: number
    keyProp:string
}

export default function Download({ id, keyProp }: DownloadProps) {

    return (
            <Suspense fallback={<DownloadCoreSkeleton/>}>
                <DownloadCore id={id} keyProp={keyProp} />
            </Suspense>
    )
}