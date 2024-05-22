// test.js
const {
  compileFunction,
  createContext,
  runInContext,
  SourceTextModule
} = require("vm");
const context = createContext({ console });

const sourceCode = `
  const runTimes = 10000000;
  let sum = 0;
  console.time();
  for (let i = 0; i < runTimes; i++) {
    sum += Math.abs(0);
  }
  console.timeEnd();
`;

(async () => {
  const compiledFunction = compileFunction(sourceCode, [], {
    parsingContext: context
  });

  const vmModule = new SourceTextModule(sourceCode, { context });

  await vmModule.link(() => {
    throw new Error("should never be called");
  });

  // These are both super slow (1.6 seconds on my machine)
  compiledFunction();
  await vmModule.evaluate();

  // however, this is quick (less than 10 milliseconds on my machine)
  const compiledWithMathFunction = compileFunction(sourceCode, ["Math"], {
    parsingContext: context
  });
  compiledWithMathFunction(runInContext("Math", context));
})().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
