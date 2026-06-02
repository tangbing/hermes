import type { ReactNode } from "react";
import type { ChapterStepProps } from "../../registry/types";
import "./ScenarioCrash.css";

type StackLine = {
  label: string;
  text: string;
  kind?: "fatal" | "cause" | "own" | "noise";
};

const stackLines: StackLine[] = [
  { label: "01", text: "FATAL EXCEPTION: main", kind: "fatal" },
  { label: "02", text: "Process: com.demo.app, PID: 2142", kind: "noise" },
  { label: "03", text: "java.lang.IllegalStateException: screen state invalid", kind: "noise" },
  { label: "04", text: "at android.app.ActivityThread.performLaunchActivity(...)", kind: "noise" },
  { label: "05", text: "at android.os.Handler.dispatchMessage(...)", kind: "noise" },
  { label: "06", text: "Caused by: java.lang.NullPointerException", kind: "cause" },
  { label: "07", text: "at com.mine.login.LoginViewModel.submit(LoginViewModel.kt:42)", kind: "own" },
  { label: "08", text: "at com.mine.login.LoginActivity.onClick(LoginActivity.kt:88)", kind: "own" },
];

const checklist = ["FATAL EXCEPTION", "Caused by:", "com.mine.*"];

function Frame({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="sccr-scene scene-pad">
      <div className="sccr-grid" aria-hidden="true" />
      <div className="sccr-corner sccr-corner--tl" />
      <div className="sccr-corner sccr-corner--br" />
      <h1 className="sccr-title">{title}</h1>
      {children}
    </div>
  );
}

function QueryBar({ query }: { query: string }) {
  return (
    <div className="sccr-query" aria-label={query}>
      <span>&gt;</span>
      <strong>{query}</strong>
      <i />
    </div>
  );
}

function StackTrace({ focus }: { focus?: "fatal" | "cause" | "own" | "useful" }) {
  return (
    <div className={focus === "useful" ? "sccr-stack sccr-stack--useful" : "sccr-stack"}>
      {stackLines.map((line) => {
        const active =
          focus === line.kind ||
          (focus === "useful" && (line.kind === "cause" || line.kind === "own"));
        return (
          <div
            className={[
              "sccr-stack-line",
              line.kind ? `sccr-stack-line--${line.kind}` : "",
              active ? "sccr-stack-line--active" : "",
            ].join(" ")}
            key={line.label}
          >
            <span>{line.label}</span>
            <strong>{line.text}</strong>
          </div>
        );
      })}
    </div>
  );
}

function KeywordRail({ active }: { active?: number }) {
  return (
    <div className="sccr-keywords">
      {checklist.map((item, index) => (
        <div
          className={index === active ? "sccr-keyword sccr-keyword--active" : "sccr-keyword"}
          key={item}
        >
          <span>{String(index + 1).padStart(2, "0")}</span>
          <strong>{item}</strong>
        </div>
      ))}
    </div>
  );
}

export default function ScenarioCrash({ step }: ChapterStepProps) {
  if (step === 0) {
    return (
      <Frame title="程序闪退">
        <div className="sccr-crash-card">
          <div className="sccr-phone">
            <div className="sccr-phone-top" />
            <div className="sccr-crash-mark">crash</div>
          </div>
          <div className="sccr-case-note">
            <strong>App closes</strong>
            <span>先把崩溃日志单独拉出来</span>
          </div>
        </div>
      </Frame>
    );
  }

  if (step === 1) {
    return (
      <Frame title="先筛 crash">
        <div className="sccr-query-stage">
          <QueryBar query="package:mine is:crash" />
          <div className="sccr-gates">
            <span>package:mine</span>
            <span>is:crash</span>
          </div>
        </div>
      </Frame>
    );
  }

  if (step === 2) {
    return (
      <Frame title="找 FATAL EXCEPTION">
        <div className="sccr-analysis">
          <KeywordRail active={0} />
          <StackTrace focus="fatal" />
        </div>
      </Frame>
    );
  }

  if (step === 3) {
    return (
      <Frame title="再找 Caused by">
        <div className="sccr-analysis">
          <KeywordRail active={1} />
          <StackTrace focus="cause" />
        </div>
      </Frame>
    );
  }

  if (step === 4) {
    return (
      <Frame title="看自己代码行">
        <div className="sccr-analysis">
          <KeywordRail active={2} />
          <StackTrace focus="own" />
        </div>
      </Frame>
    );
  }

  if (step === 5) {
    return (
      <Frame title="别停在最上面">
        <div className="sccr-topline">
          <div className="sccr-stack-shell">
            <StackTrace />
          </div>
          <div className="sccr-topline-note">
            <span>top line</span>
            <strong>通常不够用</strong>
          </div>
        </div>
      </Frame>
    );
  }

  if (step === 6) {
    return (
      <Frame title="原因在 Caused by 后面">
        <div className="sccr-focus-stage">
          <StackTrace focus="cause" />
          <div className="sccr-focus-card">
            <span>exception reason</span>
            <strong>NullPointerException</strong>
          </div>
        </div>
      </Frame>
    );
  }

  return (
    <Frame title="第一条自己代码行">
      <div className="sccr-focus-stage">
        <StackTrace focus="useful" />
        <div className="sccr-focus-card">
          <span>first own line</span>
          <strong>LoginViewModel.kt:42</strong>
        </div>
      </div>
    </Frame>
  );
}
