const questionBank = [
  {
    id: "goal",
    title: "针对你的生意获客，目前最优先做的是？",
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
    title: "如果开始做这件事，谁来负责？",
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
    title: "朋友圈、视频号这些，你现在做得怎么样？",
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
    title: "当前生意上最卡你的是什么？",
    options: [
      {
        id: "a",
        label: "客户太少，第一批线索还没着落",
        scores: { ad: 3 },
        primary: "ad"
      },
      {
        id: "b",
        label: "有获客想法，但不知道怎么落地执行",
        scores: { agency: 3 },
        primary: "agency"
      },
      {
        id: "c",
        label: "已经在做一些内容和运营，但不知道怎么持续出效果",
        scores: { content: 3 },
        primary: "content"
      }
    ]
  },
  {
    id: "business",
    title: "你的生意主要在哪里做？",
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
    title: "你现阶段更适合先把找客户跑起来",
    schemeLabel: "纯广告投放方案"
  },
  agency: {
    shortLabel: "专业代跑型",
    title: "你现阶段更适合让专业团队先帮你跑",
    schemeLabel: "第三方线索代投方案"
  },
  content: {
    shortLabel: "扎根放大型",
    title: "你现阶段更适合先搭好基础再放大",
    schemeLabel: "内容加热 + 投流方案"
  }
};

const loadingMessages = [
  "正在分析你的回答…",
  "正在对比同行业常见的三种做法",
  "马上告诉你更适合先走哪条路"
];

const businessLabels = {
  online: "线上经营为主",
  offline: "线下门店为主",
  mixed: "线上和线下都在做"
};

const storeLabels = {
  single: "1 家门店",
  small: "2-5 家门店",
  large: "6 家以上门店"
};

const concernTexts = {
  a: "你当前最缺的是第一批客户线索。",
  b: "你有获客想法但还没找到落地执行的路子。",
  c: "你已经在做内容和运营，但还没跑出持续效果。"
};

const contentStateTexts = {
  a: "目前微信内容基本没做，短期更适合先选更轻或更省心的起步方式。",
  b: "内容断断续续在做但还没章法，暂时不适合一上来把内容做得太重。",
  c: "你已经有人在持续做内容，适合把内容经营和后续放大一起考虑。"
};

const participationTexts = {
  a: "你更希望自己掌握推进节奏。",
  b: "你更接受和专业团队一起推进，关键动作自己来定。",
  c: "你更希望把执行交给专业团队，自己主要盯结果。"
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
    ad: `你当前更像处在"先验证、先起量"的阶段——与其一上来把动作做重，不如先把有效咨询和线索跑出来，再决定后面怎么放大。`,
    agency: `你当前更需要解决的是"谁来稳定推进"这个问题——执行长期挂在自己或内部团队身上，很多动作容易停在半路。`,
    content: `你的问题已经不只是缺一波线索，更关键的是把吸引客户、承接客户和后续放大串成一条线，先搭好基础再发力。`
  };

  return summaries[type];
}

function buildBusinessInsight() {
  if (state.answers.business === "online") {
    return "你现在更适合先把线上咨询入口和后续承接跑顺，避免流量来了却接不住。";
  }

  if (state.answers.business === "offline") {
    if (state.answers.stores === "single") {
      return "你现在更像单店经营阶段，动作越清楚、越容易持续执行，比一开始铺太多更重要。";
    }

    if (state.answers.stores === "small") {
      return "你目前已经不是单点试水，判断时会更看重动作能不能复制到几家门店一起跑。";
    }

    return "你现在门店不算少，判断时不只看短期线索，还会看后面能不能稳定放大。";
  }

  if (state.answers.business === "mixed") {
    return "你不是单一场景，判断时会更看重线上线下能不能一起承接，而不是只看某一个点的效果。";
  }

  return "";
}

