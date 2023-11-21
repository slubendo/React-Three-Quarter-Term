import { Suspense } from "react"
import DeleteCore from "./deleteCore"
import DeleteSkeleton from "./deleteSkeleton"

interface DeleteProps {
    id: number
}

export default function Delete({ id }: DeleteProps) {

    let deleteId = id
    return (
            <Suspense fallback={<DeleteSkeleton/>}>
                <DeleteCore id={deleteId} />
            </Suspense>
    )
}