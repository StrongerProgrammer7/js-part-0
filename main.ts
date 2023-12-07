type NameTestBlock = (name:string) => void;
type TypeValueFunc = (value: unknown) => void;

const testBlock: NameTestBlock = (name) =>
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
