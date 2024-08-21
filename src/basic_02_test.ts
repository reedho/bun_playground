import { describe, test, expect } from "bun:test";

// ArrayBuffer | SharedArrayBuffer ----- Buffer (node)

let x = new ArrayBuffer(10)
let y = new SharedArrayBuffer(10)
// x.byteLength
// x.slice(0)
// x.resize(0)

Buffer.from(x)

let a = new Uint8Array(x)
a[0] = 1

describe("API Basic 02", () => {
  // Buffer is basically an abstraction for working with raw binary data
  test("Buffer", () => {
    const buffer1 = Buffer.from([65, 66, 67, 68, 69]);
    const buffer2 = Buffer.from("4142434445", "hex");
    const buffer3 = Buffer.from("Hello");
    const buffer4 = Buffer.from("SGVsbG8", "base64url");

    expect(buffer1.toString("utf8")).toEqual("ABCDE");
    expect(buffer2.toString("utf8")).toEqual("ABCDE");
    expect(buffer3.toString("utf8")).toEqual("Hello");
    expect(buffer4.toString("utf8")).toEqual("Hello");
  });

  // Stream is mechanism for working with data that could not
  // be fit in memory.
  test("Stream", async () => {
    const fileStream = Bun.file("/Users/ridho/bin/v").stream()
    // @ts-ignore
    for await (const chunk of fileStream) {
      let x = chunk as Uint8Array
      console.log(x.length, "<<<<<<<<<<<<<<<<<<<<< CHUNK_LENGTH")
    }

    console.log()
  })
});
