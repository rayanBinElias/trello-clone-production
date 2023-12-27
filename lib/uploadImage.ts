import { ID, storage } from "@/appwrite";


const uploadImage = async (file:File) => {
  if(!file) return;

  const fileUploaded = await storage.createFile(
    "65813b5657e367172047",
    ID.unique(),
    file
  );
  
  return fileUploaded;
}

export default uploadImage;