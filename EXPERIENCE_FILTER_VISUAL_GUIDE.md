# Experience Level Filter - Visual Guide

## Filter UI Components

### Desktop Sidebar View
```
┌────────────────────────────────────────┐
│ Filters                                │
├────────────────────────────────────────┤
│                                        │
│ Expertise                              │
│ ☐ Frontend  ☐ Backend  ☐ Full Stack  │
│ ☐ Mobile    ☐ DevOps   ☐ Data Science│
│                                        │
├────────────────────────────────────────┤
│ ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓  │
│ ┃ Experience Level                ┃  │
│ ┃                                 ┃  │
│ ┃ ☐ Junior                        ┃  │
│ ┃ ☑ Mid-Level          ← Selected ┃  │
│ ┃ ☑ Senior             ← Selected ┃  │
│ ┃ ☐ Executive                     ┃  │
│ ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛  │
│                                        │
├────────────────────────────────────────┤
│ Industry                               │
│ ☐ Technology  ☐ Finance  ☐ Healthcare│
│                                        │
└────────────────────────────────────────┘
```

### Mobile Filter Drawer
```
┌──────────────────────────────────────┐
│ Filters                          [×] │
├──────────────────────────────────────┤
│                                      │
│ Expertise                            │
│ [Frontend] [Backend] [Full Stack]    │
│                                      │
├──────────────────────────────────────┤
│ ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓ │
│ ┃ Experience Level              ┃ │
│ ┃                               ┃ │
│ ┃ [Junior] [Mid-Level✓] [Senior✓]┃ │
│ ┃ [Executive]                   ┃ │
│ ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛ │
│                                      │
├──────────────────────────────────────┤
│ Industry                             │
│ [Technology] [Finance] [Healthcare]  │
│                                      │
├──────────────────────────────────────┤
│                                      │
│ [Clear All Filters]                  │
│ [Apply Filters]                      │
│                                      │
└──────────────────────────────────────┘
```

## Checkbox States

### Unchecked (Default)
```
☐ Junior
  ^
  Empty checkbox, not selected
```

### Checked (Selected)
```
☑ Mid-Level
  ^
  Filled checkbox, selected
```

### Hover State
```
☐ Senior  ← Mouse over
  └─ Background: light gray
     Border: blue highlight
     Cursor: pointer
```

### Focus State (Keyboard)
```
[☐ Executive]
 └─ Blue ring around element
    Visible focus indicator
```

## Interaction Examples

### Example 1: No Selection (Default State)
```
Before:
┌─────────────────────┐
│ Experience Level    │
│ ☐ Junior            │
│ ☐ Mid-Level         │
│ ☐ Senior            │
│ ☐ Executive         │
└─────────────────────┘

URL: /mentors
Results: All mentors (no filter)
```

### Example 2: Single Selection
```
User clicks "Senior"

After:
┌─────────────────────┐
│ Experience Level    │
│ ☐ Junior            │
│ ☐ Mid-Level         │
│ ☑ Senior            │ ← Selected
│ ☐ Executive         │
└─────────────────────┘

URL: /mentors?experience=senior
Results: Only senior-level mentors
```

### Example 3: Multiple Selections
```
User clicks "Junior" then "Mid-Level"

After:
┌─────────────────────┐
│ Experience Level    │
│ ☑ Junior            │ ← Selected
│ ☑ Mid-Level         │ ← Selected
│ ☐ Senior            │
│ ☐ Executive         │
└─────────────────────┘

URL: /mentors?experience=junior&experience=mid-level
Results: Junior OR Mid-Level mentors
```

### Example 4: All Selected
```
User selects all options

After:
┌─────────────────────┐
│ Experience Level    │
│ ☑ Junior            │
│ ☑ Mid-Level         │
│ ☑ Senior            │
│ ☑ Executive         │
└─────────────────────┘

URL: /mentors?experience=junior&experience=mid-level&experience=senior&experience=executive
Results: All mentors (same as no filter)
```

