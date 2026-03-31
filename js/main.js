const questionBank = [
  {
    id: "currentMethod",
    title: "您现在主要靠什么方式找客户？",
    options: [
      {
        id: "coldcall",
        label: "打电话、加微信，一个一个联系",
        scores: { ad: 2 },
        primary: "ad"
      },
      {
        id: "referral",
        label: "靠老客户转介绍和熟人圈子",
        scores: { ad: 1, agency: 1 },
        primary: "ad"
      },
      {
        id: "content",
        label: "在朋友圈、视频号或其他平台发内容",
        scores: { content: 2 },
        primary: "content"
      },
      {
        id: "ads",
        label: "已经在做一些线上推广或投放",
        scores: { agency: 1, content: 1 },
        primary: "agency"
      }
    ]
  },
  {
    id: "goal",
    title: "对于生意获客，目前您最想优先做的是？",
    options: [
      {
        id: "a",
        label: "尽快拿到一些客户线索，让生意先跑起来",
        scores: { ad: 2 },
        primary: "ad"
      },
      {
        id: "b",
        label: "借助专业团队来推进，更省心省力",
        scores: { agency: 2 },
        primary: "agency"
      },
      {
        id: "c",
        label: "先把内容和经营基础打好，慢慢推广放大",
        scores: { content: 2 },
        primary: "content"
      }
    ]
  },
  {
    id: "contentAbility",
    title: "您目前的内容能力怎么样？",
    options: [
      {
        id: "none",
        label: "基本没有，也没人专门做内容",
        scores: { ad: 2, agency: 1 },
        primary: "ad"
      },
      {
        id: "weak",
        label: "偶尔发发朋友圈，但没什么章法",
        scores: { ad: 1, agency: 1 },
        primary: "agency"
      },
      {
        id: "other",
        label: "微信还没做，但在其他平台（小红书/抖音）有经验",
        scores: { content: 2, ad: 1 },
        primary: "content"
      },
      {
        id: "strong",
        label: "有人在持续做内容，或者自己比较擅长",
        scores: { content: 3 },
        primary: "content"
      }
    ]
  },
  {
    id: "participation",
    title: "您最希望谁来负责在微信上获客？",
    options: [
      {
        id: "a",
        label: "自己或内部团队来做，节奏自己把控",
        scores: { ad: 2 },
        primary: "ad"
      },
      {
        id: "b",
        label: "和专业团队一起做，关键环节我来定",
        scores: { content: 2 },
        primary: "content"
      },
      {
        id: "c",
        label: "交给专业团队执行，我主要盯结果",
        scores: { agency: 2 },
        primary: "agency"
      }
    ]
  },
  {
    id: "business",
    title: "您的生意主要在哪里做？",
    options: [
      {
        id: "online",
        label: "线上经营为主",
        scores: { ad: 1, content: 1 },
        primary: "ad"
      },
      {
        id: "offline",
        label: "线下门店为主",
        scores: { agency: 2, ad: 1 },
        primary: "agency"
      },
      {
        id: "mixed",
        label: "线上和线下都在做",
        scores: { content: 2, ad: 1 },
        primary: "content"
      }
    ]
  },
  {
    id: "stores",
    title: "目前几家店？",
    when: (answers) => answers.business && answers.business !== "online",
    options: [
      {
        id: "single",
        label: "1 家",
        scores: { agency: 1, ad: 1 },
        primary: "agency"
      },
      {
        id: "small",
        label: "2-5 家",
        scores: { ad: 2, agency: 1 },
        primary: "ad"
      },
      {
        id: "large",
        label: "6 家以上",
        scores: { content: 1, ad: 1 },
        primary: "content"
      }
    ]
  }
];

const resultProfiles = {
  ad: {
    shortLabel: "直接起量型",
    title: "您现阶段更适合先把找客户跑起来",
    schemeLabel: "广告投放方案"
  },
  agency: {
    shortLabel: "专业代跑型",
    title: "您现阶段更适合让专业团队先帮您跑",
    schemeLabel: "专业代投方案"
  },
  content: {
    shortLabel: "经营放大型",
    title: "您现阶段更适合先搭好基础再放大",
    schemeLabel: "内容经营 + 投流方案"
  }
};

