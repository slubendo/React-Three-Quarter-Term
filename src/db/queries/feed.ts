import { db, eq, desc } from "@/db"

import { users as usersTable } from "@/db/schema/schema"
import { posts as postsTable } from "@/db/schema/schema"

export const feedQuery = db
  .select({
    id: postsTable.id,
    recipeName: postsTable.recipeName,
    content: postsTable.content,
    servings: postsTable.servings,
    mins: postsTable.mins,
    url: postsTable.url,
    file: postsTable.file,
    createdAt: postsTable.createdAt,
    
    user: {
      id: usersTable.id,
      name: usersTable.name,
      email: usersTable.email,
      image: usersTable.image,
    },
  })
  .from(postsTable)
  .innerJoin(usersTable, eq(usersTable.id, postsTable.userId))
  .orderBy(desc(postsTable.createdAt))

  export type Post = Awaited<ReturnType<typeof feedQuery.execute>>[0]