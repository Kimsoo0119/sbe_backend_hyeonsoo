/**
 * 알레르기 유발 식재료 코드
 */
export enum AllergyCode {
  EGGS = 1, // 난류
  MILK, // 우유
  BUCKWHEAT, // 메밀
  PEANUTS, // 땅콩
  SOYBEANS, // 대두
  WHEAT, // 밀
  MACKEREL, // 고등어
  CRAB, // 게
  SHRIMP, // 새우
  PORK, // 돼지고기
  PEACH, // 복숭아
  TOMATO, // 토마토
  SULFUROUS_ACID, // 아황산류
  WALNUT, // 호두
  CHICKEN, // 닭고기
  BEEF, // 쇠고기
  SQUID, // 오징어
  SHELLFISH, // 조개류(굴, 전복, 홍합 포함)
  PINE_NUTS, // 잣
}

/**
 * 알레르기 유발 식재료명
 */
export enum AllergyName {
  EGGS = '난류',
  MILK = '우유',
  BUCKWHEAT = '메밀',
  PEANUTS = '땅콩',
  SOYBEANS = '대두',
  WHEAT = '밀',
  MACKEREL = '고등어',
  CRAB = '게',
  SHRIMP = '새우',
  PORK = '돼지고기',
  PEACH = '복숭아',
  TOMATO = '토마토',
  SULFUROUS_ACID = '아황산류',
  WALNUT = '호두',
  CHICKEN = '닭고기',
  BEEF = '쇠고기',
  SQUID = '오징어',
  SHELLFISH = '조개류',
  PINE_NUTS = '잣',
}

/**
 * 알레르기 코드와 이름을 매핑용 객체
 */
export const AllergyCodeMap = {
  [AllergyCode.EGGS]: '난류',
  [AllergyCode.MILK]: '우유',
  [AllergyCode.BUCKWHEAT]: '메밀',
  [AllergyCode.PEANUTS]: '땅콩',
  [AllergyCode.SOYBEANS]: '대두',
  [AllergyCode.WHEAT]: '밀',
  [AllergyCode.MACKEREL]: '고등어',
  [AllergyCode.CRAB]: '게',
  [AllergyCode.SHRIMP]: '새우',
  [AllergyCode.PORK]: '돼지고기',
  [AllergyCode.PEACH]: '복숭아',
  [AllergyCode.TOMATO]: '토마토',
  [AllergyCode.SULFUROUS_ACID]: '아황산류',
  [AllergyCode.WALNUT]: '호두',
  [AllergyCode.CHICKEN]: '닭고기',
  [AllergyCode.BEEF]: '쇠고기',
  [AllergyCode.SQUID]: '오징어',
  [AllergyCode.SHELLFISH]: '조개류(굴, 전복, 홍합 포함)',
  [AllergyCode.PINE_NUTS]: '잣',
};
