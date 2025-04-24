--특정 사용자가 처리해야 하는 결재 목록 조회
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
