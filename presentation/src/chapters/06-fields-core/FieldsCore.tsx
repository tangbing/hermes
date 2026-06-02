import type { ReactNode } from "react";
import type { ChapterStepProps } from "../../registry/types";
import "./FieldsCore.css";

const levels = ["VERBOSE", "DEBUG", "INFO", "WARN", "ERROR", "ASSERT"];

function Frame({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="fc-scene scene-pad">
      <div className="fc-grid" aria-hidden="true" />
      <div className="fc-corner fc-corner--tl" />
      <div className="fc-corner fc-corner--br" />
      <h1 className="fc-title">{title}</h1>
      {children}
    </div>
  );
}

function Query({ query }: { query: string }) {
  return (
    <div className="fc-query" aria-label={query}>
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
    <div className="fc-field-card">
      <span>{field}</span>
      <strong>{value}</strong>
      <em>{note}</em>
      <small>{source}</small>
    </div>
  );
}

export default function FieldsCore({ step }: ChapterStepProps) {
  if (step === 0) {
    return (
      <Frame title="package 按包名筛">
        <div className="fc-package-stage">
          <FieldCard
            field="package:"
            note="按包名筛选日志"
            source="article §4 / L148-L157"
            value="scope"
          />
          <div className="fc-scope-map">
            <span className="fc-scope-node fc-scope-node--active">mine</span>
            <span className="fc-scope-node">system</span>
            <span className="fc-scope-node">other app</span>
            <span className="fc-scope-node">old run</span>
          </div>
        </div>
      </Frame>
    );
  }

  if (step === 1) {
    return (
      <Frame title="最常见是 mine">
        <div className="fc-mine-stage">
          <Query query="package:mine" />
          <div className="fc-mine-readout">
            <span>current project</span>
            <strong>only</strong>
          </div>
        </div>
      </Frame>
    );
  }

  if (step === 2) {
    return (
      <Frame title="level 按级别筛">
        <div className="fc-level-stage">
          <FieldCard
            field="level:"
            note="按日志级别筛选"
            source="article §4 / L161-L170"
            value="severity"
          />
          <div className="fc-levels">
            {levels.map((level, index) => (
              <span className={index >= 4 ? "fc-level fc-level--hot" : "fc-level"} key={level}>
                {level}
              </span>
            ))}
          </div>
        </div>
      </Frame>
    );
  }

  if (step === 3) {
    return (
      <Frame title="ERROR 只留问题">
        <div className="fc-error-stage">
          <Query query="level:ERROR" />
          <div className="fc-error-cut">
            <span>INFO</span>
            <span>WARN</span>
            <strong>ERROR</strong>
            <strong>ASSERT</strong>
          </div>
          <div className="fc-error-note">错误和更严重的问题</div>
        </div>
      </Frame>
    );
  }

  return (
    <Frame title="tag 盯住模块">
      <div className="fc-tag-stage">
        <FieldCard
          field="tag:"
          note="按日志 Tag 筛选"
          source="article §4 / L180-L187"
          value="module"
        />
        <Query query="tag:Network" />
        <div className="fc-tag-target">
          <span>Network</span>
          <em>module isolated</em>
        </div>
      </div>
    </Frame>
  );
}
