import { Suspense } from "react"
import DeleteCore from "./deleteCore"
import DeleteSkeleton from "./deleteSkeleton"
import { auth } from "@/auth"

interface DeleteProps {
    id: number
    postUserId:string
}

export default async function Delete({ id, postUserId }: DeleteProps) {
    const session = await auth()

    return (
            <Suspense fallback={<DeleteSkeleton/>}>
                <DeleteCore id={id} postUserId={postUserId} sessionId={session?.user.id ?? ""} />
            </Suspense>
    )
}