import type { ReactNode } from "react";
import type { ChapterStepProps } from "../../registry/types";
import "./SavedTemplatesSearch.css";

type Template = {
  slot: string;
  label: string;
  query: string;
  source: string;
  focus: string;
};

const templates: Template[] = [
  {
    slot: "04",
    label: "查页面",
    query: "package:mine tag:MainActivity",
    source: "article §3 / L122-L126",
    focus: "页面 Tag",
  },
  {
    slot: "05",
    label: "查关键词",
    query: "package:mine message:timeout",
    source: "article §3 / L128-L132",
    focus: "日志内容",
  },
  {
    slot: "06",
    label: "最近操作",
    query: "package:mine age:3m",
    source: "article §3 / L134-L138",
    focus: "时间窗口",
  },
  {
    slot: "07",
    label: "登录页错误",
    query: "package:mine tag:LoginActivity level:ERROR age:5m",
    source: "article §3 / L140-L144",
    focus: "组合查询",
  },
];

const fields = ["package:mine", "tag:LoginActivity", "level:ERROR", "age:5m"];

function Frame({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="sts-scene scene-pad">
      <div className="sts-grid" aria-hidden="true" />
      <div className="sts-corner sts-corner--tl" />
      <div className="sts-corner sts-corner--br" />
      <h1 className="sts-title">{title}</h1>
      {children}
    </div>
  );
}

function Query({ query }: { query: string }) {
  return (
    <div className="sts-query" aria-label={query}>
      <span>&gt;</span>
      <strong>{query}</strong>
      <i />
    </div>
  );
}

function TemplateCard({ template }: { template: Template }) {
  return (
    <div className="sts-card">
      <span>{template.slot}</span>
      <strong>{template.label}</strong>
      <em>{template.query}</em>
      <small>{template.source}</small>
    </div>
  );
}

function BlueprintLine({ from, to }: { from: string; to: string }) {
  return (
    <div className="sts-line">
      <span>{from}</span>
      <i />
      <span>{to}</span>
    </div>
  );
}

export default function SavedTemplatesSearch({ step }: ChapterStepProps) {
  if (step === 0) {
    return (
      <Frame title="页面和关键词">
        <div className="sts-two-up">
          <TemplateCard template={templates[0]} />
          <TemplateCard template={templates[1]} />
          <BlueprintLine from="tag" to="message" />
        </div>
      </Frame>
    );
  }

  if (step === 1) {
    return (
      <Frame title="最近操作单独查">
        <div className="sts-age-stage">
          <Query query={templates[2].query} />
          <div className="sts-timeline">
            <div className="sts-tick sts-tick--old">09:30 old logs</div>
            <div className="sts-tick sts-tick--old">09:36 previous run</div>
            <div className="sts-tick sts-tick--active">09:44 click</div>
            <div className="sts-tick sts-tick--active">09:45 error</div>
          </div>
          <div className="sts-age-note">last 3 minutes</div>
        </div>
      </Frame>
    );
  }

  if (step === 2) {
    return (
      <Frame title="登录页错误组合">
        <div className="sts-combo">
          <Query query={templates[3].query} />
          <div className="sts-combo-fields">
            {fields.map((field) => (
              <span key={field}>{field}</span>
            ))}
          </div>
          <div className="sts-combo-result">
            <strong>LoginActivity</strong>
            <em>ERROR</em>
            <small>within 5m</small>
          </div>
        </div>
      </Frame>
    );
  }

  return (
    <Frame title="背后都是字段">
      <div className="sts-field-board">
        {["package", "tag", "message", "age", "level"].map((field, index) => (
          <div className="sts-field" key={field}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <strong>{field}</strong>
          </div>
        ))}
      </div>
      <div className="sts-close">下一步拆开看</div>
    </Frame>
  );
}
