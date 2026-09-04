import { useState, type CSSProperties, type ReactNode } from "react";

export type BotShape = "blob" | "cloud" | "squircle" | "wedge";
type FaceProps = { color?: string; className?: string; animated?: boolean; shape?: BotShape };

const BOT_CENTER = 114.2705;
const BOT_TAU = Math.PI * 2;

const roundPathNumber = (value: number) => Math.round(value * 100) / 100;
const smoothClosedPath = (points: Array<[number, number]>) => {
  const first = points[0];
  if (!first) return "";
  let path = `M${roundPathNumber(first[0])} ${roundPathNumber(first[1])}`;
  for (let index = 0; index < points.length; index += 1) {
    const before = points[(index - 1 + points.length) % points.length]!;
    const current = points[index]!;
    const after = points[(index + 1) % points.length]!;
    const next = points[(index + 2) % points.length]!;
    path += `C${roundPathNumber(current[0] + (after[0] - before[0]) / 6)} ${roundPathNumber(current[1] + (after[1] - before[1]) / 6)} ${roundPathNumber(after[0] - (next[0] - current[0]) / 6)} ${roundPathNumber(after[1] - (next[1] - current[1]) / 6)} ${roundPathNumber(after[0])} ${roundPathNumber(after[1])}`;
  }
  return `${path}Z`;
};

const squirclePath = smoothClosedPath(
  Array.from({ length: 128 }, (_, index) => {
    const angle = (index / 128) * BOT_TAU;
    const x = Math.cos(angle);
    const y = Math.sin(angle);
    return [BOT_CENTER + Math.sign(x) * Math.pow(Math.abs(x), 2 / 4.2) * 107, BOT_CENTER + Math.sign(y) * Math.pow(Math.abs(y), 2 / 4.2) * 107] as [number, number];
  }),
);
const cloudPath = smoothClosedPath(
  Array.from({ length: 160 }, (_, index) => {
    const angle = (index / 160) * BOT_TAU;
    const x = Math.cos(angle);
    const y = Math.sin(angle);
    let radius = 0;
    for (const [cx, cy, circleRadius] of [
      [BOT_CENTER - 62, BOT_CENTER + 26, 56],
      [BOT_CENTER + 62, BOT_CENTER + 26, 54],
      [BOT_CENTER, BOT_CENTER + 34, 62],
      [BOT_CENTER - 24, BOT_CENTER - 30, 62],
      [BOT_CENTER + 38, BOT_CENTER - 26, 54],
    ] as const) {
      const dx = cx - BOT_CENTER;
      const dy = cy - BOT_CENTER;
      const projection = x * dx + y * dy;
      const discriminant = projection * projection - (dx * dx + dy * dy) + circleRadius * circleRadius;
      if (discriminant > 0) radius = Math.max(radius, projection + Math.sqrt(discriminant));
    }
    return [BOT_CENTER + x * radius, BOT_CENTER + y * radius] as [number, number];
  }),
);
const botHeadPaths: Record<BotShape, string> = {
  blob: "M228.541 114.228C228.541 130.133 225.184 145.994 218.738 160.534C212.674 174.217 203.904 186.669 193.065 196.988C155.933 232.34 99.497 238.596 55.5255 212.24C45.097 205.99 35.6851 198.072 27.7451 188.866C19.1926 178.953 12.3686 167.569 7.65781 155.351C2.60712 142.264 0 128.257 0 114.228C0 98.3219 3.35751 82.4611 9.80315 67.9215C15.8672 54.2382 24.6377 41.7862 35.4767 31.4668C72.6081 -3.88483 129.044 -10.1413 173.016 16.2153C183.444 22.4653 192.856 30.3829 200.796 39.5896C209.349 49.5018 216.173 60.8859 220.883 73.1037C225.934 86.1906 228.541 100.198 228.541 114.228Z",
  cloud: cloudPath,
  squircle: squirclePath,
  wedge: "M77.26 42.06Q114.27 -22.05 151.28 42.06L216.15 154.43Q253.17 218.53 179.14 218.53L49.4 218.53Q-24.62 218.53 12.39 154.43Z",
};

