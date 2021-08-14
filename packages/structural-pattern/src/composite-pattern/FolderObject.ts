import { FileSystemObject } from "./FileSystemObject"
import { FileObject } from "./FileObject"
import fs from "fs"


// Composite
export class FolderObject extends FileSystemObject {
  public items: FileSystemObject[]

  constructor(path: string,parent?: FileSystemObject) {
    super(path, parent)
    this.items = FolderObject.readFileSystem(path, this)
  }

  private static readFileSystem(path: string, parent: FolderObject): FileSystemObject[] {
    return (
      fs.readdirSync(path)
        .map((fileName) => {
          const childPath = `${path}/${fileName}`
          const stats = fs.statSync(childPath)
          if (stats.isFile()) {
            return new FileObject(childPath, parent)
          } else if (stats.isDirectory()) {
            return new FolderObject(childPath, parent)
          } else {
            throw new Error("not supported file error")
          }
        })
    )
  }
}
