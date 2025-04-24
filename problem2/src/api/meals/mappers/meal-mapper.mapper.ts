import {
  parseNutritionInfo,
  parseOriginInfo,
  parseDishInfo,
} from '@api/meals/utils';
import {
  MealData,
  NeisMealServiceApiResponse,
  NeisMealServiceRow,
} from '../interfaces/meal.interface';

/**
 * API 응답을 사용하기 좋은 형태로 변환하는 매퍼
 * 스네이크 케이스로 된 API 응답을 카멜 케이스로 변환
 */
export class MealMapper {
  static mapMealResponse(apiResponse: NeisMealServiceApiResponse): MealData[] {
    try {
      if (!apiResponse?.mealServiceDietInfo?.[1]?.row) {
        return [];
      }

      const rows = apiResponse.mealServiceDietInfo[1].row;

      return rows.map(mapMealInfo);
    } catch (error) {
      console.error('급식 데이터 변환 중 오류 발생:', error);
      return [];
    }
  }
}

/**
 * 개별 급식 정보를 매핑합니다.
 */
export function mapMealInfo(mealInfo: NeisMealServiceRow): MealData {
  const date = mealInfo.MLSV_YMD;
  const schoolName = mealInfo.SCHUL_NM;
  const mealType = mealInfo.MMEAL_SC_CODE;
  const mealName = mealInfo.MMEAL_SC_NM;
  const dishStrings = mealInfo.DDISH_NM ? mealInfo.DDISH_NM.split('<br/>') : [];
  const dishes = dishStrings.map(parseDishInfo);
  const calories = mealInfo.CAL_INFO;
  const nutrition = parseNutritionInfo(mealInfo.NTR_INFO);
  const origin = parseOriginInfo(mealInfo.ORPLC_INFO);

  return {
    date,
    schoolName,
    mealType,
    mealName,
    dishes,
    calories,
    nutrition,
    origin,
  };
}