const loadingMessages = [
  "正在分析您的回答…",
  "正在对比同行业常见的三种做法",
  "马上告诉您更适合先走哪条路"
];

const businessLabels = {
  online: "线上经营",
  offline: "线下门店",
  mixed: "线上 + 线下"
};

const storeLabels = {
  single: "1 家店",
  small: "2-5 家店",
  large: "6 家以上"
};

const currentMethodLabels = {
  coldcall: "电话/加微信",
  referral: "转介绍/熟人",
  content: "内容获客",
  ads: "线上推广"
};

const concernShorts = {
  a: "缺客户线索",
  b: "获客不稳定",
  c: "内容与获客脱节"
};

const contentAbilityShorts = {
  none: "没有内容能力",
  weak: "内容未成体系",
  other: "其他平台有经验",
  strong: "有持续内容能力"
};

const participationShorts = {
  a: "自己主导",
  b: "协作推进",
  c: "交给专业团队"
};

const state = {
  currentQuestionIndex: 0,
  scores: { ad: 0, agency: 0, content: 0 },
  answers: {},
  answerPrimaries: {},
  loadingTimer: null,
  loadingTextTimer: null
};

const screens = {
  intro: document.getElementById("screen-intro"),
  quiz: document.getElementById("screen-quiz"),
  loading: document.getElementById("screen-loading"),
  result: document.getElementById("screen-result")
};

const questionTitle = document.getElementById("question-title");
const questionOptions = document.getElementById("question-options");
const progressLabel = document.getElementById("progress-label");
const progressPercent = document.getElementById("progress-percent");
const progressFill = document.getElementById("progress-fill");
const loadingText = document.getElementById("loading-text");
const resultTypeShort = document.getElementById("result-type-short");
const resultTypeTitle = document.getElementById("result-type-title");
const resultScore = document.getElementById("result-score");
const resultSummaryText = document.getElementById("result-summary-text");
const traitList = document.getElementById("trait-list");
const actionList = document.getElementById("action-list");
const situationCards = document.getElementById("situation-cards");

function getActiveQuestions() {
  return questionBank.filter((question) => !question.when || question.when(state.answers));
}

function showScreen(name) {
  Object.values(screens).forEach((screen) => screen.classList.remove("active"));
  screens[name].classList.add("active");
}

function renderQuestion() {
  const questions = getActiveQuestions();
  const currentQuestion = questions[state.currentQuestionIndex];
  const currentStep = state.currentQuestionIndex + 1;
  const percent = Math.round((currentStep / questions.length) * 100);

  progressLabel.textContent = `路径判断 ${currentStep} / ${questions.length}`;
  progressPercent.textContent = `${percent}%`;
  progressFill.style.width = `${percent}%`;
  questionTitle.textContent = currentQuestion.title;

  questionOptions.innerHTML = "";
  currentQuestion.options.forEach((option, index) => {
    const button = document.createElement("button");
    button.className = "option-btn";
    button.innerHTML = `
      <span class="option-tag">${String.fromCharCode(65 + index)}</span>
      <span class="option-text">${option.label}</span>
    `;
    button.addEventListener("click", () => selectAnswer(currentQuestion, option));
    questionOptions.appendChild(button);
  });
}

function selectAnswer(question, option) {
  state.answers[question.id] = option.id;
  state.answerPrimaries[question.id] = option.primary;

  Object.entries(option.scores).forEach(([type, value]) => {
    state.scores[type] += value;
  });

  const questions = getActiveQuestions();
  if (state.currentQuestionIndex < questions.length - 1) {
    state.currentQuestionIndex += 1;
    renderQuestion();
    return;
  }

  startLoadingAndShowResult();
}

function resolveResultType() {
  const entries = Object.entries(state.scores);
  const maxScore = Math.max(...entries.map(([, score]) => score));
  const candidates = entries.filter(([, score]) => score === maxScore).map(([type]) => type);

  if (candidates.length === 1) {
    return candidates[0];
  }

  const tieBreakOrder = [
    state.answerPrimaries.currentMethod,
    state.answerPrimaries.goal,
    state.answerPrimaries.contentAbility,
    state.answerPrimaries.participation,
    state.answerPrimaries.business,
    state.answerPrimaries.stores
  ];

  for (const answerType of tieBreakOrder) {
    if (answerType && candidates.includes(answerType)) {
      return answerType;
    }
  }

  return candidates[0];
}

