import { createMachine, assign, createActor } from "xstate";

const countMachine = createMachine({
  context: {
    count: 0,
  },
  on: {
    INC: {
      actions: assign({
        count: ({ context }) => context.count + 1,
      }),
    },
    DEC: {
      actions: assign({
        count: ({ context }) => context.count - 1,
      }),
    },
    SET: {
      actions: assign({
        count: ({ event }) => event.value,
      }),
    },
  },
});

const countActor = createActor(countMachine).start();

countActor.subscribe((state) => {
  console.log(state.context.count);
});

countActor.send({ type: "INC" });

countActor.send({ type: "DEC" });

for (let x = 0; x < 10; x++) {
  countActor.send({ type: "INC" });
}

countActor.send({ type: "SET", value: 100 });

const textMachine = createMachine({
  context: {
    committedValue: "",
    value: "",
  },
  initial: "reading",
  states: {
    reading: {
      on: {
        "text.edit": { target: "editing" },
      },
    },
    editing: {
      on: {
        "text.change": {
          actions: assign({
            value: ({ event }) => event.value,
          }),
        },
        "text.commit": {
          actions: assign({
            committedValue: ({ context }) => context.value,
          }),
          target: "reading",
        },
        "text.cancel": {
          actions: assign({
            value: ({ context }) => context.committedValue,
          }),
          target: "reading",
        },
      },
    },
  },
});

const textActor = createActor(textMachine).start();

textActor.subscribe((state) => {
  console.log(state.context.value);
});

textActor.send({ type: "text.edit" });

textActor.send({ type: "text.change", value: "Hello" });

textActor.send({ type: "text.commit" });

textActor.send({ type: "text.edit" });

textActor.send({ type: "text.change", value: "Hello world" });

textActor.send({ type: "text.cancel" });
