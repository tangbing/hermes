import type { ReactNode } from "react";
import type { ChapterStepProps } from "../../registry/types";
import "./SavedTemplatesCore.css";

type Preset = {
  slot: string;
  name: string;
  query: string;
  source: string;
  intent: string;
};

const presets: Preset[] = [
  {
    slot: "01",
    name: "日常开发",
    query: "package:mine",
    source: "article §3 / L102-L108",
    intent: "只看当前项目",
  },
  {
    slot: "02",
    name: "看错误",
    query: "package:mine level:ERROR",
    source: "article §3 / L110-L114",
    intent: "当前项目错误",
  },
  {
    slot: "03",
    name: "看闪退",
    query: "package:mine is:crash",
    source: "article §3 / L116-L120",
    intent: "当前项目崩溃",
  },
];

function Frame({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="stc-scene scene-pad">
      <div className="stc-grid" aria-hidden="true" />
      <div className="stc-corner stc-corner--tl" />
      <div className="stc-corner stc-corner--br" />
      <h1 className="stc-title">{title}</h1>
      {children}
    </div>
  );
}

function QueryLine({ query }: { query: string }) {
  return (
    <div className="stc-query" aria-label={query}>
      <span>&gt;</span>
      <strong>{query}</strong>
      <i />
    </div>
  );
}

function PresetRow({
  preset,
  active,
}: {
  preset: Preset;
  active?: boolean;
}) {
  return (
    <div className={active ? "stc-row stc-row--active" : "stc-row"}>
      <span>{preset.slot}</span>
      <strong>{preset.name}</strong>
      <em>{preset.query}</em>
      <small>{preset.source}</small>
    </div>
  );
}

function TemplateRail({ activeIndex }: { activeIndex: number }) {
  return (
    <div className="stc-rail">
      {presets.map((preset, index) => (
        <PresetRow active={index <= activeIndex} key={preset.slot} preset={preset} />
      ))}
    </div>
  );
}

export default function SavedTemplatesCore({ step }: ChapterStepProps) {
  if (step === 0) {
    return (
      <Frame title="先收藏模板">
        <div className="stc-stage stc-stage--daily">
          <div className="stc-builder">
            <div className="stc-label">saved filter / 01</div>
            <QueryLine query={presets[0].query} />
            <div className="stc-purpose">{presets[0].intent}</div>
          </div>
          <TemplateRail activeIndex={0} />
        </div>
      </Frame>
    );
  }

  if (step === 1) {
    return (
      <Frame title="错误单独收藏">
        <div className="stc-stage stc-stage--error">
          <div className="stc-token-stack">
            <span>package:mine</span>
            <i />
            <span>level:ERROR</span>
          </div>
          <QueryLine query={presets[1].query} />
          <TemplateRail activeIndex={1} />
        </div>
      </Frame>
    );
  }

  if (step === 2) {
    return (
      <Frame title="闪退也单独放">
        <div className="stc-stage stc-stage--crash">
          <QueryLine query={presets[2].query} />
          <div className="stc-crash-scope">
            <span>APP</span>
            <strong>CRASH</strong>
            <em>FATAL EXCEPTION</em>
          </div>
          <TemplateRail activeIndex={2} />
        </div>
      </Frame>
    );
  }

  return (
    <Frame title="三条先放最前">
      <div className="stc-board">
        {presets.map((preset) => (
          <div className="stc-card" key={preset.slot}>
            <span>{preset.slot}</span>
            <strong>{preset.name}</strong>
            <em>{preset.query}</em>
            <small>{preset.intent}</small>
          </div>
        ))}
      </div>
      <div className="stc-close">不用临场拼查询</div>
    </Frame>
  );
}
