import { Book } from "./Book";

export interface FileAdapter {
    readFile(filePath: string): Book[];
}