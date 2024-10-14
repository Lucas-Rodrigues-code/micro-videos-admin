import { Entity } from "../entity";
import { ValueObject } from "../value-object";
import { SearchParams } from "./search-params";
import { SearchResult } from "./search-result";

export interface IRepository<E extends Entity, EntityId extends ValueObject> {
  insert(entity: E): Promise<void>;
  bulkInsert(entities: E[]): Promise<void>;
  update(entity: E): Promise<void>;
  delete(entity: EntityId): Promise<void>;

  findById(entity_id: EntityId): Promise<E | null>;
  findAll(): Promise<E[]>;

  getEntity(): new (...args: any[]) => E;
}

export interface ISearchRepository<
  E extends Entity,
  EntityId extends ValueObject,
  searchInput = SearchParams,
  searchOutput = SearchResult
> extends IRepository<E, EntityId> {
  sortableFields: string[];
  search(props: searchInput): Promise<searchOutput>;
}
