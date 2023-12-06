// @ts-nocheck
/* eslint-disable prettier/prettier */
// Test utils

const testBlock = (name) =>
{
    console.groupEnd();
    console.group(`# ${name}\n`);
};

const areEqual = (a, b) =>
{
    return a?.toString() === b?.toString();
    // Compare arrays of primitives
    // Remember: [] !== []
};

const test = (whatWeTest, actualResult, expectedResult) =>
{
    if (areEqual(actualResult, expectedResult))
    {
        console.log(`[OK] ${whatWeTest}\n`);
    }
    else
    {
        console.error(`[FAIL] ${whatWeTest}`);
        console.debug('Expected:');
        console.debug(expectedResult);
        console.debug('Actual:');
        console.debug(actualResult);
        console.log('');
    }
};

// Functions

const getType = (value) =>
{
    return typeof value;
};

const getTypesOfItems = (arr) =>
{
    const types = [];
    for (let i = 0; i < arr.length; i++)
    {
        types.push(typeof arr[i]);
    }
    return types;

};

const allItemsHaveTheSameType = (arr) =>
{
    if (arr && arr.length === 0)
    {
        return true;
    }

    for (let i = 1; i < arr.length; i++)
    {
        if ((typeof arr[i]) !== (typeof arr[0]))
        {
            return false;
        }
    }
    return true;
};

const getRealTypeNumber = (value) =>
{
    if (isNaN(value) === true)
    {
        return 'NaN';
    }
    else if (isFinite(value) === false)
    {
        return 'Infinity';
    }

    return typeof value;
};

const getRealTypeObject = (value) =>
{
    if (value instanceof Array)
    {
        return 'array';
    }
    else if (value instanceof Date)
    {
        return 'date';
    }
    else if (value instanceof RegExp)
    {
        return 'regexp';
    }
    else if (value instanceof Set)
    {
        return 'set';
    }
    else if (value instanceof Map)
    {
        return 'map';
    }
    else if (areEqual(null, value))
    {
        return 'null';
    }
    return typeof value;
};

const getRealType = (value) =>
{
    if (typeof value === 'number')
    {
        return getRealTypeNumber(value);
    }
    else if (typeof value === 'object')
    {
        return getRealTypeObject(value);
    }
    return typeof value;
};

const getRealTypesOfItems = (arr) =>
{

    const realTypes = [];
    for (let i = 0; i < arr.length; i++)
    {
        const realType = getRealType(arr[i]);
        realTypes.push(realType);
    }
    return realTypes;
};

const everyItemHasAUniqueRealType = (arr) =>
{
    if (arr.length === 0)
    {
        return true;
    }
    const realTypes = new Set(getRealTypesOfItems(arr));
    return realTypes.size === arr.length;
};

const countRealTypes = (arr) =>
{
    // Return an array of arrays with a type and count of items
    // with this type in the input array, sorted by type.
    // Like an Object.entries() result: [['boolean', 3], ['string', 5]]
};

// Tests

testBlock('getType');

test('Boolean', getType(true), 'boolean');
test('Number', getType(123), 'number');
test('String', getType('whoo'), 'string');
test('Array', getType([]), 'object');
test('Object', getType({}), 'object');
test(
    'Function',
    getType(() =>
{}),
    'function'
);
test('Undefined', getType(undefined), 'undefined');
test('Null', getType(null), 'object');

testBlock('allItemsHaveTheSameType');

test('All values are numbers', allItemsHaveTheSameType([11, 12, 13]), true);

test('All values are strings', allItemsHaveTheSameType(['11', '12', '13']), true);

test(
    'All values are strings but wait',
    allItemsHaveTheSameType(['11', new String('12'), '13']),
    false// What the result?
);
// Number / Any => NaN => Number
test(
    'Values like a number',
    allItemsHaveTheSameType([123, 123 / 'a', 1 / 0]),
    true// What the result?
);

test('Values like an object', allItemsHaveTheSameType([{}]), true);

testBlock('getTypesOfItems VS getRealTypesOfItems');

const knownTypes = [
    true,
    777,
    'hard..',
    [1],
    {},
    () =>
{},
    undefined,
    null,
    NaN,
    Infinity,
    new Date(),
    new RegExp(),
    new Set(),
    BigInt('1'),
    Symbol(undefined),
    new Map(),
];

test('Check basic types', getTypesOfItems(knownTypes), [
    'boolean',
    'number',
    'string',
    'object',
    'object',
    'function',
    'undefined',
    'object',
    'number',
    'number',
    'object',
    'object',
    'object',
    'bigint',
    'symbol',
    'object',
]);

test('Check real types', getRealTypesOfItems(knownTypes), [
    'boolean',
    'number',
    'string',
    'array',
    'object',
    'function',
    'undefined',
    'null',
    'NaN',
    'Infinity',
    'date',
    'regexp',
    'set',
    'bigint',
    'symbol',
    'map',
]);

testBlock('everyItemHasAUniqueRealType');

test('All value types in the array are unique', everyItemHasAUniqueRealType([true, 123, '123']), true);

test('Two values have the same type', everyItemHasAUniqueRealType([true, 123, '123' === 123]), false);

test('There are no repeated types in knownTypes', everyItemHasAUniqueRealType(knownTypes), true);

testBlock('countRealTypes');

test('Count unique types of array items', countRealTypes([true, null, !null, !!null, {}]), [
    ['boolean', 3],
    ['null', 1],
    ['object', 1],
]);

test('Counted unique types are sorted', countRealTypes([{}, null, true, !null, !!null]), [
    ['boolean', 3],
    ['null', 1],
    ['object', 1],
]);

// Add several positive and negative tests
