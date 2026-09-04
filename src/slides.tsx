import {
  AccountFunnel,
  ApprovalStage,
  CompareRow,
  ComputerStage,
  FactGrid,
  FirstDeliverable,
  FivePartFilled,
  FivePartTemplate,
  HireDiagram,
  JobCards,
  MemoryStage,
  OfficeStage,
  PluginMarket,
  PrimitivesRow,
  RosterGrowth,
  RosterPreview,
  TakeawayPair,
  TakeoverStage,
} from "./visuals";

export function SlideTitle() {
  return (
    <section className="slide slide-title">
      <img className="spacexai-lockup" src="/official/spacexai-wordmark.svg" alt="SpaceXAI" />
      <div className="title-copy">
        <h1>
          Grok Bot <span>101</span>
        </h1>
        <p className="byline">Agrim Singh · SpaceXAI · September 2026</p>
      </div>
      <RosterPreview />
    </section>
  );
}

export function SlideWhatItIs() {
  return (
    <section className="slide">
      <h2>What Grok Bot is.</h2>
      <FactGrid
        facts={[
          ["You message it like a coworker.", "There is no prompt syntax to learn. You write to it the way you would write to a person who joined last week."],
          ["It signs into the tools you already use.", "Gmail, Slack, your calendar, the expense tool, the browser. Its computer keeps those sign-ins."],
          ["It keeps working after your laptop closes.", "The computer belongs to the Bot, not to your laptop. A job you start at midnight is finished in the morning."],
          ["It stops before anything you cannot undo.", "Sending, spending, deleting, publishing. It stops and waits for you. Most of tonight is about that stop."],
        ]}
      />
    </section>
  );
}

export function SlideFiveWords() {
  return (
    <section className="slide">
      <h2>There are only five things to learn.</h2>
      <PrimitivesRow />
      <p className="plain-note">You do not need to know about models, context windows or sandboxes to use it.</p>
    </section>
  );
}

export function SlideLeaveWith() {
  return (
    <section className="slide">
      <h2>What you will have by the end.</h2>
      <TakeawayPair />
    </section>
  );
}

export function SlideManyInboxes() {
  return (
    <section className="slide">
      <h2>Who here has more than one Slack?</h2>
      <AccountFunnel />
      <p className="plain-note">Most tools assume you have one email and one Slack. A Bot can be signed into all of yours at once.</p>
    </section>
  );
}

export function SlideComputer() {
  return (
    <section className="slide">
      <h2>Every Bot gets a computer that stays on.</h2>
      <ComputerStage />
      <p className="plain-note">Most AI agents run on your laptop, so they stop when you close it. A Bot runs on its own computer. Close the laptop and it keeps going.</p>
    </section>
  );
}

export function SlideOffice() {
  return (
    <section className="slide">
      <h2>Each Bot has its own memory. They all share one computer.</h2>
      <OfficeStage />
      <p className="plain-note">Because logins are shared, passing work between Bots is easy. It also means a second Bot does not add any safety. It can reach everything the first one can.</p>
    </section>
  );
}

export function SlideMemory() {
  return (
    <section className="slide">
      <h2>If you want the Bot to remember something, put it in a file.</h2>
      <MemoryStage />
      <p className="plain-note">Rules that last go in the Bot's description. Facts that change go in a file, and the description tells the Bot to reread it.</p>
    </section>
  );
}

export function SlideCompare() {
  return (
    <section className="slide">
      <h2>How it compares to ChatGPT, OpenClaw and Hermes.</h2>
      <CompareRow />
      <p className="plain-note">You can keep a self-hosted setup for tinkering and still move the daily, repetitive work onto Grok Bot.</p>
    </section>
  );
}

export function SlideJobs() {
  return (
    <section className="slide">
      <h2>Three jobs from the official list. Pick one.</h2>
      <JobCards />
      <p className="plain-note">The catalogue has fifty-six jobs. These three are the ones a room can set up in twenty minutes, and each one already says where it stops.</p>
    </section>
  );
}

export function SlideHire() {
  return (
    <section className="slide">
      <h2>Set up two Bots: a Chief of Staff and one specialist.</h2>
      <HireDiagram />
    </section>
  );
}

export function SlideFiveParts() {
  return (
    <section className="slide">
      <h2>How to write the first task.</h2>
      <FivePartTemplate />
      <p className="plain-note">Write all five before you press enter. The Bot does exactly the job you described, so say where it should stop as carefully as what it should do.</p>
    </section>
  );
}

export function SlideFiveFilled() {
  return (
    <section className="slide">
      <h2>The first task, written out for each job.</h2>
      <FivePartFilled />
    </section>
  );
}

export function SlideDeliverable() {
  return (
    <section className="slide">
      <h2>The first result is something you can check, not something already done.</h2>
      <FirstDeliverable />
    </section>
  );
}

export function SlidePlugins() {
  return (
    <section className="slide">
      <h2>Plugins are how a Bot gets into your apps.</h2>
      <PluginMarket />
    </section>
  );
}

export function SlideApproval() {
  return (
    <section className="slide">
      <h2>What it looks like when the Bot stops to ask you.</h2>
      <ApprovalStage />
    </section>
  );
}

export function SlideTakeover() {
  return (
    <section className="slide">
      <h2>When a login comes up, you type the password, not the Bot.</h2>
      <TakeoverStage />
      <p className="plain-note">You take over its screen, type the password or the code yourself, and hand it back. Nothing you typed ends up in the chat.</p>
    </section>
  );
}

export function SlideBotFive() {
  return (
    <section className="slide">
      <h2>Start with two Bots. Not five.</h2>
      <RosterGrowth />
    </section>
  );
}

export const SLIDES = [
  SlideTitle,
  SlideWhatItIs,
  SlideLeaveWith,
  SlideFiveWords,
  SlideManyInboxes,
  SlideComputer,
  SlideOffice,
  SlideMemory,
  SlideCompare,
  SlideJobs,
  SlideHire,
  SlideFiveParts,
  SlideFiveFilled,
  SlideDeliverable,
  SlidePlugins,
  SlideApproval,
  SlideTakeover,
  SlideBotFive,
] as const;
