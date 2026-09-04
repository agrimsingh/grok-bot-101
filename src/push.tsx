import type { CSSProperties } from "react";
import { GrokBotFace, type BotShape } from "./visuals";

function GroupIdentity() {
  return (
    <span className="group-identity" aria-label="Launch room">
      <GrokBotFace color="#2A92FE" shape="squircle" />
      <GrokBotFace color="#A97EFE" shape="wedge" />
      <GrokBotFace color="#FF781C" shape="blob" />
    </span>
  );
}

export function OpeningReceipts() {
  return (
    <div className="opening-receipts" aria-label="Examples of work finished by Grok Bot">
      <article className="opening-browser">
        <header><i /><i /><i /><span>shopee.sg</span></header>
        <div><GrokBotFace color="#2A92FE" shape="squircle" /><span><b>Running on my Mac</b><small>Chrome is already signed in</small></span><em>✓</em></div>
      </article>
      <article className="opening-whatsapp">
        <GrokBotFace color="#FF47A6" shape="blob" />
        <span><small>WhatsApp</small><b>Draft ready</b></span>
        <em>Waiting for you</em>
      </article>
      <article className="opening-cursor">
        <GrokBotFace color="#A97EFE" shape="wedge" />
        <span><small>Cursor Cloud Agent</small><b>PR #20 is ready</b></span>
        <em>Done</em>
      </article>
    </div>
  );
}

export function BrowserWorkStage() {
  return (
    <div className="browser-work-stage">
      <article className="large-browser-frame">
        <header><i /><i /><i /><span>linkedin.com/in/someone</span></header>
        <div className="linkedin-page">
          <aside><span className="avatar-placeholder" /><b>Jordan Lee</b><small>VP, Operations</small><button type="button">Message</button></aside>
          <main><div className="profile-line long" /><div className="profile-line" /><div className="profile-line short" /><div className="draft-box"><b>Message draft</b><p>Saw your team is hiring across operations…</p><span>Saved in LinkedIn · not sent</span></div></main>
          <i className="browser-pointer">➤</i>
        </div>
      </article>
      <div className="browser-outcomes">
        <article><GrokBotFace color="#FFAF38" shape="cloud" /><span><b>Book something</b><small>Fill the form, stop before payment</small></span></article>
        <article><GrokBotFace color="#1CC3B0" shape="cloud" /><span><b>Work through an old portal</b><small>Click the buttons an API never exposed</small></span></article>
        <article><GrokBotFace color="#FF781C" shape="blob" /><span><b>Leave the work there</b><small>A draft in LinkedIn beats instructions in chat</small></span></article>
      </div>
    </div>
  );
}

export function ToolBench() {
  const tools = [
    { name: "wacli", copy: "Read and draft WhatsApp messages", color: "#FF47A6", shape: "blob" as BotShape },
    { name: "Peekaboo", copy: "See and use apps on my Mac", color: "#2A92FE", shape: "squircle" as BotShape },
    { name: "AgentCookie", copy: "Bring a browser session across", color: "#FFAF38", shape: "cloud" as BotShape },
  ];
  return <div className="tool-bench">{tools.map((tool, index) => <article key={tool.name} style={{ "--tool-step": index } as CSSProperties}><GrokBotFace color={tool.color} shape={tool.shape} /><div><code>{tool.name}</code><p>{tool.copy}</p></div><span className="tool-plus">+</span></article>)}</div>;
}

export function WhatsAppStage() {
  return (
    <div className="whatsapp-stage">
      <div className="whatsapp-chat-card">
        <header><GrokBotFace color="#FF47A6" shape="blob" /><span><b>Grok Bot talk</b><small>WhatsApp</small></span></header>
        <div className="wa-thread">
          <div className="wa-message in">Send the field guide to the event group when it is live.</div>
          <div className="wa-message">The field guide is live. Here is the link.</div>
        </div>
        <div className="wa-state"><i /> Draft only</div>
        <div className="wa-composer">Message</div>
      </div>
      <article className="approval-panel">
        <span>Grok Bot stopped here</span>
        <h3>Send this message?</h3>
        <p>You can change the copy, choose the chat, or leave it as a draft.</p>
        <div><button type="button">Keep as draft</button><button type="button">Send</button></div>
      </article>
    </div>
  );
}

