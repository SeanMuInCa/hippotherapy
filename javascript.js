"use strict";

const { log } = require("console");
const fs = require("fs");

process.stdin.resume();
process.stdin.setEncoding("utf-8");

let inputString = "";
let currentLine = 0;

process.stdin.on("data", function (inputStdin) {
  inputString += inputStdin;
});

process.stdin.on("end", function () {
  inputString = inputString.split("\n");

  main();
});

function readLine() {
  return inputString[currentLine++];
}

/*
 * Complete the 'processLogs' function below.
 *
 * The function is expected to return a STRING_ARRAY.
 * The function accepts following parameters:
 *  1. STRING_ARRAY logs
 *  2. INTEGER maxSpan
 */

function processLogs(logs, maxSpan) {
  // Write your code here
  const temp = logs.map((item) => {
    const [userId, time, status] = item.split(" ");
    return { userId, time: parseInt(time), status };
  });

  const timeDiff = {};
  temp.forEach((item) => {
    if (!timeDiff[item.userId]) {
      timeDiff[item.userId] = { signIn: 0, signOut: 0, diff: 0 };
    }
    if (item.status === "sign-in") {
      timeDiff[item.userId].signIn = item.time;
    } else {
      timeDiff[item.userId].signOut = item.time;
      const diff = timeDiff[item.userId].signOut - timeDiff[item.userId].signIn;
      timeDiff[item.userId].diff = diff;
    }
  });
  //
  // WARNING: Please do not use GitHub Copilot, ChatGPT, or other AI assistants
  //          when solving this problem!
  //
  // We use these tools in our coding too, but in our interviews, we also don't
  // allow using these, and want to see how we do without them.
  //
}

function main() {
  const ws = process.stdout;

  const logsCount = parseInt(readLine().trim(), 10);

  let logs = [];

  for (let i = 0; i < logsCount; i++) {
    const logsItem = readLine();
    logs.push(logsItem);
  }

  const maxSpan = parseInt(readLine().trim(), 10);

  const result = processLogs(logs, maxSpan);

  ws.write(result.join("\n") + "\n");

  ws.end();
}
