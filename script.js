const questions = [
  {
    title: 'Clear AI use cases',
    help: 'Your team has identified specific workflows where AI could save time, improve quality, or reduce bottlenecks.'
  },
  {
    title: 'Data access and quality',
    help: 'The data, documents, and knowledge needed for priority AI use cases are findable, current, and reasonably clean.'
  },
  {
    title: 'Privacy and security guardrails',
    help: 'Your team knows what information can and cannot be shared with AI tools.'
  },
  {
    title: 'Team AI literacy',
    help: 'Team members understand AI strengths, limitations, hallucination risk, and prompt basics.'
  },
  {
    title: 'Workflow integration',
    help: 'AI experiments can fit into existing tools and processes rather than creating extra manual work.'
  },
  {
    title: 'Leadership sponsorship',
    help: 'A decision-maker is ready to prioritize time, budget, and accountability for AI adoption.'
  },
  {
    title: 'Measurement plan',
    help: 'Your team can define success metrics such as hours saved, cycle time, quality, or customer response speed.'
  },
  {
    title: 'Change management capacity',
    help: 'Your team has time and habits for testing, documenting, training, and improving new ways of working.'
  },
  {
    title: 'Tool governance',
    help: 'Someone owns tool selection, vendor review, access management, and periodic policy updates.'
  },
  {
    title: 'Experimentation mindset',
    help: 'The team is comfortable running small pilots, learning from failures, and scaling what works.'
  }
];

const bands = [
  {
    min: 80,
    label: 'AI-ready accelerator',
    summary: 'Your team is well positioned to run focused pilots and scale successful AI workflows with clear governance.',
    recommendations: [
      'Pick one high-value pilot and define a 30-day success metric.',
      'Document reusable prompts, policies, and review steps as you learn.',
      'Create a lightweight adoption dashboard to track benefits and risks.'
    ]
  },
  {
    min: 60,
    label: 'Promising foundation',
    summary: 'You have many building blocks in place, but a few gaps could slow adoption or increase risk.',
    recommendations: [
      'Prioritize the lowest-scoring categories before buying new tools.',
      'Write a one-page AI usage policy for data, review, and approval rules.',
      'Run a small internal pilot before rolling AI into customer-facing work.'
    ]
  },
  {
    min: 40,
    label: 'Early-stage adopter',
    summary: 'Your team can start learning now, but should focus on fundamentals before depending on AI for critical work.',
    recommendations: [
      'Choose one low-risk workflow, such as summarization or drafting, for practice.',
      'Train the team on safe prompting, fact-checking, and sensitive-data handling.',
      'Inventory key documents and data sources needed for future use cases.'
    ]
  },
  {
    min: 0,
    label: 'Readiness builder',
    summary: 'Start with education, governance, and a narrow use case so AI adoption does not create avoidable confusion or risk.',
    recommendations: [
      'Hold a short AI basics session covering risks, benefits, and approved tools.',
      'Name an AI owner who can coordinate policy, pilots, and questions.',
      'List three repetitive tasks and evaluate which one is safe to experiment with first.'
    ]
  }
];

const questionsContainer = document.querySelector('#questions');
const scoreValue = document.querySelector('#scoreValue');
const scoreBand = document.querySelector('#scoreBand');
const resultsHeading = document.querySelector('#results-heading');
const resultSummary = document.querySelector('#resultSummary');
const recommendations = document.querySelector('#recommendations');
const resetButton = document.querySelector('#resetButton');

function renderQuestions() {
  questionsContainer.innerHTML = questions.map((question, index) => `
    <fieldset class="question">
      <legend>${index + 1}. ${question.title}</legend>
      <p>${question.help}</p>
      <div class="scale" role="radiogroup" aria-label="${question.title}">
        ${[1, 2, 3, 4, 5].map((value) => `
          <label>
            <input type="radio" name="question-${index}" value="${value}" />
            <span>${value}</span>
            <small>${value === 1 ? 'Not yet' : value === 5 ? 'Strong' : ' '}</small>
          </label>
        `).join('')}
      </div>
    </fieldset>
  `).join('');
}

function calculateScore() {
  const selected = [...document.querySelectorAll('input[type="radio"]:checked')];
  const total = selected.reduce((sum, input) => sum + Number(input.value), 0);
  return Math.round((total / (questions.length * 5)) * 100);
}

function getBand(score) {
  return bands.find((band) => score >= band.min);
}

function updateResults() {
  const answered = document.querySelectorAll('input[type="radio"]:checked').length;
  const score = calculateScore();
  const band = getBand(score);

  scoreValue.textContent = `${score}%`;
  scoreBand.textContent = answered === 0 ? 'Not started' : `${band.label} · ${answered}/${questions.length} answered`;

  if (answered < questions.length) {
    resultsHeading.textContent = 'Keep going to complete your readiness score';
    resultSummary.textContent = `${questions.length - answered} question${questions.length - answered === 1 ? '' : 's'} remaining. Your guidance will update as you answer.`;
  } else {
    resultsHeading.textContent = band.label;
    resultSummary.textContent = band.summary;
  }

  recommendations.innerHTML = band.recommendations.map((item) => `<li>${item}</li>`).join('');
}

function resetQuiz() {
  document.querySelectorAll('input[type="radio"]').forEach((input) => {
    input.checked = false;
  });
  updateResults();
}

renderQuestions();
questionsContainer.addEventListener('change', updateResults);
resetButton.addEventListener('click', resetQuiz);
updateResults();
