// simpleFunctions.test.js

const { add, subtract } = require('./Script/simpleFunctions.js');

describe('Math operations', () => {
  test('addition of two numbers', () => {
    expect(add(1, 2)).toBe(3);
  });

  test('subtraction of two numbers', () => {
    expect(subtract(5, 3)).toBe(2);
  });
});


//popup.js
