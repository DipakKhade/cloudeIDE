import { S3 } from "aws-sdk";
import { BoilerPlateCode, BUCKET_NAME } from "./types";

const s3 = new S3({
  region: "eu-north-1",
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

export async function getBoilerPlateCode(template: string,projectId:string) {
  const allFiles = await s3
    .listObjectsV2({
      Bucket: BUCKET_NAME,
      Prefix: 'userData/'+projectId,
    })
    .promise();

  const transformToHierarchicalStructure = (files: any) => {
    const fileTree: any[] = [];

    files.forEach((file: { Key: string }) => {
      const parts = file.Key.split("/");
      const fileName = parts.pop();
      const folderPath = parts.join("/");

      let folder = fileTree.find((folder) => folder.id === folderPath);

      if (!folder) {
        folder = {
          id: folderPath || "root",
          name: folderPath || "root",
          type: "folder",
          isOpen: false,
          children: [],
        };
        fileTree.push(folder);
      }

      if (fileName) {
        folder.children.push({
          id: file.Key,
          name: fileName,
          type: "file",
        });
      }
    });

    fileTree.forEach((folder) => {
      folder.children = folder.children.sort((a: any, b: any) =>
        a.name.localeCompare(b.name)
      );
    });

    return fileTree;
  };

  const transformedData = transformToHierarchicalStructure(allFiles.Contents);

  return transformedData;
}


export const createUserProject = async (userId:any, template:any) => {
  try {
    const listedObjects = await s3
      .listObjectsV2({
        Bucket: BUCKET_NAME,
        Prefix: `${template}/`, 
      })
      .promise();

    //@ts-ignore
    for (const object of listedObjects.Contents) {
      const objectKey = object.Key; 

      const destinationKey = objectKey!.replace(template, `userData/${userId}`);
      await s3
        .copyObject({
          Bucket: BUCKET_NAME,
          CopySource: `${BUCKET_NAME}/${objectKey}`,
          Key: destinationKey, 
        })
        .promise();
    }

    console.log(`Project created for user ${userId} using template ${template}`);
  } catch (error:any) {
    console.error('Error creating user project:', error?.message);
    throw error;
  }
};

