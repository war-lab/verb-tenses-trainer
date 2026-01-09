import classNames from 'classnames';
import { ConjugatedResult } from '../domain/types';

type Props = {
  result: ConjugatedResult;
};

export function GeneratedSentence({ result }: Props) {
  const { tokens, warning } = result;

  return (
    <div className="my-8">
      <div className="text-3xl md:text-4xl font-serif text-center py-6 leading-relaxed">
        {tokens.map((token, index) => (
          <span
            key={index}
            className={classNames(
              'token',
              token.highlight && 'highlight',
              token.highlight && `kind-${token.kind}`
            )}
          >
            {token.text}
          </span>
        ))}
      </div>

      {warning && (
        <div className="warning-box justify-center">
          <span className="font-bold">⚠️ Warning:</span>
          <span>{warning.message}</span>
        </div>
      )}
    </div>
  );
}
