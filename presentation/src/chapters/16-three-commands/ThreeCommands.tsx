import type { ReactNode } from "react";
import type { ChapterStepProps } from "../../registry/types";
import "./ThreeCommands.css";

const commands = [
  { query: "package:mine", meaning: "自己项目" },
  { query: "package:mine level:ERROR", meaning: "自己项目的错误" },
  { query: "package:mine is:crash", meaning: "自己项目的崩溃" },
];

function Frame({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="tc-scene scene-pad">
      <div className="tc-grid" aria-hidden="true" />
      <div className="tc-corner tc-corner--tl" />
      <div className="tc-corner tc-corner--br" />
      <h1 className="tc-title">{title}</h1>
      {children}
    </div>
  );
}

function CommandCard({
  index,
  active,
  revealMeaning,
  mode,
}: {
  index: number;
  active?: boolean;
  revealMeaning?: boolean;
  mode?: "command" | "meaning" | "coverage";
}) {
  const command = commands[index]!;
  return (
    <div
      className={[
        "tc-command",
        active ? "tc-command--active" : "",
        mode === "meaning" && active ? "tc-command--meaning" : "",
        mode === "coverage" && active ? "tc-command--coverage" : "",
      ].join(" ")}
    >
      <span>{String(index + 1).padStart(2, "0")}</span>
      <strong>{command.query}</strong>
      <em>{revealMeaning ? command.meaning : "ready"}</em>
    </div>
  );
}

function CommandStack({
  active,
  revealMeaning,
  mode = "command",
}: {
  active: number;
  revealMeaning?: boolean;
  mode?: "command" | "meaning" | "coverage";
}) {
  return (
    <div className={mode === "coverage" ? "tc-stack tc-stack--coverage" : "tc-stack"}>
      {commands.map((_, index) => (
        <CommandCard
          active={index === active}
          index={index}
          key={commands[index]!.query}
          mode={mode}
          revealMeaning={revealMeaning && index === active}
        />
      ))}
      {mode === "coverage" ? (
        <div className="tc-coverage">
          <span>covers</span>
          <strong>很多新手调试问题</strong>
        </div>
      ) : null}
    </div>
  );
}

export default function ThreeCommands({ step }: ChapterStepProps) {
  if (step === 0) {
    return (
      <Frame title="只想先记三条">
        <div className="tc-hero">
          <strong>3</strong>
          <span>commands first</span>
        </div>
      </Frame>
    );
  }

  if (step === 1) {
    return (
      <Frame title="第一条">
        <CommandStack active={0} />
      </Frame>
    );
  }

  if (step === 2) {
    return (
      <Frame title="第二条">
        <CommandStack active={1} />
      </Frame>
    );
  }

  if (step === 3) {
    return (
      <Frame title="第三条">
        <CommandStack active={2} />
      </Frame>
    );
  }

  if (step === 4) {
    return (
      <Frame title="看自己项目">
        <CommandStack active={0} mode="meaning" revealMeaning />
      </Frame>
    );
  }

  if (step === 5) {
    return (
      <Frame title="看自己项目的错误">
        <CommandStack active={1} mode="meaning" revealMeaning />
      </Frame>
    );
  }

  return (
    <Frame title="看自己项目的崩溃">
      <CommandStack active={2} mode="coverage" revealMeaning />
    </Frame>
  );
}
