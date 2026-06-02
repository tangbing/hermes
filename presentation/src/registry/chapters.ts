import type { ChapterDef } from "./types";
import LogcatProblemChapter from "../chapters/01-logcat-problem/LogcatProblem";
import { narrations as logcatProblemNarrations } from "../chapters/01-logcat-problem/narrations";
import FilterPackageErrorChapter from "../chapters/02-filter-package-error/FilterPackageError";
import { narrations as filterPackageErrorNarrations } from "../chapters/02-filter-package-error/narrations";
import FilterCrashTagAgeChapter from "../chapters/03-filter-crash-tag-age/FilterCrashTagAge";
import { narrations as filterCrashTagAgeNarrations } from "../chapters/03-filter-crash-tag-age/narrations";
import SavedTemplatesCoreChapter from "../chapters/04-saved-templates-core/SavedTemplatesCore";
import { narrations as savedTemplatesCoreNarrations } from "../chapters/04-saved-templates-core/narrations";
import SavedTemplatesSearchChapter from "../chapters/05-saved-templates-search/SavedTemplatesSearch";
import { narrations as savedTemplatesSearchNarrations } from "../chapters/05-saved-templates-search/narrations";
import FieldsCoreChapter from "../chapters/06-fields-core/FieldsCore";
import { narrations as fieldsCoreNarrations } from "../chapters/06-fields-core/narrations";
import FieldsSearchTimeExceptionChapter from "../chapters/07-fields-search-time-exception/FieldsSearchTimeException";
import { narrations as fieldsSearchTimeExceptionNarrations } from "../chapters/07-fields-search-time-exception/narrations";
import QueryCombineChapter from "../chapters/08-query-combine/QueryCombine";
import { narrations as queryCombineNarrations } from "../chapters/08-query-combine/narrations";
import QueryExcludeComplexChapter from "../chapters/09-query-exclude-complex/QueryExcludeComplex";
import { narrations as queryExcludeComplexNarrations } from "../chapters/09-query-exclude-complex/narrations";
import LogcatButtonsChapter from "../chapters/10-logcat-buttons/LogcatButtons";
import { narrations as logcatButtonsNarrations } from "../chapters/10-logcat-buttons/narrations";
import ScenarioClickChapter from "../chapters/11-scenario-click/ScenarioClick";
import { narrations as scenarioClickNarrations } from "../chapters/11-scenario-click/narrations";
import ScenarioCrashChapter from "../chapters/12-scenario-crash/ScenarioCrash";
import { narrations as scenarioCrashNarrations } from "../chapters/12-scenario-crash/narrations";
import ScenarioNetworkChapter from "../chapters/13-scenario-network/ScenarioNetwork";
import { narrations as scenarioNetworkNarrations } from "../chapters/13-scenario-network/narrations";
import WriteGoodTagsChapter from "../chapters/14-write-good-tags/WriteGoodTags";
import { narrations as writeGoodTagsNarrations } from "../chapters/14-write-good-tags/narrations";
import WriteErrorsContextChapter from "../chapters/15-write-errors-context/WriteErrorsContext";
import { narrations as writeErrorsContextNarrations } from "../chapters/15-write-errors-context/narrations";
import ThreeCommandsChapter from "../chapters/16-three-commands/ThreeCommands";
import { narrations as threeCommandsNarrations } from "../chapters/16-three-commands/narrations";
import CheatSheetCloseChapter from "../chapters/17-cheat-sheet-close/CheatSheetClose";
import { narrations as cheatSheetCloseNarrations } from "../chapters/17-cheat-sheet-close/narrations";

/**
 * Order = order of presentation.
 *
 * Each chapter MUST provide a `narrations: Narration[]` array. Its length
 * is the chapter's step count — there is no `totalSteps` to maintain
 * separately. This guarantees the audio synthesis pipeline, the runtime
 * stepper, and the chapter `.tsx` switch on `step` cannot drift apart.
 *
 * Visual styling (color, fonts) comes entirely from the active theme —
 * chapters never hard-code palette / font names. See THEMES.md.
 */
export const CHAPTERS: ChapterDef[] = [
  {
    id: "logcat-problem",
    title: "别硬盯满屏日志",
    narrations: logcatProblemNarrations,
    Component: LogcatProblemChapter,
  },
  {
    id: "filter-package-error",
    title: "当前项目和错误日志",
    narrations: filterPackageErrorNarrations,
    Component: FilterPackageErrorChapter,
  },
  {
    id: "filter-crash-tag-age",
    title: "崩溃、模块和时间",
    narrations: filterCrashTagAgeNarrations,
    Component: FilterCrashTagAgeChapter,
  },
  {
    id: "saved-templates-core",
    title: "先收藏三条核心模板",
    narrations: savedTemplatesCoreNarrations,
    Component: SavedTemplatesCoreChapter,
  },
  {
    id: "saved-templates-search",
    title: "页面、关键词和最近操作",
    narrations: savedTemplatesSearchNarrations,
    Component: SavedTemplatesSearchChapter,
  },
  {
    id: "fields-core",
    title: "package、level、tag",
    narrations: fieldsCoreNarrations,
    Component: FieldsCoreChapter,
  },
  {
    id: "fields-search-time-exception",
    title: "message、age 和 is",
    narrations: fieldsSearchTimeExceptionNarrations,
    Component: FieldsSearchTimeExceptionChapter,
  },
  {
    id: "query-combine",
    title: "组合查询最实用",
    narrations: queryCombineNarrations,
    Component: QueryCombineChapter,
  },
  {
    id: "query-exclude-complex",
    title: "排除刷屏和查业务链路",
    narrations: queryExcludeComplexNarrations,
    Component: QueryExcludeComplexChapter,
  },
  {
    id: "logcat-buttons",
    title: "Mac 上几个有用按钮",
    narrations: logcatButtonsNarrations,
    Component: LogcatButtonsChapter,
  },
  {
    id: "scenario-click",
    title: "点按钮没反应怎么查",
    narrations: scenarioClickNarrations,
    Component: ScenarioClickChapter,
  },
  {
    id: "scenario-crash",
    title: "程序闪退看哪里",
    narrations: scenarioCrashNarrations,
    Component: ScenarioCrashChapter,
  },
  {
    id: "scenario-network",
    title: "网络请求失败怎么查",
    narrations: scenarioNetworkNarrations,
    Component: ScenarioNetworkChapter,
  },
  {
    id: "write-good-tags",
    title: "日志 Tag 要固定、有意义",
    narrations: writeGoodTagsNarrations,
    Component: WriteGoodTagsChapter,
  },
  {
    id: "write-errors-context",
    title: "错误级别和上下文",
    narrations: writeErrorsContextNarrations,
    Component: WriteErrorsContextChapter,
  },
  {
    id: "three-commands",
    title: "新手先记三条命令",
    narrations: threeCommandsNarrations,
    Component: ThreeCommandsChapter,
  },
  {
    id: "cheat-sheet-close",
    title: "速查版和收束",
    narrations: cheatSheetCloseNarrations,
    Component: CheatSheetCloseChapter,
  },
];
