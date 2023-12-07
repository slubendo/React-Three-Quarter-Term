import { Post as PostType  } from "@/db/queries/feed";
import Post from "./post";

interface FeedProps {
    postArr?: PostType[]
}

export default function Feed({ postArr }: FeedProps) {

    const feed = postArr?.map(post => <Post post={post}></Post>)

    return (
        <div className="feed">
            {postArr?.map(post => 
            <Post post={post}></Post>
            )}
        </div>
    )
}

