import { describe, test, expect } from "bun:test";

describe("Bun File I/O Api", () => {
  test("Reading a file", () => {
    const file = Bun.file("/etc/passwd"); // return BunFile, a lazy loaded file representation
    // note: reading file attributes will not actually loading its file content.
    const fileAttrs = {
      name: file.name,
      type: file.type, // MIME
      size: file.size,
      lastModified: file.lastModified,
    };

    // to read the file content, use on of these methods:
    // file.text() // => Promise<string>
    // file.stream() // => ReadableStream<Uint8Array>
    // file.arrayBuffer() // => Promise<ArrayBuffer>

    expect(file.exists()).resolves.toBe(true);

    console.log(file, "<<< BunFile");
    console.log(fileAttrs, "<<< file attributes");

    const file2 = Bun.file(import.meta.url); // <-- current source file
    console.log(file2.name, "<<< current file name");
  });

});
