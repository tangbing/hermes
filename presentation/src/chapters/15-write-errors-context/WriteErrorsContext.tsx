import type { ReactNode } from "react";
import type { ChapterStepProps } from "../../registry/types";
import "./WriteErrorsContext.css";

const logRows = [
  { level: "DEBUG", tag: "Order", message: "submit" },
  { level: "INFO", tag: "UI", message: "button clicked" },
  { level: "ERROR", tag: "Network", message: "request failed" },
  { level: "DEBUG", tag: "Order", message: "render form" },
];

const contextPoints = ["userId", "productId", "params"];

function Frame({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="wec-scene scene-pad">
      <div className="wec-grid" aria-hidden="true" />
      <div className="wec-corner wec-corner--tl" />
      <div className="wec-corner wec-corner--br" />
      <h1 className="wec-title">{title}</h1>
      {children}
    </div>
  );
}

function CodePanel({
  lines,
  active,
}: {
  lines: string[];
  active?: number;
}) {
  return (
    <div className="wec-code">
      {lines.map((line, index) => (
        <p className={index === active ? "wec-code-line wec-code-line--active" : "wec-code-line"} key={line}>
          {line}
        </p>
      ))}
    </div>
  );
}

function QueryBar({ query }: { query: string }) {
  return (
    <div className="wec-query" aria-label={query}>
      <span>&gt;</span>
      <strong>{query}</strong>
      <i />
    </div>
  );
}

function LogTable({ errorOnly }: { errorOnly?: boolean }) {
  return (
    <div className={errorOnly ? "wec-table wec-table--error-only" : "wec-table"}>
      {logRows.map((row, index) => {
        const hidden = errorOnly && row.level !== "ERROR";
        return (
          <div
            className={[
              "wec-row",
              row.level === "ERROR" ? "wec-row--error" : "",
              hidden ? "wec-row--muted" : "",
            ].join(" ")}
            key={`${row.level}-${index}`}
          >
            <span>{row.level}</span>
            <span>{row.tag}</span>
            <span>{row.message}</span>
          </div>
        );
      })}
    </div>
  );
}

export default function WriteErrorsContext({ step }: ChapterStepProps) {
  if (step === 0) {
    return (
      <Frame title="错误日志优先用 Log.e">
        <div className="wec-hero">
          <strong>Log.e</strong>
          <span>问题日志先进入错误通道</span>
        </div>
      </Frame>
    );
  }

  if (step === 1) {
    return (
      <Frame title="失败要带异常对象">
        <div className="wec-code-stage">
          <CodePanel lines={['Log.e("Network", "request failed", e)']} active={0} />
          <div className="wec-exception-card">
            <span>exception</span>
            <strong>e</strong>
          </div>
        </div>
      </Frame>
    );
  }

  if (step === 2) {
    return (
      <Frame title="直接筛错误级别">
        <div className="wec-query-stage">
          <QueryBar query="level:ERROR" />
          <LogTable errorOnly />
        </div>
      </Frame>
    );
  }

  if (step === 3) {
    return (
      <Frame title="普通调试和问题日志分开">
        <div className="wec-split">
          <section>
            <h2>debug</h2>
            <LogTable />
          </section>
          <section>
            <h2>problem</h2>
            <LogTable errorOnly />
          </section>
        </div>
      </Frame>
    );
  }

  if (step === 4) {
    return (
      <Frame title="不要只写 submit">
        <div className="wec-code-stage">
          <CodePanel lines={['Log.d("Order", "submit")']} active={0} />
          <div className="wec-thin-card">
            <span>missing context</span>
            <strong>submit</strong>
          </div>
        </div>
      </Frame>
    );
  }

  if (step === 5) {
    return (
      <Frame title="把关键上下文打出来">
        <div className="wec-context-code">
          <CodePanel lines={['Log.d("Order", "submit order, userId=$userId, productId=$productId")']} active={0} />
          <div className="wec-context-line" aria-hidden="true" />
        </div>
      </Frame>
    );
  }

  if (step === 6) {
    return (
      <Frame title="留下三个信息点">
        <div className="wec-points">
          {contextPoints.map((point, index) => (
            <div className="wec-point" key={point}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{point}</strong>
            </div>
          ))}
        </div>
      </Frame>
    );
  }

  return (
    <Frame title="回头一看就知道">
      <div className="wec-final">
        <div className="wec-final-line">
          <span>Order</span>
          <strong>submit order, userId=..., productId=...</strong>
        </div>
        <div className="wec-final-note">当时发生了什么，一眼能还原</div>
      </div>
    </Frame>
  );
}
