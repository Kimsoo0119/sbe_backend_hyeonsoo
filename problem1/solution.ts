function generateCombinationsIterative(nums: number[], length: number): number[][] {
  const result: number[][] = [];
  const stack: { start: number; current: number[] }[] = [{ start: 0, current: [] }];

  while (stack.length > 0) {
    const { start, current } = stack.pop()!;

    if (current.length === length) {
      result.push([...current]);
      continue;
    }

    for (let i = start; i < nums.length; i++) {
      stack.push({ start: i + 1, current: [...current, nums[i]] });
    }
  }

  return result;
}

// 주어진 숫자로 만들 수 있는 가장 큰 수 반환
function makeMaxNumber(digits: number[]): number {
  // 내림차순으로 정렬하여 가장 큰 수를 만듦
  return parseInt(digits.sort((a, b) => b - a).join(""));
}

function findMaxProduct(): { maxProduct: number; maxPair: [number, number] } {
  const digits = [1, 3, 5, 7, 9];
  let maxProduct = 0;
  let maxPair: [number, number] = [0, 0];

  // 1자리와 2자리 조합만 시도
  for (let i = 1; i <= 2; i++) {
    const firstGroupCombinations = generateCombinationsIterative(digits, i);

    for (const firstGroup of firstGroupCombinations) {
      const secondGroup = digits.filter((digit) => firstGroup.indexOf(digit) === -1);

      const num1 = makeMaxNumber(firstGroup);
      const num2 = makeMaxNumber(secondGroup);

      const product = num1 * num2;

      if (product > maxProduct) {
        maxProduct = product;
        maxPair = [num1, num2];
      }
    }
  }

  return { maxProduct, maxPair };
}

// 실행 및 결과 출력
const result = findMaxProduct();
console.log(`result: ${result.maxPair[0]}, ${result.maxPair[1]}`);
console.log(`최대 곱: ${result.maxProduct}`);
