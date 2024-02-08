type NameTestBlock = (name:string) => void;
type TypeValueFunc = (value: unknown) => void;

const testBlock: NameTestBlock = (name) =>
{
    console.groupEnd();
    console.group(`# ${name}\n`);
};

const areEqual = (a:unknown, b:unknown):boolean =>
{
    return JSON.stringify(a) === JSON.stringify(b);
};

const test = (whatWeTest:string, actualResult:unknown, expectedResult:unknown):void =>
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

const getType: TypeValueFunc = (value) =>
{
    return typeof value;
};

const getTypesOfItems = (arr:Array<unknown>):Array<string> =>
{
    const types:Array<string> = [];
    for (let i = 0; i < arr.length; i++)
    {
        types.push(typeof arr[i]);
    }
    return types;

};

const allItemsHaveTheSameType = (arr:Array<unknown>): boolean =>
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

const getRealTypeNumber = (value:number):string =>
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

const getRealTypeObject = (value:object | null):string =>
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

const getRealType = (value:unknown):string =>
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

const getRealTypesOfItems = (arr:Array<unknown>):Array<string> =>
{
    const realTypes:Array<string> = [];
    for (let i = 0; i < arr.length; i++)
    {
        const realType = getRealType(arr[i]);
        realTypes.push(realType);
    }
    return realTypes;
};

const everyItemHasAUniqueRealType = (arr:Array<unknown>):boolean =>
{
    if (arr.length === 0)
    {
        return true;
    }
    const realTypes = new Set(getRealTypesOfItems(arr));
    return realTypes.size === arr.length;
};

const getMapCountEveryElementsInArray = (arr:Array<string>):Map<string,number> =>
{
    const map:Map<string, number> = new Map();
    for (let i = 0; i < arr.length; i++)
    {
        if (map.has(arr[i]) === true)
        {
            map.set(arr[i], map.get(arr[i]) + 1);
        }
        else
        {
            map.set(arr[i], 1);
        }
    }
    return map;
};

const countRealTypes = (arr:Array<unknown>):Array<Array<string | number>> =>
{
    const realTypes = getRealTypesOfItems(arr).sort();
    const mapCount = getMapCountEveryElementsInArray(realTypes);
    const matrix = [];
    mapCount.forEach((val, key) =>
    {
        matrix.push([key, val]);
    });
    return matrix;
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
    false
);
// Number / Any => NaN => Number
test(
    'Values like a number',
    allItemsHaveTheSameType([123, 123 / Number('a'), 1 / 0]),
    true
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
    new RegExp(''),
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
test('Counted unique types are sorted', countRealTypes([{}, 3, 5, 7, !!null]), [
    ['boolean', 1],
    ['number', 3],
    ['object', 1],
]);

test('Counted unique types are sorted', countRealTypes([{}, 3, 5, new Date(), !!null, new Map()]), [
    ['boolean', 1],
    ['date', 1],
    ['map', 1],
    ['number', 2],
    ['object', 1],
]);

test('Counted unique types are sorted', countRealTypes([]), [
]);

test('Are euqal num - str?',areEqual(1,'1'),false);
test('Are euqal str -str ?',areEqual('1','1'),true);
test('Are euqal num = num ?',areEqual(1,1),true);
test('Are euqal num = arr?',areEqual(1,[1,2,3]),false);
test('Are euqal? arr num - arr multi',areEqual([1,2,3],[1,'2',3]),false);
test('Are euqal? arr num - arr num',areEqual([1,2],[1,2]),true);
test('Are euqal? {} {}',areEqual({},{}),true);
test('Are euqal? {elem} {}',areEqual({obj:1},{}),false);
test('Are euqal? {elem} {elem}',areEqual({obj:1},{obj:1}),true);
