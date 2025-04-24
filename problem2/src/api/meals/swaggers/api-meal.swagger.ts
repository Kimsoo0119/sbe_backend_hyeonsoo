import { GetMealsResponseDto } from '@api/meals/dtos/response/get-meals-response.dto';
import { MealsController } from '@api/meals/meals.controller';
import { MealException, MealExceptionMessage } from '@core/exceptions';
import { CustomSwaggerBuilder } from '@core/swagger/custom-swagger-builder';
import { HttpStatus } from '@nestjs/common';
import { ApiOperator } from 'nest-swagger-builder';

export const ApiMeal: ApiOperator<keyof MealsController> = {
  GetMeals: (apiOperation) =>
    CustomSwaggerBuilder()
      .withOperation(apiOperation)
      .withBodyResponse(HttpStatus.OK, 'ApiMeal_GetMeals', [
        GetMealsResponseDto,
      ])
      .withBadRequestResponse([
        {
          error: MealException.ApiKeyInitERROR,
          description: MealExceptionMessage[MealException.ApiKeyInitERROR],
        },
        {
          error: MealException.ApiResponseError,
          description: MealExceptionMessage[MealException.ApiResponseError],
        },
        {
          error: MealException.InvalidDatePeriod,
          description: MealExceptionMessage[MealException.InvalidDatePeriod],
        },
        {
          error: MealException.InvalidDateParams,
          description: MealExceptionMessage[MealException.InvalidDateParams],
        },
        {
          error: MealException.BothDateExist,
          description: MealExceptionMessage[MealException.BothDateExist],
        },
      ])
      .build(),
};
