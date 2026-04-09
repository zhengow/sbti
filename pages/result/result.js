Page({
  data: {
    loaded: false,
    result: null,
    funNote: ""
  },

  onShow() {
    const app = getApp();
    const result = app.globalData.latestResult;

    if (!result) {
      wx.reLaunch({ url: "/pages/home/home" });
      return;
    }

    const funNote = result.special
      ? "本测试仅供娱乐。隐藏人格和兜底人格都是作者埋的彩蛋，不可用于医学、心理学或任何严肃判断。"
      : "本测试仅供娱乐，别拿它当诊断、面试、相亲、分手、算命或人生判决书。";

    this.setData({
      loaded: true,
      result,
      funNote
    });
  },

  onRetest() {
    wx.redirectTo({ url: "/pages/quiz/quiz" });
  },

  onHome() {
    wx.reLaunch({ url: "/pages/home/home" });
  }
});
