# Verb Tenses Trainer Architecture & Pedagogy

## 1. "Learning 1st" Principles
This application is designed NOT just to generate correct English sentences, but to teach the **nuance** and **context** behind different tenses and aspects.

### Key Features:
- **Tense-Aspect Matrix Pedagogy**: Instead of treating tenses and aspects as separate toggles, the app treats them as a **12-cell matrix (3 Tenses x 4 Aspects)**. Every combination can have its own situational nuance, natural translation, and pedagogical explanation.
- **Nuanced Future Selection**: `will` is not a single concept. Users can select from 4 distinct nuances (Decision, Offer, Promise, Prediction). This is the "3rd dimension" of the matrix for the Future tense.
- **Interaction Constraints**: 
  - `be going to` vs `will` differentiation.
  - `progFuture` (Fixed plans) forces progressive aspect by default, but supports the full aspect matrix where appropriate.
  - `aboutTo` (Immediate future) focuses on the imminent start of an action.

### Philosophy: "Context over Conjugation"
Background: Most Japanese English education focuses on "formulaic" conjugation (e.g., `will` + base verb).
Aim: This app aims to shift the focus to **Contextual Choice**. By showing that "Future Perfect" isn't just a grammatical formula but a way to express specific completion-by-deadline, we help learners build a mental map of English time-flow.
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
- [x] **Training Mode**: Implemented "Learning 1st" practice mode with SRS and quality gates.
- [ ] **Voice Synthesis**: Integrate browser Web Speech API for auditory learning.
- [ ] **Dark Mode Refinement**: Ensure custom controls like the `Tense` toggle have high-contrast active states in dark mode.
- **Usage Labels**: Standardized badges (e.g., `[Perfect:Result]`) to help students categorize concepts.
- **Split Compare**: Side-by-side comparison of curated contrasts (e.g., Simple Present vs Present Progressive).

## 2. Technical Design

### Data Layer (Tense-Aspect Matrix)
- **`src/data/sentences.ts`**: Uses a **Hierarchical Override** pattern to implement the 12-cell matrix.
  - `lesson`: Global default metadata (usually Present Simple).
  - `tenseOverrides`: Tense-level overrides (Past, Future).
    - `aspectOverrides`: **Nested** overrides within a tense. This is the core of the matrix system, allowing "Future Perfect" to have completely different situational notes than "Present Perfect".
  - `willNuances` / `modeOverrides`: Refined overrides for the Future "3rd dimension".

### Logic Layer (Priority-aware Merging)
- **`src/lib/conjugator.ts`**: A pure functional engine that handles the full matrix of 12 combinations + Future Modes.
- **`src/lib/rules.ts`**: A validation layer that generates warnings (e.g., state verbs in progressive).
- **`src/lib/lessonHelper.ts`**: Implements the `getEffectiveLessonMeta` function.
  - **Merging Priority**: Tense Base -> Future Mode/Nuance -> Aspect Override.
  - This priority ensures that if a user selects an Aspect (like Perfect), its specific notes take precedence over the general Tense/Mode notes, preventing generic "will" explanations from obscuring specific "Future Perfect" pedagogy.

### Training Logic (Learning 1st)
- **`src/training/generator.ts`**: Generates questions **only** from high-quality metadata (Quality Gate). Programmatically generates "Acceptable" answers for Future nuances (e.g., `will` prediction vs `goingTo`).
- **`src/training/grader.ts`**: Prioritizes `ruleOfThumbJa` for immediate "Rule of Thumb" feedback. Calculates Diff Badges to confirm exactly which parameter (Tense/Aspect/Mode) was wrong.
- **`src/training/scheduler.ts`**: A Lightweight SRS (Spaced Repetition System).
  - Wrong/Acceptable: Short intervals (1m / 3m).
  - Correct (Streak 1): **Short Review (10m)** to confirm "short-term memory encoding".
  - Correct (Streak 2+): Exponential spacing (4h, 16h...).

### UI Layer
- **Radix UI**: Used for complex components like `Sheet` (Bottom Sheet).
- **Framer Motion**: Used for smooth state transitions and highlight animations.
- **Tailwind CSS**: High-end mobile-first design with indigo-based accents.

## 3. Maintenance Notes for Future Developers
- **Adding Verbs**: Add to `src/data/verbs.ts`. Ensure `progressiveAllowed` is set correctly for state verbs.
- **Adding Sentences**: Add to `src/data/sentences.ts`. Always include `allowedFutureModes` and at least one curated `contrast` in the base `lesson`.
- **Modifying Grammar**: Update `src/lib/conjugator.ts` and ensure all tests in `src/lib/conjugator.test.ts` pass.
