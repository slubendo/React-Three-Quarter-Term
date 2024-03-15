'use server'

import { db, eq, and } from "@/db";
import { media, posts } from "@/db/schema/schema";
import { users } from "@/db/schema/schema";
import { revalidatePath } from "next/cache"
import { auth } from "@/auth"
import { S3Client, PutObjectCommand, DeleteObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"
import crypto from "crypto"



export async function createPost(recipeName: string, mins: number, servings: number, description: string, userId: string, fileId: number, imageId: number) {
  try {
  const session = await auth()

  if (!session) {
    return { failure: "not authenticated" }
  }

  console.log({
    recipeName,
    mins,
    servings,
    description,   
    userId
  });

  if (fileId) {
    const result = await db
      .select({ id: media.id })
      .from(media)
      .where(and(eq(media.id, fileId), eq(media.userId, session.user.id)))
      .then((rows) => rows[0])

    if (!result) {
      return { failure: "file not found" }
    }
  }

  if (imageId) {
    const result = await db
      .select({ id: media.id })
      .from(media)
      .where(and(eq(media.id, fileId), eq(media.userId, session.user.id)))
      .then((rows) => rows[0])

    if (!result) {
      return { failure: "image not found" }
    }
  }

  if (!recipeName || !mins || !servings || !description ) {
    return { error: "Please fill the entire form" };
  }

  const result = await db.insert(posts).values({ userId, recipeName, content: description, servings, mins }).returning();

  if (fileId) {
    await db.update(media).set({ postId: result[0].id }).where(eq(media.id, fileId))
  }

  if (imageId) {
    await db.update(media).set({ postId: result[0].id }).where(eq(media.id, imageId))
  }
  revalidatePath("/")

} catch (e) {
  console.error(e)
} 

}

const s3Client = new S3Client({ 
  region: process.env.AWS_BUCKET_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
})

export async function deletePost(id: number) {
  try {
    const deletedMedia = await db
      .delete(media)
      .where(eq(media.postId, id))
      .returning()
      .then((res) => res[0])

    await db.delete(posts).where(eq(posts.id, id)).returning();

    if (deletedMedia) {
      const url = deletedMedia.url
      const key = url.split("/").slice(-1)[0]

      const deleteParams = {
        Bucket: process.env.AWS_BUCKET_NAME!,
        Key: key,
      }

      await s3Client.send(new DeleteObjectCommand(deleteParams))
    }

    revalidatePath("/")
  } catch (e) {
    console.error(e)
  }

}

const generateFileName = (bytes = 32) => crypto.randomBytes(bytes).toString("hex")


type SignedURLResponse = Promise<
  { failure?: undefined; success: { url: string, id: number } }
  | { failure: string; success?: undefined }
>



// const allowedFileTypes = [
//   "image/jpeg",
//   "image/png",
//   "video/mp4",
//   "video/quicktime",
//   "docx",
//   "txt",
//   "pdf"
// ]

const maxFileSize = 1048576 * 10 // 1 MB

type GetSignedURLParams = {
  fileType: string
  fileSize: number
  checksum: string
}
export async function getSignedURL({
  fileType,
  fileSize,
  checksum,
}: GetSignedURLParams): SignedURLResponse {
  const session = await auth()

  if (!session) {
    return { failure: "not authenticated" }
  }

  // if (!allowedFileTypes.includes(fileType)) {
  //   return { failure: "File type not allowed" }
  // }

  if (fileSize > maxFileSize) {
    return { failure: "File size too large" }
  }

  const fileName = generateFileName()

  const putObjectCommand = new PutObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME!,
    Key: fileName,
    ContentType: fileType,
    ContentLength: fileSize,
    ChecksumSHA256: checksum,
    // Let's also add some metadata which is stored in s3.
    Metadata: {
      userId: session.user.id
    },
  })


  const url = await getSignedUrl(
    s3Client,
    putObjectCommand,
    { expiresIn: 300 } // 5 mins(computer is slow)
  )

  const results = await db
    .insert(media)
    .values({
      type: fileType,
      url: url.split("?")[0],
      userId: session.user.id,
    })
    .returning()

  return { success: { url, id: results[0].id } }

  
}


type GetSignedDownloadURLParams = {
  keyProp: string
  id: number
}

type SignedURLDownloadResponse = Promise<
  { failure?: undefined; success: { url: string} }
  | { failure: string; success?: undefined }
>

export async function getSignedDownloadURL({
  id,
  keyProp,
}: GetSignedDownloadURLParams): SignedURLDownloadResponse {


  const key = keyProp.split("/").slice(-1)[0]
  const getObjectCommand = new GetObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME!,
    Key: key,
  })

  const url = await getSignedUrl(
    s3Client,
    getObjectCommand,
    { expiresIn: 300 } // 5 mins(computer is slow)
  )

  return { success: { url } }
}

