// prisma/schema.prisma additions for moderation system

// Add these models to your existing schema.prisma file

enum ReportableType {
  MENTOR
  COURSE
  LEARNING_TRACK
  REVIEW
  COMMENT
  USER_PROFILE
}

enum ReportReason {
  SPAM
  INAPPROPRIATE
  MISLEADING
  HARASSMENT
  FAKE_INFO
  OTHER
}

enum ReportStatus {
  PENDING
  UNDER_REVIEW
  RESOLVED
  REJECTED
}

enum UserRole {
  USER
  MENTOR
  ADMIN
  MODERATOR
}

// Add to User model
model User {
  // ... existing fields
  role           UserRole        @default(USER)
  reports        Report[]        @relation("Reporter")
  reviewedReports Report[]       @relation("Moderator")
  createdAt      DateTime        @default(now())
  updatedAt      DateTime        @updatedAt
}

// New Report model
model Report {
  id              String         @id @default(uuid())
  reportableType  ReportableType
  reportableId    String
  reason          ReportReason
  description     String?
  status          ReportStatus   @default(PENDING)
  
  // Reporter
  reporterId      String
  reporter        User           @relation("Reporter", fields: [reporterId], references: [id])
  
  // Moderator actions
  reviewedBy      String?
  reviewer        User?          @relation("Moderator", fields: [reviewedBy], references: [id])
  reviewedAt      DateTime?
  resolution      String?
  resolutionNote  String?
  
  // Metadata
  priority        Int            @default(0) // Auto-calculated based on reason/type
  reportedCount   Int            @default(1) // For duplicate reports
  
  createdAt       DateTime       @default(now())
  updatedAt       DateTime       @updatedAt
  
  @@index([reportableType, reportableId])
  @@index([status])
  @@index([createdAt])
  @@index([priority])
}

// Optional: ModerationLog for audit trail
model ModerationLog {
  id          String   @id @default(uuid())
  action      String   // APPROVED, REJECTED, FLAGGED, ESCALATED
  reportId    String
  moderatorId String
  reason      String?
  metadata    Json?    // Additional context
  createdAt   DateTime @default(now())
  
  @@index([reportId])
  @@index([moderatorId])
  @@index([createdAt])
}