export function BlockedBrowserStage() {
  return (
    <div className="blocked-stage">
      <article className="blocked-browser">
        <header><i /><i /><i /><span>shopee.sg</span></header>
        <div><b>Access denied</b><p>This browser doesn't look familiar.</p><button type="button">Try again</button></div>
      </article>
      <div className="blocked-message"><GrokBotFace color="#FF781C" shape="blob" /><p>The cloud browser is signed in, but the site still won't let it through.</p><span className="blocked-status">Blocked</span></div>
    </div>
  );
}

export function MacControlStage() {
  return (
    <div className="mac-control-stage">
      <div className="mac-control-screen">
        <img src="/official/mood-mountain.webp" alt="" />
        <article className="mac-shopee"><header><i /><i /><i /><span>shopee.sg</span></header><div><span className="product-thumb" /><p><b>Found it in your Chrome</b><small>Your usual session is working</small></p><button type="button">Add to cart</button></div></article>
        <GrokBotFace color="#2A92FE" shape="squircle" className="mac-control-bot" />
        <i className="mac-pointer">➤</i>
      </div>
      <div className="mac-control-steps"><span><b>1</b> Peekaboo sees the screen</span><span><b>2</b> The Bot uses the real app</span><span><b>3</b> I tell it to stop before buying</span></div>
    </div>
  );
}

export function GroupRoomStage() {
  return (
    <div className="group-room-stage">
      <header><GroupIdentity /><span><b>Launch room</b><small>Three Bots in this chat</small></span><i>ⓘ</i></header>
      <div className="group-room-body">
        <div className="group-message user">Research the company, update the page, then draft the announcement. Ask me before anything goes out.</div>
        <div className="group-message"><GrokBotFace color="#2A92FE" shape="squircle" /><span><b>Research</b><p>I checked the claims and marked two that need softer wording.</p></span></div>
        <div className="group-message"><GrokBotFace color="#A97EFE" shape="wedge" /><span><b>Builder</b><p>I have the checked brief. Cursor is building the update now.</p></span></div>
        <div className="group-message"><GrokBotFace color="#FF781C" shape="blob" /><span><b>Launch</b><p>I will bring the preview and the draft back here for you.</p></span></div>
      </div>
      <aside className="group-members-panel"><h3>Members</h3><div><GrokBotFace color="#2A92FE" shape="squircle" />Research</div><div><GrokBotFace color="#A97EFE" shape="wedge" />Builder</div><div><GrokBotFace color="#FF781C" shape="blob" />Launch</div><button type="button">+ Add member</button></aside>
    </div>
  );
}

export function CursorWorkStage() {
  return (
    <div className="cursor-work-stage">
      <div className="message user-message">Update the page from the checked brief. Return the PR when it is ready.</div>
      <div className="message agent-message">Sent to a Cursor Cloud Agent. I will bring the PR back here.</div>
      <article className="cursor-result-card">
        <div className="cursor-result-title">
          <strong>Update the Grok Bot field guide</strong>
          <span><i />Done</span>
        </div>
        <p><b>⌘</b> cursor/grok-bot-field-guide-9d83 <span>PR #20</span></p>
        <div>
          <button type="button">View PR</button>
          <button type="button">Open in Cursor</button>
        </div>
      </article>
      <div className="message user-message">merge it for me</div>
      <div className="message agent-message">Merged. PR 20 is on main as <code>ec62a11</code>.</div>
    </div>
  );
}

export function ReceiptWall() {
  return (
    <div className="receipt-wall">
      <article><GrokBotFace color="#FFAF38" shape="cloud" /><span><b>Used the website</b><small>Draft left in LinkedIn</small></span><em>✓</em></article>
      <article><GrokBotFace color="#2A92FE" shape="squircle" /><span><b>Worked through my Mac</b><small>Shopee opened in Chrome</small></span><em>✓</em></article>
      <article><GrokBotFace color="#FF47A6" shape="blob" /><span><b>Drafted the message</b><small>Nothing sent without me</small></span><em>Waiting</em></article>
      <article><GrokBotFace color="#A97EFE" shape="wedge" /><span><b>Opened the PR</b><small>Preview is ready</small></span><em>✓</em></article>
    </div>
  );
}
