#!/usr/bin/env node
const { Board } = require("johnny-five");
const morse = require("morse");
const MorseLED = require("./lib/MorseLED");

const prompt = "\n>> ";

// binds led to function handler like handleInput
const withLed = led => fn => fn.bind(null, led);

async function handleInput(led) {
  const chunk = process.stdin.read();
  if (chunk === null) return;

  const code = morse.encode(chunk.trim());
  for (const char of code.split("")) {
    if (char === ".") await led.dot();
    if (char === "-") await led.dash();
    if (char === " ") await led.space();
  }

  process.stdout.write(prompt);
}

async function main() {
  process.stdin.setEncoding("utf8");

  console.log("waiting for board...");
  const board = new Board({ repl: false });
  board.on("ready", () => {
    console.log("board ready");
    const led = new MorseLED(13);
    process.stdin.on("readable", withLed(led)(handleInput));
    process.stdout.write(prompt);
  });
}

main();
