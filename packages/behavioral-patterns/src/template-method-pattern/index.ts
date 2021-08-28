import fs from "fs"
import request from "request"


namespace TemplateMethodPattern {
  abstract class TextReader {

    async readAllText(): Promise<string> {
      const bytes = await this.readAllBytes()
      return this.decode(bytes)
    }

    protected abstract readAllBytes(): Promise<Buffer>
    protected abstract decode(buffer: Buffer): string
  }

  abstract class Utf8TextReader extends TextReader {
    protected decode(buffer: Buffer): string {
      return buffer.toString("utf-8")
    }
  }

  abstract class AsciiTextReader extends TextReader {
    protected decode(buffer: Buffer): string {
      return buffer.toString("ascii")
    }
  }

  export class FileAsciiTextReader extends AsciiTextReader {
    constructor(private path: string) {
      super()
    }

    protected async readAllBytes(): Promise<Buffer> {
      return new Promise((resolve, reject) => fs.readFile(this.path, (err, data) => {
        if (err) {
          return reject(err)
        }
        resolve(data)
      }))
    }
  }

  export class HttpAsciiTextReader extends AsciiTextReader {
    constructor(private path: string) {
      super()
    }

    protected async readAllBytes(): Promise<Buffer> {
      return new Promise<Buffer>((resolve, reject) => request(this.path, { encoding: null }, (error, response, body) => {
        if (error) {
          return reject(error)
        }
        resolve(body)
      }))
    }
  }

  export class HttpUtf8TextReader extends Utf8TextReader {
    constructor(private path: string) {
      super()
    }

    protected async readAllBytes(): Promise<Buffer> {
      return new Promise<Buffer>((resolve, reject) => request(this.path, { encoding: null }, (error, response, body) => {
        if (error) {
          return reject(error)
        }
        resolve(body)
      }))
    }
  }
}

const fileReader = new TemplateMethodPattern.FileAsciiTextReader("/Users/harry/developer/source/typescript-design-pattern/packages/behavioral-patterns/tsconfig.json")
fileReader.readAllText()
  .then(console.log)

const httpReader = new TemplateMethodPattern.HttpAsciiTextReader("https://www.alda.ai")
httpReader.readAllText()
  .then((html) => {
    const stream = fs.createWriteStream("/Users/harry/developer/source/typescript-design-pattern/packages/behavioral-patterns/alda.html", { encoding: "ascii" })
    stream.write(html, (error) => { console.log(error) });
  })

const httpReaderUtf8 = new TemplateMethodPattern.HttpUtf8TextReader("https://www.alda.ai")
httpReaderUtf8.readAllText()
  .then((html) => {
    const stream = fs.createWriteStream("/Users/harry/developer/source/typescript-design-pattern/packages/behavioral-patterns/alda-utf8.html", { encoding: "ascii" })
    stream.write(html, (error) => { console.log(error) });
  })
