import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { MealQueryParamsDto } from './dtos/request/meal-query-params.dto';
import { MealsService } from 'src/api/meals/meals.service';
import { GetMealsResponseDto } from '@api/meals/dtos/response/get-meals-response.dto';
import { ApiMeal } from '@api/meals/swaggers/api-meal.swagger';

@ApiTags('급식 정보 API')
@Controller('meals')
export class MealsController {
  constructor(private readonly mealsService: MealsService) {}

  @ApiMeal.GetMeals({
    summary: '급식 정보 조회',
    description: '일정이 제공되지 않으면 오늘 날짜의 급식 정보를 조회합니다.',
  })
  @Get()
  async getMeals(
    @Query() queryParams: MealQueryParamsDto,
  ): Promise<GetMealsResponseDto[]> {
    return this.mealsService.getMeals(queryParams);
  }
}
