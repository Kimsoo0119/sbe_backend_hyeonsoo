import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';

/**
 * YYYYMMDD 형식의 날짜 문자열인지 검증하는 데코레이터
 * @param validationOptions 추가 검증 옵션
 */
export function IsYMDFormat(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isDateFormat',
      target: object.constructor,
      propertyName: propertyName,
      options: {
        message: `${propertyName}은(는) 'YYYYMMDD' 형식이어야 합니다. (예: 20240501)`,
        ...validationOptions,
      },
      validator: {
        validate(value: any, args: ValidationArguments) {
          if (value === undefined || value === null || value === '') {
            return true;
          }

          // 문자열이 아니면 검증 실패
          if (typeof value !== 'string') {
            return false;
          }

          // 8자리 숫자로만 구성되어 있는지 확인
          if (!/^\d{8}$/.test(value)) {
            return false;
          }

          try {
            // 날짜가 유효한지 확인 (2021-13-45 같은 날짜를 거르기 위함)
            const year = parseInt(value.substring(0, 4));
            const month = parseInt(value.substring(4, 6)) - 1; // JavaScript의 월은 0부터 시작(0~11)
            const day = parseInt(value.substring(6, 8));

            const date = new Date(year, month, day);

            // 지정한 날짜가 실제로 유효한지 확인
            return (
              date.getFullYear() === year &&
              date.getMonth() === month &&
              date.getDate() === day
            );
          } catch (e) {
            return false;
          }
        },
      },
    });
  };
}
