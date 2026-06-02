import type { ChapterStepProps } from "../../registry/types";
import type { ReactNode } from "react";
import "./LogcatProblem.css";

const noisyLogs = [
  { kind: "SYS", tag: "ActivityTaskManager", msg: "START u0 com.android.settings" },
  { kind: "GPU", tag: "OpenGLRenderer", msg: "Davey! duration=982ms" },
  { kind: "OLD", tag: "BluetoothAdapter", msg: "isLeEnabled(): ON" },
  { kind: "APP", tag: "MainActivity", msg: "render home screen" },
  { kind: "SYS", tag: "InputDispatcher", msg: "channel window disposed" },
  { kind: "OLD", tag: "WorkManager", msg: "previous job finished" },
  { kind: "ERR", tag: "LoginActivity", msg: "NullPointerException at LoginViewModel.kt:42" },
  { kind: "NET", tag: "OkHttp", msg: "timeout after 10000ms" },
  { kind: "SYS", tag: "Choreographer", msg: "Skipped 47 frames" },
  { kind: "APP", tag: "AuthRepo", msg: "login failed: token expired" },
  { kind: "GPU", tag: "OpenGLRenderer", msg: "eglSwapBuffers completed" },
  { kind: "OLD", tag: "System.err", msg: "stale stacktrace from previous run" },
];

const filters = [
  { id: "01", label: "package:mine", detail: "只看自己 app" },
  { id: "02", label: "level:ERROR", detail: "只看错误" },
  { id: "03", label: "tag / message / age", detail: "继续缩小范围" },
  { id: "04", label: "Saved filters", detail: "存成常用条件" },
];

const quickSlots = [
  "package:mine",
  "package:mine level:ERROR",
  "package:mine tag:LoginActivity age:5m",
];

function LogStream({ mode }: { mode: "storm" | "buried" | "app" | "error" }) {
  return (
    <div className={`lp-log-stream lp-log-stream--${mode}`} aria-hidden="true">
      {noisyLogs.map((log, idx) => {
        const isError = log.kind === "ERR";
        const isApp = log.kind === "APP" || isError || log.tag === "AuthRepo";
        return (
          <div
            className={[
              "lp-log-line",
              isError ? "lp-log-line--error" : "",
              isApp ? "lp-log-line--app" : "",
            ].join(" ")}
            key={`${log.tag}-${idx}`}
          >
            <span>{String(idx + 11).padStart(2, "0")}:42:{idx % 6}1</span>
            <span>{log.kind}</span>
            <span>{log.tag}</span>
            <span>{log.msg}</span>
          </div>
        );
      })}
    </div>
  );
}

function QueryBar({ query }: { query: string }) {
  return (
    <div className="lp-query" aria-label={query}>
      <span className="lp-caret">&gt;</span>
      <span>{query}</span>
      <span className="lp-cursor" />
    </div>
  );
}

function StepShell({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="lp-scene scene-pad">
      <div className="lp-grid" aria-hidden="true" />
      <div className="lp-corner lp-corner--tl" />
      <div className="lp-corner lp-corner--br" />
      <h1 className="lp-title">{title}</h1>
      {children}
    </div>
  );
}

export default function LogcatProblem({ step }: ChapterStepProps) {
  if (step === 0) {
    return (
      <StepShell title="不是报错难">
        <div className="lp-hero">
          <div className="lp-hero-copy">
            <div className="lp-kicker">Android Studio Logcat</div>
            <div className="lp-hero-main">是日志太多</div>
          </div>
          <LogStream mode="storm" />
        </div>
      </StepShell>
    );
  }

  if (step === 1) {
    return (
      <StepShell title="满屏都在刷">
        <div className="lp-noise-board">
          <LogStream mode="storm" />
          <div className="lp-noise-tags">
            <span>SYS</span>
            <span>OTHER PROCESS</span>
            <span>OLD RUN</span>
          </div>
        </div>
      </StepShell>
    );
  }

  if (step === 2) {
    return (
      <StepShell title="真正炸的那行">
        <div className="lp-buried">
          <LogStream mode="buried" />
          <div className="lp-error-lens">
            <span>ERR</span>
            <strong>LoginViewModel.kt:42</strong>
            <small>first app frame</small>
          </div>
        </div>
      </StepShell>
    );
  }

  if (step === 3) {
    return (
      <StepShell title="别硬盯">
        <div className="lp-funnel">
          <div className="lp-funnel-wide">raw logcat stream</div>
          <div className="lp-funnel-mid">filter query</div>
          <div className="lp-funnel-narrow">useful line</div>
        </div>
        <div className="lp-command-callout">先把范围缩小</div>
      </StepShell>
    );
  }

  if (step === 4) {
    return (
      <StepShell title="只看自己 app">
        <div className="lp-filter-stage">
          <QueryBar query="package:mine" />
          <LogStream mode="app" />
          <div className="lp-filter-note">系统和其他进程先退场</div>
        </div>
      </StepShell>
    );
  }

  if (step === 5) {
    return (
      <StepShell title="只看错误">
        <div className="lp-filter-stage lp-filter-stage--error">
          <QueryBar query="package:mine level:ERROR" />
          <LogStream mode="error" />
          <div className="lp-error-stack">
            <span>接口失败</span>
            <span>空指针</span>
            <span>崩溃前异常</span>
          </div>
        </div>
      </StepShell>
    );
  }

  if (step === 6) {
    return (
      <StepShell title="继续收窄">
        <div className="lp-radar">
          <div className="lp-radar-core">package:mine</div>
          <div className="lp-radar-node lp-radar-node--tag">tag:LoginActivity</div>
          <div className="lp-radar-node lp-radar-node--msg">message:timeout</div>
          <div className="lp-radar-node lp-radar-node--age">age:5m</div>
        </div>
      </StepShell>
    );
  }

  return (
    <StepShell title="存成常用条件">
      <div className="lp-save">
        {filters.map((filter, idx) => (
          <div className="lp-save-row" key={filter.id}>
            <span>{filter.id}</span>
            <strong>{filter.label}</strong>
            <em>{filter.detail}</em>
            <i>{quickSlots[idx] ?? "filter preset ready"}</i>
          </div>
        ))}
      </div>
      <div className="lp-close-line">很多问题就不用猜了</div>
    </StepShell>
  );
}
