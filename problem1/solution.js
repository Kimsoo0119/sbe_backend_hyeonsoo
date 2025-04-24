var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
function generateCombinationsIterative(nums, length) {
    var result = [];
    var stack = [{ start: 0, current: [] }];
    while (stack.length > 0) {
        var _a = stack.pop(), start = _a.start, current = _a.current;
        if (current.length === length) {
            result.push(__spreadArray([], current, true));
            continue;
        }
        for (var i = start; i < nums.length; i++) {
            stack.push({ start: i + 1, current: __spreadArray(__spreadArray([], current, true), [nums[i]], false) });
        }
    }
    return result;
}
// 주어진 숫자로 만들 수 있는 가장 큰 수 반환
function makeMaxNumber(digits) {
    // 내림차순으로 정렬하여 가장 큰 수를 만듦
    return parseInt(digits.sort(function (a, b) { return b - a; }).join(""));
}
function findMaxProduct() {
    var digits = [1, 3, 5, 7, 9];
    var maxProduct = 0;
    var maxPair = [0, 0];
    // 1자리와 2자리 조합만 시도
    for (var i = 1; i <= 2; i++) {
        var firstGroupCombinations = generateCombinationsIterative(digits, i);
        var _loop_1 = function (firstGroup) {
            var secondGroup = digits.filter(function (digit) { return firstGroup.indexOf(digit) === -1; });
            var num1 = makeMaxNumber(firstGroup);
            var num2 = makeMaxNumber(secondGroup);
            var product = num1 * num2;
            if (product > maxProduct) {
                maxProduct = product;
                maxPair = [num1, num2];
            }
        };
        for (var _i = 0, firstGroupCombinations_1 = firstGroupCombinations; _i < firstGroupCombinations_1.length; _i++) {
            var firstGroup = firstGroupCombinations_1[_i];
            _loop_1(firstGroup);
        }
    }
    return { maxProduct: maxProduct, maxPair: maxPair };
}
// 실행 및 결과 출력
var result = findMaxProduct();
console.log("result: ".concat(result.maxPair[0], ", ").concat(result.maxPair[1]));
console.log("\uCD5C\uB300 \uACF1: ".concat(result.maxProduct));
