
interface Repository {
  get<T>(key: string): Promise<T>
  set<T>(key: string, value: T): Promise<void>
}

class IndexedDBStorage implements Repository {
  constructor(public db: IDBDatabase, public storeName: string = "default") {}

  static open(name: string): Promise<IndexedDBStorage> {
    return new Promise<IndexedDBStorage>((resolve, reject) => {
      const request = indexedDB.open(name)

      request.onsuccess = event => {
        const db = request.result as IDBDatabase
        const storage = new IndexedDBStorage(db)
        resolve(storage)
      }

      request.onerror = event => {
        reject(request.error)
      }
    })
  }

  get = <T> (key: string): Promise<T> => {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction(this.storeName)
      const store = transaction.objectStore(this.storeName)

      const request = store.get(key)

      request.onsuccess = event => {
        resolve(request.result)
      }

      request.onerror = event => {
        reject(request.error)
      }
    })
  }

  set = <T> (key: string, value: T): Promise<void> => {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction(this.storeName, "readwrite")
      const store = transaction.objectStore(this.storeName)

      const request = store.put(value, key)

      request.onsuccess = event => {
        resolve()
      }

      request.onerror = event => {
        reject(request.error)
      }
    })
  }
}