### Example 5: Deselection
```
Before:
┌─────────────────────┐
│ Experience Level    │
│ ☑ Junior            │
│ ☑ Senior            │
│ ☐ Mid-Level         │
│ ☐ Executive         │
└─────────────────────┘

User clicks "Junior" to uncheck

After:
┌─────────────────────┐
│ Experience Level    │
│ ☐ Junior            │ ← Deselected
│ ☑ Senior            │
│ ☐ Mid-Level         │
│ ☐ Executive         │
└─────────────────────┘

URL: /mentors?experience=senior
Results: Only senior mentors
```

## Active Filter Display

### Desktop - No Filters
```
┌──────────────────────────────────────────────┐
│ Find Mentors  [156 mentors]    [Filters ▼]  │
└──────────────────────────────────────────────┘
```

### Desktop - With Experience Filter
```
┌──────────────────────────────────────────────────────────────┐
│ Find Mentors  [45 mentors]    [Filters ▼]                   │
│                                                               │
│ Active Filters: [Senior ×] [Executive ×]  [Clear all]       │
└──────────────────────────────────────────────────────────────┘
```

## Results Update Animation

### Before Filter Applied
```
┌─────────────────────────────────────────────┐
│ Mentor Results (156 total)                  │
├─────────────────────────────────────────────┤
│ ┌───────┐ ┌───────┐ ┌───────┐ ┌───────┐  │
│ │Card 1 │ │Card 2 │ │Card 3 │ │Card 4 │  │
│ │Junior │ │Senior │ │Mid-Lvl│ │Exec   │  │
│ └───────┘ └───────┘ └───────┘ └───────┘  │
│ ...and 152 more                            │
└─────────────────────────────────────────────┘
```

### During Filter (Loading)
```
┌─────────────────────────────────────────────┐
│ Mentor Results                              │
├─────────────────────────────────────────────┤
│                                             │
│            🔄 Loading...                    │
│                                             │
└─────────────────────────────────────────────┘
```

### After Filter Applied
```
┌─────────────────────────────────────────────┐
│ Mentor Results (45 total) - Senior only    │
├─────────────────────────────────────────────┤
│ ┌───────┐ ┌───────┐ ┌───────┐ ┌───────┐  │
│ │Card 1 │ │Card 2 │ │Card 3 │ │Card 4 │  │
│ │Senior │ │Senior │ │Senior │ │Senior │  │
│ └───────┘ └───────┘ └───────┘ └───────┘  │
│ ...and 41 more                             │
└─────────────────────────────────────────────┘
```

## Empty State

### No Mentors Match Filter
```
┌─────────────────────────────────────────────┐
│ Mentor Results                              │
├─────────────────────────────────────────────┤
│                                             │
│              😕                             │
│      No mentors found                       │
│                                             │
│  No mentors match your selected             │
│  experience level.                          │
│                                             │
│  Try adjusting your filters.                │
│                                             │
│      [Clear all filters]                    │
│                                             │
└─────────────────────────────────────────────┘
```

## Experience Badge on Mentor Card

```
┌─────────────────────────────────────┐
│ ┌──────┐                            │
│ │      │  John Doe                  │
│ │Photo │  Senior Software Engineer  │
│ │      │  ★ 4.8 · 250 sessions      │
│ └──────┘                            │
│                                     │
│ [Senior] ← Experience badge         │
│                                     │
│ Helping engineers grow...           │
│                                     │
│ [React] [TypeScript] [Leadership]   │
│                                     │
│ $150/hr          [View Profile]    │
└─────────────────────────────────────┘
```

## Color Coding

### Experience Level Colors
```
Junior:     bg-green-50    text-green-700
Mid-Level:  bg-blue-50     text-blue-700
Senior:     bg-purple-50   text-purple-700
Executive:  bg-red-50      text-red-700
```

### Checkbox Colors
```
Unchecked:  border-slate-300
Checked:    bg-indigo-600  text-white
Hover:      border-indigo-300  bg-indigo-50
Focus:      ring-indigo-500  ring-2
```

## Responsive Breakpoints

