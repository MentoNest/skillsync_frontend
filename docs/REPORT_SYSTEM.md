# Listing Report/Flag System

A comprehensive content moderation system allowing users to report inappropriate listings, mentors, courses, and other platform content.

## Features

✅ **Report Dialog** - User-friendly modal for submitting detailed reports  
✅ **Report Button** - Multiple variants (icon, text, link) for different contexts  
✅ **Multiple Report Reasons** - Predefined categories for accurate reporting  
✅ **Type-Safe** - Full TypeScript support with strict typing  
✅ **Accessible** - ARIA compliant with keyboard navigation  
✅ **Responsive Design** - Works seamlessly across all devices  
✅ **Easy Integration** - Drop-in components for any listing type  

## Component Structure

```
components/moderation/
├── ReportDialog.tsx      # Modal dialog for report submission
├── ReportButton.tsx      # Trigger button component
└── index.ts              # Barrel exports

types/
└── report.ts             # Type definitions and interfaces
```

## Types & Interfaces

### Reportable Content Types

```typescript
type ReportableType = 
  | 'mentor'
  | 'course'
  | 'learning_track'
  | 'review'
  | 'comment'
  | 'user_profile';
```

### Report Reasons

```typescript
enum ReportReason {
  SPAM = 'spam',               // Misleading or repetitive content
  INAPPROPRIATE = 'inappropriate', // Offensive or harmful content
  MISLEADING = 'misleading',   // False or deceptive information
  HARASSMENT = 'harassment',   // Bullying or threatening behavior
  FAKE_INFO = 'fake_info',     // Impersonation or false credentials
  OTHER = 'other',             // Something else
}
```

### Report Status

```typescript
enum ReportStatus {
  PENDING = 'pending',         // Awaiting review
  UNDER_REVIEW = 'under_review', // Being investigated
  RESOLVED = 'resolved',       // Action taken
  REJECTED = 'rejected',       // No action needed
}
```

## Usage

### Basic Implementation

```tsx
import { ReportButton } from '@/components/moderation';

// Icon variant (default)
<ReportButton
  reportableType="mentor"
  reportableId={mentor.id.toString()}
  reportableTitle={mentor.name}
/>

// Text variant
<ReportButton
  reportableType="course"
  reportableId={course.id}
  reportableTitle={course.title}
  variant="text"
/>

// Link variant
<ReportButton
  reportableType="learning_track"
  reportableId={track.id}
  variant="link"
/>
```

### Advanced Usage with Callbacks

```tsx
<ReportButton
  reportableType="mentor"
  reportableId={mentorId}
  reportableTitle={mentorName}
  size="md"
  onReportSubmitted={(reportId) => {
    console.log('Report submitted:', reportId);
    // Show toast notification, refresh data, etc.
  }}
/>
```

### In Card Components

#### Mentor Cards

```tsx
// components/MentorDiscoverySection.tsx
import { ReportButton } from '@/components/moderation';

function MentorCard({ mentor }) {
  return (
    <div className="mentor-card group">
      <div className="card-header flex items-center gap-2">
        {/* Avatar, name, rating... */}
        
        {/* Report button appears on hover */}
        <div className="opacity-0 group-hover:opacity-100 transition-opacity">
          <ReportButton
            reportableType="mentor"
            reportableId={mentor.id.toString()}
            reportableTitle={mentor.name}
            variant="icon"
            size="sm"
          />
        </div>
      </div>
      {/* ...rest of card */}
    </div>
  );
}
```

#### Learning Track Cards

```tsx
// components/learning/LearningTrackCard.tsx
import { ReportButton } from '@/components/moderation';

function LearningTrackCard({ track }) {
  return (
    <article className="group relative">
      {/* Report button in top-right corner */}
      <div className="absolute top-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
        <ReportButton
          reportableType="learning_track"
          reportableId={track.id}
          reportableTitle={track.title}
          variant="icon"
          size="sm"
        />
      </div>
      
      {/* ...rest of card */}
    </article>
  );
}
```

### Using ReportDialog Directly

