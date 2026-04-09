const TYPE_IMAGES = {
  IMSB: "/assets/type-images/IMSB.jpg",
  BOSS: "/assets/type-images/BOSS.jpg",
  MUM: "/assets/type-images/MUM.jpg",
  FAKE: "/assets/type-images/FAKE.jpg",
  "Dior-s": "/assets/type-images/Dior-s.jpg",
  DEAD: "/assets/type-images/DEAD.jpg",
  ZZZZ: "/assets/type-images/ZZZZ.jpg",
  GOGO: "/assets/type-images/GOGO.jpg",
  FUCK: "/assets/type-images/FUCK.jpg",
  CTRL: "/assets/type-images/CTRL.jpg",
  HHHH: "/assets/type-images/HHHH.jpg",
  SEXY: "/assets/type-images/SEXY.jpg",
  OJBK: "/assets/type-images/OJBK.jpg",
  "JOKE-R": "/assets/type-images/JOKE-R.jpg",
  POOR: "/assets/type-images/POOR.jpg",
  "OH-NO": "/assets/type-images/OH-NO.jpg",
  MONK: "/assets/type-images/MONK.jpg",
  SHIT: "/assets/type-images/SHIT.jpg",
  "THAN-K": "/assets/type-images/THAN-K.jpg",
  MALO: "/assets/type-images/MALO.jpg",
  "ATM-er": "/assets/type-images/ATM-er.jpg",
  "THIN-K": "/assets/type-images/THIN-K.jpg",
  SOLO: "/assets/type-images/SOLO.jpg",
  "LOVE-R": "/assets/type-images/LOVE-R.jpg",
  "WOC!": "/assets/type-images/WOC.jpg",
  DRUNK: "/assets/type-images/DRUNK.jpg",
  IMFW: "/assets/type-images/IMFW.jpg"
};

Page({
  data: {
    loaded: false,
    result: null,
    funNote: "",
    typeImage: "",
    showAuthorNote: true
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
    const typeImage = TYPE_IMAGES[result.finalType.code] || "";

    this.setData({
      loaded: true,
      result,
      funNote,
      typeImage
    });
  },

  onRetest() {
    wx.redirectTo({ url: "/pages/quiz/quiz" });
  },

  onToggleAuthorNote() {
    this.setData({
      showAuthorNote: !this.data.showAuthorNote
    });
  },

  onShareAppMessage() {
    const result = this.data.result;
    if (!result) {
      return {
        title: "SBTI 人格测试",
        path: "/pages/home/home"
      };
    }
    return {
      title: `我测出了 ${result.finalType.code}（${result.finalType.cn}），你也来测测？`,
      path: "/pages/home/home"
    };
  }
});
