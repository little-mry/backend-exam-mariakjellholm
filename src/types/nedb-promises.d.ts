import { EventEmitter } from "events";

declare module "nedb-promises" {

    export class Datastore<T = any> extends EventEmitter {
        constructor(options?: any);
        insert(doc: T): Promise<T>;
        findOne(query: any): Promise<T | null>;
    }

    export function create<T = any>(options?: any): Datastore<T>;
}
