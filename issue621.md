Title
Implement Resource Search Bar

Status: ✅ RESOLVED

Description
Add search input below hero section.

Requirements
Rounded search input
Search icon inside input
Placeholder text
Responsive width
Controlled input state
Acceptance Criteria
Clean styling
Input state functional

Resolution
- Created HeroSearchBar client component (components/resources/HeroSearchBar.tsx) with a real functional search input styled for the hero gradient
- Replaced the decorative-only search prompt in HeroSection with the new HeroSearchBar
- Updated ResourceSearchBar to read URL search params so it stays in sync with hero searches
- Fixed </div> → </main> tag mismatch in resources/page.tsx
- Added aria-labels to distinguish the two search landmarks