function computeMatchScore(type) {
  const base = { ad: 78, agency: 79, content: 80 }[type] || 78;
  const scoreBoost = Math.round(state.scores[type] * 2.2);
  const businessBoost = state.answers.business === "mixed" ? 2 : 1;
  const storeBoost = state.answers.stores === "large" ? 2 : state.answers.stores ? 1 : 0;
  return Math.min(base + scoreBoost + businessBoost + storeBoost, 96);
}

function buildMethodComparison(type) {
  const method = state.answers.currentMethod;
  if (method === "coldcall") {
    if (type === "ad") return "相比一个一个打电话，广告投放能让客户主动找上门，效率完全不在一个量级。";
    if (type === "agency") return "相比自己打电话找客户，专业团队能帮您系统化获客，不再靠人力硬扛。";
    return "打电话只能一对一，把内容和经营基础搭好后，一条内容可能带来一批客户。";
  }
  if (method === "referral") {
    if (type === "ad") return "转介绍虽然精准但量有限，广告投放能帮您打开新客源，不再只等老客户介绍。";
    if (type === "agency") return "转介绍量不稳定，让专业团队做投放可以持续补充新客源。";
    return "转介绍加上内容经营，能让更多潜在客户主动关注您，不再只靠圈子。";
  }
  if (method === "content") {
    if (type === "ad") return "内容获客见效慢，先用投放快速验证哪些客户愿意买单，再反哺内容方向。";
    if (type === "agency") return "内容做得不错但转化不稳定，让团队帮您把投放和内容串起来。";
    return "您已经有内容基础，下一步是把内容、承接和投放串成一套完整链路。";
  }
  if (method === "ads") {
    if (type === "ad") return "已经在做推广，说明方向对。下一步是优化投放效率，让每一块钱花得更值。";
    if (type === "agency") return "已经在做推广但效果不稳定，交给专业团队做精细化运营可能更合适。";
    return "已经有投放基础，下一步是把内容经营和投放结合起来，降低长期获客成本。";
  }
  return "";
}

function buildResultSummary(type) {
  return buildMethodComparison(type);
}

function buildBusinessInsight() {
  if (state.answers.business === "online") {
    return "线上经营，优先把咨询入口和承接跑顺。";
  }
  if (state.answers.business === "offline") {
    if (state.answers.stores === "single") return "单店阶段，动作越清楚越容易持续。";
    if (state.answers.stores === "small") return "多店阶段，更看重动作能不能复制。";
    return "门店较多，需要兼顾短期线索和长期放大。";
  }
  if (state.answers.business === "mixed") {
    return "线上线下都在做，更看重整体承接能力。";
  }
  return "";
}

function buildAnalysisList(type) {
  const businessInsight = buildBusinessInsight();
  const ca = state.answers.contentAbility;

  if (type === "ad") {
    return [
      "当前更像先验证阶段，启动速度比完整打法更重要。",
      ca === "none"
        ? "内容能力还没有，一上来做重容易散。"
        : ca === "weak"
          ? "内容有一些但不成体系，先把有效入口跑出来更实际。"
          : ca === "other"
            ? "其他平台有经验，但微信获客需要先单独验证。"
            : "有内容能力，但眼下优先验证线索和转化效率。",
      businessInsight
    ].filter(Boolean).slice(0, 3);
  }

  if (type === "agency") {
    return [
      "核心不是您想不想做，而是自己扛执行容易断。",
      ca === "none"
        ? "内容和执行都不稳定，借助成熟团队更现实。"
        : ca === "weak"
          ? "内部节奏还没稳，先让专业团队把动作带起来。"
          : ca === "other"
            ? "其他平台有经验，微信这块交给团队起步更快。"
            : "有能力但缺稳定推进机制，执行容易卡。",
      businessInsight
    ].filter(Boolean).slice(0, 3);
  }

  return [
    "您已经适合把整条获客链路一起考虑。",
    ca === "strong"
      ? "有内容能力，不必只停留在短期起量。"
      : ca === "other"
        ? "其他平台有经验，迁移到微信后可以一起放大。"
        : ca === "weak"
          ? "有一些基础，重点是把动作稳定下来。"
          : "内容能力还弱，但问题不只是缺线索，链路需要搭起来。",
    businessInsight
  ].filter(Boolean).slice(0, 3);
}

