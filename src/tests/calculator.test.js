const { parseAndCompute, trySingleArgExpression, modulo, power, squareRoot } = require('../calculator');

describe('CLI Calculator - basic operations', () => {
  test('2 + 3 = 5', () => {
    expect(parseAndCompute('2', '+', '3')).toBe(5);
  });

  test('10 - 4 = 6 (single-arg expression)', () => {
    expect(parseAndCompute('10', '-', '4')).toBe(6);
  });

  test('45 * 2 = 90', () => {
    expect(parseAndCompute('45', '*', '2')).toBe(90);
  });

  test('20 / 5 = 4', () => {
    expect(parseAndCompute('20', '/', '5')).toBe(4);
  });

  test('division by zero throws', () => {
    expect(() => parseAndCompute('1', '/', '0')).toThrow('Division by zero');
  });

  test('invalid numbers throw', () => {
    expect(() => parseAndCompute('a', '+', '1')).toThrow('Invalid number input');
  });

  test('unsupported operator throws', () => {
    expect(() => parseAndCompute('1', '@', '2')).toThrow('Unsupported operator: @');
  });

  test('trySingleArgExpression parses "3*4"', () => {
    const parsed = trySingleArgExpression('3*4');
    expect(parsed).toEqual({ a: '3', op: '*', b: '4' });
  });
});

describe('CLI Calculator - extended operations', () => {
  test('modulo 5 % 2 = 1', () => {
    expect(modulo('5', '2')).toBe(1);
  });

  test('parse and compute modulo 5%2', () => {
    expect(parseAndCompute('5', '%', '2')).toBe(1);
  });

  test('modulo by zero throws', () => {
    expect(() => modulo('5', '0')).toThrow('Modulo by zero');
  });

  test('power 2^3 = 8 using power()', () => {
    expect(power('2', '3')).toBe(8);
  });

  test('parse and compute exponentiation 2 ** 3', () => {
    expect(parseAndCompute('2', '**', '3')).toBe(8);
  });

  test('square root of 16 = 4 using squareRoot()', () => {
    expect(squareRoot('16')).toBe(4);
  });

  test('parse single-arg sqrt(16) expression', () => {
    const parsed = trySingleArgExpression('sqrt(16)');
    expect(parsed).toEqual({ a: '16', op: 'sqrt' });
    expect(parseAndCompute(parsed.a, parsed.op)).toBe(4);
  });

  test('square root of negative number throws', () => {
    expect(() => squareRoot('-9')).toThrow('Square root of negative number');
  });

  test('power with negative exponent', () => {
    expect(power('2', '-2')).toBeCloseTo(0.25);
  });
});