/** Grok Bot face geometry from the x.ai/bot product demo. */
export function GrokBotFace({ color = "#ff8a2a", className = "", animated = true, shape = "blob" }: FaceProps) {
  return (
    <span className={`grok-bot-face ${animated ? "is-animated" : ""} ${className}`} style={{ "--bot-color": color } as CSSProperties}>
      <svg aria-hidden="true" viewBox="-15 -15 259 259" xmlns="http://www.w3.org/2000/svg">
        <path className="grok-bot-face__head" d={botHeadPaths[shape]} />
        <g className="grok-bot-face__eyes">
          <path d="M130.36 45.98L132.71 46.19L134.98 46.81L137.11 47.83L138.97 49.28L140.47 51.09L141.68 53.12L142.73 55.23L143.76 57.36L144.78 59.49L145.79 61.62L146.79 63.76L147.76 65.91L148.71 68.07L149.63 70.25L150.52 72.43L151.37 74.63L151.99 76.91L152.10 79.26L151.64 81.57L150.59 83.68L149.04 85.45L147.10 86.78L144.90 87.62L142.56 87.93L140.22 87.71L137.98 86.99L135.93 85.82L134.17 84.24L132.78 82.34L131.69 80.25L130.77 78.08L129.87 75.89L128.94 73.72L128.00 71.56L127.03 69.40L126.05 67.26L125.05 65.12L124.03 62.99L122.93 60.90L121.87 58.79L121.03 56.59L120.72 54.26L121.10 51.93L122.15 49.83L123.75 48.10L125.76 46.89L128.01 46.19Z" />
          <path d="M176.61 37.08L178.72 37.59L180.70 38.48L182.52 39.65L184.20 41.03L185.71 42.59L187.03 44.31L188.20 46.14L189.26 48.03L190.27 49.96L191.26 51.89L192.23 53.84L193.16 55.80L194.05 57.78L194.92 59.77L195.74 61.78L196.53 63.80L197.27 65.84L197.97 67.90L198.47 70.01L198.63 72.18L198.40 74.33L197.58 76.33L195.95 77.72L193.83 78.08L191.71 77.65L189.76 76.69L188.03 75.38L186.53 73.82L185.28 72.05L184.25 70.13L183.40 68.14L182.63 66.11L181.87 64.07L181.07 62.05L180.25 60.04L179.39 58.05L178.49 56.07L177.57 54.10L176.61 52.15L175.62 50.22L174.59 48.31L173.53 46.41L172.54 44.48L171.86 42.42L171.76 40.26L172.62 38.30L174.45 37.19Z" />
        </g>
      </svg>
    </span>
  );
}

export const CHIEF = { color: "#FF781C", shape: "blob" as BotShape };
export const INBOX = { color: "#1CC3B0", shape: "cloud" as BotShape };
export const EXPENSE = { color: "#FFAF38", shape: "squircle" as BotShape };
export const SALES = { color: "#A97EFE", shape: "wedge" as BotShape };

export function Pill({ tone = "neutral", children }: { tone?: "neutral" | "good" | "wait" | "stop"; children: ReactNode }) {
  return <em className={`pill pill-${tone}`}>{children}</em>;
}

/* Slide 1: a small roster preview. */
export function RosterPreview() {
  return (
    <div className="roster-preview" aria-label="A Grok Bot roster with two Bots">
      <div className="roster-row">
        <GrokBotFace {...CHIEF} />
        <span>
          <b>Chief of Staff</b>
          <small>Nothing changed since 9:00. Two things need you this afternoon.</small>
        </span>
        <time>Now</time>
      </div>
      <div className="roster-row">
        <GrokBotFace {...INBOX} />
        <span>
          <b>Inbox Manager</b>
          <small>Four reply drafts are waiting for you. Nothing was sent.</small>
        </span>
        <time>12m</time>
      </div>
      <div className="roster-stop">
        <span>Stopped before sending</span>
        <b>Send this reply to Acme?</b>
        <div>
          <i>Not yet</i>
          <i className="go">Send</i>
        </div>
      </div>
    </div>
  );
}

