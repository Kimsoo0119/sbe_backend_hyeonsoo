import { NutrientInfo } from '@api/meals/interfaces/meal.interface';

/**
 * 영양정보 문자열을 배열로 파싱하는 함수.
 * "탄수화물(g) : 89.9<br/>단백질(g) : 29.1..." ->
 * [
 *   { name: "탄수화물", value: "89.9", unit: "g" },
 *   { name: "단백질", value: "29.1", unit: "g" },
 *   ...
 * ]
 */
export function parseNutritionInfo(nutritionStr: string): NutrientInfo[] {
  if (!nutritionStr) return [];

  return (
    nutritionStr
      .split('<br/>')
      .map((item) => {
        const [rawKey, rawValue] = item.split(' : ');
        const key = rawKey?.trim();
        const value = rawValue?.trim();

        if (!key || !value) return null;

        // 키에서 이름과 단위 분리 (예: "탄수화물(g)" -> { name: "탄수화물", unit: "g" })
        const match = key.match(/(.+)\((.+)\)/);

        if (match) {
          return { name: match[1].trim(), value, unit: match[2].trim() };
        }

        return { name: key, value, unit: '' };
      })
      // null 값 필터링 후 리턴
      .filter((item): item is NutrientInfo => !!item)
  );
}
