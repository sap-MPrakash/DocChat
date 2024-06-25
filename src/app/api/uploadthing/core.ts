import { db } from "@/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

export const ourFileRouter = {

  pdfUploader: f({ pdf: { maxFileSize: "4MB" } })

    .middleware(async ({ req }) => {
        const {getUser} = getKindeServerSession()
        const user = await getUser()

        if(!user || !user.id) throw new Error("Unauthorized")

        // returning the meta data
        return {userid: user.id};
    })
    .onUploadComplete(async ({ metadata, file }) => {
        const createdFile = await db.file.create({
            data: {
                key: file.key,
                name: file.name,
                userId: metadata.userid,
                // url: `https://uploadthings-prod.s3.us-west-2.amazonaws.com/${file.key}`,
                url: file.url,
                uploadStatus: "PROCESSING",
            }
        })
      return {};
    }),
} satisfies FileRouter;
 
export type OurFileRouter = typeof ourFileRouter;