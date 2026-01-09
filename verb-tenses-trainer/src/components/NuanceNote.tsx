type Props = {
  nuance: string;
};

export function NuanceNote({ nuance }: Props) {
  return (
    <div className="mt-4 p-4 border-l-4 border-gray-300 bg-gray-50 text-gray-700 italic">
      <h4 className="text-sm font-bold text-gray-500 not-italic mb-1">ニュアンス・イメージ</h4>
      <p className="text-lg">“{nuance}”</p>
    </div>
  );
}
