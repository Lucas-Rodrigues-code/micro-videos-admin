import { Entity } from "../../../../domain/entity";
import { NotFoundError } from "../../../../domain/errors/not-found.error";
import { Uuid } from "../../../../domain/value-objects/uuid.vo";
import { InMemoryRepository } from "../in-memory.repository";

type StubEntityConstructorProps = {
  entity_id?: Uuid;
  name: string;
  price: number;
};
class StubEntity extends Entity {
  entity_id: Uuid;
  name: string;
  price: number;
  constructor(props: StubEntityConstructorProps) {
    super();
    this.entity_id = props.entity_id || new Uuid();
    this.name = props.name;
    this.price = props.price;
  }

  toJSON(): any {
    return {
      entity_id: this.entity_id.id,
      name: this.name,
      price: this.price,
    };
  }
}

class StubInMemoryRepository extends InMemoryRepository<StubEntity, Uuid> {
  getEntity(): new (...args: any[]) => StubEntity {
    return StubEntity;
  }
}
describe("InMemoryRepository Unit tests", () => {
  let repo: StubInMemoryRepository;

  beforeEach(() => {
    repo = new StubInMemoryRepository();
  });

  it("should insert a new entity", async () => {
    const entity = new StubEntity({
      entity_id: new Uuid(),
      name: "test",
      price: 10,
    });
    await repo.insert(entity);
    expect(repo.items.length).toBe(1);
    expect(repo.items[0]).toBe(entity);
  });

  it("should bulk insert entities", async () => {
    const entities = [
      new StubEntity({
        entity_id: new Uuid(),
        name: "test",
        price: 10,
      }),
      new StubEntity({
        entity_id: new Uuid(),
        name: "test",
        price: 10,
      }),
    ];
    await repo.bulkInsert(entities);
    expect(repo.items.length).toBe(2);
    expect(repo.items[0]).toEqual(entities[0]);
    expect(repo.items[1]).toEqual(entities[1]);
  });

  it("should returns all entities", async () => {
    const entity = new StubEntity({ name: "name value", price: 5 });
    await repo.insert(entity);
    const entities = await repo.findAll();
    expect(entities).toStrictEqual([entity]);
  });

  it("should throws error on update when entity not found", async () => {
    const entity = new StubEntity({ name: "name value", price: 5 });
    await expect(repo.update(entity)).rejects.toThrow(
      new NotFoundError(entity.entity_id, StubEntity)
    );
  });

  it("should updates an entity", async () => {
    const entity = new StubEntity({ name: "name value", price: 5 });
    await repo.insert(entity);
    const entityUpdated = new StubEntity({
      entity_id: entity.entity_id,
      name: "updated",
      price: 1,
    });
    await repo.update(entityUpdated);
    expect(entityUpdated.toJSON()).toStrictEqual(repo.items[0].toJSON());
  });

  it("should throws error on delete when entity not found", async () => {
    const uuid = new Uuid();
    await expect(repo.delete(uuid)).rejects.toThrow(
      new NotFoundError(uuid.id, StubEntity)
    );
    await expect(
      repo.delete(new Uuid("9366b7dc-2d71-4799-b91c-c64adb205104"))
    ).rejects.toThrow(
      new NotFoundError("9366b7dc-2d71-4799-b91c-c64adb205104", StubEntity)
    );
  });

  it("should deletes an entity", async () => {
    const entity = new StubEntity({ name: "name value", price: 5 });
    await repo.insert(entity);
    await repo.delete(entity.entity_id);
    expect(repo.items).toHaveLength(0);
  });
});
