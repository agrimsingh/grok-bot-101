import { useState, type CSSProperties } from "react";
import { CHIEF, EXPENSE, GrokBotFace, INBOX, SALES, type BotShape } from "./visuals";

type Routine = readonly [string, string];
type Bot = {
  name: string;
  title: string;
  description: string;
  color: string;
  shape: BotShape;
  hasComputer: boolean;
  time: string;
  preview: string;
  prompt: string;
  reply: string;
  event: string;
  status: "Working" | "Done";
  routines: readonly Routine[];
};

const RESEARCH = { color: "#2A92FE", shape: "squircle" as BotShape };

const bots: readonly Bot[] = [
  {
    name: "Chief of Staff",
    title: "Routes work, reports back",
    description: "Watches the calendar, Slack and inbox. Stays quiet if nothing changed. Never sends, publishes, buys, deletes or signs without asking.",
    ...CHIEF,
    hasComputer: true,
    time: "Now",
    preview: "Nothing changed since 9:00. Two things need you.",
    prompt: "Anything I need to know before the 2 PM?",
    reply: "Nothing changed since 9:00. Two things need you: Sarah asked to move Friday's review, and the Acme invoice is still waiting on your approval. Everything else is handled.",
    event: "Four drafts saved. Nothing sent.",
    status: "Working",
    routines: [
      ["Morning briefing", "Weekdays at 7:30"],
      ["Friday wrap-up", "Fridays at 17:00"],
    ],
  },
  {
    name: "Inbox Manager",
    title: "Sorts, flags, drafts",
    description: "Sorts the inbox, flags what is urgent, drafts replies. Nothing is sent until you approve it.",
    ...INBOX,
    hasComputer: false,
    time: "12m",
    preview: "Four reply drafts are waiting for you.",
    prompt: "Sort my inbox. Draft replies for anything urgent. Do not send.",
    reply: "Sorted. Four threads need you today, and a draft reply for each is saved in your Drafts folder. Nothing was sent.",
    event: "Inbox sorted · 4 drafts saved",
    status: "Done",
    routines: [["Inbox sweep", "Weekdays at 8:00"]],
  },
  {
    name: "Expense Manager",
    title: "Logs receipts, chases categories",
    description: "Logs receipts that arrive by email and builds the weekly summary. Nothing is paid or submitted without you.",
    ...EXPENSE,
    hasComputer: false,
    time: "1h",
    preview: "Three receipts are missing a category.",
    prompt: "Log this week's receipts and tell me what is missing.",
    reply: "Logged 14 receipts. Three have no category, and I have asked the people who sent them. Nothing was submitted.",
    event: "14 receipts logged · 3 need a category",
    status: "Done",
    routines: [["Weekly summary", "Fridays at 16:00"]],
  },
  {
    name: "Sales Outbound",
    title: "Researches, drafts, never sends",
    description: "Researches accounts overnight, picks the contacts worth reaching and drafts first emails. You approve each one.",
    ...SALES,
    hasComputer: false,
    time: "3h",
    preview: "Twelve contacts to review.",
    prompt: "Research the accounts on the list and draft first emails.",
    reply: "Twelve contacts worth reaching, one line each on why, and a draft email for every one. They are in your Drafts. None are sent.",
    event: "12 drafts saved",
    status: "Done",
    routines: [],
  },
  {
    name: "Research",
    title: "Reads, compares, summarises",
    description: "Reads what you point it at and comes back with a summary and a table. Does not contact anyone.",
    ...RESEARCH,
    hasComputer: true,
    time: "Yesterday",
    preview: "Vendor comparison is in the chat.",
    prompt: "Compare the three vendors on the shortlist.",
    reply: "One page on each vendor, and a table comparing price, contract length and support. I did not contact any of them.",
    event: "3 vendors compared",
    status: "Done",
    routines: [],
  },
];

const ROOM = "Monday room";

function BotIdentity({ bot, animated = true }: { bot: Bot; animated?: boolean }) {
  return <GrokBotFace color={bot.color} shape={bot.shape} animated={animated} />;
}

