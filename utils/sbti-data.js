const dimensionMeta = {
  S1: { name: "S1 自尊自信", model: "自我模型" },
  S2: { name: "S2 自我清晰度", model: "自我模型" },
  S3: { name: "S3 核心价值", model: "自我模型" },
  E1: { name: "E1 依恋安全感", model: "情感模型" },
  E2: { name: "E2 情感投入度", model: "情感模型" },
  E3: { name: "E3 边界与依赖", model: "情感模型" },
  A1: { name: "A1 世界观倾向", model: "态度模型" },
  A2: { name: "A2 规则与灵活度", model: "态度模型" },
  A3: { name: "A3 人生意义感", model: "态度模型" },
  Ac1: { name: "Ac1 动机导向", model: "行动驱力模型" },
  Ac2: { name: "Ac2 决策风格", model: "行动驱力模型" },
  Ac3: { name: "Ac3 执行模式", model: "行动驱力模型" },
  So1: { name: "So1 社交主动性", model: "社交模型" },
  So2: { name: "So2 人际边界感", model: "社交模型" },
  So3: { name: "So3 表达与真实度", model: "社交模型" }
};

const dimensionOrder = ["S1", "S2", "S3", "E1", "E2", "E3", "A1", "A2", "A3", "Ac1", "Ac2", "Ac3", "So1", "So2", "So3"];

