export interface IGenericRepository<T> {
    get(id: string): Promise<T>
    getAll(): Promise<Array<T>>
    save(entity: T): Promise<T>
    update(id: string): Promise<void>
    delete(id: string): Promise<void>
}