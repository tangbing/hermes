import type { ReactNode } from "react";
import type { ChapterStepProps } from "../../registry/types";
import "./FilterPackageError.css";

type Row = {
  source: "SYS" | "APP" | "ERR" | "NET" | "OLD";
  tag: string;
  text: string;
};

const rows: Row[] = [
  { source: "SYS", tag: "ActivityTaskManager", text: "START u0 com.android.settings" },
  { source: "OLD", tag: "BluetoothAdapter", text: "cached adapter state restored" },
  { source: "APP", tag: "MainActivity", text: "render home screen" },
  { source: "NET", tag: "OkHttp", text: "GET /auth/session 200" },
  { source: "ERR", tag: "LoginActivity", text: "login failed: token expired" },
  { source: "SYS", tag: "Choreographer", text: "Skipped 47 frames" },
  { source: "APP", tag: "AuthRepo", text: "refresh token requested" },
  { source: "OLD", tag: "System.err", text: "old stacktrace from previous run" },
  { source: "ERR", tag: "Network", text: "request failed: timeout" },
];

const errorKinds = ["接口失败", "空指针", "崩溃前异常"];

function Frame({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="fpe-scene scene-pad">
      <div className="fpe-grid" aria-hidden="true" />
      <div className="fpe-corner fpe-corner--tl" />
      <div className="fpe-corner fpe-corner--br" />
      <h1 className="fpe-title">{title}</h1>
      {children}
    </div>
  );
}

function Query({ parts }: { parts: string[] }) {
  return (
    <div className="fpe-query" aria-label={parts.join(" ")}>
      <span className="fpe-prompt">&gt;</span>
      {parts.map((part) => (
        <span className="fpe-query-part" key={part}>
          {part}
        </span>
      ))}
      <span className="fpe-cursor" />
    </div>
  );
}

function Table({ mode }: { mode: "raw" | "package" | "error" }) {
  return (
    <div className={`fpe-table fpe-table--${mode}`}>
      {rows.map((row, index) => {
        const isApp = row.source === "APP" || row.source === "ERR" || row.tag === "AuthRepo";
        const isError = row.source === "ERR";
        return (
          <div
            className={[
              "fpe-row",
              isApp ? "fpe-row--app" : "",
              isError ? "fpe-row--error" : "",
            ].join(" ")}
            key={`${row.source}-${row.tag}-${index}`}
          >
            <span>{String(index + 1).padStart(2, "0")}</span>
            <span>{row.source}</span>
            <span>{row.tag}</span>
            <span>{row.text}</span>
          </div>
        );
      })}
    </div>
  );
}

export default function FilterPackageError({ step }: ChapterStepProps) {
  if (step === 0) {
    return (
      <Frame title="先输 package:mine">
        <div className="fpe-query-stage">
          <Query parts={["package:mine"]} />
          <div className="fpe-command-map">
            <div className="fpe-map-node fpe-map-node--active">current project</div>
            <div className="fpe-map-node">system</div>
            <div className="fpe-map-node">other process</div>
            <div className="fpe-map-node">old run</div>
          </div>
        </div>
      </Frame>
    );
  }

  if (step === 1) {
    return (
      <Frame title="只剩当前项目">
        <div className="fpe-compare">
          <div className="fpe-panel">
            <strong>raw logcat</strong>
            <Table mode="raw" />
          </div>
          <div className="fpe-panel fpe-panel--active">
            <strong>package:mine</strong>
            <Table mode="package" />
          </div>
        </div>
      </Frame>
    );
  }

  if (step === 2) {
    return (
      <Frame title="再加 level:ERROR">
        <div className="fpe-builder">
          <Query parts={["package:mine", "level:ERROR"]} />
          <div className="fpe-token-flow">
            <span>package scope</span>
            <i />
            <span>error level</span>
          </div>
        </div>
      </Frame>
    );
  }

  if (step === 3) {
    return (
      <Frame title="完整查询长这样">
        <div className="fpe-result">
          <Query parts={["package:mine", "level:ERROR"]} />
          <Table mode="error" />
          <div className="fpe-result-count">2 useful lines</div>
        </div>
      </Frame>
    );
  }

  return (
    <Frame title="先从这些错误看">
      <div className="fpe-error-kinds">
        {errorKinds.map((kind, index) => (
          <div className="fpe-error-card" key={kind}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <strong>{kind}</strong>
          </div>
        ))}
      </div>
      <div className="fpe-close">Error 级别及更严重级别</div>
    </Frame>
  );
}