const questions = [
  { id: "q1", dim: "S1", text: "我不仅是屌丝，我还是joker...（地狱开场白）", options: [{ label: "我哭了", value: 1 }, { label: "这是什么", value: 2 }, { label: "这不是我", value: 3 }] },
  { id: "q2", dim: "S1", text: "我不够好，周围的人都比我优秀", options: [{ label: "确实", value: 1 }, { label: "有时", value: 2 }, { label: "不是", value: 3 }] },
  { id: "q3", dim: "S2", text: "我很清楚真正的自己是什么样的", options: [{ label: "不认同", value: 1 }, { label: "中立", value: 2 }, { label: "认同", value: 3 }] },
  { id: "q4", dim: "S2", text: "我内心有真正追求的东西", options: [{ label: "不认同", value: 1 }, { label: "中立", value: 2 }, { label: "认同", value: 3 }] },
  { id: "q5", dim: "S3", text: "我一定要不断往上爬、变得更厉害", options: [{ label: "不认同", value: 1 }, { label: "中立", value: 2 }, { label: "认同", value: 3 }] },
  { id: "q6", dim: "S3", text: "外人的评价对我来说无所谓", options: [{ label: "不认同", value: 1 }, { label: "中立", value: 2 }, { label: "认同", value: 3 }] },
  { id: "q7", dim: "E1", text: "对象超过5小时没回消息，说自己窜稀了，你会怎么想？", options: [{ label: "不太对劲", value: 1 }, { label: "在信任和怀疑间摇摆", value: 2 }, { label: "也许真的不舒服", value: 3 }] },
  { id: "q8", dim: "E1", text: "我在感情里经常担心被对方抛弃", options: [{ label: "是的", value: 1 }, { label: "偶尔", value: 2 }, { label: "不是", value: 3 }] },
  { id: "q9", dim: "E2", text: "我对每一份感情都很认真", options: [{ label: "并没有", value: 1 }, { label: "也许", value: 2 }, { label: "是的", value: 3 }] },
  { id: "q10", dim: "E2", text: "恋爱对象非常优秀，此时你会？", options: [{ label: "不会陷太深", value: 1 }, { label: "看情况", value: 2 }, { label: "会非常珍惜", value: 3 }] },
  { id: "q11", dim: "E3", text: "恋爱后对象非常黏人，你作何感想？", options: [{ label: "很爽", value: 1 }, { label: "都行", value: 2 }, { label: "更想保留空间", value: 3 }] },
  { id: "q12", dim: "E3", text: "我在任何关系里都很重视个人空间", options: [{ label: "更喜欢依赖", value: 1 }, { label: "看情况", value: 2 }, { label: "是的", value: 3 }] },
  { id: "q13", dim: "A1", text: "大多数人是善良的", options: [{ label: "不太信", value: 1 }, { label: "也许吧", value: 2 }, { label: "我愿意相信", value: 3 }] },
  { id: "q14", dim: "A1", text: "陌生可爱小女孩给你棒棒糖，你会？", options: [{ label: "被萌化", value: 3 }, { label: "懵", value: 2 }, { label: "怀疑诈骗", value: 1 }] },
  { id: "q15", dim: "A2", text: "临近考试却约了喜欢的人打游戏，你怎么办？", options: [{ label: "翘晚自习", value: 1 }, { label: "请假折中", value: 2 }, { label: "先学习", value: 3 }] },
  { id: "q16", dim: "A2", text: "我喜欢打破常规，不喜欢被束缚", options: [{ label: "认同", value: 1 }, { label: "中立", value: 2 }, { label: "不认同", value: 3 }] },
  { id: "q17", dim: "A3", text: "我做事通常有目标", options: [{ label: "不认同", value: 1 }, { label: "中立", value: 2 }, { label: "认同", value: 3 }] },
  { id: "q18", dim: "A3", text: "我会觉得人生很多时候没有意义", options: [{ label: "是这样的", value: 1 }, { label: "也许", value: 2 }, { label: "这太绝对", value: 3 }] },
  { id: "q19", dim: "Ac1", text: "我做事主要为了成果和进步，而不是避险", options: [{ label: "不认同", value: 1 }, { label: "中立", value: 2 }, { label: "认同", value: 3 }] },
  { id: "q20", dim: "Ac1", text: "便秘30分钟还没拉出来，你更像？", options: [{ label: "再等等", value: 1 }, { label: "边拍边催", value: 2 }, { label: "直接上开塞露", value: 3 }] },
  { id: "q21", dim: "Ac2", text: "我做决定比较果断，不喜欢犹豫", options: [{ label: "不认同", value: 1 }, { label: "中立", value: 2 }, { label: "认同", value: 3 }] },
  { id: "q22", dim: "Ac2", text: "此题没有题目，请盲选", options: [{ label: "A", value: 1 }, { label: "B", value: 2 }, { label: "C", value: 3 }] },
  { id: "q23", dim: "Ac3", text: "别人说你执行力强，你更接近哪句？", options: [{ label: "被逼才强", value: 1 }, { label: "有时候", value: 2 }, { label: "推进是本能", value: 3 }] },
  { id: "q24", dim: "Ac3", text: "我做事常常有计划，____", options: [{ label: "但计划赶不上变化", value: 1 }, { label: "完成度看状态", value: 2 }, { label: "讨厌被打断", value: 3 }] },
  { id: "q25", dim: "So1", text: "网友邀请线下见面，你的想法是？", options: [{ label: "有点忐忑", value: 1 }, { label: "能聊就聊", value: 2 }, { label: "热情赴约", value: 3 }] },
  { id: "q26", dim: "So1", text: "朋友带了 ta 的朋友一起玩，你状态是？", options: [{ label: "有距离感", value: 1 }, { label: "看氛围", value: 2 }, { label: "主动热聊", value: 3 }] },
  { id: "q27", dim: "So2", text: "我和人相处主打电子围栏，太近会报警", options: [{ label: "认同", value: 3 }, { label: "中立", value: 2 }, { label: "不认同", value: 1 }] },
  { id: "q28", dim: "So2", text: "我渴望和信任的人关系密切", options: [{ label: "认同", value: 1 }, { label: "中立", value: 2 }, { label: "不认同", value: 3 }] },
  { id: "q29", dim: "So3", text: "你有负面看法却没说出来，多数是因为？", options: [{ label: "这种情况少", value: 1 }, { label: "碍于关系", value: 2 }, { label: "不想暴露阴暗面", value: 3 }] },
  { id: "q30", dim: "So3", text: "我在不同人面前会表现出不同的自己", options: [{ label: "不认同", value: 1 }, { label: "中立", value: 2 }, { label: "认同", value: 3 }] }
];

