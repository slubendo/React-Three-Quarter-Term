import Feed from "./components/feed";
import Form from "./components/form";
import { auth } from "@/auth"

export default async function Home() {

  const session = await auth()

  const stringArr = ["hello", "world"]

  return (
   <main>
     <Form userId={session?.user.id ?? ""}></Form>  
     <Feed postArr={stringArr} ></Feed>
   </main>
  )
}
