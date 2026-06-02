import type { ReactNode } from "react";
import type { ChapterStepProps } from "../../registry/types";
import "./CheatSheetClose.css";

const groups = [
  [
    { label: "当前项目", query: "package:mine" },
    { label: "当前项目错误", query: "package:mine level:ERROR" },
    { label: "当前项目崩溃", query: "package:mine is:crash" },
  ],
  [
    { label: "某个页面", query: "package:mine tag:MainActivity" },
    { label: "某个关键词", query: "package:mine message:timeout" },
    { label: "最近五分钟", query: "package:mine age:5m" },
  ],
];

function Frame({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="csc-scene scene-pad">
      <div className="csc-grid" aria-hidden="true" />
      <div className="csc-corner csc-corner--tl" />
      <div className="csc-corner csc-corner--br" />
      <h1 className="csc-title">{title}</h1>
      {children}
    </div>
  );
}

function Sheet({
  activeGroup,
  compound,
  exclusion,
  blank,
}: {
  activeGroup?: number;
  compound?: boolean;
  exclusion?: boolean;
  blank?: boolean;
}) {
  return (
    <div className={blank ? "csc-sheet csc-sheet--blank" : "csc-sheet"}>
      <div className="csc-sheet-rule" />
      {blank
        ? Array.from({ length: 6 }).map((_, index) => (
            <div className="csc-slot" key={index}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <i />
            </div>
          ))
        : groups.map((group, groupIndex) => (
            <div
              className={[
                "csc-group",
                activeGroup === groupIndex ? "csc-group--active" : "",
                activeGroup !== undefined && activeGroup !== groupIndex ? "csc-group--dim" : "",
              ].join(" ")}
              key={group.map((item) => item.query).join("|")}
            >
              {group.map((item, index) => (
                <div
                  className={[
                    "csc-row",
                    activeGroup === groupIndex ? "csc-row--scan" : "",
                    activeGroup === groupIndex ? `csc-row--scan-${index}` : "",
                  ].join(" ")}
                  key={item.query}
                >
                  <span>{String(groupIndex * 3 + index + 1).padStart(2, "0")}</span>
                  <strong>{item.query}</strong>
                  <em>{item.label}</em>
                </div>
              ))}
            </div>
          ))}
      {compound ? (
        <div className="csc-wide csc-wide--compound">
          <span>07</span>
          <strong>package:mine tag:LoginActivity level:ERROR age:5m</strong>
          <em>某模块最近五分钟错误</em>
        </div>
      ) : null}
      {exclusion ? (
        <div className="csc-wide csc-wide--exclude">
          <span>08</span>
          <strong>package:mine -tag:OpenGLRenderer</strong>
          <em>排除刷屏 Tag</em>
        </div>
      ) : null}
    </div>
  );
}

function Verdict({ mode }: { mode: "many" | "method" }) {
  return (
    <div className={mode === "many" ? "csc-verdict csc-verdict--many" : "csc-verdict csc-verdict--method"}>
      <div className="csc-log-cloud" aria-hidden="true">
        {Array.from({ length: 18 }).map((_, index) => (
          <i key={index} />
        ))}
      </div>
      <div className="csc-verdict-line">
        <span>{mode === "many" ? "not afraid" : "real risk"}</span>
        <strong>{mode === "many" ? "Logcat 不怕日志多" : "怕的是没有筛选方法"}</strong>
      </div>
    </div>
  );
}

function CloseLoop() {
  return (
    <div className="csc-close">
      <div className="csc-noise">
        {["SYS", "NET", "APP", "OLD", "GL", "AUTH", "DB", "UI"].map((tag) => (
          <span key={tag}>{tag}</span>
        ))}
      </div>
      <div className="csc-funnel">
        <div>整屏日志</div>
        <div>缩小范围</div>
        <div>错误点</div>
      </div>
      <div className="csc-target">
        <span>focus</span>
        <strong>先缩小范围，再找错误点</strong>
      </div>
    </div>
  );
}

export default function CheatSheetClose({ step }: ChapterStepProps) {
  if (step === 0) {
    return (
      <Frame title="这里留一个速查版">
        <Sheet blank />
      </Frame>
    );
  }

  if (step === 1) {
    return (
      <Frame title="当前项目三条">
        <Sheet activeGroup={0} />
      </Frame>
    );
  }

  if (step === 2) {
    return (
      <Frame title="页面、关键词、时间">
        <Sheet activeGroup={1} />
      </Frame>
    );
  }

  if (step === 3) {
    return (
      <Frame title="某模块最近五分钟错误">
        <Sheet compound />
      </Frame>
    );
  }

  if (step === 4) {
    return (
      <Frame title="排除刷屏 Tag">
        <Sheet compound exclusion />
      </Frame>
    );
  }

  if (step === 5) {
    return (
      <Frame title="Logcat 不怕日志多">
        <Verdict mode="many" />
      </Frame>
    );
  }

  if (step === 6) {
    return (
      <Frame title="怕的是没有筛选方法">
        <Verdict mode="method" />
      </Frame>
    );
  }

  return (
    <Frame title="以后别硬看整屏日志">
      <CloseLoop />
    </Frame>
  );
}
