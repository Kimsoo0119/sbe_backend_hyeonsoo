import { Injectable } from '@nestjs/common';
import { MealQueryParamsDto } from './dtos/request/meal-query-params.dto';
import { ConfigService } from '@nestjs/config';
import {
  MealData,
  NeisMealServiceApiResponse,
} from './interfaces/meal.interface';
import { MealMapper } from '@api/meals/mappers/meal-mapper.mapper';
import {
  MealException,
  CustomBadRequest,
  CustomInternalServerError,
} from '@core/exceptions';
import { GetMealsResponseDto } from '@api/meals/dtos/response/get-meals-response.dto';
import { plainToInstance } from 'class-transformer';
import { formatToYMD } from '@shared/utils';

@Injectable()
export class MealsService {
  private readonly apiUrl = 'https://open.neis.go.kr/hub/mealServiceDietInfo';
  private readonly apiKey: string;

  constructor(private readonly configService: ConfigService) {
    this.apiKey = this.configService.get<string>('API_KEY');
    if (!this.apiKey) {
      throw new CustomInternalServerError(MealException.ApiKeyInitERROR);
    }
  }

  async getMeals(dto: MealQueryParamsDto): Promise<GetMealsResponseDto[]> {
    this.validateDateParams(dto);
    this.setDefaultSelectedDateIfNeeded(dto);

    const params = this.buildApiParams(dto);
    const response = await this.requestMealData(params);
    const mappedData = MealMapper.mapMealResponse(response);

    return plainToInstance(GetMealsResponseDto, mappedData);
  }

  /**
   * 기본 선택 날짜를 설정합니다. 선택 날짜가 없고 시작일과 종료일도 없을 때 오늘 날짜로 설정합니다.
   */
  private setDefaultSelectedDateIfNeeded(dto: MealQueryParamsDto): void {
    if (!dto.selectedDate && !dto.startAt && !dto.endAt) {
      dto.selectedDate = formatToYMD(new Date());
    }
  }

  /**
   * 날짜 파라미터를 검증합니다. 시작일과 종료일이 모두 없으면 통과하고, 그렇지 않으면 유효성을 검사합니다.
   */
  private validateDateParams(dto: MealQueryParamsDto): void {
    const { selectedDate, startAt, endAt } = dto;

    if (!startAt && !endAt) return;

    if (!startAt || !endAt) {
      throw new CustomBadRequest(MealException.InvalidDateParams);
    }

    if (selectedDate && startAt && endAt) {
      throw new CustomBadRequest(MealException.BothDateExist);
    }
    if (startAt && endAt && Number(startAt) > Number(endAt)) {
      throw new CustomBadRequest(MealException.InvalidDatePeriod);
    }
  }

  /**
   * NEIS API에서 사용할 파라미터를 빌드합니다.
   */
  private buildApiParams(dto: MealQueryParamsDto): Record<string, string> {
    const params: Record<string, string | undefined> = {
      KEY: this.apiKey,
      Type: 'json',
      pIndex: '1',
      pSize: '50',
      ATPT_OFCDC_SC_CODE: dto.officeCode,
      SD_SCHUL_CODE: dto.schoolCode,
      MLSV_YMD: dto.selectedDate,
      MMEAL_SC_CODE: dto.mealCode?.toString(),
      MLSV_FROM_YMD: dto.startAt,
      MLSV_TO_YMD: dto.endAt,
    };

    return Object.fromEntries(
      Object.entries(params).filter(
        ([_, value]) => value !== undefined && value !== null,
      ),
    );
  }

  /**
   * NEIS API로부터 급식 데이터를 요청합니다.
   */
  private async requestMealData(
    params: Record<string, string>,
  ): Promise<NeisMealServiceApiResponse> {
    const query = new URLSearchParams(params).toString();
    const url = `${this.apiUrl}?${query}`;

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });

      return await response.json();
    } catch (error) {
      throw new CustomInternalServerError(MealException.ApiResponseError);
    }
  }
}