function buildAnalysisList(type) {
  const businessInsight = buildBusinessInsight();

  if (type === "ad") {
    return [
      "你当前更像处在先验证能不能跑起来的阶段，启动速度比完整打法更重要。",
      state.answers.contentState === "a"
        ? "以你现在的内容情况，如果一上来把重心放在长期内容经营上，见效会慢，也容易把动作做散。"
        : state.answers.contentState === "b"
          ? "内容有一些但还没稳，还不到适合把整套经营链路做重的阶段，先把有效入口跑出来会更稳。"
          : "虽然内容已有一定基础，但眼下更优先的还是先验证线索和转化效率。",
      state.answers.concern === "a"
        ? "现实压力更偏向尽快看到第一批反馈，所以更适合先起量、再优化。"
        : state.answers.concern === "b"
          ? "就算也在意省力，现阶段更关键的还是先把动作做轻、把反馈跑出来，而不是同时铺太多事。"
          : "最卡的是链路没串起来——先有一条能快速验证的入口，反而更容易看清后面该补哪里。",
      businessInsight
    ].filter(Boolean).slice(0, 3);
  }

  if (type === "agency") {
    return [
      "核心不是你想不想自己做，而是当前自己硬扛执行，推进很容易断。",
      state.answers.contentState === "a"
        ? "内容和内部执行都还不稳定，借助成熟团队会比自己从零摸索更现实。"
        : state.answers.contentState === "b"
          ? "内部节奏还没稳住，先让专业团队把动作带起来更合适。"
          : "即便有一定基础，如果内部没有稳定推进机制，很多动作最后还是会卡在执行上。",
      state.answers.concern === "b"
        ? "最卡的就是人手和精力，这也是更适合借助团队的关键原因。"
        : state.answers.concern === "a"
          ? "当然也想快点看到结果，但如果没人持续盯执行，自己做反而容易边跑边掉速。"
          : "链路复杂度不是完全不能做，而是当前不值得自己先从零试错。",
      businessInsight
    ].filter(Boolean).slice(0, 3);
  }

  return [
    "你现在已经适合把整条找客链路一起考虑，而不是只盯短期动作。",
    state.answers.contentState === "c"
      ? "已经有一定内容能力或稳定投入条件，不必只停留在短期起量。"
      : state.answers.contentState === "b"
        ? "已经有一些基础，下一步更重要的不是继续零散尝试，而是把这些动作稳定下来。"
        : "虽然基础还不算强，但从整体情况看，问题已经不只是缺线索，而是整套链路需要搭起来。",
    state.answers.concern === "c"
      ? "最卡的就是各种动作串不起来，所以更适合先把基础搭顺。"
      : state.answers.concern === "a"
        ? "当然也需要结果，但如果只盯短期反馈，后面还是会反复回到基础没搭好的问题上。"
        : "如果长期没人推进，这条路也会空转，后面最好尽快明确谁来持续做内容和经营动作。",
    businessInsight
  ].filter(Boolean).slice(0, 3);
}

function buildActionList(type) {
  if (type === "ad") {
    return [
      state.answers.business === "online"
        ? "先把咨询入口、留资方式和后续跟进话术整理清楚，再去测试第一轮动作。"
        : state.answers.business === "offline"
          ? "先按门店范围、服务半径和到店承接方式设计第一轮找客动作。"
          : "先分清线上咨询和线下到店两个承接目标，别混在一起跑。",
      "先用更直接的方式小范围验证，看哪些人群、素材和入口更容易带来有效咨询。",
      "有第一轮有效反馈后，再决定是继续加量，还是补承接和转化环节。"
    ];
  }

  if (type === "agency") {
    return [
      state.answers.business === "offline"
        ? "先把门店可承接区域、接待方式和销售跟进流程整理给执行团队。"
        : state.answers.business === "mixed"
          ? "先把线上成交和线下到店两类目标拆开，让执行团队按不同口径推进。"
          : "先把线索标准、预算范围和数据回传方式定清楚，再开始推进。",
      "让专业团队负责执行和优化，你这边重点盯线索质量、跟进效率和实际成交情况。",
      "先跑一轮标准化测试，再根据结果决定是不是继续放大。"
    ];
  }

  return [
    state.answers.business === "online"
      ? "先把内容主题、咨询承接和私域后续动作连起来，别只做单条内容。"
      : state.answers.business === "offline"
        ? "先把门店内容、到店承接和后续转化流程串起来，再考虑怎么放大。"
        : "先把线上内容、线下承接和后续跟进三件事分工清楚，再一起推进。",
    "先用轻量内容验证哪些表达、案例和产品信息最能吸引目标客户。",
    "等内容和承接稳定后，再配合投流去放大，而不是一开始就只追求起量。"
  ];
}

function buildPersonalizedText(type) {
  const businessText = businessLabels[state.answers.business] || "生意形式待补充";
  const storeText = state.answers.stores ? `，目前是 ${storeLabels[state.answers.stores]}` : "";
  const concernText = concernTexts[state.answers.concern] || "";
  const contentStateText = contentStateTexts[state.answers.contentState] || "";
  const participationText = participationTexts[state.answers.participation] || "";

  const typeLead = {
    ad: "结合你的情况，你现阶段更适合先从更直接的找客动作切入。",
    agency: "结合你的情况，你现阶段更适合先让专业团队把找客户这件事带起来。",
    content: "结合你的情况，你现阶段更适合先把内容、经营和后续放大动作串起来。"
  };

  return `${typeLead[type]} 主要看了三件事：你目前是${businessText}${storeText}；${contentStateText}${participationText}${concernText}`;
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
  cards.push({ label: "生意形式", value: businessLabels[state.answers.business] || "—" });
  if (state.answers.stores) {
    cards.push({ label: "门店规模", value: storeLabels[state.answers.stores] });
  }
  cards.push({ label: "内容现状", value: contentStateTexts[state.answers.contentState] || "—" });
  cards.push({ label: "当前卡点", value: concernTexts[state.answers.concern] || "—" });
  cards.push({ label: "推进方式", value: participationTexts[state.answers.participation] || "—" });
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
