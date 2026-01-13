# Verb Tenses Trainer Architecture & Pedagogy

## 1. "Learning 1st" Principles
This application is designed NOT just to generate correct English sentences, but to teach the **nuance** and **context** behind different tenses and aspects.

### Key Features:
- **Nuanced Future Selection**: `will` is not a single concept. Users can select from 4 distinct nuances (Decision, Offer, Promise, Prediction).
- **Interaction Constraints**: 
  - `be going to` vs `will` differentiation.
  - `progFuture` (Fixed plans) forces progressive aspect.
  - `aboutTo` (Immediate future) restricts complex aspects.
## Maintenance & Future Expansion (Developer Guide)

### Adding New Verbs
1. Add the verb definition to `src/data/verbs.ts`.
2. Define the base, past, and past participle forms.
3. Set `progressiveAllowed: false` for state verbs (e.g., *know*, *like*).

### Adding New Sentence Templates
1. Add a new object to `src/data/sentences.ts`.
2. **Pedagogical Requirement**: Every template *must* include:
   - `jpLiteral`: A structure-preserving translation (e.g., "私はりんごを食べる").
   - `jpNatural`: How a native speaker would actually say it.
   - `whyJa`: A list of reasons for why this specific form is used.
3. **Future Nuances**: Use `willNuances` to provide context-specific explanations for `will` (Decision, Offer, Promise, Prediction).

### Overriding Logic
Use `modeOverrides` or `willNuances` in `SentenceTemplate` to override the default `LessonMeta`. This is useful when a specific tense carries a special meaning for a particular context (e.g., using Progressive for a planned meeting).

### Design Philosophy for Antigravity (Future Assistant)
> [!IMPORTANT]
> **Learning 1st**: UI updates must prioritize pedagogy. If a layout change makes an explanation harder to read, it's a regression.
> **Compactness**: The UI is designed to minimize vertical scrolling on mobile so the "Generate" and "Control" sections remain visible simultaneously.
> **Basename Routing**: The app is configured for GitHub Pages with `base: "/verb-tenses-trainer/"`. Ensure `BrowserRouter` always uses this basename.

---

## Technical Debt & Roadmap
- [ ] **Quiz Mode**: Implement a mode where the English sentence is hidden until a choice is made.
- [ ] **Voice Synthesis**: Integrate browser Web Speech API for auditory learning.
- [ ] **Dark Mode Refinement**: Ensure custom controls like the `Tense` toggle have high-contrast active states in dark mode.
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