/* Slide 5: five words, one row each. */
export function PrimitivesRow() {
  const items: Array<[string, string, string]> = [
    ["Bot", "A teammate with a name, its own memory, its own computer and its own tools.", "Chief of Staff"],
    ["Chat", "Where you talk to one Bot, or to a group of them.", "Message Chief of Staff"],
    ["Prompt", "An instruction. Use it once, save it as a Skill, or schedule it as a Routine.", "Every weekday at 8:00"],
    ["Tool", "How a Bot reaches software: a plugin, the browser, the shell, or its computer.", "Gmail · Slack · Chrome"],
    ["Artifact", "What the Bot leaves behind: a document, a draft, a sheet, a change to code.", "weekly-summary.md"],
  ];
  return (
    <ol className="word-list">
      {items.map(([name, body, sample], i) => (
        <li key={name}>
          <span>{i + 1}</span>
          <b>{name}</b>
          <p>{body}</p>
          <code>{sample}</code>
        </li>
      ))}
    </ol>
  );
}

/* Slide 3: the two things you leave with. */
export function TakeawayPair() {
  return (
    <div className="takeaway-pair">
      <article>
        <div className="takeaway-body">
          <span>1</span>
          <b>A Bot doing a job someone in this room already does.</b>
          <p>One Bot, one job, and a description you wrote yourself.</p>
        </div>
        <GrokBotFace {...CHIEF} className="takeaway-bot" />
      </article>
      <article className="gate">
        <div className="takeaway-body">
          <span>2</span>
          <b>A rule about when it has to ask.</b>
          <p>If the Bot is about to send, publish, buy, delete or sign anything, it stops and asks you. Everything up to that point it does on its own.</p>
        </div>
        <div className="gate-words">
          <i>send</i>
          <i>publish</i>
          <i>buy</i>
          <i>delete</i>
          <i>sign</i>
        </div>
      </article>
    </div>
  );
}

/* Slide 14: many accounts into one Bot. */
export function AccountFunnel() {
  const mail = ["you@company.com", "you@sideproject.co", "you@university.edu", "you@gmail.com"];
  const slack = ["Company", "Investors", "Podcast", "Community", "Alumni", "Clients", "Family"];
  return (
    <div className="account-funnel">
      <div className="account-col">
        <span>Four email addresses</span>
        {mail.map((m) => (
          <i key={m}>{m}</i>
        ))}
      </div>
      <div className="account-col">
        <span>Seven Slack workspaces</span>
        {slack.map((s) => (
          <i key={s}>{s}</i>
        ))}
      </div>
      <div className="funnel-lines" aria-hidden="true" />
      <div className="funnel-bot">
        <GrokBotFace {...CHIEF} className="funnel-face" />
        <b>One Bot</b>
        <small>reads all of them, in one place</small>
      </div>
    </div>
  );
}

/* Slide 6: the computer that stays on. */
export function ComputerStage() {
  return (
    <div className="computer-stage">
      <div className="computer-stage__screen">
        <img src="/official/mood-mountain.webp" alt="" />
        <div className="screen-app-mini terminal-mini">
          <header>
            <i />
            <i />
            <i />
          </header>
          <p>
            $ run weekly-summary
            <br />
            reading 14 receipts
            <br />✓ summary saved
          </p>
        </div>
        <div className="screen-app-mini browser-mini">
          <header>
            <i />
            <i />
            <i />
          </header>
          <div>
            <span />
            <span />
          </div>
        </div>
        <div className="screen-dock-mini">
          <img src="/official/computer-terminal.png" alt="Terminal" />
          <img src="/official/computer-safari.png" alt="Browser" />
        </div>
        <GrokBotFace {...CHIEF} className="computer-stage__bot" />
      </div>
      <div className="computer-stage__facts">
        <article>
          <b>Browser</b>
          <span>stays signed in to your tools</span>
        </article>
        <article>
          <b>Files</b>
          <span>stay where the Bot left them</span>
        </article>
        <article>
          <b>Tools</b>
          <span>are installed once and kept</span>
        </article>
        <article>
          <b>Routines</b>
          <span>run on schedule, laptop open or not</span>
        </article>
      </div>
    </div>
  );
}

/* Slide 7: one office, desks, one set of keys. */
export function OfficeStage() {
  const desks = [
    { name: "Chief of Staff", ...CHIEF, memory: "your calendar habits, who matters this week" },
    { name: "Inbox Manager", ...INBOX, memory: "which senders are urgent, your reply tone" },
    { name: "Expense Manager", ...EXPENSE, memory: "your categories, who owes a receipt" },
  ];
  return (
    <div className="office-stage">
      <div className="office-desks">
        {desks.map((d) => (
          <article key={d.name}>
            <GrokBotFace color={d.color} shape={d.shape} />
            <b>{d.name}</b>
            <small>Own memory and routines</small>
            <p>{d.memory}</p>
          </article>
        ))}
      </div>
      <div className="office-floor">
        <b>One computer. One set of logins.</b>
        <span>Browser sign-ins, installed tools, plugins and saved Skills are shared by every Bot on the account.</span>
      </div>
    </div>
  );
}

