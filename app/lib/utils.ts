import { type ClassValue, clsx } from "clsx"
// import { twMerge } from "tailwind-merge"
import { storage } from "./firebase";
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from "firebase/storage";

// export function cn(...inputs: ClassValue[]) {
//   return twMerge(clsx(inputs))
// }


//upload and get URL to add to event field
export function uploadImage(file : any) {
  return new Promise((resolve, reject) => {
      const fileRef = ref(storage, 'images/' + file.name);
      const uploadTask = uploadBytesResumable(fileRef, file);

      uploadTask.on(
          'state_changed',

          (snapshot) => {
          },
          (err) => {

              reject(err.message);
          },
          () => {

              getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
                  resolve(downloadUrl);
              });
          }
      );
  });
}


// this handles when an event is deleted or garbage collection (THIS MUST BE USED TO PREVENT OVERSTORAGE)
export async function deleteFile(downloadUrl : string) {
  const fileRef = ref(storage, downloadUrl);
  await deleteObject(fileRef);
}


