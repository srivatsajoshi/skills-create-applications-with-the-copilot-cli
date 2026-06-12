#!/usr/bin/env node

/**
 * CLI Calculator
 * Supports: addition (+), subtraction (-), multiplication (*), division (/)
 *
 * Usage:
 *  - Non-interactive: node src/calculator.js 2 + 2
 *  - Single-argument expression: node src/calculator.js "2+2"
 *  - Interactive: node src/calculator.js
 */

const readline = require('readline');

function parseAndCompute(aStr, op, bStr) {
  const a = Number(aStr);
  const b = Number(bStr);

  if (Number.isNaN(a) || Number.isNaN(b)) {
    throw new Error('Invalid number input');
  }

  switch (op) {
    case '+':
      return a + b;
    case '-':
      return a - b;
    case '*':
    case 'x':
    case 'X':
      return a * b;
    case '/':
      if (b === 0) throw new Error('Division by zero');
      return a / b;
    default:
      throw new Error(`Unsupported operator: ${op}`);
  }
}

function trySingleArgExpression(expr) {
  // Match expressions like 2+2 or 3.5*4
  const m = expr.match(/^\s*([+-]?\d+(?:\.\d+)?)\s*([+\-*/xX])\s*([+-]?\d+(?:\.\d+)?)\s*$/);
  if (!m) return null;
  return { a: m[1], op: m[2], b: m[3] };
}

async function interactivePrompt() {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  const question = (q) => new Promise((res) => rl.question(q, res));

  try {
    const expr = await question('Enter expression (e.g. 2 + 2): ');
    const parsed = trySingleArgExpression(expr);
    if (!parsed) {
      console.error('Invalid expression format. Expected: number operator number');
      process.exitCode = 1;
      rl.close();
      return;
    }

    const result = parseAndCompute(parsed.a, parsed.op, parsed.b);
    console.log(result);
  } catch (err) {
    console.error('Error:', err.message);
    process.exitCode = 1;
  } finally {
    rl.close();
  }
}

function main() {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    // Interactive mode
    interactivePrompt();
    return;
  }

  if (args.length === 1) {
    const parsed = trySingleArgExpression(args[0]);
    if (!parsed) {
      console.error('Invalid input. Provide: NUMBER OPERATOR NUMBER, e.g. 2 + 2');
      process.exit(1);
    }

    try {
      const result = parseAndCompute(parsed.a, parsed.op, parsed.b);
      console.log(result);
    } catch (err) {
      console.error('Error:', err.message);
      process.exit(1);
    }
    return;
  }

  // args.length >= 3 -> take first three tokens
  const [aStr, op, bStr] = args;
  try {
    const result = parseAndCompute(aStr, op, bStr);
    console.log(result);
  } catch (err) {
    console.error('Error:', err.message);
    process.exit(1);
  }
}

if (require.main === module) main();
