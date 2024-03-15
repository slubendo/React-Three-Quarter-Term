"use server"
import { postsFeedQuery } from "@/db/queries/feed";
import Feed from "./components/feed";
import Form from "./components/form";
import { auth } from "@/auth"
import Login from "./components/login";

export default async function Home() {

  const session = await auth()
  const posts = await postsFeedQuery.execute()

  return (
    <main>

      {/* {session?.user ? <Form userId={session?.user.id ?? ""}></Form> : <Login></Login>} */}
      <Feed postArr={posts} ></Feed>
    </main>
  )
}
