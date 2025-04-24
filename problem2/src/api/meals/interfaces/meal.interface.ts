/**
 * 영양소 정보 인터페이스
 */
export interface NutrientInfo {
  name: string; // 영양소 이름 (탄수화물, 단백질 등)
  value: string; // 값 (예: "153.4")
  unit: string; // 단위 (예: "g", "mg")
}

/**
 * 알레르기 정보 인터페이스
 */
export interface AllergyInfo {
  code: string; // 알레르기 코드
  name: string; // 한글 이름
}

/**
 * 원산지 정보 인터페이스
 */
export interface OriginInfo {
  food: string; // 식품명 (쌀, 배추, 닭고기 등)
  country: string; // 원산지 (국내산, 중국산 등)
}

/**
 * 요리 정보 인터페이스
 */
export interface DishInfo {
  name: string; // 요리명
  allergies?: AllergyInfo[]; // 알레르기 정보 목록
}

export interface NeisMealServiceApiResponse {
  mealServiceDietInfo: [
    {
      head: [
        {
          list_total_count: number;
          RESULT: { CODE: 'INFO-000'; MESSAGE: '정상 처리되었습니다.' };
        },
      ];
    },
    {
      row: NeisMealServiceRow[];
    },
  ];
}

export interface NeisMealServiceRow {
  ATPT_OFCDC_SC_CODE: string; // 시도교육청코드
  ATPT_OFCDC_SC_NM: string; // 시도교육청명
  SD_SCHUL_CODE: string; // 행정표준코드
  SCHUL_NM: string; // 학교명
  MMEAL_SC_CODE: string; // 식사코드
  MMEAL_SC_NM: string; // 식사명
  MLSV_YMD: string; // 급식일자
  MLSV_FGR: number; // 급식인원수
  DDISH_NM: string; // 요리명
  ORPLC_INFO: string; // 원산지정보
  CAL_INFO: string; // 칼로리정보
  NTR_INFO: string; // 영양정보
  MLSV_FROM_YMD: string; // 급식시작일자
  MLSV_TO_YMD: string; // 급식종료일자
  LOAD_DTM: string; // 수정일자
}

export interface MealData {
  date: string;
  schoolName: string;
  mealType: string;
  mealName: string;
  dishes: DishInfo[];
  calories: string;
  nutrition: NutrientInfo[];
  origin: OriginInfo[];
}
