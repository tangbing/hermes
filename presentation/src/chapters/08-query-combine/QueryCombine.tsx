import type { ReactNode } from "react";
import type { ChapterStepProps } from "../../registry/types";
import "./QueryCombine.css";

const queryParts = ["package:mine", "tag:LoginActivity", "level:ERROR", "age:5m"];

const resultRows = [
  { field: "package", value: "mine", meaning: "当前项目" },
  { field: "tag", value: "LoginActivity", meaning: "登录页面" },
  { field: "level", value: "ERROR", meaning: "错误级别" },
  { field: "age", value: "5m", meaning: "最近五分钟" },
];

function Frame({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="qc-scene scene-pad">
      <div className="qc-grid" aria-hidden="true" />
      <div className="qc-corner qc-corner--tl" />
      <div className="qc-corner qc-corner--br" />
      <h1 className="qc-title">{title}</h1>
      {children}
    </div>
  );
}

function Query({ parts }: { parts: string[] }) {
  return (
    <div className="qc-query" aria-label={parts.join(" ")}>
      <span>&gt;</span>
      {parts.map((part) => (
        <strong key={part}>{part}</strong>
      ))}
      <i />
    </div>
  );
}

export default function QueryCombine({ step }: ChapterStepProps) {
  if (step === 0) {
    return (
      <Frame title="组合查询才好用">
        <div className="qc-intro">
          <div className="qc-field-cloud">
            {queryParts.map((part, index) => (
              <span key={part}>{String(index + 1).padStart(2, "0")} / {part}</span>
            ))}
          </div>
          <div className="qc-intro-note">多个条件一起收窄</div>
        </div>
      </Frame>
    );
  }

  if (step === 1) {
    return (
      <Frame title="完整查询长这样">
        <div className="qc-full">
          <Query parts={queryParts} />
          <div className="qc-query-source">article §5 / L242-L250</div>
        </div>
      </Frame>
    );
  }

  if (step === 2) {
    return (
      <Frame title="四个条件同时生效">
        <div className="qc-breakdown">
          {resultRows.map((row) => (
            <div className="qc-break-card" key={row.field}>
              <span>{row.field}</span>
              <strong>{row.value}</strong>
              <em>{row.meaning}</em>
            </div>
          ))}
        </div>
      </Frame>
    );
  }

  return (
    <Frame title="业务问题直接定位">
      <div className="qc-result">
        <div className="qc-path">
          <span>current project</span>
          <i />
          <span>LoginActivity</span>
          <i />
          <span>ERROR</span>
          <i />
          <span>5m</span>
        </div>
        <div className="qc-ticket">
          <strong>login failed</strong>
          <em>token expired / LoginViewModel.kt:42</em>
          <small>这种组合查询最实用</small>
        </div>
      </div>
    </Frame>
  );
}
