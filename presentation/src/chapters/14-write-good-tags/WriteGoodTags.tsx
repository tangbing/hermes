import type { ReactNode } from "react";
import type { ChapterStepProps } from "../../registry/types";
import "./WriteGoodTags.css";

const badLines = ['Log.d("aaa", "clicked")', 'Log.e("bbb", "fail")'];
const goodTags = ["LoginActivity", "Network", "Order"];
const goodLines = [
  'private const val TAG = "LoginActivity"',
  'Log.d(TAG, "click login")',
  'Log.e(TAG, "login failed: $msg")',
];

function Frame({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="wgt-scene scene-pad">
      <div className="wgt-grid" aria-hidden="true" />
      <div className="wgt-corner wgt-corner--tl" />
      <div className="wgt-corner wgt-corner--br" />
      <h1 className="wgt-title">{title}</h1>
      {children}
    </div>
  );
}

function CodePanel({
  lines,
  active,
  bad,
}: {
  lines: string[];
  active?: number;
  bad?: boolean;
}) {
  return (
    <div className={bad ? "wgt-code wgt-code--bad" : "wgt-code"}>
      {lines.map((line, index) => (
        <p
          className={[
            "wgt-code-line",
            index === active ? "wgt-code-line--active" : "",
            bad ? "wgt-code-line--bad" : "",
          ].join(" ")}
          key={line}
        >
          {line}
        </p>
      ))}
    </div>
  );
}

function SearchBar({ query }: { query: string }) {
  return (
    <div className="wgt-query" aria-label={query}>
      <span>&gt;</span>
      <strong>{query}</strong>
      <i />
    </div>
  );
}

export default function WriteGoodTags({ step }: ChapterStepProps) {
  if (step === 0) {
    return (
      <Frame title="日志写得好">
        <div className="wgt-hero">
          <strong>排查会轻松很多</strong>
          <div className="wgt-hero-rail" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
        </div>
      </Frame>
    );
  }

  if (step === 1) {
    return (
      <Frame title="不要写 aaa / bbb">
        <div className="wgt-compare">
          <CodePanel lines={badLines} bad />
          <div className="wgt-bad-note">
            <span>bad tag</span>
            <strong>aaa / bbb</strong>
          </div>
        </div>
      </Frame>
    );
  }

  if (step === 2) {
    return (
      <Frame title="过两天就忘了">
        <div className="wgt-memory">
          <CodePanel lines={badLines} active={0} bad />
          <div className="wgt-memory-card">
            <span>unknown module</span>
            <strong>它是谁？</strong>
          </div>
        </div>
      </Frame>
    );
  }

  if (step === 3) {
    return (
      <Frame title="Tag 要像模块名">
        <div className="wgt-tags">
          {goodTags.map((tag, index) => (
            <div className="wgt-tag-card" key={tag}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{tag}</strong>
            </div>
          ))}
        </div>
      </Frame>
    );
  }

  if (step === 4) {
    return (
      <Frame title="推荐写法">
        <div className="wgt-good-code">
          <CodePanel lines={goodLines} active={0} />
          <div className="wgt-tag-card wgt-tag-card--single">
            <span>TAG</span>
            <strong>LoginActivity</strong>
          </div>
        </div>
      </Frame>
    );
  }

  if (step === 5) {
    return (
      <Frame title="后面直接按 Tag 搜">
        <div className="wgt-search">
          <SearchBar query="tag:LoginActivity" />
          <div className="wgt-search-results">
            <span>LoginActivity</span>
            <span>click login</span>
            <span>login failed: msg</span>
          </div>
        </div>
      </Frame>
    );
  }

  return (
    <Frame title="团队也看得懂">
      <div className="wgt-team">
        <div className="wgt-team-lane">
          <span>you</span>
          <strong>LoginActivity</strong>
        </div>
        <div className="wgt-team-link" aria-hidden="true" />
        <div className="wgt-team-lane">
          <span>teammate</span>
          <strong>same module</strong>
        </div>
      </div>
    </Frame>
  );
}
