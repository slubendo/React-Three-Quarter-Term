import Post from "./post";

interface FeedProps {
    postArr?: string[]
}

export default function Feed({ postArr }: FeedProps) {

const feed = postArr?.map(post => <Post post={post}></Post>)

return (
    <div className="feed">
        {feed}
    </div>
)
}

    