import { AllergyCodeMap } from '@api/meals/enum/allergy-info.enum';

/**
 * 알레르기 코드를 배열로 변환하는 함수
 * "1.5.6.12.13.15" -> ['1', '5', '6', '12', '13', '15']
 * @param allergyCodeStr 알레르기 코드 문자열
 * @returns 알레르기 코드 배열
 */
export function parseAllergyCodes(allergyCodeStr: string): string[] {
  return allergyCodeStr?.split('.').filter(Boolean) ?? [];
}

/**
 * 알레르기 코드를 이름으로 변환하는 함수
 * ['1', '5', '6'] -> ['난류', '대두', '밀']
 * @param allergyCodes 알레르기 코드 배열
 * @returns 알레르기 이름 배열
 */
export function getAllergyNames(allergyCodes: string[]): string[] {
  return allergyCodes.map((code) => AllergyCodeMap[code]).filter(Boolean);
}

/**
 * 요리명에서 알레르기 코드 추출 함수
 * "현미찹쌀밥(친환경/영)" -> null
 * "배추된장국(영)5.6.13." -> "5.6.13"
 * "어묵국 (1.5.6.8.9.18)" -> "1.5.6.8.9.18"
 * @param dishName 요리명
 * @returns 알레르기 코드 문자열 또는 null
 */
export function extractAllergyCodesFromDishName(
  dishName: string,
): string | null {
  if (!dishName) return null;

  //끝부분에 숫자와 점으로 이루어진 패턴 (예: "배추된장국(영)5.6.13.")
  const endPattern = /(\d+\.)+\d*\.?$/;
  const endMatch = dishName.match(endPattern);
  if (endMatch) {
    return endMatch[0].replace(/\.$/, '');
  }

  //괄호 안에 숫자와 점으로 이루어진 패턴 (예: "어묵국 (1.5.6.8.9.18)")
  const bracketPattern = /\(([0-9\.]+)\)/;
  const bracketMatch = dishName.match(bracketPattern);
  if (bracketMatch?.[1] && /^[0-9.]+$/.test(bracketMatch[1])) {
    return bracketMatch[1];
  }

  return null;
}

// 요리명과 알레르기 정보를 추출하는 함수
export function parseDishInfo(dishString: string) {
  const allergyCodeStr = extractAllergyCodesFromDishName(dishString);
  const allergyCodes = parseAllergyCodes(allergyCodeStr ?? '');

  const allergies = allergyCodes
    .map((code) => ({
      code,
      name: AllergyCodeMap[code] || null,
    }))
    .filter((allergy) => allergy.name);

  // 요리명에서 불필요한 문자 제거 + 알레르기 정보 제거
  let dishName = dishString
    .replace(/^[*-]+\s*/, '') // 앞쪽 불필요한 문자 제거
    .replace(`(${allergyCodeStr})`, '') // 괄호 포함 코드 제거
    .replace(allergyCodeStr ?? '', '') // 괄호 없이 코드만 있을 경우 제거
    .replace(/\.$/, '') // 문장 끝 마침표 제거
    .trim();

  return {
    name: dishName,
    allergies: allergies.length > 0 ? allergies : undefined,
  };
}