/* Slide 8: chat is history, a file is memory. */
export function MemoryStage() {
  return (
    <div className="memory-stage">
      <article className="memory-chat">
        <header>Chat · last Tuesday</header>
        <div className="fade">
          <p className="me">Sarah moved to the Berlin office, so treat her mail as European hours.</p>
          <p>Noted.</p>
          <p className="me">Also, receipts over 200 need a project code now.</p>
          <p>Understood.</p>
        </div>
        <footer>Twelve conversations later, this is far up the scroll.</footer>
      </article>
      <div className="memory-arrow" aria-hidden="true">
        →
      </div>
      <article className="memory-file">
        <header>
          <code>expense-rules.md</code>
          <span>the Bot rereads this before every run</span>
        </header>
        <pre>{`# Rules that change
- Sarah is in Berlin. European hours.
- Receipts over 200 need a project code.
- Q3 travel goes to cost centre 41.

# Ask before
- Any reimbursement
- Any message to a vendor`}</pre>
      </article>
    </div>
  );
}

/* Appendix: three names. */
export function CompareRow() {
  const items: Array<[string, string, string]> = [
    ["ChatGPT Projects", "A chat with files attached.", "It does not have a computer that stays on after you leave, and it does not sign into the rest of your tools as a coworker would."],
    ["OpenClaw", "Software you run on your own machine.", "You pick the machine, connect each tool yourself, and keep it running. The most control and the most maintenance."],
    ["Hermes", "Plain files on your own machine.", "Who the agent is lives in SOUL.md, what it knows in MEMORY.md. You see everything because you are the one running it."],
  ];
  return (
    <div className="compare-row">
      {items.map(([name, line, body]) => (
        <article key={name}>
          <header>{name}</header>
          <b>{line}</b>
          <p>{body}</p>
        </article>
      ))}
      <article className="active">
        <header>
          <GrokBotFace {...CHIEF} animated={false} />
          Grok Bot
        </header>
        <b>A coworker on a computer xAI runs.</b>
        <p>xAI runs the computer. You only touch files when you want the Bot to remember something. Rooms and handoffs between Bots are built in.</p>
      </article>
    </div>
  );
}

/* Slide 4: three job cards, official wording. */
export function JobCards() {
  const jobs = [
    { name: "Inbox Manager", ...INBOX, does: "Sorts your inbox, flags what is urgent or where someone is waiting on you, and drafts replies.", stops: "It sends nothing until you approve it." },
    { name: "Expense Manager", ...EXPENSE, does: "Logs receipts that arrive by email, builds the weekly expense summary, and chases people for missing categories.", stops: "It pays or reimburses nothing without you." },
    { name: "Sales Outbound", ...SALES, does: "Researches accounts overnight, picks the contacts worth reaching, drafts emails in your voice, and leaves you a list to review.", stops: "It sends nothing until you approve each one." },
  ];
  return (
    <div className="job-cards">
      {jobs.map((j) => (
        <article key={j.name}>
          <header>
            <GrokBotFace color={j.color} shape={j.shape} />
            <b>{j.name}</b>
          </header>
          <p>{j.does}</p>
          <footer>
            <span>Where it asks you</span>
            {j.stops}
          </footer>
        </article>
      ))}
    </div>
  );
}

/* Slide 6: you, Chief, specialist. */
export function HireDiagram() {
  return (
    <div className="hire-diagram">
      <div className="hire-chain">
        <div className="hire-you">
          <span className="user-avatar">You</span>
          <small>you only talk to one Bot</small>
        </div>
        <i className="hire-wire" />
        <div className="hire-node chief">
          <GrokBotFace {...CHIEF} />
          <b>Chief of Staff</b>
          <small>routes work, reports back</small>
        </div>
        <i className="hire-wire" />
        <div className="hire-node">
          <GrokBotFace {...INBOX} />
          <b>The one the room picks</b>
          <small>Inbox, Expense or Sales Outbound</small>
        </div>
      </div>
      <article className="description-card">
        <header>
          <span>Description field</span>
          <small>That is enough to create the Bot. Plugins and the approval rule come next.</small>
        </header>
        <pre>{`You are my Chief of Staff. You watch my calendar, Slack and inbox.

Stay quiet if nothing changed. When something needs me, say what is done, what is blocked, and the one decision only I can make.

Never, without asking: send, publish, buy, delete, or sign.`}</pre>
      </article>
    </div>
  );
}

