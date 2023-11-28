  'use server'

  import { db, eq } from "@/db";
  import { posts } from "@/db/schema/schema";
  import { users } from "@/db/schema/schema";
  import { revalidatePath } from "next/cache"

  export async function createPosts(amount: number, description: string, date: string, categoryId:number) {

    const amountAsString = amount.toString();

    console.log({
      amount,
      description,
      date,
      categoryId,
    });

    if (!description || !amount || !date) {
      return { error: "Please fill the entire form" };
    }

    const result = await db.insert(posts).values({ amount: amountAsString, description, date, categoryId }).returning();
    console.log({ result });

    revalidatePath("/")
  }

  export async function deletePost(id: number) {
    console.log(id);
    await db.delete(posts).where(eq(posts.id, id));

    revalidatePath("/")
  }
