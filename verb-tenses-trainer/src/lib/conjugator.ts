import { Aspect, ConjugatedResult, FutureMode, SentenceTemplate, Tense, Token, VerbForms } from '../domain/types';

export function conjugate(
  template: SentenceTemplate,
  verbs: Record<string, VerbForms>,
  tense: Tense,
  aspect: Aspect,
  futureMode: FutureMode
): ConjugatedResult {
  const verb = verbs[template.verbKey];
  const { subject } = template;
  const tokens: Token[] = [];

  // Subject
  tokens.push({ text: subject, kind: 'normal' });

  // Conjugation Logic
  const isProgressive = aspect.progressive;
  const isPerfect = aspect.perfect;

  // Warning check
  let warning: ConjugatedResult['warning'] = undefined;
  if (isProgressive) {
    if (template.restrictions?.progressiveBad || verb.progressiveAllowed === false) {
      warning = {
        code: "PROGRESSIVE_UNNATURAL",
        message: template.restrictions?.note || verb.notes || "この動詞は通常、進行形にしません。"
      };
    }
  }

  // --- Helpers ---
  const addSpace = () => { /* tokens implicitly spaced by renderer, but we just return tokens */ };
  const push = (text: string, kind: Token['kind'], highlight = false) => {
    tokens.push({ text, kind, highlight });
  };


  // --- Tense/Aspect State Machine ---

  // 1. Future Mode Helpers
  const isWill = futureMode === 'will';
  const isGoingTo = futureMode === 'goingTo';
  const isProgFuture = futureMode === 'progFuture'; // "I am meeting him"
  const isAboutTo = futureMode === 'aboutTo';

  // Determine the "Auxiliary Chain"
  // Order: [Modal/Future] -> [Perfect Have] -> [Progressive Be] -> [Main Verb]

  // === FUTURE ===
  if (tense === 'Future') {
    if (isProgFuture) {
      // Present Progressive for Future
      // e.g. I am meeting him tomorrow.
      // Treat this effectively as "Present + Progressive" but conceptually Future.
      // Usually perfect is NOT combined with this form in standard drills. 
      // User requested: "progFuture のとき perfect も無効化" -> assumed handled by UI, but if passed here, ignore Perfect?
      // Let's implement it as Present Progressive construction.

      const beForm = getBeForm(subject, 'Present');
      push(beForm, 'be', true);
      push(verb.ing, 'verb', true);

    } else if (isAboutTo) {
      // Be about to
      const beForm = getBeForm(subject, 'Present'); // I am about to...
      push(beForm, 'be', true);
      push('about to', 'aux', true);
      push(verb.base, 'verb', true);

    } else if (isGoingTo) {
      // Be going to
      const beForm = getBeForm(subject, 'Present');
      push(beForm, 'be', true);
      push('going to', 'aux', true);

      // Chain continues: [have] -> [be] -> [verb]
      if (isPerfect && isProgressive) {
        push('have', 'have', true);
        push('been', 'be', true);
        push(verb.ing, 'verb', true);
      } else if (isPerfect) {
        push('have', 'have', true);
        push(verb.pp, 'verb', true);
      } else if (isProgressive) {
        push('be', 'be', true);
        push(verb.ing, 'verb', true);
      } else {
        push(verb.base, 'verb', true);
      }

    } else {
      // Will
      push('will', 'aux', true);

      if (isPerfect && isProgressive) {
        push('have', 'have', true);
        push('been', 'be', true);
        push(verb.ing, 'verb', true);
      } else if (isPerfect) {
        push('have', 'have', true);
        push(verb.pp, 'verb', true);
      } else if (isProgressive) {
        push('be', 'be', true);
        push(verb.ing, 'verb', true);
      } else {
        push(verb.base, 'verb', true);
      }
    }

  }
  // === PAST ===
  else if (tense === 'Past') {
    if (isPerfect && isProgressive) {
      push('had', 'have', true);
      push('been', 'be', true);
      push(verb.ing, 'verb', true);
    } else if (isPerfect) {
      push('had', 'have', true);
      push(verb.pp, 'verb', true);
    } else if (isProgressive) {
      const beVal = getBeForm(subject, 'Past');
      push(beVal, 'be', true);
      push(verb.ing, 'verb', true);
    } else {
      // Simple Past
      // Subject agreement checks not usually needed for English main verbs except 'be', 
      // but our main verbs are action verbs.
      // BE verb as main verb? 'live' etc. 
      // If the MAIN VERB is 'be' (not supported in current list except maybe implicitly?), 
      // we'd need logic. But current verbs list doesn't have 'be'.
      push(verb.past, 'verb', true);
    }
  }
  // === PRESENT ===
  else { // Present
    if (isPerfect && isProgressive) {
      const haveVal = getHaveForm(subject);
      push(haveVal, 'have', true);
      push('been', 'be', true);
      push(verb.ing, 'verb', true);
    } else if (isPerfect) {
      const haveVal = getHaveForm(subject);
      push(haveVal, 'have', true);
      push(verb.pp, 'verb', true);
    } else if (isProgressive) {
      const beVal = getBeForm(subject, 'Present');
      push(beVal, 'be', true);
      push(verb.ing, 'verb', true);
    } else {
      // Simple Present
      // He/She/It rules
      const isThirdPerson = ['He', 'She', 'It'].includes(subject);
      if (isThirdPerson) {
        push(verb.third, 'verb', true);
      } else {
        push(verb.base, 'verb', true);
      }
    }
  }

  // Object / Complement
  if (template.object) push(template.object, 'normal');
  if (template.complement) push(template.complement, 'normal');
  if (template.prepPhrase) push(template.prepPhrase, 'normal');

  // Time
  let timeStr;
  if (tense === 'Future') timeStr = template.time?.future;
  else if (tense === 'Past') timeStr = template.time?.past;
  else timeStr = template.time?.present;

  if (timeStr) push(timeStr, 'normal');

  return { tokens, warning };
}

function getBeForm(subject: string, tense: 'Present' | 'Past'): string {
  if (tense === 'Present') {
    if (subject === 'I') return 'am';
    if (['He', 'She', 'It'].includes(subject)) return 'is';
    return 'are';
  } else {
    if (['I', 'He', 'She', 'It'].includes(subject)) return 'was';
    return 'were';
  }
}

function getHaveForm(subject: string): string {
  if (['He', 'She', 'It'].includes(subject)) return 'has';
  return 'have';
}