```tsx
import { ReportDialog } from '@/components/moderation';

function CustomReportTrigger() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsDialogOpen(true)}>
        Report Content
      </button>
      
      <ReportDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        reportableType="comment"
        reportableId={commentId}
        reportableTitle={`Comment by ${userName}`}
        onSubmit={async (report) => {
          // Submit to your backend
          await submitReportToAPI(report);
        }}
      />
    </>
  );
}
```

## Props Reference

### ReportButton

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `reportableType` | `ReportableType` | - | ✅ Yes | Type of content being reported |
| `reportableId` | `string` | - | ✅ Yes | Unique identifier of the content |
| `reportableTitle` | `string` | - | ❌ No | Human-readable title/name |
| `variant` | `'icon' \| 'text' \| 'link'` | `'icon'` | ❌ No | Button display style |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | ❌ No | Button size |
| `className` | `string` | `''` | ❌ No | Additional CSS classes |
| `onReportSubmitted` | `(reportId: string) => void` | - | ❌ No | Callback after successful submission |

### ReportDialog

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `isOpen` | `boolean` | - | ✅ Yes | Controls dialog visibility |
| `onClose` | `() => void` | - | ✅ Yes | Callback when dialog closes |
| `reportableType` | `ReportableType` | - | ✅ Yes | Type of content being reported |
| `reportableId` | `string` | - | ✅ Yes | Unique identifier |
| `reportableTitle` | `string` | - | ❌ No | Displayed in dialog header |
| `onSubmit` | `(report: ReportSubmission) => Promise<void>` | - | ❌ No | Custom submission handler |

## Report Reasons Explained

### 1. Spam
**Use when:** Content is promotional, repetitive, or misleading about its purpose.

**Examples:**
- Duplicate comments across multiple posts
- Promotional content disguised as genuine interaction
- Bot-generated messages

### 2. Inappropriate
**Use when:** Content is offensive, explicit, or violates community guidelines.

**Examples:**
- Profanity or explicit language
- Hate speech or discriminatory content
- Sexually explicit material

### 3. Misleading
**Use when:** Information is false, deceptive, or intentionally confusing.

**Examples:**
- False credentials or qualifications
- Deceptive course descriptions
- Manipulated images or media

### 4. Harassment
**Use when:** Behavior is threatening, bullying, or targeted abuse.

**Examples:**
- Threatening messages
- Personal attacks
- Coordinated harassment campaigns

### 5. Fake Information
**Use when:** Identity impersonation or fabricated credentials.

**Examples:**
- Pretending to be someone else
- False educational/professional claims
- Fabricated reviews or testimonials

### 6. Other
**Use when:** The issue doesn't fit other categories.

**Examples:**
- Copyright infringement
- Privacy violations
- Other policy violations

## Backend Integration

### API Endpoint Example

```typescript
// app/api/reports/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate report data
    const { reportableType, reportableId, reason, description } = body;
    
    if (!reportableType || !reportableId || !reason) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    // Create report in database
    const report = await db.report.create({
      data: {
        reportableType,
        reportableId,
        reason,
        description,
        reporterId: getCurrentUserId(), // Your auth logic
        status: 'pending',
      },
    });
    
    // Optionally notify moderators
    await notifyModerators(report);
    
    return NextResponse.json({ 
      success: true, 
      reportId: report.id 
    });
  } catch (error) {
    console.error('Report submission error:', error);
    return NextResponse.json(
      { error: 'Failed to submit report' },
      { status: 500 }
    );
  }
}
```

### Database Schema Example

```prisma
// schema.prisma
model Report {
  id             String       @id @default(uuid())
  reportableType ReportableType
  reportableId   String
  reason         ReportReason
  description    String?
  status         ReportStatus @default(PENDING)
  reporterId     String
  reporter       User         @relation(fields: [reporterId], references: [id])
  reviewedBy     String?
  reviewedAt     DateTime?
  resolution     String?
  createdAt      DateTime     @default(now())
  updatedAt      DateTime     @updatedAt
  
  @@index([reportableType, reportableId])
  @@index([status])
  @@index([createdAt])
}

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
```

