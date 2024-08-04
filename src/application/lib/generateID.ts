import { customAlphabet } from "nanoid";

const generateID = () => {
  const alphabet = '123456789ABCDEFGHIJKLMNPQRSTUVWXYZ';
  const nanoid = customAlphabet(alphabet, 24);
  const id = nanoid();
  return id
}

export default generateID;