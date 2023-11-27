import Feed from "./components/feed";
import Form from "./components/form";
import { auth } from "@/auth"

export default async function Home() {

  const session = await auth()
  // name 
  // email
  // image


  const stringArr = ["hello", "world"]

  return (
   <main>
     <Form></Form>  
     <Feed postArr={stringArr} ></Feed>
   </main>
  )
}
