import type { ReactNode } from "react";
import type { ChapterStepProps } from "../../registry/types";
import "./ScenarioClick.css";

type Row = {
  age: string;
  level: "APP" | "NET" | "SYS" | "ERR";
  tag: string;
  message: string;
};

const noisyRows: Row[] = [
  { age: "2m", level: "APP", tag: "MainActivity", message: "button tapped" },
  { age: "2m", level: "NET", tag: "OkHttp", message: "request queued" },
  { age: "2m", level: "SYS", tag: "InputDispatcher", message: "touch delivered" },
  { age: "1m", level: "APP", tag: "FormView", message: "validate fields" },
  { age: "1m", level: "ERR", tag: "SubmitViewModel", message: "submit blocked" },
  { age: "1m", level: "APP", tag: "MainActivity", message: "retry action visible" },
  { age: "now", level: "ERR", tag: "ButtonAction", message: "handler returned early" },
];

const resultRows = noisyRows.filter((row) => row.level === "ERR");

const flow = ["Clear", "复现问题", "package:mine age:2m", "加 level:ERROR"];

function Frame({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="scc-scene scene-pad">
      <div className="scc-grid" aria-hidden="true" />
      <div className="scc-corner scc-corner--tl" />
      <div className="scc-corner scc-corner--br" />
      <h1 className="scc-title">{title}</h1>
      {children}
    </div>
  );
}

function AppMock({ quiet }: { quiet?: boolean }) {
  return (
    <div className={quiet ? "scc-app scc-app--quiet" : "scc-app"}>
      <div className="scc-app-top">
        <span />
        <span />
        <span />
      </div>
      <div className="scc-app-body">
        <div className="scc-app-field" />
        <div className="scc-app-button">提交</div>
      </div>
      <div className="scc-tap-ring" aria-hidden="true" />
    </div>
  );
}

function QueryBar({ query }: { query: string }) {
  return (
    <div className="scc-query" aria-label={query}>
      <span>&gt;</span>
      <strong>{query}</strong>
      <i />
    </div>
  );
}

function Rows({ rows, dimNonError }: { rows: Row[]; dimNonError?: boolean }) {
  return (
    <div className="scc-rows">
      {rows.map((row, index) => (
        <div
          className={[
            "scc-row",
            row.level === "ERR" ? "scc-row--error" : "",
            dimNonError && row.level !== "ERR" ? "scc-row--muted" : "",
          ].join(" ")}
          key={`${row.age}-${row.tag}-${index}`}
        >
          <span>{row.age}</span>
          <span>{row.level}</span>
          <span>{row.tag}</span>
          <span>{row.message}</span>
        </div>
      ))}
    </div>
  );
}

function Flow({ active }: { active: number }) {
  return (
    <div className="scc-flow">
      {flow.map((item, index) => (
        <div
          className={[
            "scc-flow-node",
            index === active ? "scc-flow-node--active" : "",
            index < active ? "scc-flow-node--done" : "",
          ].join(" ")}
          key={item}
        >
          <span>{String(index + 1).padStart(2, "0")}</span>
          <strong>{item}</strong>
        </div>
      ))}
    </div>
  );
}

export default function ScenarioClick({ step }: ChapterStepProps) {
  if (step === 0) {
    return (
      <Frame title="按钮没反应">
        <div className="scc-case">
          <AppMock quiet />
          <div className="scc-case-label">
            <strong>tap</strong>
            <span>no visible response</span>
          </div>
        </div>
      </Frame>
    );
  }

  if (step === 1) {
    return (
      <Frame title="第一步：Clear">
        <div className="scc-clear">
          <Flow active={0} />
          <div className="scc-logbox scc-logbox--wipe">
            <Rows rows={noisyRows.slice(0, 5)} />
            <div className="scc-wipe" aria-hidden="true" />
          </div>
        </div>
      </Frame>
    );
  }

  if (step === 2) {
    return (
      <Frame title="第二步：复现">
        <div className="scc-replay">
          <Flow active={1} />
          <AppMock />
          <div className="scc-replay-note">让新日志从这里开始</div>
        </div>
      </Frame>
    );
  }

  if (step === 3) {
    return (
      <Frame title="先查最近两分钟">
        <div className="scc-query-stage">
          <Flow active={2} />
          <QueryBar query="package:mine age:2m" />
          <div className="scc-filter-gates">
            <span>package:mine</span>
            <span>age:2m</span>
          </div>
        </div>
      </Frame>
    );
  }

  if (step === 4) {
    return (
      <Frame title="日志还是多">
        <div className="scc-many">
          <div className="scc-logbox">
            <Rows rows={noisyRows} />
          </div>
          <div className="scc-density">
            <strong>too many</strong>
            <span>继续收窄</span>
          </div>
        </div>
      </Frame>
    );
  }

  if (step === 5) {
    return (
      <Frame title="再加错误级别">
        <div className="scc-query-stage">
          <Flow active={3} />
          <QueryBar query="package:mine level:ERROR age:2m" />
          <div className="scc-filter-gates scc-filter-gates--three">
            <span>package:mine</span>
            <span>level:ERROR</span>
            <span>age:2m</span>
          </div>
        </div>
      </Frame>
    );
  }

  return (
    <Frame title="时间 + 错误一起筛">
      <div className="scc-result">
        <div className="scc-result-gates">
          <span>recent 2m</span>
          <span>ERROR only</span>
        </div>
        <div className="scc-logbox">
          <Rows rows={resultRows} dimNonError />
        </div>
        <div className="scc-result-note">剩下的就是最该看的日志</div>
      </div>
    </Frame>
  );
}
