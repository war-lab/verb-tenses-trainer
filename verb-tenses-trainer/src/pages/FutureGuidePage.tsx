export function FutureGuidePage() {
  return (
    <div className="max-w-3xl mx-auto prose prose-blue">
      <h2 className="text-3xl font-bold mb-8">未来表現の使い分けガイド</h2>

      <div className="card mb-8">
        <h3 className="text-xl font-bold text-blue-700 mb-2">1. will</h3>
        <p className="text-gray-700 font-bold mb-2">その場の判断 / 意志 / 予測</p>
        <p className="text-gray-600">「よし、やるぞ」と今決めたときや、なんとなくの予測。「心の動き」がメイン。</p>
        <ul className="list-disc ml-5 mt-2 text-gray-600">
          <li>I'll call you back. (今決めた)</li>
          <li>It will rain. (単なる予測)</li>
        </ul>
      </div>

      <div className="card mb-8">
        <h3 className="text-xl font-bold text-blue-700 mb-2">2. be going to</h3>
        <p className="text-gray-700 font-bold mb-2">事前に決まっていた計画 / 根拠のある予測</p>
        <p className="text-gray-600">すでに心づもりがあるとき。「向かっている」イメージ。</p>
        <ul className="list-disc ml-5 mt-2 text-gray-600">
          <li>I'm going to buy a car. (前から決めていた)</li>
          <li>Look at those clouds! It's going to rain. (雲という根拠がある)</li>
        </ul>
      </div>

      <div className="card mb-8">
        <h3 className="text-xl font-bold text-blue-700 mb-2">3. Present Progressive (Future)</h3>
        <p className="text-gray-700 font-bold mb-2">確定的な予定</p>
        <p className="text-gray-600">カレンダーに書き込まれているような、変更の余地が少ない予定。手配済み。</p>
        <ul className="list-disc ml-5 mt-2 text-gray-600">
          <li>I'm meeting him tomorrow at 10. (アポ取り済み)</li>
        </ul>
      </div>

      <div className="card mb-8">
        <h3 className="text-xl font-bold text-blue-700 mb-2">4. be about to</h3>
        <p className="text-gray-700 font-bold mb-2">〜する直前</p>
        <p className="text-gray-600">まさに今動き出そうとしている瞬間。</p>
      </div>
    </div>
  );
}
