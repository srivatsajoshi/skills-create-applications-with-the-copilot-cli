const { parseAndCompute, trySingleArgExpression } = require('../calculator');

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
    expect(() => parseAndCompute('1', '%', '2')).toThrow('Unsupported operator: %');
  });

  test('trySingleArgExpression parses "3*4"', () => {
    const parsed = trySingleArgExpression('3*4');
    expect(parsed).toEqual({ a: '3', op: '*', b: '4' });
  });
});