function buildActionList(type) {
  if (type === "ad") {
    return [
      state.answers.business === "online"
        ? "先把咨询入口和跟进话术整理清楚，再测试第一轮。"
        : state.answers.business === "offline"
          ? "先按门店范围和到店承接方式设计第一轮获客动作。"
          : "先分清线上咨询和线下到店两个目标，别混着跑。",
      "小范围验证哪些人群和素材更容易带来有效咨询。",
      "有第一轮反馈后，再决定加量还是补承接环节。"
    ];
  }

  if (type === "agency") {
    return [
      state.answers.business === "offline"
        ? "先把门店承接区域和跟进流程整理给执行团队。"
        : state.answers.business === "mixed"
          ? "先把线上和线下两类目标拆开，让团队分口径推进。"
          : "先把线索标准和预算范围定清楚，再开始推进。",
      "专业团队负责执行，您重点盯线索质量和成交情况。",
      "先跑一轮标准化测试，再决定是否继续放大。"
    ];
  }

  return [
    state.answers.business === "online"
      ? "先把内容、咨询承接和私域动作连起来。"
      : state.answers.business === "offline"
        ? "先把门店内容、到店承接和转化流程串起来。"
        : "先把线上内容、线下承接和后续跟进分工清楚。",
    "用轻量内容验证哪些表达和案例最能吸引目标客户。",
    "内容和承接稳定后，再配合投流放大。"
  ];
}

function renderList(container, items) {
  container.innerHTML = items.map((item) => `<li>${item}</li>`).join("");
}

function renderResult() {
  const resultType = resolveResultType();
  const profile = resultProfiles[resultType];
  const score = computeMatchScore(resultType);
  const analysisList = buildAnalysisList(resultType);
  const actionItems = buildActionList(resultType);

  resultTypeShort.textContent = profile.shortLabel;
  resultTypeTitle.textContent = profile.title;
  resultScore.textContent = score;
  resultSummaryText.textContent = buildResultSummary(resultType);
  renderList(traitList, analysisList);
  renderList(actionList, actionItems);

  // 生意情况卡片
  const cards = [];
  cards.push({ label: "当前获客方式", value: currentMethodLabels[state.answers.currentMethod] || "—" });
  cards.push({ label: "经营形式", value: businessLabels[state.answers.business] || "—" });
  if (state.answers.stores) {
    cards.push({ label: "门店规模", value: storeLabels[state.answers.stores] });
  }
  cards.push({ label: "内容能力", value: contentAbilityShorts[state.answers.contentAbility] || "—" });
  cards.push({ label: "推进偏好", value: participationShorts[state.answers.participation] || "—" });
  cards.push({ label: "对应方案", value: profile.schemeLabel });

  situationCards.innerHTML = cards.map((c) =>
    `<div class="situation-item"><span class="sit-label">${c.label}</span><span class="sit-value">${c.value}</span></div>`
  ).join("");
}

function startLoadingAndShowResult() {
  let loadingIndex = 0;
  loadingText.textContent = loadingMessages[loadingIndex];
  showScreen("loading");

  clearInterval(state.loadingTextTimer);
  clearTimeout(state.loadingTimer);

  state.loadingTextTimer = setInterval(() => {
    loadingIndex = (loadingIndex + 1) % loadingMessages.length;
    loadingText.textContent = loadingMessages[loadingIndex];
  }, 720);

  state.loadingTimer = setTimeout(() => {
    clearInterval(state.loadingTextTimer);
    renderResult();
    showScreen("result");
  }, 2200);
}

function resetState() {
  state.currentQuestionIndex = 0;
  state.scores = { ad: 0, agency: 0, content: 0 };
  state.answers = {};
  state.answerPrimaries = {};
  clearInterval(state.loadingTextTimer);
  clearTimeout(state.loadingTimer);
  renderQuestion();
}

function initEvents() {
  document.querySelector('[data-action="start"]').addEventListener("click", () => {
    resetState();
    showScreen("quiz");
  });

  document.querySelector('[data-action="restart"]').addEventListener("click", () => {
    resetState();
    showScreen("intro");
  });
}

function init() {
  renderQuestion();
  initEvents();
}

init();
