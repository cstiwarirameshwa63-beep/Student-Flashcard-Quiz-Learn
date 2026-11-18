# Security Specification & Threat Model

## 1. Data Invariants
1. **Strict Single-Admin Email Governance**: Only the verified Google account `cs.tiwarirameshwa63@gmail.com` (`request.auth.token.email_verified == true && request.auth.token.email == 'cs.tiwarirameshwa63@gmail.com'`) holds admin privileges. No database document can grant admin privileges to another account.
2. **Student Profile Ownership & Role Integrity**: A student profile `/students/{studentId}` can only be created when `studentId == request.auth.uid`, `email == request.auth.token.email`, `email_verified == true`, and `role == 'student'` (unless the caller is the verified admin email). Only the admin can delete `/students/{studentId}` records.
3. **Quiz Attempt Relational Consistency & Deletion Boundaries**: Every `/quizAttempts/{attemptId}` document must reference an existing `/students/{request.auth.uid}` document, set `studentUid == request.auth.uid`, have `0 <= score <= total <= 100`, and use `createdAt == request.time`. Only the verified admin email can view or delete all students' records; students can read and delete only their own quiz history (`studentUid == request.auth.uid`).
4. **Public Published Flashcards & Admin-Only Editing**: Guests and students may read published `/modules/{moduleId}` (`isPublished == true`) to study flashcards on the public homepage. Only the verified admin email (`cs.tiwarirameshwa63@gmail.com`) may create, update, or delete `/modules/{moduleId}` flashcards or overrides.
5. **Strict Key & Size Boundaries**: Every write validates exact allowed/required keys (`hasAll` + `hasOnly`), type safety, string lengths, and ID format (`^[a-zA-Z0-9_\-]+$`).

## 2. The "Dirty Dozen" Attack Payloads (All Must Return PERMISSION_DENIED)
1. **Self-Assigned Admin Escalation**: Student creates `/students/{uid}` with `role: "admin"`.
2. **Profile Role Mutation**: Student updates `/students/{uid}` with `role: "admin"` or ghost field `isAdmin: true`.
3. **Email Spoofing**: Caller with `email_verified: false` claims `cs.tiwarirameshwa63@gmail.com` to read all students or edit flashcards.
4. **Cross-Student PII Read**: Student A attempts `get` or `list` on Student B's `/students/{studentB}` or `/quizAttempts` without `studentUid == auth.uid`.
5. **Quiz Attempt Ownership Spoofing**: Student A creates `/quizAttempts/{id}` with `studentUid: "studentB"`.
6. **Orphaned Quiz Attempt**: User without a `/students/{uid}` profile attempts to write `/quizAttempts/{id}`.
7. **Score Tampering / Out-of-Bounds**: Student creates `/quizAttempts/{id}` with `score: 50, total: 7` or `score: -1`.
8. **Immutable Quiz Log Tampering**: Student attempts to `update` an existing `/quizAttempts/{id}` to raise their score.
9. **Unauthorized Deletion**: Student A attempts to delete Student B's `/quizAttempts/{id}` or any `/students/{id}` or `/modules/{id}` document.
10. **ID Poisoning (Denial of Wallet)**: Caller writes to `/quizAttempts/{1500_char_id}` or uses invalid characters in doc ID.
11. **Shadow / Ghost Field Injection**: Caller adds `extraField: "hack"` on `/students/{uid}`, `/quizAttempts/{id}`, or `/modules/{id}`.
12. **Unauthorized Module / Flashcard Defacement**: Non-admin student or guest attempts to create, update, or delete `/modules/es-essentials_Beginner`.
