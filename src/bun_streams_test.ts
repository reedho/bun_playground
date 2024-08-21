import { describe, test, expect } from "bun:test";

// Concept:
// NodeJS API "node:stream" provides: `Readable`, `Writable`, `Duplex`
// Bun provides nodejs api above as well as web api `ReadableStream`, `WritableStream`.

describe("Bun Stream API", () => {
  test("Creating ReadableStream", () => {
    const stream = new ReadableStream({
      start(controller) {
        controller.enqueue("hello");
        controller.enqueue("world");
        controller.close();
      },
    });

    expect(stream instanceof ReadableStream).toBe(true);
  });

  test("Creating a *direct* ReadableStream", () => {
    // When using a direct ReadableStream, all chunk queueing is
    // handled by the destination.
    // The consumer of the stream receives exactly what is passed to
    // controller.write(), without any encoding or modification.

    // @ts-nocheck
    const stream = new ReadableStream({
      // @ts-ignore
      type: "direct",
      pull(controller) {
        // @ts-ignore
        controller.write("hello");
        // @ts-ignore
        controller.write("world");
      },
    });
    expect(stream instanceof ReadableStream).toBe(true);
  });

  test("Response is a kind of ReadableStream", () => {
    const response = new Response({
      // @ts-ignore
      [Symbol.asyncIterator]: async function* () {
        yield "hello";
        yield "world";
      },
    });
    expect(response instanceof ReadableStream).toBe(false); //
    expect(response instanceof Response).toBe(true);

    expect(response.text()).resolves.toEqual("helloworld");
  });

  test("ArrayBufferSync", () => {
    const sink = new Bun.ArrayBufferSink();
    sink.write("h");
    sink.write("e");
    sink.write("l");
    sink.write("l");
    sink.write("o");
    const result = sink.end();

    const dec = new TextDecoder("utf8");
    const str = dec.decode(result);
    expect(str).toEqual("hello");

    const sink2 = new Bun.ArrayBufferSink();
    sink2.start({
      asUint8Array: true,
    });
    sink2.write("h");
    const result2 = sink2.end() as Uint8Array;
    expect(result2.byteLength).toEqual(1);
  });
});
