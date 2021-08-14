import { FileSystemObject } from "./FileSystemObject"
import Buffer from "buffer"
import fs from "fs"


// Leaf
export class FileObject extends FileSystemObject {
  read(): Buffer {
    return fs.readFileSync(this.path)
  }
}
