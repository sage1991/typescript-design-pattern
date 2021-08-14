import path from "path"


// Component
export abstract class FileSystemObject {
  constructor(public path: string, public parent?: FileSystemObject) {}

  get basename(): string {
    return path.basename(this.path)
  }
}
