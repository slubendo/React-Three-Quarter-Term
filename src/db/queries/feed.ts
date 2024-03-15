import { db, eq, desc } from "@/db"

import { users as usersTable } from "@/db/schema/schema"
import { posts as postsTable } from "@/db/schema/schema"
import { media as mediaTable } from "@/db/schema/schema"

export const feedQuery = db
  .select({
    id: postsTable.id,
    recipeName: postsTable.recipeName,
    content: postsTable.content,
    servings: postsTable.servings,
    mins: postsTable.mins,
    createdAt: postsTable.createdAt,
    
    user: {
      id: usersTable.id,
      name: usersTable.name,
      email: usersTable.email,
      image: usersTable.image,
    },
    media: {
      id: mediaTable.id,
      type: mediaTable.type,
      url: mediaTable.url,
      createdAt: mediaTable.createdAt,
    },
  })
  .from(postsTable)
  .innerJoin(usersTable, eq(usersTable.id, postsTable.userId))
  .innerJoin(mediaTable, eq(mediaTable.postId, postsTable.id))

  export const postsFeedQuery = feedQuery
  .orderBy(desc(postsTable.createdAt))
  .prepare("posts_for_feed")

  export const downloadQuery = feedQuery
  .where(eq(postsTable.id, mediaTable.postId))
  .prepare("post_for_download")


  export type Post = Awaited<ReturnType<typeof postsFeedQuery.execute>>[0]
  export type Download = Awaited<ReturnType<typeof downloadQuery.execute>>[0]