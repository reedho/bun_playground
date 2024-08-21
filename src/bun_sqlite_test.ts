import { describe, test, expect } from "bun:test";
import { Database } from "bun:sqlite";

describe("Bun Sqlite API", () => {
  test("Create database", () => {
    const db = new Database("mydb.sqlite", {
      strict: true,
    });
    // console.log(db, "DB");
    expect(db.filename).toEqual("mydb.sqlite");

    const query = db.query("select 'Hello' as message");
    const result = query.get();

    expect(result).toEqual({ message: "Hello" });
  });
});
