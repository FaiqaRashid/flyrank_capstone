# Project Rules

## Stack
- HTML5, CSS3, JavaScript (vanilla)
- Git version control, Conventional Commits for all commit messages

## Conventions
- Semantic HTML, mobile-first CSS
- Small, clearly named functions
- Comment only non-obvious logic

## AI assistant notes
- Briefly explain non-trivial changes before applying
- Prefer readable code over clever one-liners — I'm still learning

## Rules learned from FE-04 comparison
- Password validation must check uppercase, lowercase, and numeric requirements as separate conditions, not one combined regex
- Every form must ship with automated validator tests, not just manual click-through checks
- Trim leading/trailing whitespace on name and email fields before validating
- Before accepting AI-generated changes, diff against the previous state to catch unrelated file deletions/modifications