/* Slides 10 and 11: five-part request. */
const FIVE_PARTS: Array<[string, string]> = [
  ["Outcome", "What should be finished when the Bot stops?"],
  ["Sources", "Which apps, websites, files or conversations matter?"],
  ["Constraints", "What must the Bot avoid, or ask before doing?"],
  ["Deliverable", "What should it hand back, and in what shape?"],
  ["Review point", "Where does it stop and wait for you?"],
];

export function FivePartTemplate() {
  return (
    <ol className="word-list">
      {FIVE_PARTS.map(([name, q], i) => (
        <li key={name}>
          <span>{i + 1}</span>
          <b>{name}</b>
          <p>{q}</p>
        </li>
      ))}
    </ol>
  );
}

const FILLED: Record<string, { bot: typeof INBOX; parts: string[] }> = {
  "Inbox Manager": {
    bot: INBOX,
    parts: [
      "My inbox is sorted into Needs me today, Waiting on others, Newsletters, and Everything else. Threads where I am blocking someone are at the top.",
      "Gmail, and the Slack channels #ops and #leadership for context on who is waiting.",
      "Do not send, archive or delete anything. Do not reply to anyone outside the company.",
      "A short list in this chat: each urgent thread, one line on why, and a draft reply saved in my Drafts folder.",
      "Stop after the drafts are saved. I will read them and send the ones I agree with.",
    ],
  },
  "Expense Manager": {
    bot: EXPENSE,
    parts: [
      "Every receipt from the last week is logged, categorised, and matched to the sheet. Anything missing a category is listed by owner.",
      "Receipts arriving by email, the expense tool, and the shared sheet Q3 Expenses.",
      "Do not submit, approve, pay or reimburse anything. Do not message anyone outside the finance channel.",
      "A categorised list in this chat, and the updated sheet with new rows marked in yellow.",
      "Stop before any reimbursement and before any nudge goes out. I will send the nudges.",
    ],
  },
  "Sales Outbound": {
    bot: SALES,
    parts: [
      "Twenty accounts from this list are researched and scored. Each has one contact, a reason to reach out this week, and a draft in my voice.",
      "The target list in Sheets, LinkedIn, company websites, and my last fifty sent emails for tone.",
      "Do not send email, connect on LinkedIn, or message anyone. Do not invent facts or numbers about a company.",
      "A review table: account, contact, score, reason, and the draft. Drafts saved in Gmail as drafts.",
      "Stop when the table is ready. Nothing leaves until I approve each row.",
    ],
  },
};

