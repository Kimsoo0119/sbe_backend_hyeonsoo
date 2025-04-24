import { MealCode } from '@api/meals/enum/meal.enum';
import { ApiProperty } from '@nestjs/swagger';
import { OptionalApiProperty, RequiredApiProperty } from '@shared/decorators';
import { IsNotEmpty, ValidateIf } from 'class-validator';
import { IsYMDFormat } from 'src/common/decorators/is-date-format.decorator';

export class MealQueryParamsDto {
  @RequiredApiProperty({
    description: '시도교육청코드 (ATPT_OFCDC_SC_CODE)',
    example: 'T10',
  })
  officeCode: string;

  @RequiredApiProperty({
    description: '행정표준코드 (SD_SCHUL_CODE)',
    example: '9290083',
  })
  schoolCode: string;

  @OptionalApiProperty({
    description: '식사코드 (MMEAL_SC_CODE), 1:조식, 2:중식, 3:석식',
    enum: MealCode,
  })
  mealCode?: MealCode;

  @OptionalApiProperty({
    description: '선택한 날짜 (MLSV_YMD)',
    example: 'YYYYMMDD',
  })
  @IsYMDFormat()
  selectedDate?: string;

  @ApiProperty({
    description: '시작일 (MLSV_FROM_YMD)',
    example: 'YYYYMMDD',
    required: false,
  })
  @IsYMDFormat()
  @ValidateIf((o) => o.endAt)
  @IsNotEmpty()
  startAt?: string;

  @ApiProperty({
    description: '종료일 (MLSV_TO_YMD)',
    example: 'YYYYMMDD',
    required: false,
  })
  @IsYMDFormat()
  @ValidateIf((o) => o.startAt)
  @IsNotEmpty()
  endAt?: string;
}