const specialQuestions = [
  {
    id: "drink_gate_q1",
    special: true,
    kind: "drink_gate",
    text: "您平时有什么爱好？",
    options: [
      { label: "吃喝拉撒", value: 1 },
      { label: "艺术爱好", value: 2 },
      { label: "饮酒", value: 3 },
      { label: "健身", value: 4 }
    ]
  },
  {
    id: "drink_gate_q2",
    special: true,
    kind: "drink_trigger",
    text: "您对饮酒的态度是？",
    options: [
      { label: "小酌怡情，喝不了太多", value: 1 },
      { label: "我习惯把白酒装进保温杯当白开水喝", value: 2 }
    ]
  }
];

const typeLibrary = {
  "CTRL": { code: "CTRL", cn: "拿捏者", intro: "怎么样，被我拿捏了吧？", desc: "你是秩序和推进感的化身，擅长把混乱信息快速归档并拉回正轨。别人还在犹豫时，你已经给出可执行方案。" },
  "ATM-er": { code: "ATM-er", cn: "送钱者", intro: "你以为我很有钱吗？", desc: "你总是那个默默兜底的人，付出耐心、精力和时间去帮别人收尾。可靠是你的光环，也是你的负重。" },
  "Dior-s": { code: "Dior-s", cn: "屌丝", intro: "等着我屌丝逆袭。", desc: "你对空洞成功学有天然免疫力，偏好真实和舒适，擅长用低消耗策略在复杂环境里自保。" },
  "BOSS": { code: "BOSS", cn: "领导者", intro: "方向盘给我，我来开。", desc: "你有很强的方向感和掌控欲，目标导向、执行坚决。你不只是会做事，更会组织别人把事做成。" },
  "THAN-K": { code: "THAN-K", cn: "感恩者", intro: "我感谢苍天！我感谢大地！", desc: "你擅长从日常缝隙里找到意义和温暖。你的积极反馈能显著提高周围人的情绪韧性。" },
  "OH-NO": { code: "OH-NO", cn: "哦不人", intro: "哦不！我怎么会是这个人格？！", desc: "你的风险雷达非常敏锐，能提前看到别人忽略的问题。你会为关系与系统设好边界，避免失控。" },
  "GOGO": { code: "GOGO", cn: "行者", intro: "gogogo~出发咯", desc: "你重行动轻空谈，面对待办不会拖延太久。先做再优化，是你最自然的推进方式。" },
  "SEXY": { code: "SEXY", cn: "尤物", intro: "您就是天生的尤物！", desc: "你有很强的存在感和个人魅力，懂得在社交中调动气氛，也容易成为注意力中心。" },
  "LOVE-R": { code: "LOVE-R", cn: "多情者", intro: "爱意太满，现实显得有点贫瘠。", desc: "你对情绪和关系的体感很细腻，愿意高投入地对待爱与连接，内心戏和浪漫感都很充沛。" },
  "MUM": { code: "MUM", cn: "妈妈", intro: "或许...我可以叫你妈妈吗？", desc: "你有天然的照顾者气质，能敏锐感知他人状态并提供安抚。共情力强，但也要照顾好自己。" },
  "FAKE": { code: "FAKE", cn: "伪人", intro: "已经，没有人类了。", desc: "你在不同情境切换表达方式的能力很强，社交适配度高。真实与体面如何平衡，是你的长期课题。" },
  "OJBK": { code: "OJBK", cn: "无所谓人", intro: "我说随便，是真的随便。", desc: "你对很多争执保持低卷入，习惯去噪和降冲突。你不是没态度，而是不愿把精力浪费在低价值拉扯上。" },
  "MALO": { code: "MALO", cn: "吗喽", intro: "人生是个副本，而我只是一只吗喽。", desc: "你有很强的玩心和反套路思维，不迷信标准答案。你擅长用创造性和幽默感破解僵硬场景。" },
  "JOKE-R": { code: "JOKE-R", cn: "小丑", intro: "原来我们都是小丑。", desc: "你是社交里的气氛引擎，善于化解尴尬。笑点是你的盔甲，真实情绪偶尔会被你藏在盔甲后。" },
  "WOC!": { code: "WOC!", cn: "握草人", intro: "卧槽，我怎么是这个人格？", desc: "你外显反应夸张、内核判断冷静，擅长快速识别场景风险并保持边界，不轻易下场内耗。" },
  "THIN-K": { code: "THIN-K", cn: "思考者", intro: "已深度思考100s。", desc: "你重证据、重逻辑、重框架，会自然拆解观点和偏差。独处时你的大脑仍在持续处理信息。" },
  "SHIT": { code: "SHIT", cn: "愤世者", intro: "这个世界，构石一坨。", desc: "你嘴上吐槽系统，行动上却能把烂摊子收拾干净。悲观外壳里包着高责任感和强执行。" },
  "ZZZZ": { code: "ZZZZ", cn: "装死者", intro: "我没死，我只是在睡觉。", desc: "你平时低功耗，遇到死线才爆发。临界点触发后，你往往能在短时间内交付可用结果。" },
  "POOR": { code: "POOR", cn: "贫困者", intro: "我穷，但我很专。", desc: "你会把注意力集中在少数关键目标上，主动过滤无效热闹。你看似节能，实则在做高密度投入。" },
  "MONK": { code: "MONK", cn: "僧人", intro: "没有那种世俗的欲望。", desc: "你对个人空间和独立轨道极其看重，不黏不缠。你的宁静来自边界清晰和内在秩序。" },
  "IMSB": { code: "IMSB", cn: "傻者", intro: "认真的么？我真的是傻逼么？", desc: "你的行动冲动和自我怀疑经常同时在线。你不是能力差，而是内耗战线拉得太长。" },
  "SOLO": { code: "SOLO", cn: "孤儿", intro: "我哭了，我怎么会是孤儿？", desc: "你对关系期待高却防御也高，容易先把自己隔离。学会安全表达需求，会让你更轻松。" },
  "FUCK": { code: "FUCK", cn: "草者", intro: "操！这是什么人格？", desc: "你生命力强、反驯化倾向明显，讨厌被过度规训。高自由度环境能显著提升你的状态。" },
  "DEAD": { code: "DEAD", cn: "死者", intro: "我，还活着吗？", desc: "你对很多外部激励脱敏，倾向极简和抽离。减少噪音后，你反而能更稳定地判断什么值得做。" },
  "IMFW": { code: "IMFW", cn: "废物", intro: "我真的...是废物吗？", desc: "你对关系反馈很敏感，容易把外界评价内化。建立稳定的自我锚点后，你会更有安全感。" },
  "HHHH": { code: "HHHH", cn: "傻乐者", intro: "哈哈哈哈哈哈。", desc: "标准人格库没能充分解释你的组合，系统把你归入 HHHH。你可以重点看十五维度来理解自己。" },
  "DRUNK": { code: "DRUNK", cn: "酒鬼", intro: "烈酒烧喉，不得不醉。", desc: "隐藏人格触发：酒精因子直接接管系统。建议把快乐建立在更稳定的奖励机制上，别把身体当试验场。" }
};

