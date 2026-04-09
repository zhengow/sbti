const { questions, specialQuestions } = require("../../utils/sbti-data");
const { shuffle, computeResult } = require("../../utils/sbti");

Page({
  data: {
    letters: ["A", "B", "C", "D", "E"],
    answers: {},
    shuffledQuestions: [],
    visibleQuestions: [],
    doneCount: 0,
    totalCount: 0,
    progressPercent: 0,
    canSubmit: false,
    hintText: "全选完才会放行。世界已经够乱了，起码把题做完整。"
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
      shuffledQuestions: mixed
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

    this.setData({
      visibleQuestions: visible,
      doneCount,
      totalCount,
      canSubmit,
      progressPercent: totalCount ? Math.round((doneCount / totalCount) * 100) : 0,
      hintText: canSubmit
        ? "都做完了。现在可以把你的电子魂魄交给结果页审判。"
        : "全选完才会放行。世界已经够乱了，起码把题做完整。"
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
    });
  },

  onSubmit() {
    if (!this.data.canSubmit) {
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
