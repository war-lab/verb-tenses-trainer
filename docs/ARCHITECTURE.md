# Verb Tenses Trainer Architecture & Pedagogy

## 1. "Learning 1st" Principles
This application is designed NOT just to generate correct English sentences, but to teach the **nuance** and **context** behind different tenses and aspects.

### Key Features:
- **Nuanced Future Selection**: `will` is not a single concept. Users can select from 4 distinct nuances (Decision, Offer, Promise, Prediction).
- **Interaction Constraints**: 
  - `be going to` vs `will` differentiation.
  - `progFuture` (Fixed plans) forces progressive aspect.
  - `aboutTo` (Immediate future) restricts complex aspects.
- **Polite Past (Distance)**: A dedicated mode for "psychological distance" in English, teaching that the past tense can refer to the present for politeness.
- **Usage Labels**: Standardized badges (e.g., `[Perfect:Result]`) to help students categorize concepts.
- **Split Compare**: Side-by-side comparison of curated contrasts (e.g., Simple Present vs Present Progressive).

## 2. Technical Design

### Data Layer
- **`src/data/sentences.ts`**: Uses a **Diff-based Override** pattern.
  - `lesson`: Base metadata.
  - `willNuances`: Overrides for specific `will` contexts.
  - `modeOverrides`: Overrides for `goingTo`, `aboutTo`, `progFuture`.
  - This allows a scalable data structure without duplicating entire lesson cards.

### Logic Layer
- **`src/lib/conjugator.ts`**: A pure functional engine that takes a template/verb/tense/aspect and produces a list of `Token`s.
- **`src/lib/rules.ts`**: A validation layer that generates warnings (e.g., state verbs in progressive).
- **`src/lib/lessonHelper.ts`**: Implements the merging logic for metadata overrides.

### UI Layer
- **Radix UI**: Used for complex components like `Sheet` (Bottom Sheet).
- **Framer Motion**: Used for smooth state transitions and highlight animations.
- **Tailwind CSS**: High-end mobile-first design with indigo-based accents.

## 3. Maintenance Notes for Future Developers
- **Adding Verbs**: Add to `src/data/verbs.ts`. Ensure `progressiveAllowed` is set correctly for state verbs.
- **Adding Sentences**: Add to `src/data/sentences.ts`. Always include `allowedFutureModes` and at least one curated `contrast` in the base `lesson`.
- **Modifying Grammar**: Update `src/lib/conjugator.ts` and ensure all tests in `src/lib/conjugator.test.ts` pass.
