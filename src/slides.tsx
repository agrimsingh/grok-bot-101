import {
  AccountFunnel,
  ApprovalStage,
  Checklist,
  CompareRow,
  ComputerStage,
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
import { GrokBotWindow } from "./window";

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

export function SlideApp() {
  return (
    <section className="slide slide-app">
      <h2>This is the whole app.</h2>
      <div className="app-demo-fit">
        <GrokBotWindow />
      </div>
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

export function SlideJobs() {
  return (
    <section className="slide">
      <h2>Pick one job.</h2>
      <JobCards />
      <p className="plain-note">The catalogue has fifty-six jobs. These three can be set up in twenty minutes, and each one already says where it stops.</p>
    </section>
  );
}

export function SlideFiveWords() {
  return (
    <section className="slide">
      <h2>Five words you will see in the app.</h2>
      <PrimitivesRow />
      <p className="plain-note">That is the whole vocabulary. Models, context windows and sandboxes never come up.</p>
    </section>
  );
}

export function SlideHire() {
  return (
    <section className="slide">
      <h2>Create a Chief of Staff and one specialist.</h2>
      <HireDiagram />
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
      <h2>Set what it has to ask before doing.</h2>
      <ApprovalStage />
    </section>
  );
}

export function SlideTakeover() {
  return (
    <section className="slide">
      <h2>When a login comes up, you type the password, not the Bot.</h2>
      <TakeoverStage />
      <p className="plain-note">You take over its screen, type the password or the code, and hand it back. Nothing you typed ends up in the chat.</p>
    </section>
  );
}

export function SlideFiveParts() {
  return (
    <section className="slide">
      <h2>Write the first task in five parts.</h2>
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

export function SlideComputer() {
  return (
    <section className="slide">
      <h2>Every Bot gets a computer that stays on.</h2>
      <ComputerStage />
      <p className="plain-note">Most AI agents run on your laptop, so they stop when you close it. A Bot runs on its own computer. Close the laptop and it keeps going.</p>
    </section>
  );
}

export function SlideManyInboxes() {
  return (
    <section className="slide">
      <h2>Who here has more than one Slack?</h2>
      <AccountFunnel />
      <p className="plain-note">Most tools assume you have one email and one Slack. A Bot's computer can be signed into all of yours at once.</p>
    </section>
  );
}

export function SlideOffice() {
  return (
    <section className="slide">
      <h2>Each Bot has its own memory. They all share one computer.</h2>
      <OfficeStage />
      <p className="plain-note">Shared logins make handoffs between Bots easy. They also mean a second Bot adds no safety. Telling a Bot which plugins to use is an instruction, not a lock.</p>
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

export function SlideBotFive() {
  return (
    <section className="slide">
      <h2>Start with two Bots. Not five.</h2>
      <RosterGrowth />
    </section>
  );
}

export function SlideChecklist() {
  return (
    <section className="slide">
      <h2>Before you leave tonight.</h2>
      <Checklist />
      <p className="plain-note">If the Bot did not stop at step three, fix Settings before you give it a second job.</p>
    </section>
  );
}

export function SlideCompare() {
  return (
    <section className="slide">
      <h2>Appendix: how it compares to ChatGPT, OpenClaw and Hermes.</h2>
      <CompareRow />
      <p className="plain-note">Written in September 2026. These products change often. Check the current docs before you quote this.</p>
    </section>
  );
}

export const SLIDES = [
  SlideTitle,
  SlideApp,
  SlideLeaveWith,
  SlideJobs,
  SlideFiveWords,
  SlideHire,
  SlidePlugins,
  SlideApproval,
  SlideTakeover,
  SlideFiveParts,
  SlideFiveFilled,
  SlideDeliverable,
  SlideComputer,
  SlideManyInboxes,
  SlideOffice,
  SlideMemory,
  SlideBotFive,
  SlideChecklist,
  SlideCompare,
] as const;
