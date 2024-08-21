import { describe, test, expect } from "bun:test";
import { EventEmitter, captureRejectionSymbol } from "node:events";

describe("Hello", () => {
  test("Lets begin testing", () => {
    expect(1 + 9).toBe(10);
  });
});

describe("Eventings API", () => {
  test("EventEmitter class", () => {
    const ee1 = new EventEmitter();
    ee1.on("event", () => {
      console.log("an event occured!");
    });
    ee1.emit("event");

    const ee2 = new EventEmitter({ captureRejections: true });
    ee2.on("someEvent", async (value) => {
      return Promise.reject(new Error("things not working"));
    });
    ee2.emit("someEvent");

    ee2[captureRejectionSymbol] = (error: Error) => {
      console.log("caught the error here first: ->", error.message);
    };
    // below handler will fire if `captureRejectionSymbol` is not set.
    ee2.on("error", (error: Error) =>
      console.log("caught error here then: ->", error.message)
    );
  });

  test("Event class", () => {
    const event = new Event("availRequest");
    expect(event.type).toEqual("availRequest");
  });

  test("EventTarget class", () => {
    const ee = new EventTarget();
    ee.addEventListener("stuff", (event) => {
      console.log("an event occured:", event.type);
    });

    ee.dispatchEvent(new Event("stuff"));
  });
});
