export enum MealException {
  ApiKeyInitERROR = 'SBE_0001',
  ApiResponseError = 'SBE_0002',
  InvalidDatePeriod = 'SBE_0003',
  InvalidDateParams = 'SBE_0004',
  BothDateExist = 'SBE_0005',
}

export const MealExceptionMessage = {
  [MealException.ApiKeyInitERROR]: 'Api key가 할당되지 않았을때 발생합니다.',
  [MealException.ApiResponseError]: 'Api 응답이 올바르지 않을 때 발생합니다.',
  [MealException.InvalidDatePeriod]: '시작일이 종료일보다 클 때 발생합니다.',
  [MealException.InvalidDateParams]:
    '날짜 파라미터가 유효하지 않을 때 발생합니다.',
  [MealException.BothDateExist]:
    '선택일자와 시작일, 종료일이 모두 있을 때 발생합니다.',
};