### Updated ReportButton with API Call

```tsx
const handleSubmitReport = async (report: ReportSubmission) => {
  try {
    const response = await fetch('/api/reports', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(report),
    });
    
    if (!response.ok) throw new Error('Failed to submit report');
    
    const data = await response.json();
    
    if (onReportSubmitted) {
      onReportSubmitted(data.reportId);
    }
  } catch (error) {
    console.error('Report submission error:', error);
    throw error;
  }
};
```

## Accessibility Features

- ✅ **Keyboard Navigation**: Full tab support with Escape to close
- ✅ **ARIA Labels**: Proper labeling for screen readers
- ✅ **Focus Management**: Focus trapped within dialog when open
- ✅ **High Contrast**: Clear visual distinction for interactive elements
- ✅ **Error Messages**: Clear feedback for invalid submissions

## Styling Options

### Custom Button Styles

```tsx
<ReportButton
  reportableType="mentor"
  reportableId={id}
  className="custom-report-button hover:bg-red-50"
  size="lg"
/>
```

### Custom Dialog Styling

Modify `ReportDialog.tsx` to match your design system:

```tsx
<div className="bg-white rounded-2xl shadow-2xl">
  {/* Change rounded-2xl to rounded-lg, rounded-xl, etc. */}
</div>
```

## Best Practices

### 1. Always Provide Context
```tsx
// ✅ Good
<ReportButton
  reportableType="mentor"
  reportableId={mentor.id.toString()}
  reportableTitle={mentor.name}
/>

// ❌ Bad - Missing title for user context
<ReportButton
  reportableType="mentor"
  reportableId={mentor.id.toString()}
/>
```

### 2. Use Appropriate Variants
```tsx
// Card headers - icon variant
<ReportButton variant="icon" size="sm" />

// Footer actions - text variant
<ReportButton variant="text" />

// Inline links - link variant
<ReportButton variant="link" />
```

### 3. Handle Submission Feedback
```tsx
<ReportButton
  onReportSubmitted={(reportId) => {
    // Show success toast
    toast.success('Report submitted successfully');
    
    // Log analytics
    analytics.track('content_reported', { reportId });
  }}
/>
```

### 4. Respect User Privacy
```tsx
// Don't require authentication info in frontend
// Let backend handle user identification from session
await onSubmit({
  reportableType,
  reportableId,
  reason,
  description,
  // reporterId handled by backend
});
```

## Testing

### Unit Tests

```tsx
// __tests__/ReportButton.test.tsx
import { render, screen } from '@testing-library/react';
import ReportButton from '../components/moderation/ReportButton';

describe('ReportButton', () => {
  it('renders icon button by default', () => {
    render(
      <ReportButton
        reportableType="mentor"
        reportableId="123"
      />
    );
    
    const button = screen.getByRole('button', {
      name: /report this mentor/i
    });
    expect(button).toBeInTheDocument();
  });

  it('opens dialog on click', async () => {
    render(
      <ReportButton
        reportableType="course"
        reportableId="456"
        reportableTitle="Test Course"
      />
    );
    
    const button = screen.getByRole('button');
    await userEvent.click(button);
    
    expect(screen.getByText(/report content/i)).toBeInTheDocument();
  });
});
```

## Troubleshooting

### Issue: Dialog doesn't close after submission
**Solution**: Ensure `onClose` prop is properly passed and called

### Issue: Report button not visible
**Solution**: Check parent element has `group` class for hover effects

### Issue: TypeScript errors
**Solution**: Import types correctly:
```tsx
import type { ReportButtonProps } from '@/components/moderation';
```

## Future Enhancements

- [ ] Anonymous reporting option
- [ ] Report history for users
- [ ] Moderator dashboard for reviewing reports
- [ ] Automated content flagging
- [ ] Report priority scoring
- [ ] Multi-language support
- [ ] Email notifications for report updates
- [ ] Report analytics dashboard

---

**Created**: March 29, 2026  
**Last Updated**: March 29, 2026  
**Status**: ✅ Production Ready