export function FivePartFilled() {
  const names = Object.keys(FILLED);
  const [active, setActive] = useState(names[0]!);
  const current = FILLED[active]!;
  return (
    <div className="five-filled">
      <div className="five-tabs" role="tablist" aria-label="Choose a job">
        {names.map((n) => (
          <button key={n} type="button" role="tab" aria-selected={n === active} onClick={() => setActive(n)}>
            <GrokBotFace color={FILLED[n]!.bot.color} shape={FILLED[n]!.bot.shape} animated={false} />
            {n}
          </button>
        ))}
      </div>
      <div className="five-rows" key={active}>
        {FIVE_PARTS.map(([name], i) => (
          <div key={name}>
            <b>{name}</b>
            <p>{current.parts[i]}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* Slide 15: first deliverable. */
export function FirstDeliverable() {
  return (
    <div className="deliverable-stage">
      <div className="chat-card">
        <header>
          <GrokBotFace {...INBOX} />
          <span>
            <b>Inbox Manager</b>
            <small>first task · 9 minutes</small>
          </span>
          <Pill tone="good">Done</Pill>
        </header>
        <p className="me">Sort my inbox. Drafts only. Stop before anything is sent.</p>
        <div className="reply">
          <p>Went through 61 threads.</p>
          <ul>
            <li>
              <span>
                <b>Needs you today</b> Acme contract redline, board deck feedback, Priya's leave request
              </span>
            </li>
            <li>
              <span>
                <b>Waiting on others</b> 6 threads, nobody is blocked on you
              </span>
            </li>
            <li>
              <span>
                <b>Newsletters</b> 22, labelled and left alone
              </span>
            </li>
          </ul>
          <p>Three reply drafts are saved in your Drafts folder. I did not send, archive or delete anything.</p>
        </div>
      </div>
      <div className="deliverable-rules">
        <article>
          <GrokBotFace {...INBOX} animated={false} />
          <b>Inbox or Sales</b>
          <p>The first thing it hands you is a list of drafts. Nothing sent.</p>
        </article>
        <article>
          <GrokBotFace {...EXPENSE} animated={false} />
          <b>Expense</b>
          <p>The first thing it hands you is a sorted list of receipts. Nothing paid.</p>
        </article>
      </div>
    </div>
  );
}

/* Slide 7: the plugin marketplace. */
type PluginRow = { name: string; blurb: string; added: boolean; color: string; letter: string };
const FEATURED_PLUGINS: PluginRow[] = [
  { name: "Gmail", blurb: "Search, read, draft, and manage email.", added: true, color: "#ea4335", letter: "M" },
  { name: "Google Calendar", blurb: "Search events and schedule meetings.", added: true, color: "#4285f4", letter: "31" },
  { name: "Google Drive", blurb: "Search, read, create, and share files.", added: true, color: "#34a853", letter: "▲" },
  { name: "Granola", blurb: "Read and search your meeting notes.", added: false, color: "#7bb661", letter: "G" },
  { name: "Slack", blurb: "Read channels, search history, post as you.", added: true, color: "#611f69", letter: "#" },
  { name: "X", blurb: "Read X, draft posts and replies.", added: false, color: "#f3f5f7", letter: "X" },
];
const PLUGIN_TABS = ["All", "Featured", "Inbox and Collaboration", "Documents and Files", "Finance and Legal", "Sales", "Scheduling", "MCP"];

export function PluginMarket() {
  return (
    <div className="plugin-stage">
      <div className="market" aria-label="The Plugins screen in Grok Bot">
        <header>
          <b>Plugins</b>
          <span>25 installed · 7 private</span>
        </header>
        <div className="market-search">Search plugins</div>
        <div className="market-tabs">
          {PLUGIN_TABS.map((tab, i) => (
            <i key={tab} className={i === 0 ? "on" : ""}>
              {tab}
            </i>
          ))}
        </div>
        <div className="market-label">Featured</div>
        <div className="market-grid">
          {FEATURED_PLUGINS.map((pl) => (
            <article key={pl.name}>
              <span className="market-icon" style={{ "--icon": pl.color } as CSSProperties}>
                {pl.letter}
              </span>
              <span className="market-copy">
                <b>{pl.name}</b>
                <small>{pl.blurb}</small>
              </span>
              {pl.added ? <em className="added">Added</em> : <em className="add">Add</em>}
            </article>
          ))}
        </div>
      </div>
      <aside className="plugin-explain">
        <div>
          <b>A plugin is a connection to one app.</b>
          <p>Gmail, Slack, your calendar, your CRM.</p>
        </div>
        <div>
          <b>Add it once for the account.</b>
          <p>Then tell each Bot which ones to use. Every Bot can still reach all of them.</p>
        </div>
        <div>
          <b>Your own tools go here too.</b>
          <p>Anything your team builds, or an MCP server, sits next to the public ones.</p>
        </div>
      </aside>
    </div>
  );
}

/* Slide 8: the approval card. */
export function ApprovalStage() {
  return (
    <div className="approval-stage">
      <article className="email-card">
        <header>
          <b>New email</b>
          <Pill tone="wait">Ready to send</Pill>
        </header>
        <dl>
          <dt>From</dt>
          <dd>you@yourcompany.com</dd>
          <dt>To</dt>
          <dd>sarah@acme.com</dd>
          <dt>Subject</dt>
          <dd>Moving Friday's review to 2 PM</dd>
        </dl>
        <p>
          Hi Sarah, could we move Friday's design review from 11 AM to 2 PM? A client call came up and I do not want to rush our discussion. Thanks.
        </p>
        <footer>
          <button type="button" className="primary">
            Send email
          </button>
          <button type="button">Discard</button>
        </footer>
        <span className="stopped-here">
          <GrokBotFace {...INBOX} animated={false} /> The Bot stopped here and is waiting for you.
        </span>
      </article>
      <aside className="approval-rules">
        <b>Set once, in Settings</b>
        <ul>
          <li>
            <Pill tone="stop">Require approval</Pill> send · publish · buy · delete · sign
          </li>
          <li>
            <Pill tone="good">Always allow</Pill> read · search · draft · summarise
          </li>
        </ul>
        <p>When two rules collide, Require approval wins.</p>
        <p>You are not done setting up until you have watched the Bot stop and ask you once.</p>
      </aside>
    </div>
  );
}

/* Slide 9: sign-in happens on the Bot's computer. */
export function TakeoverStage() {
  const levels: Array<[string, string, string]> = [
    ["Status", "A small icon in the title bar turns purple while the Bot's computer is busy.", "glance"],
    ["Preview", "Open a side panel and watch the screen without leaving the chat.", "look"],
    ["Takeover", "Open the computer full screen, take control, do the sign-in, hand it back.", "sit down"],
  ];
  return (
    <div className="takeover-stage">
      <div className="takeover-levels">
        {levels.map(([name, body, verb], i) => (
          <article key={name} className={i === 2 ? "active" : ""}>
            <span>{verb}</span>
            <b>{name}</b>
            <p>{body}</p>
          </article>
        ))}
      </div>
      <article className="takeover-screen">
        <img src="/official/mood-mountain.webp" alt="" />
        <div className="login-window">
          <header>
            <i />
            <i />
            <i />
            <span>accounts.google.com</span>
          </header>
          <div>
            <b>Enter the code from your phone</b>
            <span className="code-boxes">
              <i>4</i>
              <i>8</i>
              <i>1</i>
              <i />
              <i />
              <i />
            </span>
          </div>
        </div>
        <div className="takeover-banner">
          <b>You have control</b>
          <span>Hand it back when you are done</span>
        </div>
      </article>
    </div>
  );
}

/* Slide 17: the roster gets noisy around Bot 4 or 5. */
export function RosterGrowth() {
  const bots = [
    { n: 1, name: "Chief of Staff", state: "quiet and useful", tone: "good" as const, ...CHIEF },
    { n: 2, name: "Inbox Manager", state: "drafts waiting", tone: "good" as const, ...INBOX },
    { n: 3, name: "Expense Manager", state: "fine, if you have that job", tone: "neutral" as const, ...EXPENSE },
    { n: 4, name: "Research", state: "wrote the same summary as Chief of Staff", tone: "stop" as const, color: "#2A92FE", shape: "squircle" as BotShape },
    { n: 5, name: "Thumbnails", state: "edited a file another Bot was working on", tone: "stop" as const, color: "#FF47A6", shape: "blob" as BotShape },
  ];
  return (
    <div className="roster-growth">
      <ol>
        {bots.map((b) => (
          <li key={b.n} className={b.tone}>
            <span>{b.n}</span>
            <GrokBotFace color={b.color} shape={b.shape} animated={b.tone !== "stop"} />
            <b>{b.name}</b>
            <Pill tone={b.tone}>{b.state}</Pill>
          </li>
        ))}
      </ol>
      <aside className="growth-copy">
        <b>What goes wrong with five</b>
        <ul>
          <li>Two Bots doing the same work</li>
          <li>Two Bots writing the same file</li>
          <li>Updates nobody asked for</li>
        </ul>
        <p className="rule">Add a Bot when there is a whole job for it. Not because one step of an existing job is annoying.</p>
      </aside>
    </div>
  );
}

/* Slide 18: three things to do before leaving. */
export function Checklist() {
  const steps: Array<[string, string, typeof CHIEF]> = [
    ["Create Chief of Staff.", "Write the description in your own words. Keep the line about asking first.", CHIEF],
    ["Create one specialist.", "Inbox Manager, Expense Manager or Sales Outbound. Add the plugins it needs.", INBOX],
    ["Run one task with all five parts.", "Then ask it to send one draft, and watch it stop.", EXPENSE],
  ];
  return (
    <ol className="checklist">
      {steps.map(([title, body, bot], i) => (
        <li key={title}>
          <span className="check-box">{i + 1}</span>
          <GrokBotFace {...bot} />
          <div>
            <b>{title}</b>
            <p>{body}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
