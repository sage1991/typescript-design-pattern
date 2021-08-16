export interface Repository {
  get<T>(key: string): Promise<T>
  set<T>(key: string, value: T): Promise<void>
}

export interface Permission {
  write: boolean
  read: boolean
}

export class IndexedDBStorage implements Repository {
  private dbPromise: Promise<IDBDatabase>

  constructor(
    public name: string,
    public permission: Permission,
    public storeName: string = "default"
  ) {}

  private get dbReady(): Promise<IDBDatabase> {
    if (!this.dbPromise) {
      this.dbPromise = new Promise<IDBDatabase>((resolve, reject) => {
        const request = indexedDB.open(this.name)

        request.onsuccess = event => {
          resolve(request.result)
        }

        request.onerror = event => {
          reject(request.error)
        }
      })
    }

    return this.dbPromise
  }

  get = <T> (key: string): Promise<T> => {
    if (!this.permission.read) {
      return Promise.reject<T>(new Error("Permission denied"))
    }

    return (
      this
        .dbReady
        .then((db: IDBDatabase) => new Promise((resolve, reject) => {
          const transaction = db.transaction(this.storeName)
          const store = transaction.objectStore(this.storeName)

          const request = store.get(key)

          request.onsuccess = event => {
            resolve(request.result)
          }

          request.onerror = event => {
            reject(request.error)
          }
        }))
    )
  }

  set = <T> (key: string, value: T): Promise<void> => {
    if (!this.permission.write) {
      return Promise.reject<void>(new Error("Permission denied"))
    }

    return (
      this
        .dbReady
        .then((db: IDBDatabase) => new Promise((resolve, reject) => {
          const transaction = db.transaction(this.storeName, "readwrite")
          const store = transaction.objectStore(this.storeName)

          const request = store.put(value, key)

          request.onsuccess = event => {
            resolve()
          }

          request.onerror = event => {
            reject(request.error)
          }
        }))
    )
  }
}

