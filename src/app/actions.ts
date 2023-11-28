  'use server'

  import { db, eq } from "@/db";
  import { posts } from "@/db/schema/schema";
  import { users } from "@/db/schema/schema";
  import { revalidatePath } from "next/cache"

  export async function createPost(recipeName: string, mins: number, servings: number, description:string, image:string, file:string, userId:string) {
    "use server"

    console.log({
      recipeName,
      mins,
      servings,
      description,
      image,
      file,
      userId
    });
   

    if (!recipeName || !mins || !servings || !description || !image || !file) {
      return { error: "Please fill the entire form" };
    }

    const result = await db.insert(posts).values({ userId, recipeName, content:description, servings, mins, url:image, file }).returning();
    console.log({ result });

    revalidatePath("/")
  }

  export async function deletePost(id: number) {
    "use server"

    console.log(id);
    await db.delete(posts).where(eq(posts.id, id));

    revalidatePath("/")
  }
