import type { ReactNode } from "react";
import type { ChapterStepProps } from "../../registry/types";
import "./FilterCrashTagAge.css";

type CrashRow = {
  time: string;
  tag: string;
  level: "INFO" | "WARN" | "ERROR" | "FATAL";
  message: string;
  recent?: boolean;
};

const crashRows: CrashRow[] = [
  { time: "09:41:08", tag: "MainActivity", level: "INFO", message: "screen resumed" },
  { time: "09:42:11", tag: "LoginActivity", level: "ERROR", message: "login failed" },
  { time: "09:42:12", tag: "AndroidRuntime", level: "FATAL", message: "FATAL EXCEPTION: main" },
  { time: "09:42:12", tag: "LoginViewModel", level: "ERROR", message: "Caused by: token expired" },
  { time: "09:42:13", tag: "System.err", level: "WARN", message: "stacktrace line 01" },
];

const moduleRows: CrashRow[] = [
  { time: "09:44:02", tag: "MainActivity", level: "INFO", message: "click login" },
  { time: "09:44:03", tag: "LoginActivity", level: "INFO", message: "submit login form" },
  { time: "09:44:04", tag: "AuthRepo", level: "WARN", message: "refresh token stale" },
  { time: "09:44:05", tag: "LoginActivity", level: "ERROR", message: "login failed: bad response" },
  { time: "09:44:06", tag: "Network", level: "ERROR", message: "request timeout" },
];

const timelineRows: CrashRow[] = [
  { time: "09:32", tag: "OldRun", level: "WARN", message: "stale warning from previous run" },
  { time: "09:38", tag: "MainActivity", level: "INFO", message: "screen opened" },
  { time: "09:43", tag: "LoginActivity", level: "INFO", message: "button tapped", recent: true },
  { time: "09:44", tag: "AuthRepo", level: "ERROR", message: "token expired", recent: true },
  { time: "09:45", tag: "LoginActivity", level: "ERROR", message: "login failed", recent: true },
];

function Frame({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="fcta-scene scene-pad">
      <div className="fcta-grid" aria-hidden="true" />
      <div className="fcta-corner fcta-corner--tl" />
      <div className="fcta-corner fcta-corner--br" />
      <h1 className="fcta-title">{title}</h1>
      {children}
    </div>
  );
}

function Query({ query }: { query: string }) {
  return (
    <div className="fcta-query" aria-label={query}>
      <span>&gt;</span>
      <strong>{query}</strong>
      <i />
    </div>
  );
}

function LogTable({
  rows,
  mode,
}: {
  rows: CrashRow[];
  mode: "crash" | "tag" | "tag-error" | "recent";
}) {
  return (
    <div className={`fcta-table fcta-table--${mode}`}>
      {rows.map((row, index) => {
        const isCrash = row.level === "FATAL";
        const isLogin = row.tag === "LoginActivity";
        const isError = row.level === "ERROR" || row.level === "FATAL";
        return (
          <div
            className={[
              "fcta-row",
              isCrash ? "fcta-row--fatal" : "",
              isLogin ? "fcta-row--login" : "",
              isError ? "fcta-row--error" : "",
              row.recent ? "fcta-row--recent" : "",
            ].join(" ")}
            key={`${row.time}-${row.tag}-${index}`}
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

export default function FilterCrashTagAge({ step }: ChapterStepProps) {
  if (step === 0) {
    return (
      <Frame title="闪退直接查崩溃">
        <div className="fcta-crash">
          <div className="fcta-query-stack">
            <Query query="package:mine is:crash" />
            <Query query="package:mine is:stacktrace" />
          </div>
          <LogTable rows={crashRows} mode="crash" />
          <div className="fcta-crash-note">crash + stacktrace</div>
        </div>
      </Frame>
    );
  }

  if (step === 1) {
    return (
      <Frame title="Tag 固定以后">
        <div className="fcta-tag">
          <div className="fcta-code">
            <span>private const val TAG = "LoginActivity"</span>
            <span>Log.e(TAG, "login failed")</span>
          </div>
          <div className="fcta-tag-arrow" />
          <Query query="tag:LoginActivity" />
        </div>
      </Frame>
    );
  }

  if (step === 2) {
    return (
      <Frame title="只看页面错误">
        <div className="fcta-page-error">
          <Query query="tag:LoginActivity level:ERROR" />
          <LogTable rows={moduleRows} mode="tag-error" />
          <div className="fcta-page-note">module + severity</div>
        </div>
      </Frame>
    );
  }

  return (
    <Frame title="只看最近五分钟">
      <div className="fcta-age">
        <Query query="package:mine age:5m" />
        <div className="fcta-time-window">
          <div className="fcta-window-label">recent window</div>
          <LogTable rows={timelineRows} mode="recent" />
        </div>
      </div>
    </Frame>
  );
}
