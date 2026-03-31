const questionBank = [
  {
    id: "goal",
    title: "针对您的生意获客，目前最优先做的是？",
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
        label: "先把吸引客户、承接客户的基础打好，再慢慢放大",
        scores: { content: 2 },
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
    id: "contentState",
    title: "朋友圈、视频号这些，您现在做得怎么样？",
    options: [
      {
        id: "a",
        label: "基本没做，也没人管这事",
        scores: { agency: 2, ad: 1 },
        primary: "agency"
      },
      {
        id: "b",
        label: "断断续续在发，但还没什么章法",
        scores: { ad: 1, agency: 1, content: 1 },
        primary: "ad"
      },
      {
        id: "c",
        label: "一直在做，有人专门负责",
        scores: { content: 3 },
        primary: "content"
      }
    ]
  },
  {
    id: "concern",
    title: "当前生意上的最大卡点是？",
    options: [
      {
        id: "a",
        label: "客户太少，第一批线索还没着落",
        scores: { ad: 3 },
        primary: "ad"
      },
      {
        id: "b",
        label: "客源不稳定，获客想法有但不知道怎么落地",
        scores: { agency: 3 },
        primary: "agency"
      },
      {
        id: "c",
        label: "已经在做内容和运营，但不知道怎么跟获客更有效地结合",
        scores: { content: 3 },
        primary: "content"
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
    schemeLabel: "纯广告投放方案"
  },
  agency: {
    shortLabel: "专业代跑型",
    title: "您现阶段更适合让专业团队先帮您跑",
    schemeLabel: "第三方线索代投方案"
  },
  content: {
    shortLabel: "扎根放大型",
    title: "您现阶段更适合先搭好基础再放大",
    schemeLabel: "内容加热 + 投流方案"
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

const concernShorts = {
  a: "缺客户线索",
  b: "获客难落地",
  c: "内容与获客脱节"
};

const contentStateShorts = {
  a: "内容还没起步",
  b: "内容不成体系",
  c: "有人持续在做"
};

const participationShorts = {
  a: "自己主导",
  b: "协作推进",
  c: "交给团队"
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
    state.answerPrimaries.goal,
    state.answerPrimaries.participation,
    state.answerPrimaries.contentState,
    state.answerPrimaries.concern,
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

function buildResultSummary(type) {
  const summaries = {
    ad: `您当前更像处在"先验证、先起量"的阶段——先把有效咨询和线索跑出来，再决定后面怎么放大。`,
    agency: `您当前更需要解决"谁来稳定推进"——执行长期挂在自己身上，很多动作容易停在半路。`,
    content: `您的问题不只是缺线索，更关键的是把吸引客户、承接客户和后续放大串成一条线。`
  };

  return summaries[type];
}

function buildBusinessInsight() {
  if (state.answers.business === "online") {
    return "线上经营，优先把咨询入口和承接跑顺。";
  }

  if (state.answers.business === "offline") {
    if (state.answers.stores === "single") {
      return "单店阶段，动作越清楚越容易持续。";
    }
    if (state.answers.stores === "small") {
      return "多店阶段，更看重动作能不能复制。";
    }
    return "门店较多，需要兼顾短期线索和长期放大。";
  }

  if (state.answers.business === "mixed") {
    return "线上线下都在做，更看重整体承接能力。";
  }

  return "";
}

function buildAnalysisList(type) {
  const businessInsight = buildBusinessInsight();

  if (type === "ad") {
    return [
      "当前更像先验证阶段，启动速度比完整打法更重要。",
      state.answers.contentState === "a"
        ? "内容还没起步，一上来做重容易散。"
        : state.answers.contentState === "b"
          ? "内容有一些但不稳，先把有效入口跑出来更实际。"
          : "有内容基础，但眼下优先验证线索和转化效率。",
      state.answers.concern === "a"
        ? "最缺线索，先起量再优化。"
        : state.answers.concern === "b"
          ? "获客想法有但难落地，先用最轻的方式验证。"
          : "内容和获客还没串起来，先跑一条验证通路。",
      businessInsight
    ].filter(Boolean).slice(0, 3);
  }

  if (type === "agency") {
    return [
      "核心不是您想不想做，而是自己扛执行容易断。",
      state.answers.contentState === "a"
        ? "内容和执行都不稳定，借助成熟团队更现实。"
        : state.answers.contentState === "b"
          ? "内部节奏还没稳，先让专业团队把动作带起来。"
          : "有基础但缺稳定推进机制，执行容易卡。",
      state.answers.concern === "b"
        ? "获客想法难落地，正是借助团队的好时机。"
        : state.answers.concern === "a"
          ? "缺线索也缺人盯，自己做容易掉速。"
          : "内容和获客要串起来，团队能帮您提效。",
      businessInsight
    ].filter(Boolean).slice(0, 3);
  }

  return [
    "您已经适合把整条获客链路一起考虑。",
    state.answers.contentState === "c"
      ? "有内容能力，不必只停留在短期起量。"
      : state.answers.contentState === "b"
        ? "有一些基础，重点是把动作稳定下来。"
        : "基础虽弱，但问题不只是缺线索，链路需要搭起来。",
    state.answers.concern === "c"
      ? "内容和获客脱节，更适合先把基础搭顺。"
      : state.answers.concern === "a"
        ? "也需要线索，但只盯短期反馈后面还是会卡。"
        : "落地执行是问题，后面需要明确谁持续做内容。",
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

  // 生意情况卡片（精简概括）
  const cards = [];
  cards.push({ label: "经营形式", value: businessLabels[state.answers.business] || "—" });
  if (state.answers.stores) {
    cards.push({ label: "门店规模", value: storeLabels[state.answers.stores] });
  }
  cards.push({ label: "内容现状", value: contentStateShorts[state.answers.contentState] || "—" });
  cards.push({ label: "最大卡点", value: concernShorts[state.answers.concern] || "—" });
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
