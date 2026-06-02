import type { ReactNode } from "react";
import type { ChapterStepProps } from "../../registry/types";
import "./ScenarioNetwork.css";

type NetRow = {
  time: string;
  level: "APP" | "NET" | "ERR";
  tag: "API";
  message: string;
};

const rows: NetRow[] = [
  { time: "00:00.0", level: "NET", tag: "API", message: "request start GET /profile" },
  { time: "00:00.4", level: "NET", tag: "API", message: "request success 200 /config" },
  { time: "00:01.2", level: "ERR", tag: "API", message: "request fail timeout" },
  { time: "00:01.3", level: "ERR", tag: "API", message: "exception SocketTimeoutException" },
];

const states = ["start", "success", "fail", "exception"];

function Frame({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="scn-scene scene-pad">
      <div className="scn-grid" aria-hidden="true" />
      <div className="scn-corner scn-corner--tl" />
      <div className="scn-corner scn-corner--br" />
      <h1 className="scn-title">{title}</h1>
      {children}
    </div>
  );
}

function QueryBar({ query }: { query: string }) {
  return (
    <div className="scn-query" aria-label={query}>
      <span>&gt;</span>
      <strong>{query}</strong>
      <i />
    </div>
  );
}

function CodeBlock({ highlight }: { highlight?: "tag" | "start" | "fail" }) {
  return (
    <div className="scn-code">
      <p className={highlight === "tag" ? "scn-code-line scn-code-line--active" : "scn-code-line"}>
        private const val TAG = "API"
      </p>
      <p className={highlight === "start" ? "scn-code-line scn-code-line--active" : "scn-code-line"}>
        Log.d(TAG, "request start")
      </p>
      <p className={highlight === "fail" ? "scn-code-line scn-code-line--active" : "scn-code-line"}>
        Log.e(TAG, "request fail", e)
      </p>
    </div>
  );
}

function NetworkPath({ active }: { active?: number }) {
  return (
    <div className="scn-path">
      {states.map((state, index) => (
        <div
          className={[
            "scn-path-node",
            index === active ? "scn-path-node--active" : "",
            index < (active ?? -1) ? "scn-path-node--done" : "",
          ].join(" ")}
          key={state}
        >
          <span>{String(index + 1).padStart(2, "0")}</span>
          <strong>{state}</strong>
        </div>
      ))}
    </div>
  );
}

function LogRows({ errorOnly }: { errorOnly?: boolean }) {
  return (
    <div className={errorOnly ? "scn-log scn-log--error-only" : "scn-log"}>
      {rows.map((row, index) => {
        const hidden = errorOnly && row.level !== "ERR";
        return (
          <div
            className={[
              "scn-row",
              row.level === "ERR" ? "scn-row--error" : "",
              hidden ? "scn-row--muted" : "",
            ].join(" ")}
            key={`${row.time}-${index}`}
          >
            <span>{row.time}</span>
            <span>{row.level}</span>
            <span>{row.tag}</span>
            <span>{row.message}</span>
          </div>
        );
      })}
    </div>
  );
}

export default function ScenarioNetwork({ step }: ChapterStepProps) {
  if (step === 0) {
    return (
      <Frame title="网络请求失败">
        <div className="scn-case">
          <div className="scn-request-map">
            <NetworkPath active={2} />
            <div className="scn-fail-card">
              <strong>request fail</strong>
              <span>先让网络日志可被筛出来</span>
            </div>
          </div>
        </div>
      </Frame>
    );
  }

  if (step === 1) {
    return (
      <Frame title="统一网络 Tag">
        <div className="scn-code-stage">
          <CodeBlock highlight="tag" />
          <div className="scn-tag-card">
            <span>TAG</span>
            <strong>API</strong>
          </div>
        </div>
      </Frame>
    );
  }

  if (step === 2) {
    return (
      <Frame title="请求开始要打点">
        <div className="scn-code-stage">
          <CodeBlock highlight="start" />
          <div className="scn-pulse-log">
            <span>API</span>
            <strong>request start</strong>
          </div>
        </div>
      </Frame>
    );
  }

  if (step === 3) {
    return (
      <Frame title="失败要带异常">
        <div className="scn-code-stage">
          <CodeBlock highlight="fail" />
          <div className="scn-exception-card">
            <strong>request fail</strong>
            <span>exception object</span>
          </div>
        </div>
      </Frame>
    );
  }

  if (step === 4) {
    return (
      <Frame title="直接查 API">
        <div className="scn-query-stage">
          <QueryBar query="tag:API" />
          <div className="scn-log-panel">
            <LogRows />
          </div>
        </div>
      </Frame>
    );
  }

  if (step === 5) {
    return (
      <Frame title="只看错误">
        <div className="scn-query-stage">
          <QueryBar query="tag:API level:ERROR" />
          <div className="scn-log-panel">
            <LogRows errorOnly />
          </div>
        </div>
      </Frame>
    );
  }

  if (step === 6) {
    return (
      <Frame title="四个状态在一条线上">
        <div className="scn-states">
          <NetworkPath active={3} />
          <div className="scn-state-cards">
            {states.map((state) => (
              <div className="scn-state-card" key={state}>
                <span>API</span>
                <strong>{state}</strong>
              </div>
            ))}
          </div>
        </div>
      </Frame>
    );
  }

  return (
    <Frame title="网络链路日志">
      <div className="scn-final">
        <div className="scn-log-panel">
          <LogRows />
        </div>
        <div className="scn-final-note">
          <span>request start</span>
          <span>request success</span>
          <span>request fail</span>
          <span>exception</span>
        </div>
      </div>
    </Frame>
  );
}
