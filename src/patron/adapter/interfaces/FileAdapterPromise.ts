import { Book } from "./Book";

export interface FileAdapterPromise {
    readFile(filePath: string): Promise<Book[]>;
}