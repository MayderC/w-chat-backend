import {IGenericRepository} from "../../Application/Ports/repositories/IGenericRepository";

export class BaseRepository<T> implements IGenericRepository<T> {
    async delete(id: string): Promise<void> {
        return Promise.resolve(undefined);
    }

    async get(id: string): Promise<T> {
        return {} as T
    }

    async getAll(): Promise<Array<T>> {
        return []
    }

    async save(entity: T): Promise<T> {
        return entity
    }

    async update(id: string): Promise<void> {
        return Promise.resolve(undefined);
    }

}