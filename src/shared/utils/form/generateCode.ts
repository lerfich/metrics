import { customAlphabet } from "nanoid";

export const generateAccessCode = customAlphabet(
  "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  6
);