const normalTypes = [
  { code: "CTRL", pattern: "HHH-HMH-MHH-HHH-MHM" },
  { code: "ATM-er", pattern: "HHH-HHM-HHH-HMH-MHL" },
  { code: "Dior-s", pattern: "MHM-MMH-MHM-HMH-LHL" },
  { code: "BOSS", pattern: "HHH-HMH-MMH-HHH-LHL" },
  { code: "THAN-K", pattern: "MHM-HMM-HHM-MMH-MHL" },
  { code: "OH-NO", pattern: "HHL-LMH-LHH-HHM-LHL" },
  { code: "GOGO", pattern: "HHM-HMH-MMH-HHH-MHM" },
  { code: "SEXY", pattern: "HMH-HHL-HMM-HMM-HLH" },
  { code: "LOVE-R", pattern: "MLH-LHL-HLH-MLM-MLH" },
  { code: "MUM", pattern: "MMH-MHL-HMM-LMM-HLL" },
  { code: "FAKE", pattern: "HLM-MML-MLM-MLM-HLH" },
  { code: "OJBK", pattern: "MMH-MMM-HML-LMM-MML" },
  { code: "MALO", pattern: "MLH-MHM-MLH-MLH-LMH" },
  { code: "JOKE-R", pattern: "LLH-LHL-LML-LLL-MLM" },
  { code: "WOC!", pattern: "HHL-HMH-MMH-HHM-LHH" },
  { code: "THIN-K", pattern: "HHL-HMH-MLH-MHM-LHH" },
  { code: "SHIT", pattern: "HHL-HLH-LMM-HHM-LHH" },
  { code: "ZZZZ", pattern: "MHL-MLH-LML-MML-LHM" },
  { code: "POOR", pattern: "HHL-MLH-LMH-HHH-LHL" },
  { code: "MONK", pattern: "HHL-LLH-LLM-MML-LHM" },
  { code: "IMSB", pattern: "LLM-LMM-LLL-LLL-MLM" },
  { code: "SOLO", pattern: "LML-LLH-LHL-LML-LHM" },
  { code: "FUCK", pattern: "MLL-LHL-LLM-MLL-HLH" },
  { code: "DEAD", pattern: "LLL-LLM-LML-LLL-LHM" },
  { code: "IMFW", pattern: "LLH-LHL-LML-LLL-MLL" }
];

