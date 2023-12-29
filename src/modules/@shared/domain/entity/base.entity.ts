import Id from "../value-object/id.value-object";

export default class Entity {
    private _id: Id;
    private _createdAt: Date;
    private _updatedAt: Date;

    constructor(id?: Id) {
        this._id = id || new Id();
        this._createdAt = new Date();
        this._updatedAt = new Date();
    }

    get id(): Id {
        return this._id;
    }

    set createdAt(createdAt: Date) {
        this._createdAt = createdAt;
    }

    get createdAt(): Date {
        return this._createdAt;
    }

    get updatedAt(): Date {
        return this._updatedAt;
    }

    set updatedAt(updatedAt: Date) {
        this._updatedAt = updatedAt;
    }
}
