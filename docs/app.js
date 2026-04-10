(function () {
  const {
    dimensionMeta,
    dimensionOrder,
    questions,
    specialQuestions,
    typeLibrary,
    normalTypes,
    dimExplanations,
    DRUNK_TRIGGER_QUESTION_ID
  } = window.SBTI_DATA;

  const TYPE_IMAGES = {
    IMSB: "./assets/type-images/IMSB.jpg",
    BOSS: "./assets/type-images/BOSS.jpg",
    MUM: "./assets/type-images/MUM.jpg",
    FAKE: "./assets/type-images/FAKE.jpg",
    "Dior-s": "./assets/type-images/Dior-s.jpg",
    DEAD: "./assets/type-images/DEAD.jpg",
    ZZZZ: "./assets/type-images/ZZZZ.jpg",
    GOGO: "./assets/type-images/GOGO.jpg",
    FUCK: "./assets/type-images/FUCK.jpg",
    CTRL: "./assets/type-images/CTRL.jpg",
    HHHH: "./assets/type-images/HHHH.jpg",
    SEXY: "./assets/type-images/SEXY.jpg",
    OJBK: "./assets/type-images/OJBK.jpg",
    "JOKE-R": "./assets/type-images/JOKE-R.jpg",
    POOR: "./assets/type-images/POOR.jpg",
    "OH-NO": "./assets/type-images/OH-NO.jpg",
    MONK: "./assets/type-images/MONK.jpg",
    SHIT: "./assets/type-images/SHIT.jpg",
    "THAN-K": "./assets/type-images/THAN-K.jpg",
    MALO: "./assets/type-images/MALO.jpg",
    "ATM-er": "./assets/type-images/ATM-er.jpg",
    "THIN-K": "./assets/type-images/THIN-K.jpg",
    SOLO: "./assets/type-images/SOLO.jpg",
    "LOVE-R": "./assets/type-images/LOVE-R.jpg",
    "WOC!": "./assets/type-images/WOC.jpg",
    DRUNK: "./assets/type-images/DRUNK.jpg",
    IMFW: "./assets/type-images/IMFW.jpg"
  };

  const LETTERS = ["A", "B", "C", "D", "E"];

  const state = {
    answers: {},
    shuffledQuestions: [],
    visibleQuestions: [],
    currentIndex: 0,
    authorOpen: true,
    result: null
  };

  const el = {
    homeScreen: document.getElementById("homeScreen"),
    quizScreen: document.getElementById("quizScreen"),
    resultScreen: document.getElementById("resultScreen"),
    startBtn: document.getElementById("startBtn"),
    exitBtn: document.getElementById("exitBtn"),
    progressBar: document.getElementById("progressBar"),
    progressText: document.getElementById("progressText"),
    etaText: document.getElementById("etaText"),
    hintText: document.getElementById("hintText"),
    questionCard: document.getElementById("questionCard"),
    footerTip: document.getElementById("footerTip"),
    prevBtn: document.getElementById("prevBtn"),
    modeKicker: document.getElementById("modeKicker"),
    typeName: document.getElementById("typeName"),
    matchBadge: document.getElementById("matchBadge"),
    typeSub: document.getElementById("typeSub"),
    typeIntro: document.getElementById("typeIntro"),
    typeDesc: document.getElementById("typeDesc"),
    top3List: document.getElementById("top3List"),
    dimList: document.getElementById("dimList"),
    funNote: document.getElementById("funNote"),
    posterBlock: document.getElementById("posterBlock"),
    typePoster: document.getElementById("typePoster"),
    toggleAuthorBtn: document.getElementById("toggleAuthorBtn"),
    authorBody: document.getElementById("authorBody"),
    retestBtn: document.getElementById("retestBtn"),
    shareBtn: document.getElementById("shareBtn")
  };

  function showScreen(name) {
    el.homeScreen.classList.toggle("active", name === "home");
    el.quizScreen.classList.toggle("active", name === "quiz");
    el.resultScreen.classList.toggle("active", name === "result");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/\"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

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
      return { ...type, ...typeLibrary[type.code], distance, exact, similarity };
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
      dims,
      top3: ranked.slice(0, 3)
    };
  }

  function initTest() {
    state.answers = {};
    state.result = null;
    state.currentIndex = 0;
    state.visibleQuestions = [];
    const regular = shuffle(questions);
    const insertAt = Math.floor(Math.random() * regular.length) + 1;
    state.shuffledQuestions = [
      ...regular.slice(0, insertAt),
      specialQuestions[0],
      ...regular.slice(insertAt)
    ];
    refreshVisible();
    showScreen("quiz");
  }

  function refreshVisible() {
    const visible = state.shuffledQuestions.slice();
    const gateIndex = visible.findIndex((q) => q.id === "drink_gate_q1");
    if (gateIndex !== -1 && Number(state.answers.drink_gate_q1) === 3) {
      visible.splice(gateIndex + 1, 0, specialQuestions[1]);
    }

    const oldQid = state.visibleQuestions[state.currentIndex] ? state.visibleQuestions[state.currentIndex].id : "";
    state.visibleQuestions = visible;

    if (oldQid) {
      const nextIndex = visible.findIndex((q) => q.id === oldQid);
      if (nextIndex !== -1) state.currentIndex = nextIndex;
    }

    if (state.currentIndex > visible.length - 1) {
      state.currentIndex = Math.max(0, visible.length - 1);
    }

    renderQuiz();
  }

  function getQuizStats() {
    const total = state.visibleQuestions.length;
    const done = state.visibleQuestions.filter((q) => state.answers[q.id] !== undefined).length;
    const currentQuestion = state.visibleQuestions[state.currentIndex] || null;
    const isCurrentAnswered = currentQuestion ? state.answers[currentQuestion.id] !== undefined : false;
    const isLastQuestion = total > 0 && state.currentIndex === total - 1;
    return {
      total,
      done,
      currentQuestion,
      isCurrentAnswered,
      isLastQuestion,
      canSubmit: total > 0 && done === total
    };
  }

  function renderQuiz() {
    const stats = getQuizStats();
    const percent = stats.total ? Math.round((stats.done / stats.total) * 100) : 0;
    el.progressBar.style.width = `${percent}%`;
    el.progressText.textContent = `${stats.done} / ${stats.total}`;

    const remainingCount = Math.max(0, stats.total - stats.done);
    const etaMinutes = Math.max(1, Math.ceil((remainingCount * 6) / 60));
    el.etaText.textContent = `预计剩余约 ${etaMinutes} 分钟`;

    el.hintText.textContent = stats.canSubmit
      ? "都做完了。现在可以把你的电子魂魄交给结果页审判。"
      : "全选完才会放行。世界已经够乱了，起码把题做完整。";

    el.prevBtn.disabled = state.currentIndex <= 0;

    if (!stats.currentQuestion) {
      el.questionCard.innerHTML = "";
      return;
    }

    const q = stats.currentQuestion;
    const selected = state.answers[q.id];

    el.questionCard.innerHTML = `
      <div class="q-meta">
        <span class="badge-lite">第 ${state.currentIndex + 1} 题</span>
        <span class="badge-lite">${q.special ? "补充题" : "维度已隐藏"}</span>
      </div>
      <div class="q-title">${escapeHtml(q.text)}</div>
      <div class="options">
        ${q.options.map((opt, i) => `
          <button class="option ${selected === opt.value ? "active" : ""}" data-qid="${q.id}" data-value="${opt.value}">
            <span class="opt-code">${LETTERS[i] || i + 1}</span>
            <span class="opt-label">${escapeHtml(opt.label)}</span>
          </button>
        `).join("")}
      </div>
    `;

    el.footerTip.textContent = selected
      ? (stats.isLastQuestion ? "最后一步，已自动提交。" : "已作答，自动进入下一题。")
      : "请先选择一个选项";

    el.questionCard.querySelectorAll(".option").forEach((btn) => {
      btn.addEventListener("click", () => {
        onSelect(btn.dataset.qid, Number(btn.dataset.value));
      });
    });
  }

  function onSelect(qid, value) {
    state.answers[qid] = value;
    if (qid === "drink_gate_q1" && value !== 3) {
      delete state.answers.drink_gate_q2;
    }

    refreshVisible();

    setTimeout(() => {
      const stats = getQuizStats();
      if (stats.isLastQuestion) {
        submit();
        return;
      }
      if (state.currentIndex < stats.total - 1) {
        state.currentIndex += 1;
        renderQuiz();
      }
    }, 120);
  }

  function submit() {
    const stats = getQuizStats();
    if (!stats.canSubmit) {
      const idx = state.visibleQuestions.findIndex((q) => state.answers[q.id] === undefined);
      if (idx !== -1) {
        state.currentIndex = idx;
        renderQuiz();
        window.alert("有题目未完成，已帮你跳转。");
      }
      return;
    }

    state.result = computeResult(state.answers);
    renderResult();
    showScreen("result");
  }

  function renderResult() {
    const r = state.result;
    if (!r) return;

    el.modeKicker.textContent = r.modeKicker;
    el.typeName.textContent = `${r.finalType.code}（${r.finalType.cn}）`;
    el.matchBadge.textContent = r.badge;
    el.typeSub.textContent = r.sub;
    el.typeIntro.textContent = r.finalType.intro;
    el.typeDesc.textContent = r.finalType.desc;
    el.funNote.textContent = r.special
      ? "本测试仅供娱乐。隐藏人格和兜底人格都是作者埋的彩蛋，不可用于医学、心理学或任何严肃判断。"
      : "本测试仅供娱乐，别拿它当诊断、面试、相亲、分手、算命或人生判决书。";

    const img = TYPE_IMAGES[r.finalType.code];
    if (img) {
      el.posterBlock.style.display = "block";
      el.typePoster.src = img;
      el.typePoster.alt = `${r.finalType.code} ${r.finalType.cn}`;
    } else {
      el.posterBlock.style.display = "none";
    }

    el.top3List.innerHTML = r.top3.map((item) => `
      <div class="top3-item">
        <div>
          <strong>${escapeHtml(item.code)}（${escapeHtml(item.cn)}）</strong>
          <span>命中 ${item.exact} / 15 维</span>
        </div>
        <div class="score">${item.similarity}%</div>
      </div>
    `).join("");

    el.dimList.innerHTML = r.dims.map((item) => `
      <div class="dim-item">
        <div class="dim-top">
          <strong>${escapeHtml(item.label)}</strong>
          <span>${item.level} / ${item.raw}分</span>
        </div>
        <p>${escapeHtml(item.explanation)}</p>
      </div>
    `).join("");
  }

  function copyResultText() {
    if (!state.result) return;
    const r = state.result;
    const text = `我测出了 ${r.finalType.code}（${r.finalType.cn}）\n${r.badge}\n${r.finalType.intro}\n来测测你的 SBTI：${window.location.href}`;
    navigator.clipboard.writeText(text)
      .then(() => window.alert("结果文案已复制，可以直接粘贴分享。"))
      .catch(() => window.prompt("复制失败，请手动复制：", text));
  }

  function toggleAuthor() {
    state.authorOpen = !state.authorOpen;
    el.authorBody.style.display = state.authorOpen ? "grid" : "none";
    el.toggleAuthorBtn.textContent = state.authorOpen ? "收起" : "展开";
  }

  el.startBtn.addEventListener("click", initTest);
  el.exitBtn.addEventListener("click", () => showScreen("home"));
  el.prevBtn.addEventListener("click", () => {
    if (state.currentIndex > 0) {
      state.currentIndex -= 1;
      renderQuiz();
    }
  });

  el.retestBtn.addEventListener("click", initTest);
  el.shareBtn.addEventListener("click", copyResultText);
  el.toggleAuthorBtn.addEventListener("click", toggleAuthor);
})();