const dimExplanations = {
  S1: { L: "对自己比较苛刻，容易先否定自己。", M: "自信会随状态波动。", H: "自我价值感相对稳定。" },
  S2: { L: "经常对“我是谁”感到摇摆。", M: "多数时候知道自己要什么。", H: "对自我特征和边界很清晰。" },
  S3: { L: "更看重安全和舒适。", M: "目标与躺平会交替出现。", H: "容易被成长目标持续驱动。" },
  E1: { L: "关系里容易触发不安。", M: "在信任与怀疑间拉扯。", H: "关系安全感较强。" },
  E2: { L: "情感投入偏克制。", M: "投入但会留后手。", H: "认定后会高投入。" },
  E3: { L: "更偏好亲密黏连。", M: "亲密与独立并存。", H: "即使亲密也强调边界。" },
  A1: { L: "对世界有防御滤镜。", M: "倾向先观察后判断。", H: "更愿意相信善意存在。" },
  A2: { L: "更偏向灵活和破常规。", M: "能守规也能变通。", H: "秩序感和流程偏好更强。" },
  A3: { L: "人生意义感偏低。", M: "意义感阶段性波动。", H: "方向感和意义感更稳定。" },
  Ac1: { L: "先避险，再谈收益。", M: "风险与收益并衡。", H: "更偏结果导向。" },
  Ac2: { L: "决策会反复权衡。", M: "犹豫可控。", H: "拍板速度较快。" },
  Ac3: { L: "常靠死线驱动执行。", M: "执行稳定性一般。", H: "推进和落地能力较强。" },
  So1: { L: "社交启动偏慢。", M: "社交弹性居中。", H: "主动打开社交场较容易。" },
  So2: { L: "更倾向亲密融合。", M: "边界会随对象调整。", H: "边界感更明确。" },
  So3: { L: "表达更直接。", M: "会在真实与体面间平衡。", H: "场景切换能力强。" }
};

const DRUNK_TRIGGER_QUESTION_ID = "drink_gate_q2";

module.exports = {
  dimensionMeta,
  dimensionOrder,
  questions,
  specialQuestions,
  typeLibrary,
  normalTypes,
  dimExplanations,
  DRUNK_TRIGGER_QUESTION_ID
};
