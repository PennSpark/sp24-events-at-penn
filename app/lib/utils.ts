import { storage } from "./firebase";
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from "firebase/storage";

//upload and get URL to add to event field


// this handles when an event is deleted or garbage collection (THIS MUST BE USED TO PREVENT OVERSTORAGE)
export async function deleteFile(downloadUrl : string) {
  const fileRef = ref(storage, downloadUrl);
  await deleteObject(fileRef);
}
export const cleanObject = (data: any) => {
    Object.keys(data).forEach((k) => !(data as any)[k] && delete (data as any)[k]);
    return data;
}

export const slugify = (str: string) =>
    str
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');

export const getSeconds = (dateString: string, timeString: string) => {
    const dateParts = dateString.split('-');
    const timeParts = timeString.split(':');

    const dateTime = new Date(Number(dateParts[2]), Number(dateParts[1]) - 1, Number(dateParts[0]), Number(timeParts[0]), Number(timeParts[1]));

// Get the total seconds from the beginning of the epoch to the specified datetime
    return Math.floor(dateTime.getTime() / 1000);
}