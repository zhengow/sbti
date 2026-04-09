const TYPE_IMAGES = {
  IMSB: "/assets/type-images/IMSB.png",
  BOSS: "/assets/type-images/BOSS.png",
  MUM: "/assets/type-images/MUM.png",
  FAKE: "/assets/type-images/FAKE.png",
  "Dior-s": "/assets/type-images/Dior-s.jpg",
  DEAD: "/assets/type-images/DEAD.png",
  ZZZZ: "/assets/type-images/ZZZZ.png",
  GOGO: "/assets/type-images/GOGO.png",
  FUCK: "/assets/type-images/FUCK.png",
  CTRL: "/assets/type-images/CTRL.png",
  HHHH: "/assets/type-images/HHHH.png",
  SEXY: "/assets/type-images/SEXY.png",
  OJBK: "/assets/type-images/OJBK.png",
  "JOKE-R": "/assets/type-images/JOKE-R.jpg",
  POOR: "/assets/type-images/POOR.png",
  "OH-NO": "/assets/type-images/OH-NO.png",
  MONK: "/assets/type-images/MONK.png",
  SHIT: "/assets/type-images/SHIT.png",
  "THAN-K": "/assets/type-images/THAN-K.png",
  MALO: "/assets/type-images/MALO.png",
  "ATM-er": "/assets/type-images/ATM-er.png",
  "THIN-K": "/assets/type-images/THIN-K.png",
  SOLO: "/assets/type-images/SOLO.png",
  "LOVE-R": "/assets/type-images/LOVE-R.png",
  "WOC!": "/assets/type-images/WOC.png",
  DRUNK: "/assets/type-images/DRUNK.png",
  IMFW: "/assets/type-images/IMFW.png"
};

Page({
  data: {
    loaded: false,
    result: null,
    funNote: "",
    typeImage: ""
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

  onHome() {
    wx.reLaunch({ url: "/pages/home/home" });
  }
});
