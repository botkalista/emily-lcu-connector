export class Model {
    static from(data: any, newObject: any): any {
        Object.assign(newObject, data);
        return newObject;
    }
}