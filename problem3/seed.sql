--테스트용 시드입니다.
-- 사용자 시드
INSERT INTO users (name, department, role) VALUES
('홍길동', '개발팀', '팀원'),
('김팀장', '개발팀', '팀장'),
('박부장', '개발팀', '부장'),
('이이사', '개발팀', '이사'),
('최사원', '마케팅팀', '팀원'),
('정팀장', '마케팅팀', '팀장'),
('강부장', '마케팅팀', '부장'),
('유이사', '마케팅팀', '이사');

-- 추가 결재 정책 시드
INSERT INTO approval_policies (name, description) VALUES
('프로젝트 예산 정책', '신규 프로젝트 예산 승인 시 사용되는 정책'),
('마케팅 캠페인 정책', '마케팅 캠페인 실행 시 사용되는 정책'),
('휴가 신청 정책', '휴가 신청 시 사용되는 정책');

-- 정책 단계 시드 (팀장 → 부장 → 이사 순)
INSERT INTO approval_policy_steps (policy_id, role, step_order) VALUES
(1, '팀장', 1),
(1, '부장', 2),
(1, '이사', 3),
(2, '팀장', 1),
(2, '부장', 2),
(3, '팀장', 1);

-- 결재 문서 시드
INSERT INTO approval_documents (title, content, creator_id, policy_id, status) VALUES
('신규 프로젝트 예산 승인 요청', '신규 프로젝트에 필요한 예산 요청입니다.', 1, 1, 'IN_PROGRESS'),
('모바일 앱 개발 예산 요청', '모바일 앱 개발을 위한 예산 요청입니다.', 1, 1, 'IN_PROGRESS'),
('신규 마케팅 캠페인 승인 요청', '다가오는 시즌 마케팅 캠페인 계획입니다.', 5, 2, 'IN_PROGRESS'),
('여름 휴가 신청', '7월 1일부터 7월 5일까지 휴가를 신청합니다.', 1, 3, 'IN_PROGRESS'),
('겨울 휴가 신청', '12월 24일부터 12월 31일까지 휴가를 신청합니다.', 5, 3, 'IN_PROGRESS');

-- 실제 결재 단계 시드 (처음엔 approver_id 비워두기)
INSERT INTO approval_steps (document_id, approver_id, step_order, status) VALUES
-- 문서 1 (신규 프로젝트 예산)의 결재 단계
(1, NULL, 1, 'PENDING'),
(1, NULL, 2, 'PENDING'),
(1, NULL, 3, 'PENDING'),

-- 문서 2 (모바일 앱 개발 예산)의 결재 단계
(2, NULL, 1, 'PENDING'),
(2, NULL, 2, 'PENDING'),
(2, NULL, 3, 'PENDING'),

-- 문서 3 (마케팅 캠페인)의 결재 단계
(3, NULL, 1, 'PENDING'),
(3, NULL, 2, 'PENDING'),

-- 문서 4 (여름 휴가)의 결재 단계
(4, NULL, 1, 'PENDING'),

-- 문서 5 (겨울 휴가)의 결재 단계
(5, NULL, 1, 'PENDING');