### Desktop (1024px+)
```
┌────────────┬─────────────────────────┐
│            │                         │
│  Sidebar   │   Mentor Cards          │
│  Filters   │   (3 columns)           │
│            │                         │
│ ┌────────┐ │ ┌────┐ ┌────┐ ┌────┐  │
│ │Experience│ │Card│ │Card│ │Card│  │
│ │☑ Senior │ │    │ │    │ │    │  │
│ └────────┘ │ └────┘ └────┘ └────┘  │
│            │                         │
└────────────┴─────────────────────────┘
```

### Tablet (768px - 1023px)
```
┌────────────┬──────────────────┐
│            │                  │
│  Sidebar   │   Mentor Cards   │
│  Filters   │   (2 columns)    │
│            │                  │
│ ┌────────┐ │ ┌────┐ ┌────┐  │
│ │Exp Lvl │ │ │Card│ │Card│  │
│ │☑ Senior│ │ │    │ │    │  │
│ └────────┘ │ └────┘ └────┘  │
└────────────┴──────────────────┘
```

### Mobile (<768px)
```
┌──────────────────────────┐
│ [Filters ▼] Active: 1    │
├──────────────────────────┤
│                          │
│  Mentor Cards            │
│  (1 column)              │
│                          │
│  ┌────────────────────┐ │
│  │                    │ │
│  │  Mentor Card       │ │
│  │                    │ │
│  └────────────────────┘ │
│                          │
│  ┌────────────────────┐ │
│  │                    │ │
│  │  Mentor Card       │ │
│  │                    │ │
│  └────────────────────┘ │
└──────────────────────────┘
```

## Keyboard Navigation

```
Tab →
┌─────────────────────┐
│ Experience Level    │
│ [☐ Junior]     ← Focus on first
│  ☐ Mid-Level        │
│  ☐ Senior           │
│  ☐ Executive        │
└─────────────────────┘

Tab →
┌─────────────────────┐
│ Experience Level    │
│  ☐ Junior           │
│ [☐ Mid-Level]  ← Focus moved
│  ☐ Senior           │
│  ☐ Executive        │
└─────────────────────┘

Space ↓
┌─────────────────────┐
│ Experience Level    │
│  ☐ Junior           │
│ [☑ Mid-Level]  ← Checked!
│  ☐ Senior           │
│  ☐ Executive        │
└─────────────────────┘
```

## Screen Reader Announcement

```
User navigates to filter:
"Experience Level, heading level 3"

User focuses on checkbox:
"Filter by Junior experience level, checkbox, not checked"

User checks the box:
"Filter by Junior experience level, checkbox, checked"

Results update:
"Showing 25 mentors"
```

## Animation Timeline

```
0ms   - User clicks checkbox
10ms  - Checkbox visual updates
20ms  - State change triggered
50ms  - URL updated
100ms - API call initiated
500ms - Results received
600ms - Results rendered
700ms - Animation complete
```

## Visual States Summary

| State | Visual | Color |
|-------|--------|-------|
| Default | ☐ | border-slate-300 |
| Hover | ☐ (highlighted) | border-indigo-300, bg-indigo-50 |
| Focus | [☐] (ring) | ring-indigo-500 |
| Checked | ☑ | bg-indigo-600, text-white |
| Disabled | ☐ (grayed) | opacity-50, cursor-not-allowed |

## Integration with Other Filters

### Combined Filter Display
```
┌─────────────────────────────────────────────────┐
│ Active Filters:                                 │
│                                                 │
│ Expertise: [Frontend ×]                        │
│ Experience: [Senior ×] [Executive ×]           │
│ Industry: [Technology ×]                       │
│ Rating: 4.5+                                   │
│                                                 │
│ [Clear all]                                    │
└─────────────────────────────────────────────────┘
```

## URL Query Examples

```
Single:
/mentors?experience=senior

Multiple:
/mentors?experience=junior&experience=senior

Combined:
/mentors?experience=senior&expertise=Frontend&minRating=4.5

With Pagination:
/mentors?experience=senior&page=2&limit=12
```
