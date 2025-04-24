# 💼 결재 시스템 DB 설계

## 📌 과제 조건

> 여러 단계의 승인 및 반려가 가능한 결재 시스템을 구축하는 시나리오에서  
> **1. 필요한 테이블을 최소한으로 정의**  
> **2. 특정 사용자가 처리해야 할 결재 건 나열 쿼리**

---

## 🧭 설계 방향

- **역할 기반 결재 흐름**을 지원하는 구조
- **정책 기반의 결재 단계 재사용** 및 관리 용이성 확보
- **문서별 실제 결재 단계는 정책으로부터 복사하여 생성**
- **테이블 수 최소화** 및 확장성을 고려한 설계

---

## 🗂 테이블 구조

### 1. `users`

- 사용자 정보 저장
- 부서와 역할 포함

```sql
CREATE TABLE users (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  department VARCHAR(100),
  role VARCHAR(100), -- 예: 팀원, 팀장, 부장
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### 2. `approval_policies`

- 결재 정책(정의된 결재 흐름)

```sql
CREATE TABLE approval_policies (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  description TEXT
);
```

### 3. `approval_policy_steps`

- 정책 기반의 역할별 결재 단계

```sql
CREATE TABLE approval_policy_steps (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  policy_id BIGINT NOT NULL,
  role VARCHAR(100) NOT NULL,
  step_order INT NOT NULL,
  FOREIGN KEY (policy_id) REFERENCES approval_policies(id)
);
```

### 4. `approval_documents`

- 실제 결재 문서

```sql
CREATE TABLE approval_documents (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL,
  content TEXT,
  creator_id BIGINT NOT NULL,
  policy_id BIGINT NOT NULL,
  status ENUM('DRAFT', 'IN_PROGRESS', 'APPROVED', 'REJECTED') DEFAULT 'DRAFT',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (creator_id) REFERENCES users(id),
  FOREIGN KEY (policy_id) REFERENCES approval_policies(id)
);
```

### 5. `approval_steps`

- 문서별 실제 결재 단계

```sql
CREATE TABLE approval_steps (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  document_id BIGINT NOT NULL,
  approver_id BIGINT,
  step_order INT NOT NULL,
  status ENUM('PENDING', 'APPROVED', 'REJECTED') DEFAULT 'PENDING',
  comment TEXT,
  acted_at DATETIME,
  FOREIGN KEY (document_id) REFERENCES approval_documents(id),
  FOREIGN KEY (approver_id) REFERENCES users(id)
);
```

---

## 🔄 결재 흐름 및 테이블

### 🔁 문서 상태 설명

| 상태        | 설명                      |
| ----------- | ------------------------- |
| DRAFT       | 작성 중                   |
| IN_PROGRESS | 결재 흐름 시작 후 진행 중 |
| APPROVED    | 모든 단계 승인 완료       |
| REJECTED    | 중간 단계에서 반려됨      |

---

### 1️⃣ 문서 생성 및 결재 정책 선택

- 사용자가 결재 문서를 작성하고, 사전에 정의된 결재 정책을 선택합니다.
- 정책에 따라 문서의 결재 흐름이 결정됩니다.

📌 관련 테이블:

- `approval_documents`: 결재 문서 정보 저장
- `approval_policies`: 선택된 정책 저장

🧾 예시:

> "신규 프로젝트 예산 승인" 문서를 생성하고,  
> "프로젝트 예산 정책"을 선택

---

### 2️⃣ 정책 기반으로 결재 단계 자동 생성

- 선택된 정책의 결재 단계 정의(`approval_policy_steps`)를 기반으로  
  실제 결재 단계(`approval_steps`)가 자동 생성됩니다.
- 이때 각 단계에는 **결재자 역할만 지정되고**, **결재자는 아직 비어 있음**  
  (`approver_id` = `NULL`)

📌 관련 테이블:

- `approval_policy_steps`: 정책의 단계 정의 (역할/권한 기반)
- `approval_steps`: 실제 문서에 적용된 결재 단계 (초기에는 결재자 미지정)

🧾 예시:

> "프로젝트 예산 정책" →  
> `step_order = 1`: "팀장",  
> `step_order = 2`: "부장",  
> `step_order = 3`: "이사"

---

### 3️⃣ 결재자가 조건을 만족하고 결재 수행

- 각 단계는 현재 상태가 `PENDING`이고,  
  해당 역할에 부합하는 사용자가 결재를 수행할 수 있습니다.
- 사용자가 결재(승인/반려)를 수행하면,  
  그 시점에 해당 단계의 `approver_id`가 해당 사용자 ID로 기록됩니다.

📌 관련 테이블:

- `approval_steps`:

  - `status`: `APPROVED` or `REJECTED`
  - `approver_id`: 실제 결재한 사용자
  - `acted_at`: 결재 시간

- `users`: 역할 정보 참조용

🧾 예시:

> "팀장" 역할을 가진 사용자 A가 결재 수행 →  
> `approval_steps.approver_id` ← 사용자 A의 ID

---

### 4️⃣ 문서 상태 업데이트

- 모든 단계가 순서대로 승인되면 문서 상태는 `APPROVED`로 변경됩니다.
- 중간에 한 단계라도 반려되면 문서 상태는 `REJECTED`로 변경됩니다.

📌 관련 테이블:

- `approval_documents`: 문서의 최종 상태 업데이트
- `approval_steps`: 각 단계의 상태 판단 기준

🧾 예시:

> 모든 단계 승인 → 문서 상태: `APPROVED`  
> 중간 단계 반려 → 문서 상태: `REJECTED`

---

## 📊 특정 사용자가 처리해야 하는 결재 목록 조회

```sql
SET @user_id = 2;

SELECT ad.*
FROM approval_documents ad
JOIN approval_steps aps ON ad.id = aps.document_id
JOIN approval_policy_steps ps ON ps.policy_id = ad.policy_id AND ps.step_order = aps.step_order
WHERE aps.approver_id IS NULL
  AND aps.status = 'PENDING'
  AND ps.role = (SELECT role FROM users WHERE id = @user_id)
  AND NOT EXISTS (
    SELECT 1
    FROM approval_steps prev
    WHERE prev.document_id = ad.id
      AND prev.step_order < aps.step_order
      AND prev.status != 'APPROVED'
  );

```

## 🧪 테스트용 시드 데이터

`seed.sql` 파일에 포함된 샘플 데이터를 통해 검증할 수 있습니다.

1. 시드 데이터는 다음과 같은 샘플을 포함합니다:

   - **사용자**: 개발팀 4명(팀원, 팀장, 부장, 이사), 마케팅팀 4명(팀원, 팀장, 부장, 이사)
   - **결재 정책**: 프로젝트 예산 정책, 마케팅 캠페인 정책, 휴가 신청 정책
   - **결재 문서**:
     - 신규 프로젝트 예산 승인 요청
     - 모바일 앱 개발 예산 요청
     - 신규 마케팅 캠페인 승인 요청
     - 여름 휴가 신청
     - 겨울 휴가 신청

2. 위 조회 쿼리를 실행하여 특정 사용자가 처리해야 하는 결재 목록을 확인할 수 있습니다.
