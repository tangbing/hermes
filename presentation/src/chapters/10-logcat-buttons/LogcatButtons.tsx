import type { ReactNode } from "react";
import type { ChapterStepProps } from "../../registry/types";
import "./LogcatButtons.css";

type ToolId = "pause" | "clear" | "wrap" | "newtab" | "split";

const tools: Array<{ id: ToolId; label: string }> = [
  { id: "pause", label: "Pause" },
  { id: "clear", label: "Clear" },
  { id: "wrap", label: "Soft Wrap" },
  { id: "newtab", label: "New Tab" },
  { id: "split", label: "Split" },
];

const rollingRows = [
  ["12:41:01", "APP", "MainActivity", "button tapped"],
  ["12:41:02", "NET", "OkHttp", "GET /profile status=200"],
  ["12:41:03", "GPU", "OpenGLRenderer", "Frame deadline missed"],
  ["12:41:04", "APP", "AuthRepo", "refresh session"],
  ["12:41:05", "ERR", "LoginActivity", "form validation failed"],
  ["12:41:06", "SYS", "InputDispatcher", "channel window focused"],
  ["12:41:07", "APP", "MainActivity", "render home screen"],
];

const cleanRows = [
  ["00:00:01", "APP", "MainActivity", "tap submit"],
  ["00:00:02", "NET", "AuthRepo", "POST /login"],
  ["00:00:03", "ERR", "LoginActivity", "login failed: token expired"],
  ["00:00:04", "APP", "MainActivity", "show retry action"],
];

const longLines = [
  "HTTP response body={...very long API response payload...}{...nested fields...}{...more payload...}",
  "at com.demo.auth.LoginViewModel.submit(LoginViewModel.kt:42) -> AuthRepo.login(AuthRepo.kt:88) -> OkHttp.execute",
];

function Frame({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="lgb-scene scene-pad">
      <div className="lgb-grid" aria-hidden="true" />
      <div className="lgb-corner lgb-corner--tl" />
      <div className="lgb-corner lgb-corner--br" />
      <h1 className="lgb-title">{title}</h1>
      {children}
    </div>
  );
}

function ToolIcon({ id }: { id: ToolId }) {
  return (
    <span className={`lgb-icon lgb-icon--${id}`} aria-hidden="true">
      <span />
      <span />
      <span />
    </span>
  );
}

function Toolbar({ active }: { active?: ToolId }) {
  return (
    <div className="lgb-toolbar">
      {tools.map((tool) => (
        <button
          className={active === tool.id ? "lgb-tool lgb-tool--active" : "lgb-tool"}
          data-no-advance
          key={tool.id}
          type="button"
        >
          <ToolIcon id={tool.id} />
          <span>{tool.label}</span>
        </button>
      ))}
    </div>
  );
}

function LogRows({
  mode,
}: {
  mode?: "stream" | "paused" | "clearing" | "clean" | "errors";
}) {
  const rows = mode === "clean" ? cleanRows : rollingRows;
  return (
    <div
      className={[
        "lgb-log",
        mode === "stream" ? "lgb-log--stream" : "",
        mode === "paused" ? "lgb-log--paused" : "",
        mode === "clearing" ? "lgb-log--clearing" : "",
        mode === "errors" ? "lgb-log--errors" : "",
      ].join(" ")}
    >
      {rows.map(([time, level, tag, message], index) => {
        const isError = level === "ERR";
        const hidden = mode === "errors" && !isError;
        return (
          <div
            className={[
              "lgb-row",
              isError ? "lgb-row--error" : "",
              hidden ? "lgb-row--muted" : "",
            ].join(" ")}
            key={`${time}-${tag}-${index}`}
          >
            <span>{time}</span>
            <span>{level}</span>
            <span>{tag}</span>
            <span>{message}</span>
          </div>
        );
      })}
      {mode === "clearing" ? <div className="lgb-wipe" aria-hidden="true" /> : null}
    </div>
  );
}

function Workbench({
  active,
  mode,
  children,
}: {
  active?: ToolId;
  mode?: "stream" | "paused" | "clearing" | "clean" | "errors";
  children?: ReactNode;
}) {
  return (
    <div className="lgb-workbench">
      <Toolbar active={active} />
      <div className="lgb-window">
        <LogRows mode={mode} />
      </div>
      {children}
    </div>
  );
}

export default function LogcatButtons({ step }: ChapterStepProps) {
  if (step === 0) {
    return (
      <Frame title="Logcat 工具栏">
        <Workbench>
          <div className="lgb-overview">
            <span>Pause</span>
            <span>Clear</span>
            <span>Soft Wrap</span>
            <span>New Tab</span>
            <span>Split</span>
          </div>
        </Workbench>
      </Frame>
    );
  }

  if (step === 1) {
    return (
      <Frame title="日志刷太快">
        <Workbench active="pause" mode="stream">
          <div className="lgb-meter">
            <strong>rolling</strong>
            <span>先按 Pause</span>
          </div>
        </Workbench>
      </Frame>
    );
  }

  if (step === 2) {
    return (
      <Frame title="停住慢慢看">
        <Workbench active="pause" mode="paused">
          <div className="lgb-freeze">
            <strong>paused frame</strong>
            <span>当前界面保留下来</span>
          </div>
        </Workbench>
      </Frame>
    );
  }

  if (step === 3) {
    return (
      <Frame title="清空当前窗口">
        <Workbench active="clear" mode="clearing">
          <div className="lgb-clear-note">old logs out</div>
        </Workbench>
      </Frame>
    );
  }

  if (step === 4) {
    return (
      <Frame title="先清空，再复现">
        <div className="lgb-repro">
          <div className="lgb-repro-step">Clear</div>
          <div className="lgb-repro-line" aria-hidden="true" />
          <div className="lgb-repro-step">Reproduce bug</div>
          <div className="lgb-repro-line" aria-hidden="true" />
          <div className="lgb-repro-step lgb-repro-step--active">Clean new logs</div>
        </div>
        <div className="lgb-clean-window">
          <LogRows mode="clean" />
        </div>
      </Frame>
    );
  }

  if (step === 5) {
    return (
      <Frame title="长日志自动换行">
        <div className="lgb-wrap-demo">
          <Toolbar active="wrap" />
          <div className="lgb-long-lines">
            {longLines.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
          <div className="lgb-wrap-note">长接口返回 / 长堆栈</div>
        </div>
      </Frame>
    );
  }

  if (step === 6) {
    return (
      <Frame title="开新标签或分屏">
        <div className="lgb-tab-demo">
          <Toolbar active="newtab" />
          <div className="lgb-tab-strip">
            <span>All logs</span>
            <span>Errors only</span>
          </div>
          <div className="lgb-split-blueprint">
            <div />
            <div />
          </div>
          <div className="lgb-split-command">
            <ToolIcon id="split" />
            <strong>Split view</strong>
          </div>
        </div>
      </Frame>
    );
  }

  return (
    <Frame title="并排对比">
      <div className="lgb-two-panes">
        <section>
          <h2>全部日志</h2>
          <LogRows />
        </section>
        <section>
          <h2>只看错误</h2>
          <LogRows mode="errors" />
        </section>
      </div>
      <div className="lgb-compare-note">一个看全局，一个抓错误</div>
    </Frame>
  );
}
