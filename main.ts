

const testBlock = (name:string): void =>
{
    console.groupEnd();
    console.group(`# ${name}\n`);
};

const areEqual = (a:unknown, b:unknown):boolean =>
{
    return a?.toString() === b?.toString();
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

const getType = (value: unknown):string =>
{
    return typeof value;
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
