# Report System - Quick Start Guide

## Installation ✅

No installation needed! All components are ready to use.

## Quick Implementation (3 Steps)

### Step 1: Import the Component

```tsx
import { ReportButton } from '@/components/moderation';
```

### Step 2: Add to Your Card/Listing

```tsx
// In any card or listing component
<article className="group">
  {/* Report button appears on hover */}
  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
    <ReportButton
      reportableType="learning_track"
      reportableId={track.id}
      reportableTitle={track.title}
      variant="icon"
      size="sm"
    />
  </div>
  
  {/* ...rest of your card */}
</article>
```

### Step 3: Done! 🎉

The report dialog will automatically appear when users click the button.

---

## Props Cheat Sheet

| Prop | Value | When to Use |
|------|-------|-------------|
| `reportableType` | `'mentor'`, `'course'`, `'learning_track'`, `'review'`, `'comment'`, `'user_profile'` | What's being reported |
| `reportableId` | Any string ID | Unique identifier |
| `reportableTitle` | Display name | Helps user identify what they're reporting |
| `variant` | `'icon'` (default), `'text'`, `'link'` | Button style |
| `size` | `'sm'`, `'md'` (default), `'lg'` | Button size |

---

## Common Patterns

### Pattern 1: Icon in Card Corner (Most Common)

```tsx
<article className="group relative">
  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 z-10">
    <ReportButton
      reportableType="mentor"
      reportableId={mentor.id.toString()}
      reportableTitle={mentor.name}
      size="sm"
    />
  </div>
  {/* Card content... */}
</article>
```

### Pattern 2: Text Button in Actions

```tsx
<div className="flex gap-4 mt-4">
  <button>Book Session</button>
  <ReportButton
    reportableType="mentor"
    reportableId={mentor.id.toString()}
    variant="text"
  />
</div>
```

### Pattern 3: Inline Link

```tsx
<p className="text-sm text-gray-500">
  Found an issue?{' '}
  <ReportButton
    reportableType="course"
    reportableId={course.id}
    variant="link"
  />
</p>
```

---

## Examples by Content Type

### Report Mentor

```tsx
<ReportButton
  reportableType="mentor"
  reportableId={mentorId}
  reportableTitle={mentorName}
/>
```

### Report Course

```tsx
<ReportButton
  reportableType="course"
  reportableId={courseId}
  reportableTitle={courseTitle}
/>
```

### Report Learning Track

```tsx
<ReportButton
  reportableType="learning_track"
  reportableId={trackId}
  reportableTitle={trackTitle}
/>
```

### Report Review

```tsx
<ReportButton
  reportableType="review"
  reportableId={reviewId}
  reportableTitle={`Review by ${userName}`}
/>
```

### Report Comment

```tsx
<ReportButton
  reportableType="comment"
  reportableId={commentId}
  reportableTitle={`Comment by ${userName}`}
/>
```

---

## Customizing the Dialog

### With Custom Submission Handler

```tsx
<ReportButton
  reportableType="mentor"
  reportableId={id}
  onSubmit={async (report) => {
    // Your custom API call
    await fetch('/api/reports', {
      method: 'POST',
      body: JSON.stringify(report),
    });
  }}
  onReportSubmitted={(reportId) => {
    // Show success notification
    toast.success(`Report submitted: ${reportId}`);
  }}
/>
```

---

## Styling Tips

### Always Visible (Not Just on Hover)

```tsx
<ReportButton
  reportableType="mentor"
  reportableId={id}
  className="opacity-100" // Remove opacity transitions
/>
```

### Custom Size

```tsx
<ReportButton
  reportableType="mentor"
  reportableId={id}
  size="lg" // Larger button
/>
```

### Different Variants

```tsx
// Icon only
<ReportButton variant="icon" />

// Text with icon
<ReportButton variant="text" />

// Simple link
<ReportButton variant="link" />
```

---

## Testing Locally

Create a test page:

```tsx
// app/test-reports/page.tsx
import { ReportButton } from '@/components/moderation';

export default function TestReports() {
  return (
    <div className="p-8 space-y-8">
      <h1>Report System Test</h1>
      
      {/* Icon variants */}
      <div className="space-y-4">
        <h2>Icon Sizes</h2>
        <div className="flex gap-4">
          <ReportButton reportableType="mentor" reportableId="1" size="sm" />
          <ReportButton reportableType="mentor" reportableId="2" size="md" />
          <ReportButton reportableType="mentor" reportableId="3" size="lg" />
        </div>
      </div>
      
      {/* Text variant */}
      <div className="space-y-4">
        <h2>Text Variant</h2>
        <ReportButton 
          reportableType="course" 
          reportableId="4" 
          variant="text"
          reportableTitle="Test Course"
        />
      </div>
      
      {/* Link variant */}
      <div className="space-y-4">
        <h2>Link Variant</h2>
        <ReportButton 
          reportableType="learning_track" 
          reportableId="5" 
          variant="link"
        />
      </div>
    </div>
  );
}
```

---

## Backend Setup (Optional)

If you want to actually save reports, create an API endpoint:

```typescript
// app/api/reports/route.ts
export async function POST(request: NextRequest) {
  const body = await request.json();
  
  // Save to database
  const report = await db.report.create({
    data: {
      reportableType: body.reportableType,
      reportableId: body.reportableId,
      reason: body.reason,
      description: body.description,
      status: 'pending',
    },
  });
  
  return Response.json({ success: true, reportId: report.id });
}
```

Then update the ReportButton:

```tsx
const handleSubmit = async (report) => {
  const response = await fetch('/api/reports', {
    method: 'POST',
    body: JSON.stringify(report),
  });
  const data = await response.json();
  onReportSubmitted?.(data.reportId);
};
```

---

## Troubleshooting

### Button not showing?
- Check if parent has `group` class for hover effects
- Ensure `opacity-0 group-hover:opacity-100` is applied correctly

### Dialog not opening?
- Verify `reportableType` and `reportableId` are provided
- Check browser console for errors

### TypeScript errors?
- Import types: `import type { ReportButtonProps } from '@/components/moderation';`

---

## Need More Help?

- 📖 Full Documentation: [`/docs/REPORT_SYSTEM.md`](/docs/REPORT_SYSTEM.md)
- 💻 Source Code: [`components/moderation/`](/components/moderation/)
- 📝 Types: [`types/report.ts`](/types/report.ts)

---

**That's it! Your report system is ready to use!** 🚀
