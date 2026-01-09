import { VerbForms } from '../domain/types';

export const verbs: Record<string, VerbForms> = {
  go: { base: 'go', past: 'went', pp: 'gone', ing: 'going', third: 'goes' },
  eat: { base: 'eat', past: 'ate', pp: 'eaten', ing: 'eating', third: 'eats' },
  drive: { base: 'drive', past: 'drove', pp: 'driven', ing: 'driving', third: 'drives' },
  write: { base: 'write', past: 'wrote', pp: 'written', ing: 'writing', third: 'writes' },
  take: { base: 'take', past: 'took', pp: 'taken', ing: 'taking', third: 'takes' },
  make: { base: 'make', past: 'made', pp: 'made', ing: 'making', third: 'makes' },
  meet: { base: 'meet', past: 'met', pp: 'met', ing: 'meeting', third: 'meets' },
  build: { base: 'build', past: 'built', pp: 'built', ing: 'building', third: 'builds' },
  run: { base: 'run', past: 'ran', pp: 'run', ing: 'running', third: 'runs' },
  study: { base: 'study', past: 'studied', pp: 'studied', ing: 'studying', third: 'studies' },
  work: { base: 'work', past: 'worked', pp: 'worked', ing: 'working', third: 'works' },
  watch: { base: 'watch', past: 'watched', pp: 'watched', ing: 'watching', third: 'watches' },
  finish: { base: 'finish', past: 'finished', pp: 'finished', ing: 'finishing', third: 'finishes' },
  arrive: { base: 'arrive', past: 'arrived', pp: 'arrived', ing: 'arriving', third: 'arrives' },
  decide: { base: 'decide', past: 'decided', pp: 'decided', ing: 'deciding', third: 'decides' },
  live: { base: 'live', past: 'lived', pp: 'lived', ing: 'living', third: 'lives' },
  know: {
    base: 'know', past: 'knew', pp: 'known', ing: 'knowing', third: 'knows',
    progressiveAllowed: false,
    notes: '状態動詞'
  },
  have_own: {
    base: 'have', past: 'had', pp: 'had', ing: 'having', third: 'has',
    progressiveAllowed: false,
    notes: '所有のhave'
  },
  rain: { base: 'rain', past: 'rained', pp: 'rained', ing: 'raining', third: 'rains' },
  fall: { base: 'fall', past: 'fell', pp: 'fallen', ing: 'falling', third: 'falls' },
};
