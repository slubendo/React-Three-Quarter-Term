import { Post as PostType  } from "@/db/queries/feed";
import Post from "./post";

interface FeedProps {
    postArr?: PostType[]
}

export default function Feed({ postArr }: FeedProps) {

    const feed = postArr?.filter(post => post.media.type.includes("image") || post.media.type.includes("image"))
    console.log(postArr)

    return (
        <div className="feed">
            {feed?.map(post => 
            <Post post={post}></Post>
            )}
        </div>
    )
}