function GroupIdentity() {
  return (
    <span className="group-identity" aria-label={ROOM}>
      <GrokBotFace {...INBOX} />
      <GrokBotFace {...EXPENSE} />
      <GrokBotFace {...CHIEF} />
    </span>
  );
}

type Panel = "none" | "computer" | "settings" | "group" | "groupSettings" | "picker" | "screen";

/** Slide 2: the whole app, clickable. */
export function GrokBotWindow() {
  const [selected, setSelected] = useState(0);
  const [panel, setPanel] = useState<Panel>("none");
  const [isGroup, setIsGroup] = useState(true);
  const [exchangeOpen, setExchangeOpen] = useState(false);
  const [optionChoice, setOptionChoice] = useState<string | null>(null);
  const [optionDismissed, setOptionDismissed] = useState(false);
  const active = bots[selected] ?? bots[0]!;
  const partner = active.name === "Chief of Staff" ? bots[1]! : bots[0]!;

  const openBot = (index: number) => {
    setSelected(index);
    setIsGroup(false);
    setExchangeOpen(false);
    setPanel("none");
  };

  return (
    <div className="baby-grok-bot" aria-label="The Grok Bot app. Click a Bot, the computer icon, or the room info.">
      <div className="baby-grok-bot-shell">
        <aside className="baby-grok-bot-sidebar">
          <div className="baby-grok-bot-traffic-lights" aria-hidden="true">
            <i />
            <i />
            <i />
          </div>
          <div className="baby-grok-bot-sidebar-header">
            <span className="traffic-spacer" />
            <button type="button" aria-label="New chat or room" className="cursor-icon" onClick={() => setPanel(panel === "picker" ? "none" : "picker")}>
              &#xea60;
            </button>
          </div>
          <label className="baby-grok-bot-chat-search">
            <span className="cursor-icon">&#xea6d;</span>
            <input aria-label="Search chats" placeholder="Search" />
          </label>
          <div className="baby-grok-bot-sidebar-list">
            <button
              type="button"
              className="baby-grok-bot-agent-row group-row"
              data-active={isGroup ? "" : undefined}
              onClick={() => {
                setIsGroup(true);
                setPanel("none");
              }}
            >
              <GroupIdentity />
              <span className="baby-grok-bot-agent-row__body">
                <span className="agent-row-title">
                  <b>{ROOM}</b>
                  <time>Now</time>
                </span>
                <small>Three Bots planning the week.</small>
              </span>
            </button>
            {bots.map((bot, index) => (
              <button type="button" className="baby-grok-bot-agent-row" data-active={!isGroup && selected === index ? "" : undefined} key={bot.name} onClick={() => openBot(index)}>
                <BotIdentity bot={bot} />
                <span className="baby-grok-bot-agent-row__body">
                  <span className="agent-row-title">
                    <b>{bot.name}</b>
                    <time>{bot.time}</time>
                  </span>
                  <small>{bot.preview}</small>
                </span>
              </button>
            ))}
          </div>
          <div className="baby-grok-bot-sidebar-footer">
            <span className="user-avatar">You</span>
            <span>Your account</span>
          </div>
        </aside>

        <main className="baby-grok-bot-chat" style={{ "--current-bot": active.color } as CSSProperties}>
          <header className="baby-grok-bot-compose-header">
            <button type="button" className="agent-title" onClick={() => setPanel("none")}>
              {isGroup ? <GroupIdentity /> : <BotIdentity bot={active} animated={false} />}
              <span>{isGroup ? ROOM : active.name}</span>
            </button>
            {isGroup ? (
              <button
                type="button"
                className="baby-grok-bot-window-action cursor-icon"
                aria-label="Open room info"
                data-active={panel === "group" || panel === "groupSettings" ? "" : undefined}
                onClick={() => setPanel(panel === "group" || panel === "groupSettings" ? "none" : "group")}
              >
                &#xea74;
              </button>
            ) : (
              <button
                type="button"
                className="baby-grok-bot-window-action cursor-icon"
                aria-label={`Open ${active.name}'s computer`}
                data-active={panel === "computer" ? "" : undefined}
                onClick={() => setPanel(panel === "computer" ? "none" : "computer")}
              >
                &#xea7a;
              </button>
            )}
          </header>

          <div className="baby-grok-bot-transcript" key={isGroup ? ROOM : active.name}>
            <div className="transcript-time">Now</div>
            <div className="message user-message">
              {isGroup ? (
                <>
                  Get me ready for the week. <span className="mention-chip">Inbox Manager</span> sort the inbox, <span className="mention-chip">Expense Manager</span> close out last week's receipts. Nothing goes out without me.
                </>
              ) : (
                active.prompt
              )}
            </div>
            {isGroup ? (
              <>
                <div className="handoff-pills" aria-label="Bots passing work to one another">
                  <span style={{ "--pill-color": INBOX.color } as CSSProperties}>
                    <GrokBotFace {...INBOX} animated={false} />
                    <b>Asking Inbox Manager…</b>
                  </span>
                  <span style={{ "--pill-color": EXPENSE.color } as CSSProperties}>
                    <GrokBotFace {...EXPENSE} animated={false} />
                    <b>Asking Expense Manager…</b>
                  </span>
                  <span style={{ "--pill-color": CHIEF.color } as CSSProperties}>
                    <GrokBotFace {...CHIEF} animated={false} />
                    <b>Back to Chief of Staff…</b>
                  </span>
                </div>
                <div className="bot-attributed-message">
                  <header>
                    <GrokBotFace {...INBOX} animated={false} />
                    <b>Inbox Manager</b>
                  </header>
                  <p>Four threads need you today. Draft replies are saved. Nothing was sent.</p>
                </div>
                <div className="bot-attributed-message">
                  <header>
                    <GrokBotFace {...EXPENSE} animated={false} />
                    <b>Expense Manager</b>
                  </header>
                  <p>Fourteen receipts logged. Three are missing a category, and I have asked for them.</p>
                </div>
                <div className="bot-attributed-message">
                  <header>
                    <GrokBotFace {...CHIEF} animated={false} />
                    <b>Chief of Staff</b>
                  </header>
                  <p>Two decisions for you this morning: Friday's review time, and the Acme invoice. Everything else is done.</p>
                </div>
              </>
            ) : (
              <>
                <div className="message agent-message">{active.reply}</div>
                {active.name === "Chief of Staff" && !optionDismissed && (
                  <article className="option-card">
                    <div className="option-card-title">
                      <strong>Friday's review. Which one?</strong>
                      <button type="button" aria-label="Dismiss choices" onClick={() => setOptionDismissed(true)}>
                        ×
                      </button>
                    </div>
                    <div className="option-list">
                      {(
                        [
                          ["A", "Move it to 2 PM"],
                          ["B", "Keep it at 11"],
                          ["C", "Skip this week"],
                        ] as const
                      ).map(([key, label]) => (
                        <button type="button" key={key} data-selected={optionChoice === key ? "" : undefined} onClick={() => setOptionChoice(key)}>
                          <span>{key}</span>
                          {label}
                        </button>
                      ))}
                    </div>
                    <input aria-label="Type your own answer" placeholder={optionChoice ? `Selected ${optionChoice}. Or type your own answer` : "Type your own answer"} />
                  </article>
                )}
                <button type="button" className="bot-exchange-event" onClick={() => setExchangeOpen(!exchangeOpen)}>
                  <span>Messaged</span>
                  <BotIdentity bot={partner} animated={false} />
                  <b>{partner.name}</b>
                  <i>{exchangeOpen ? "⌃" : "⌄"}</i>
                </button>
                {exchangeOpen && (
                  <div className="bot-exchange-card">
                    <div>
                      <BotIdentity bot={active} animated={false} />
                      <span>
                        <b>{active.name}</b>
                        <p>{active.name === "Chief of Staff" ? "What is waiting on the inbox side?" : "Done with the task. Here is the summary."}</p>
                      </span>
                    </div>
                    <div>
                      <BotIdentity bot={partner} animated={false} />
                      <span>
                        <b>{partner.name}</b>
                        <p>{active.name === "Chief of Staff" ? partner.event : "Noted. I will put it in the briefing."}</p>
                      </span>
                    </div>
                  </div>
                )}
              </>
            )}
            {!isGroup && active.hasComputer && (
              <article className="baby-grok-bot-card computer-card">
                <div className="card-head">
                  <span className="card-owner">
                    <BotIdentity bot={active} animated={false} />
                    <strong>Computer</strong>
                  </span>
                  <span data-tone={active.status === "Done" ? "success" : "info"}>{active.status}</span>
                </div>
                <p>{active.name}'s computer</p>
                <div className="computer-preview">
                  <img src="/official/mood-mountain.webp" alt="" />
                  <div className="remote-window">
                    <header>
                      <i />
                      <i />
                      <i />
                    </header>
                    <div>
                      <span className="remote-line long" />
                      <span className="remote-line" />
                      <span className="remote-line short" />
                    </div>
                  </div>
                  <span className="agent-cursor">➤</span>
                </div>
                <button type="button" onClick={() => setPanel("computer")}>
                  Open screen
                </button>
              </article>
            )}
          </div>

          <div className="baby-grok-bot-composer">
            <button type="button" className="cursor-icon" aria-label="Add context">
              &#xea60;
            </button>
            <span>Message {isGroup ? ROOM : active.name}</span>
            <button type="button" className="voice cursor-icon" aria-label="Voice message">
              &#xec12;
            </button>
          </div>

          {panel === "picker" && (
            <div className="baby-grok-bot-picker">
              <label>
                <span>To:</span>
                <input autoFocus aria-label="Search or create Bots" placeholder="Search or create Bots" />
              </label>
              <div className="picker-results">
                <button type="button">
                  <span className="picker-plus">+</span>Create new Bot
                </button>
                {bots.map((bot, index) => (
                  <button type="button" key={bot.name} onClick={() => openBot(index)}>
                    <BotIdentity bot={bot} animated={false} />
                    {bot.name}
                  </button>
                ))}
              </div>
            </div>
          )}

          {(panel === "computer" || panel === "settings") && (
            <aside className="baby-grok-bot-detail-panel" data-panel={panel}>
              {panel === "computer" ? (
                <header className="detail-panel-header computer-panel-header">
                  <span />
                  <span className="detail-panel-actions">
                    <button type="button" className="cursor-icon" aria-label="Bot settings" onClick={() => setPanel("settings")}>
                      &#xeaf8;
                    </button>
                    <button type="button" className="cursor-icon" aria-label="Close panel" onClick={() => setPanel("none")}>
                      &#xed82;
                    </button>
                  </span>
                </header>
              ) : (
                <header className="detail-panel-header settings-panel-header">
                  <button type="button" className="cursor-icon" aria-label="Back to computer" onClick={() => setPanel("computer")}>
                    &#xeab5;
                  </button>
                  <strong>Settings</strong>
                  <button type="button" className="cursor-icon" aria-label="Close panel" onClick={() => setPanel("none")}>
                    &#xed82;
                  </button>
                </header>
              )}
              {panel === "computer" ? (
                <>
                  <button type="button" className="detail-screen" aria-label={`Open ${active.name}'s full computer`} onClick={() => setPanel("screen")}>
                    <img src="/official/mood-mountain.webp" alt="" />
                    <span className="detail-terminal" />
                    <span className="detail-browser" />
                    <span className="detail-dock">
                      <img src="/official/computer-terminal.png" alt="" />
                      <img src="/official/computer-safari.png" alt="" />
                    </span>
                    <i className="detail-cursor" />
                  </button>
                  <p className="detail-caption">{active.name}'s screen</p>
                  <div className="routines">
                    <span>Routines</span>
                    {active.routines.length ? (
                      active.routines.map(([name, schedule]) => (
                        <div key={name}>
                          <i className="cursor-icon">&#xedc0;</i>
                          <b>{name}</b>
                          <small>{schedule}</small>
                        </div>
                      ))
                    ) : (
                      <div className="routine-empty-inline">
                        <span>No routines yet</span>
                        <button type="button">Create routine</button>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <div className="settings-form">
                  <BotIdentity bot={active} />
                  <label>
                    Name
                    <input value={active.name} readOnly />
                  </label>
                  <label>
                    Title (optional)
                    <input value={active.title} readOnly />
                  </label>
                  <label>
                    Description
                    <textarea value={active.description} readOnly />
                  </label>
                  <div className="notification-row">
                    <span>
                      <b>Notifications</b>
                      <small>Get notified when this Bot finishes or needs you</small>
                    </span>
                    <i />
                  </div>
                </div>
              )}
            </aside>
          )}

          {(panel === "group" || panel === "groupSettings") && (
            <aside className="baby-grok-bot-detail-panel group-detail-panel" data-panel={panel}>
              {panel === "group" ? (
                <>
                  <header className="detail-panel-header group-panel-header">
                    <span />
                    <span className="detail-panel-actions">
                      <button type="button" className="cursor-icon" aria-label="Room settings" onClick={() => setPanel("groupSettings")}>
                        &#xeaf8;
                      </button>
                      <button type="button" className="cursor-icon collapse-panel" aria-label="Close room info" onClick={() => setPanel("none")}>
                        &#xf31d;
                      </button>
                    </span>
                  </header>
                  <div className="group-info-content">
                    <section className="group-members">
                      <h3>Members</h3>
                      {bots.slice(0, 3).map((bot) => (
                        <div key={bot.name}>
                          <BotIdentity bot={bot} animated={false} />
                          <span>{bot.name}</span>
                        </div>
                      ))}
                      <button type="button">
                        <span className="cursor-icon">&#xea60;</span>Add member
                      </button>
                    </section>
                    <section className="group-routines-empty">
                      <p>Routines are tasks this room runs on a schedule.</p>
                      <button type="button">Create routine</button>
                    </section>
                  </div>
                </>
              ) : (
                <>
                  <header className="detail-panel-header settings-panel-header">
                    <button type="button" className="cursor-icon" aria-label="Back to room info" onClick={() => setPanel("group")}>
                      &#xeab5;
                    </button>
                    <strong>Settings</strong>
                    <button type="button" className="cursor-icon" aria-label="Close panel" onClick={() => setPanel("none")}>
                      &#xed82;
                    </button>
                  </header>
                  <div className="group-settings-form">
                    <label>
                      Name
                      <input value={ROOM} readOnly />
                    </label>
                    <label>
                      Description
                      <textarea value="You, Chief of Staff, Inbox Manager and Expense Manager plan the week here. Each Bot keeps its own conversation. The room carries the handoffs." readOnly />
                    </label>
                    <div className="notification-row">
                      <span>
                        <b>Notifications</b>
                        <small>Get notified when a Bot finishes or the room needs you</small>
                      </span>
                      <i />
                    </div>
                  </div>
                </>
              )}
            </aside>
          )}

          {panel === "screen" && (
            <div className="baby-grok-bot-screen-layer">
              <button type="button" className="baby-grok-bot-screen-scrim" aria-label="Close computer" onClick={() => setPanel("none")} />
              <div className="baby-grok-bot-screen-frame">
                <button type="button" className="screen-close" aria-label="Close computer" onClick={() => setPanel("none")}>
                  ×
                </button>
                <img src="/official/mood-mountain.webp" alt="" />
                <div className="screen-app screen-terminal">
                  <header>
                    <i />
                    <i />
                    <i />
                  </header>
                  <div className="terminal-copy">
                    $ gws gmail drafts list
                    <br />
                    4 drafts · 0 sent
                    <br />
                    ✓ saved to Drafts
                    <br />
                    waiting for approval…
                  </div>
                </div>
                <div className="screen-app screen-browser">
                  <header>
                    <i />
                    <i />
                    <i />
                  </header>
                  <div className="screen-site">
                    <div className="site-cards">
                      <i />
                      <i />
                      <i />
                    </div>
                    <span />
                    <span />
                    <span />
                    <b>You</b>
                  </div>
                </div>
                <i className="screen-cursor" />
                <div className="screen-dock">
                  <img src="/official/computer-terminal.png" alt="Terminal" />
                  <img src="/official/computer-safari.png" alt="Safari" />
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
