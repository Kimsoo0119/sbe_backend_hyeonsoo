import { OriginInfo } from '@api/meals/interfaces/meal.interface';

/**
 * 원산지 정보 문자열을 배열로 파싱합니다.
 * "쌀 : 국내산<br/>김치류 : 국내산..." ->
 * [
 *   { food: "쌀", country: "국내산" },
 *   { food: "김치류", country: "국내산" },
 *   ...
 * ]
 */
export function parseOriginInfo(originStr: string): OriginInfo[] {
  if (!originStr) return [];

  return (
    originStr
      .split('<br/>')
      .map((item) => {
        const [food, country] = item.split(' : ');
        if (food && country) {
          return {
            food: food.trim(),
            country: country.trim(),
          };
        }
        return null;
      })
      // null 값 필터링 후 리턴
      .filter((item): item is OriginInfo => !!item)
  );
}
