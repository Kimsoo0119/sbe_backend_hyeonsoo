-- 사용자 테이블
CREATE TABLE users (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  department VARCHAR(100),
  role VARCHAR(100), -- 예: 팀원, 팀장, 부장 등
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 결재 정책 테이블 (부서/안건별 정책 정의)
CREATE TABLE approval_policies (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  description TEXT
);

-- 정책에 따른 역할 기반 결재 단계 정의
CREATE TABLE approval_policy_steps (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  policy_id BIGINT NOT NULL,
  role VARCHAR(100) NOT NULL,
  step_order INT NOT NULL,
  FOREIGN KEY (policy_id) REFERENCES approval_policies(id)
);

-- 결재 문서 테이블
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

-- 실제 결재 단계 (문서 생성 시 정책을 기반으로 생성됨)
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
