const { questions, specialQuestions } = require("../../utils/sbti-data");
const { shuffle, computeResult } = require("../../utils/sbti");

Page({
  data: {
    letters: ["A", "B", "C", "D", "E"],
    answers: {},
    shuffledQuestions: [],
    visibleQuestions: [],
    currentIndex: 0,
    currentQuestion: null,
    doneCount: 0,
    totalCount: 0,
    progressPercent: 0,
    canSubmit: false,
    canPrev: false,
    isCurrentAnswered: false,
    isLastQuestion: false,
    hintText: "全选完才会放行。世界已经够乱了，起码把题做完整。",
    footerTip: "请选择一个选项",
    etaMinutes: 1
  },

  onLoad() {
    this.initTest();
  },

  initTest() {
    const regular = shuffle(questions);
    const insertAt = Math.floor(Math.random() * regular.length) + 1;
    const mixed = [
      ...regular.slice(0, insertAt),
      specialQuestions[0],
      ...regular.slice(insertAt)
    ];

    this.setData({
      answers: {},
      shuffledQuestions: mixed,
      visibleQuestions: [],
      currentIndex: 0
    }, () => {
      this.refreshVisible();
    });
  },

  refreshVisible() {
    const answers = this.data.answers;
    const visible = this.data.shuffledQuestions.slice();
    const gateIndex = visible.findIndex((item) => item.id === "drink_gate_q1");

    if (gateIndex !== -1 && Number(answers.drink_gate_q1) === 3) {
      visible.splice(gateIndex + 1, 0, specialQuestions[1]);
    }

    const totalCount = visible.length;
    const doneCount = visible.filter((q) => answers[q.id] !== undefined).length;
    const canSubmit = totalCount > 0 && totalCount === doneCount;

    const oldVisible = this.data.visibleQuestions;
    const oldQ = oldVisible[this.data.currentIndex];
    const oldQid = oldQ ? oldQ.id : "";

    let currentIndex = Math.min(this.data.currentIndex, Math.max(totalCount - 1, 0));
    if (oldQid) {
      const matchedIndex = visible.findIndex((q) => q.id === oldQid);
      if (matchedIndex !== -1) {
        currentIndex = matchedIndex;
      }
    }

    this.setData({
      visibleQuestions: visible,
      doneCount,
      totalCount,
      canSubmit,
      progressPercent: totalCount ? Math.round((doneCount / totalCount) * 100) : 0,
      hintText: canSubmit
        ? "都做完了。现在可以把你的电子魂魄交给结果页审判。"
        : "全选完才会放行。世界已经够乱了，起码把题做完整。",
      currentIndex
    }, () => {
      this.syncCurrentQuestion();
    });
  },

  syncCurrentQuestion() {
    const {
      answers,
      visibleQuestions,
      currentIndex,
      totalCount,
      doneCount
    } = this.data;

    const currentQuestion = visibleQuestions[currentIndex] || null;
    const isCurrentAnswered = currentQuestion ? answers[currentQuestion.id] !== undefined : false;
    const isLastQuestion = totalCount > 0 && currentIndex === totalCount - 1;
    const canPrev = currentIndex > 0;

    const remainingCount = Math.max(0, totalCount - doneCount);
    const etaMinutes = Math.max(1, Math.ceil((remainingCount * 6) / 60));

    this.setData({
      currentQuestion,
      isCurrentAnswered,
      isLastQuestion,
      canPrev,
      footerTip: isCurrentAnswered
        ? (isLastQuestion ? "最后一步，已自动提交。" : "已作答，自动进入下一题。")
        : "请先选择一个选项",
      etaMinutes
    });
  },

  onSelect(e) {
    const { qid, value } = e.currentTarget.dataset;
    const answers = { ...this.data.answers, [qid]: Number(value) };

    if (qid === "drink_gate_q1" && Number(value) !== 3) {
      delete answers.drink_gate_q2;
    }

    this.setData({ answers }, () => {
      this.refreshVisible();
      setTimeout(() => {
        if (this.data.isLastQuestion) {
          this.onSubmit();
          return;
        }
        if (this.data.currentIndex < this.data.totalCount - 1) {
          this.setData({ currentIndex: this.data.currentIndex + 1 }, () => {
            this.syncCurrentQuestion();
          });
        }
      }, 120);
    });
  },

  onPrev() {
    if (!this.data.canPrev) return;
    this.setData({ currentIndex: this.data.currentIndex - 1 }, () => {
      this.syncCurrentQuestion();
    });
  },

  onSubmit() {
    if (!this.data.canSubmit) {
      const unansweredIndex = this.data.visibleQuestions.findIndex(
        (q) => this.data.answers[q.id] === undefined
      );

      if (unansweredIndex !== -1) {
        this.setData({ currentIndex: unansweredIndex }, () => {
          this.syncCurrentQuestion();
          wx.showToast({ title: "有题目未完成，已帮你跳转", icon: "none" });
        });
        return;
      }

      wx.showToast({ title: "还有题没做完", icon: "none" });
      return;
    }

    const result = computeResult(this.data.answers);
    const app = getApp();
    app.globalData.latestResult = result;
    wx.navigateTo({ url: "/pages/result/result" });
  },

  goHome() {
    wx.navigateBack({
      fail: () => {
        wx.reLaunch({ url: "/pages/home/home" });
      }
    });
  }
});
