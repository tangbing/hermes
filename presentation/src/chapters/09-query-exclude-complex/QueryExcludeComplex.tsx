import type { ReactNode } from "react";
import type { ChapterStepProps } from "../../registry/types";
import "./QueryExcludeComplex.css";

type Row = {
  tag: string;
  kind: "APP" | "GPU" | "SYS" | "ERR";
  message: string;
};

const rows: Row[] = [
  { tag: "OpenGLRenderer", kind: "GPU", message: "Davey! duration=982ms" },
  { tag: "MainActivity", kind: "APP", message: "click login" },
  { tag: "OpenGLRenderer", kind: "GPU", message: "eglSwapBuffers completed" },
  { tag: "LoginActivity", kind: "ERR", message: "login failed" },
  { tag: "OpenGLRenderer", kind: "GPU", message: "Frame deadline missed" },
  { tag: "AuthRepo", kind: "ERR", message: "token expired" },
  { tag: "Choreographer", kind: "SYS", message: "Skipped 47 frames" },
];

const chain = ["LoginActivity", "AuthRepo", "ERROR", "package:mine"];
const flows = ["登录流程", "支付流程", "网络请求流程"];

function Frame({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="qec-scene scene-pad">
      <div className="qec-grid" aria-hidden="true" />
      <div className="qec-corner qec-corner--tl" />
      <div className="qec-corner qec-corner--br" />
      <h1 className="qec-title">{title}</h1>
      {children}
    </div>
  );
}

function Query({ text }: { text: string }) {
  return (
    <div className="qec-query" aria-label={text}>
      <span>&gt;</span>
      <strong>{text}</strong>
      <i />
    </div>
  );
}

function LogTable({ exclude }: { exclude?: boolean }) {
  return (
    <div className={exclude ? "qec-table qec-table--exclude" : "qec-table"}>
      {rows.map((row, index) => {
        const isNoise = row.tag === "OpenGLRenderer";
        return (
          <div
            className={[
              "qec-row",
              isNoise ? "qec-row--noise" : "",
              row.kind === "ERR" ? "qec-row--error" : "",
            ].join(" ")}
            key={`${row.tag}-${index}`}
          >
            <span>{String(index + 1).padStart(2, "0")}</span>
            <span>{row.kind}</span>
            <span>{row.tag}</span>
            <span>{row.message}</span>
          </div>
        );
      })}
    </div>
  );
}

export default function QueryExcludeComplex({ step }: ChapterStepProps) {
  if (step === 0) {
    return (
      <Frame title="Tag 刷屏怎么办">
        <div className="qec-noise">
          <LogTable />
          <div className="qec-noise-meter">
            <strong>OpenGLRenderer</strong>
            <span>3 noisy rows</span>
          </div>
        </div>
      </Frame>
    );
  }

  if (step === 1) {
    return (
      <Frame title="直接排除它">
        <div className="qec-exclude-query">
          <Query text="package:mine -tag:OpenGLRenderer" />
          <div className="qec-minus-card">
            <span>-tag</span>
            <strong>OpenGLRenderer</strong>
            <em>exclude noisy tag</em>
          </div>
        </div>
      </Frame>
    );
  }

  if (step === 2) {
    return (
      <Frame title="项目日志留下来">
        <div className="qec-kept">
          <LogTable exclude />
          <div className="qec-kept-note">current project kept / OpenGLRenderer removed</div>
        </div>
      </Frame>
    );
  }

  if (step === 3) {
    return (
      <Frame title="刷屏日志先退场">
        <div className="qec-noise-types">
          <div>system logs</div>
          <div className="qec-noise-types--active">render logs</div>
          <div>old traces</div>
        </div>
        <div className="qec-close-note">这招处理渲染日志很有用</div>
      </Frame>
    );
  }

  if (step === 4) {
    return (
      <Frame title="同时看多个模块">
        <div className="qec-complex">
          <Query text="(tag:LoginActivity | tag:AuthRepo) & level:ERROR & package:mine" />
          <div className="qec-chain">
            {chain.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </div>
      </Frame>
    );
  }

  return (
    <Frame title="查一整条链路">
      <div className="qec-flow">
        {flows.map((flow, index) => (
          <div className="qec-flow-card" key={flow}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <strong>{flow}</strong>
            <em>{index === 0 ? "LoginActivity + AuthRepo" : "same pattern"}</em>
          </div>
        ))}
      </div>
      <div className="qec-flow-note">多个模块一起看，链路才完整</div>
    </Frame>
  );
}
