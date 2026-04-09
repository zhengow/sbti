const {
  dimensionMeta,
  dimensionOrder,
  questions,
  normalTypes,
  typeLibrary,
  dimExplanations,
  DRUNK_TRIGGER_QUESTION_ID
} = require("./sbti-data");

function shuffle(array) {
  const arr = array.slice();
  for (let i = arr.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function scoreToLevel(score) {
  if (score <= 3) return "L";
  if (score === 4) return "M";
  return "H";
}

function levelNum(level) {
  return { L: 1, M: 2, H: 3 }[level];
}

function parsePattern(pattern) {
  return pattern.replace(/-/g, "").split("");
}

function computeResult(answers) {
  const rawScores = {};
  const levels = {};

  Object.keys(dimensionMeta).forEach((dim) => {
    rawScores[dim] = 0;
  });

  questions.forEach((q) => {
    rawScores[q.dim] += Number(answers[q.id] || 0);
  });

  Object.entries(rawScores).forEach(([dim, score]) => {
    levels[dim] = scoreToLevel(score);
  });

  const userVector = dimensionOrder.map((dim) => levelNum(levels[dim]));

  const ranked = normalTypes.map((type) => {
    const vector = parsePattern(type.pattern).map(levelNum);
    let distance = 0;
    let exact = 0;

    for (let i = 0; i < vector.length; i += 1) {
      const diff = Math.abs(userVector[i] - vector[i]);
      distance += diff;
      if (diff === 0) exact += 1;
    }

    const similarity = Math.max(0, Math.round((1 - distance / 30) * 100));
    return {
      ...type,
      ...typeLibrary[type.code],
      distance,
      exact,
      similarity
    };
  }).sort((a, b) => {
    if (a.distance !== b.distance) return a.distance - b.distance;
    if (b.exact !== a.exact) return b.exact - a.exact;
    return b.similarity - a.similarity;
  });

  const bestNormal = ranked[0];
  const drunkTriggered = Number(answers[DRUNK_TRIGGER_QUESTION_ID]) === 2;

  let finalType = bestNormal;
  let modeKicker = "你的主类型";
  let badge = `匹配度 ${bestNormal.similarity}% · 精准命中 ${bestNormal.exact}/15 维`;
  let sub = "维度命中度较高，当前结果可视为你的第一人格画像。";
  let special = false;

  if (drunkTriggered) {
    finalType = typeLibrary.DRUNK;
    modeKicker = "隐藏人格已激活";
    badge = "匹配度 100% · 酒精异常因子已接管";
    sub = "乙醇亲和性过强，系统已直接跳过常规人格审判。";
    special = true;
  } else if (bestNormal.similarity < 60) {
    finalType = typeLibrary.HHHH;
    modeKicker = "系统强制兜底";
    badge = `标准人格库最高匹配仅 ${bestNormal.similarity}%`;
    sub = "标准人格库对你的脑回路集体罢工，系统将你分配给了 HHHH。";
    special = true;
  }

  const dims = dimensionOrder.map((dim) => ({
    dim,
    label: dimensionMeta[dim].name,
    model: dimensionMeta[dim].model,
    raw: rawScores[dim],
    level: levels[dim],
    explanation: dimExplanations[dim][levels[dim]]
  }));

  return {
    finalType,
    modeKicker,
    badge,
    sub,
    special,
    rawScores,
    levels,
    dims,
    top3: ranked.slice(0, 3),
    ranked
  };
}

module.exports = {
  shuffle,
  computeResult
};
