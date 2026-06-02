import type { ReactNode } from "react";
import type { ChapterStepProps } from "../../registry/types";
import "./FieldsSearchTimeException.css";

const keywords = ["timeout", "failed", "null", "exception"];
const ages = ["age:30s", "age:5m", "age:1h"];

const logLines = [
  "09:41:08 MainActivity render home screen",
  "09:42:11 AuthRepo request failed",
  "09:42:12 OkHttp timeout after 10000ms",
  "09:42:13 LoginActivity null token",
  "09:42:14 AndroidRuntime exception thrown",
];

function Frame({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="fste-scene scene-pad">
      <div className="fste-grid" aria-hidden="true" />
      <div className="fste-corner fste-corner--tl" />
      <div className="fste-corner fste-corner--br" />
      <h1 className="fste-title">{title}</h1>
      {children}
    </div>
  );
}

function Query({ query }: { query: string }) {
  return (
    <div className="fste-query" aria-label={query}>
      <span>&gt;</span>
      <strong>{query}</strong>
      <i />
    </div>
  );
}

function FieldCard({
  field,
  value,
  source,
  note,
}: {
  field: string;
  value: string;
  source: string;
  note: string;
}) {
  return (
    <div className="fste-field-card">
      <span>{field}</span>
      <strong>{value}</strong>
      <em>{note}</em>
      <small>{source}</small>
    </div>
  );
}

export default function FieldsSearchTimeException({ step }: ChapterStepProps) {
  if (step === 0) {
    return (
      <Frame title="message 查内容">
        <div className="fste-message-stage">
          <FieldCard
            field="message:"
            note="按日志内容里的关键词筛"
            source="article §4 / L191-L198"
            value="content"
          />
          <div className="fste-message-demo">
            <Query query="message:timeout" />
            <div className="fste-log-scan">
              {logLines.map((line) => (
                <span className={line.includes("timeout") ? "fste-hit" : ""} key={line}>
                  {line}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Frame>
    );
  }

  if (step === 1) {
    return (
      <Frame title="关键词先记这些">
        <div className="fste-keywords">
          {keywords.map((keyword, index) => (
            <div className="fste-keyword" key={keyword}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{keyword}</strong>
            </div>
          ))}
        </div>
      </Frame>
    );
  }

  if (step === 2) {
    return (
      <Frame title="age 按时间切片">
        <div className="fste-age-stage">
          <FieldCard
            field="age:"
            note="按时间范围筛"
            source="article §4 / L208-L220"
            value="time"
          />
          <div className="fste-age-options">
            {ages.map((age, index) => (
              <div className="fste-age-card" key={age}>
                <span>{age}</span>
                <strong>{index === 0 ? "最近 30 秒" : index === 1 ? "最近 5 分钟" : "最近 1 小时"}</strong>
              </div>
            ))}
          </div>
        </div>
      </Frame>
    );
  }

  if (step === 3) {
    return (
      <Frame title="crash 直达崩溃">
        <div className="fste-is-stage">
          <Query query="is:crash" />
          <div className="fste-crash-gate">
            <span>FATAL EXCEPTION</span>
            <strong>crash log only</strong>
          </div>
        </div>
      </Frame>
    );
  }

  return (
    <Frame title="stacktrace 看堆栈">
      <div className="fste-stack-stage">
        <Query query="is:stacktrace" />
        <div className="fste-stack">
          <span>Caused by: token expired</span>
          <span>at LoginViewModel.login(LoginViewModel.kt:42)</span>
          <span>at LoginActivity.onClick(LoginActivity.kt:88)</span>
        </div>
      </div>
    </Frame>
  );
}
