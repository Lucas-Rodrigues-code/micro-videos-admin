import { Entity } from "../entity";

export class NotFoundError extends Error {
  constructor(id: any[] | any, entityClass: new (...args: any[]) => Entity) {
    const idaMessage = Array.isArray(id) ? id.join(", ") : id;
    super(`${entityClass.name} with id ${idaMessage} not found`);
    this.name = "NotFoundError";
  }
}
