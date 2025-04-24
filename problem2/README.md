# 🍽️학교 급식 정보 API 서비스

## 📋개요

학교 코드와 교육청 코드를 통해 특정 학교의 급식 정보를 조회할 수 있으며, 날짜 범위를 지정하여 특정 기간의 급식 정보를 조회할 수도 있습니다.

## 🛠️기술 스택

- **Backend**: NestJS (TypeScript)
- **문서화**: Swagger
- **배포**: Docker

## ✨주요 기능

- 특정 학교의 급식 정보 조회
- 날짜별 급식 정보 조회 (오늘, 특정일, 기간별)
- 조식/중식/석식 구분 조회
- 알레르기 정보 및 원산지 정보 제공
- 영양소 정보 제공

## 🔌API 엔드포인트

### GET /meals

특정 학교의 급식 정보를 조회합니다.

**쿼리 파라미터**:

- `officeCode`: 시도교육청코드 (필수)
- `schoolCode`: 학교코드 (필수)
- `mealCode`: 식사코드 (1:조식, 2:중식, 3:석식) (선택)
- `selectedDate`: 조회할 특정 날짜 (YYYYMMDD 형식) (선택)
- `startAt`: 조회 시작일 (YYYYMMDD 형식) (선택)
- `endAt`: 조회 종료일 (YYYYMMDD 형식) (선택)

## ❌ 에러 코드

API 호출 시 클라이언트에서 발생할 수 있는 에러 코드와 설명입니다. Swagger 문서에서도 확인 가능합니다.

| 에러 코드 | 설명                                                 | HTTP 상태 코드 |
| --------- | ---------------------------------------------------- | -------------- |
| SBE_0001  | Api key가 할당되지 않았을때 발생합니다.              | 500            |
| SBE_0002  | Api 응답이 올바르지 않을 때 발생합니다.              | 500            |
| SBE_0003  | 시작일이 종료일보다 클 때 발생합니다.                | 400            |
| SBE_0004  | 날짜 파라미터가 유효하지 않을 때 발생합니다.         | 400            |
| SBE_0005  | 선택일자와 시작일, 종료일이 모두 있을 때 발생합니다. | 400            |

![image](https://github.com/user-attachments/assets/2231a9a9-71cb-487a-8d56-97f17601fd5f)

**에러 응답 예시(description은 스웨거에서만 확인 가능합니다)**

```json
{
  "status": 400,
  "error": "SBE_0001"
}
```

## 🚀실행 방법

### 환경 변수 설정

`.env.development` 파일을 생성하여 아래 환경 변수를 설정해야 합니다.

```
API_KEY=<NEIS_OPEN_API_KEY>
```

### 로컬 개발 환경 실행

```bash
npm install

npm run start:dev

```

#### Docker Compose 사용

Docker Compose를 사용하여 실행할 수 있습니다.

```yaml
version: '3'

services:
  api:
    build:
      context: .
      dockerfile: Dockerfile
    ports:
      - '3000:3000'
    environment:
      - API_KEY=API_KEY를 입력해주세요
    restart: unless-stopped
```

```bash
docker-compose up -d
```

## 📚API 문서

서버 실행 후 아래 URL에서 Swagger 문서를 확인할 수 있습니다:

```
http://localhost:3000/docs
```

## 🧰유틸리티 함수

### 날짜 관련 유틸리티

- **formatToYMD**: 날짜 객체를 'YYYYMMDD' 형식의 문자열로 변환합니다.
- **IsYMDFormat**: 'YYYYMMDD' 형식의 날짜 문자열 유효성을 검증하는 데코레이터입니다.

### 데코레이터 유틸리티

- **RequiredApiProperty**: 필수 속성을 위한 Swagger 문서화 및 유효성 검증 데코레이터입니다.
- **OptionalApiProperty**: 선택적 속성을 위한 Swagger 문서화 및 유효성 검증 데코레이터입니다.
- **IsValidEnum**: 열거형 값 유효성을 검증하고 대문자로 변환하는 데코레이터입니다.
- **ExposeApiProperty**: 클래스 변환 과정에서 노출할 속성을 표시하는 데코레이터입니다.

### 급식 데이터 처리 유틸리티

- **MealMapper**: NEIS API 응답을 사용하기 쉬운 형태로 변환하는 매퍼 클래스입니다.
- **parseDishInfo**: 요리 이름과 알레르기 정보를 추출하는 함수입니다.
- **parseAllergyCodes**: 알레르기 코드를 배열로 변환하는 함수입니다.
- **getAllergyNames**: 알레르기 코드를 이름으로 변환하는 함수입니다.
- **parseNutritionInfo**: 영양 정보 문자열을 구조화된 객체 배열로 변환하는 함수입니다.
- **parseOriginInfo**: 원산지 정보 문자열을 구조화된 객체 배열로 변환하는 함수입니다.
