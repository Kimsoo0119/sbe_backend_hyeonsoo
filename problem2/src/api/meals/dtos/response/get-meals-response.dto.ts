import { AllergyName } from '@api/meals/enum/allergy-info.enum';
import {
  AllergyInfo,
  DishInfo,
  MealData,
  NutrientInfo,
  OriginInfo,
} from '@api/meals/interfaces/meal.interface';
import { ExposeApiProperty } from '@shared/decorators';
import { Exclude, Type } from 'class-transformer';

@Exclude()
class AllergyInfoDto implements AllergyInfo {
  @ExposeApiProperty({ description: '알레르기 유발 식품 코드' })
  code: string;

  @ExposeApiProperty({ description: '음식명', enum: AllergyName })
  name: AllergyName;
}

@Exclude()
class DishInfoDto implements DishInfo {
  @ExposeApiProperty({ description: '음식명' })
  name: string;

  @ExposeApiProperty({ description: '알레르기 정보', type: [AllergyInfoDto] })
  @Type(() => AllergyInfoDto)
  allergies: AllergyInfoDto[];
}
@Exclude()
class OriginInfoDto implements OriginInfo {
  @ExposeApiProperty({ description: '음식명' })
  food: string;

  @ExposeApiProperty({ description: '원산지' })
  country: string;
}

@Exclude()
class NutrientInfoDto implements NutrientInfo {
  @ExposeApiProperty({ description: '영양소 이름' })
  name: string;

  @ExposeApiProperty({ description: '영양소 단위 (g, mg)' })
  unit: string;

  @ExposeApiProperty({ description: '영양소 값' })
  value: string;
}

@Exclude()
export class GetMealsResponseDto implements MealData {
  @ExposeApiProperty({ description: '급식일자' })
  date: string;

  @ExposeApiProperty({ description: '학교명' })
  schoolName: string;

  @ExposeApiProperty({ description: '식사종류 코드 ( 중식, 석식)' })
  mealType: string;

  @ExposeApiProperty({ description: '식사종류 ( 중식, 석식)' })
  mealName: string;

  @ExposeApiProperty({ description: '칼로리' })
  calories: string;

  @ExposeApiProperty({ description: '메뉴 목록', type: [DishInfoDto] })
  @Type(() => DishInfoDto)
  dishes: DishInfoDto[];

  @ExposeApiProperty({ description: '영양 정보', type: [NutrientInfoDto] })
  @Type(() => NutrientInfoDto)
  nutrition: NutrientInfoDto[];

  @ExposeApiProperty({ description: '원산지 정보', type: [OriginInfoDto] })
  @Type(() => OriginInfoDto)
  origin: OriginInfoDto[];
}
