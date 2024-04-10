import { Category } from "../category.entity";

describe("Category unity tests ", () => {
  test("construtor", () => {
    let category = new Category({
      name: "Movie",
    });

    expect(category.category_id).toBeUndefined();
    expect(category.name).toBe("Movie");
    expect(category.description).toBeNull();
    expect(category.is_active).toBe(true);
    expect(category.created_at).toBeInstanceOf(Date);

    const created_at = new Date();
    category = new Category({
      name: "Movie",
      description: "Movies description",
      is_active: false,
      created_at,
    });

    expect(category.category_id).toBeUndefined();
    expect(category.name).toBe("Movie");
    expect(category.description).toBe("Movies description");
    expect(category.is_active).toBe(false);
    expect(category.created_at).toBe(created_at);

    category = new Category({
      category_id: "1",
      name: "Movie",
      description: "Movies description",
      is_active: false,
      created_at,
    });

    expect(category.category_id).toBe("1");
    expect(category.name).toBe("Movie");
    expect(category.description).toBe("Movies description");
    expect(category.is_active).toBe(false);
    expect(category.created_at).toBe(created_at);
  });

  test("activate", () => {
    const category = new Category({
      name: "Movie",
      description: "Movies description",
      is_active: false,
    });

    category.activate();
    expect(category.is_active).toBe(true);
  });

  test("deactivate", () => {
    const category =  Category.create({
      name: "Movie",
      description: "Movies description",
      is_active: true,
    });

    category.deactivate();
    expect(category.is_active).toBe(false);
  });

  test("should change name", () => {
    const category = new Category({
      name: "Movie",
      description: "Movies description",
    });

    category.changeName("New Name");
    expect(category.name).toBe("New Name");
  });

});
