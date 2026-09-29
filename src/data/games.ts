/**
 * 游戏展示页数据源（纯内容）。
 * 页面展示与筛选规则由 src/config/gamesConfig.ts 控制。
 *
 * 封面支持三种写法：
 * - src/assets 相对路径（如本文件所用，走 Astro 图片管线自动优化为 webp/avif）；
 * - /public 绝对路径（如 "/assets/games/xxx.webp"，原样输出）；
 * - 远程 URL（https://…）。
 *
 * 注：以下为演示条目——评分 / 时长 / 状态是占位数值，请按自己的实际情况调整；
 * 封面取自各游戏官方商店页或官网主视觉。
 */
import type { GameItem } from "@/types/gamesConfig";

export const gamesData: GameItem[] = [
  {
    id: "steins-gate",
    name: "STEINS;GATE",
    developer: "MAGES. Inc.",
    category: "visual-novel",
    status: "completed",
    cover: "assets/games/STEINS-GATE.webp",
    hours: 47.6,
    platform: "PC / Steam",
    tags: ["视觉小说", "科幻", "时间旅行"],
    description: "一切都是命运石之门的选择",
  },

  {
    id: "disco-elysium",
    name: "Disco Elysium",
    developer: "ZA/UM",
    category: "rpg",
    status: "completed",
    cover: "assets/games/Disco Elysium.webp",
    hours: 43.7,
    platform: "PC / Steam",
    tags: ["角色扮演", "侦探推理", "剧情丰富"],
    description: "总有一天我会回到你身边。",
  },

  {
    id: "majo-saiban",
    name: "魔法少女的魔女审判",
    developer: "Acacia, Re,AER",
    category: "visual-novel",
    status: "completed",
    cover: "assets/games/魔法少女的魔女审判.webp",
    hours: 36,
    platform: "PC / Steam",
    tags: ["视觉小说", "悬疑", "推理"],
    description: "kiang！",
  },

  {
    id: "steins-gate-0",
    name: "STEINS;GATE 0",
    developer: "MAGES. Inc.",
    category: "visual-novel",
    status: "completed",
    cover: "assets/games/STEINS-GATE 0.webp",
    hours: 34.8,
    platform: "PC / Steam",
    tags: ["视觉小说", "科幻", "时间旅行"],
    description: "",
  },

  {
    id: "touhou-mystias-izakaya",
    name: "东方夜雀食堂 - Touhou Mystia's Izakaya",
    developer: "二色幽紫蝶, Re零同人社",
    category: "simulation",
    status: "playing",
    cover: "assets/games/东方夜雀食堂.webp",
    hours: 28.1,
    platform: "PC / Steam",
    tags: ["模拟经营", "东方Project", "料理"],
    description: "",
  },

  {
    id: "persona-5-royal",
    name: "女神异闻录5 皇家版",
    developer: "ATLUS",
    category: "rpg",
    status: "backlog",
    cover: "assets/games/女神异闻录5 皇家版.webp",
    hours: 26.3,
    platform: "PC / Steam",
    tags: ["日式角色扮演", "回合制", "剧情丰富"],
    description: "P5天下第一（但是被狠狠被刺了）",
  },

  {
    id: "stardew-valley",
    name: "Stardew Valley",
    developer: "ConcernedApe",
    category: "simulation",
    status: "backlog",
    cover: "assets/games/Stardew Valley.webp",
    hours: 20.6,
    platform: "PC / Steam",
    tags: ["农场经营", "生活模拟", "像素风"],
    description: "",
  },

  {
    id: "the-roottrees-are-dead",
    name: "鲁特里一家死了（The Roottrees are Dead）",
    developer: "Evil Trout Inc.",
    category: "puzzle",
    status: "completed",
    cover: "assets/games/鲁特里一家死了.webp",
    hours: 20.4,
    platform: "PC / Steam",
    tags: ["侦探推理", "解谜", "悬疑"],
    description: "这一家子怎么这么乱，不过推理爽",
  },

  {
    id: "christmas-tina",
    name: "Christmas Tina -泡沫冬景-",
    developer: "Koraku",
    category: "visual-novel",
    status: "completed",
    cover: "assets/games/泡沫冬景.webp",
    hours: 18.7,
    platform: "PC / Steam",
    tags: ["视觉小说", "剧情"],
    description: "“生日快乐。”",
  },

  {
    id: "detroit-become-human",
    name: "底特律：化身为人",
    developer: "Quantic Dream",
    category: "adventure",
    status: "completed",
    cover: "assets/games/底特律：化身为人.webp",
    hours: 18.4,
    platform: "PC / Steam",
    tags: ["互动叙事", "多结局", "剧情选择"],
    description: "",
  },

  {
    id: "atri",
    name: "ATRI -My Dear Moments-",
    developer: "Frontwing, 枕",
    category: "visual-novel",
    status: "completed",
    cover: "assets/games/ATRI -My Dear Moments-.webp",
    hours: 13.3,
    platform: "PC / Steam",
    tags: ["视觉小说", "科幻", "剧情"],
    description: "Atri 可爱捏",
  },

  {
    id: "needy-girl-overdose",
    name: "主播女孩重度依赖",
    developer: "WSS playground, xemono",
    category: "visual-novel",
    status: "completed",
    cover: "assets/games/主播女孩重度依赖.webp",
    hours: 11,
    platform: "PC / Steam",
    tags: ["模拟养成", "多结局", "超天酱"],
    description: "锵锵~互联网小天使~",
  },

  {
    id: "unheard",
    name: "疑案追声",
    developer: "NEXT Studios",
    category: "puzzle",
    status: "completed",
    cover: "assets/games/疑案追声.webp",
    hours: 10,
    platform: "PC / Steam",
    tags: ["侦探推理", "声音解谜"],
    description: "打开英文配音即可享受几个小时的纯净版听力练习",
  },

  {
    id: "civilization-vi",
    name: "Sid Meier's Civilization VI",
    developer: "Firaxis Games",
    category: "strategy",
    status: "backlog",
    cover: "assets/games/Civilization VI.webp",
    hours: 6.7,
    platform: "PC / Steam",
    tags: ["回合制策略", "文明建设"],
    description: "没玩懂qwq",
  },

  {
    id: "inmost",
    name: "INMOST",
    developer: "Hidden Layer Games",
    category: "adventure",
    status: "completed",
    cover: "assets/games/INMOST.webp",
    hours: 5.6,
    platform: "PC / Steam",
    tags: ["冒险", "像素风", "剧情"],
    description: "“Do you remember it? That tale about pain? I was wrong. It's a tale about love.”",
  },

  {
    id: "turing-complete",
    name: "Turing Complete",
    developer: "LevelHead",
    category: "puzzle",
    status: "backlog",
    cover: "assets/games/Turing Complete.webp",
    hours: 5.5,
    platform: "PC / Steam",
    tags: ["逻辑电路", "编程", "解谜"],
    description: "计组指定作业",
  },

  {
    id: "edith-finch",
    name: "What Remains of Edith Finch",
    developer: "Giant Sparrow",
    category: "adventure",
    status: "completed",
    cover: "assets/games/What Remains of Edith Finch.webp",
    hours: 4.3,
    platform: "PC / Steam",
    tags: ["叙事冒险", "探索", "剧情"],
    description: "梦见一个家族的悲欢离合",
  },

  {
    id: "outer-wilds",
    name: "Outer Wilds",
    developer: "Mobius Digital",
    category: "adventure",
    status: "backlog",
    cover: "assets/games/Outer Wilds.webp",
    hours: 2.6,
    platform: "PC / Steam",
    tags: ["太空探索", "解谜", "开放探索"],
    description: "",
  },

  {
    id: "lobotomy-corporation",
    name: "Lobotomy Corporation",
    developer: "ProjectMoon",
    category: "simulation",
    status: "backlog",
    cover: "assets/games/Lobotomy Corporation.webp",
    hours: 1.52,
    platform: "PC / Steam",
    tags: ["管理模拟", "策略", "ProjectMoon"],
    description: "",
  },

  {
    id: "florence",
    name: "Florence",
    developer: "Mountains",
    category: "adventure",
    status: "completed",
    cover: "assets/games/Florence.webp",
    hours: 1.28,
    platform: "PC / Steam",
    tags: ["互动叙事"],
    description: "",
  },

  // =========================
  // 非 Steam 游戏
  // =========================

  {
    id: "arknights",
    name: "明日方舟",
    developer: "Hypergryph",
    category: "strategy",
    status: "playing",
    cover: "assets/games/明日方舟.webp",
    platform: "PC / Mobile",
    tags: ["塔防", "策略", "角色扮演"],
    description: "画了不卖，心胸狭隘",
  },

  {
    id: "arknights-endfield",
    name: "明日方舟：终末地",
    developer: "Hypergryph",
    category: "rpg",
    status: "playing",
    cover: "assets/games/明日方舟：终末地.webp",
    platform: "PC / Mobile / PS5",
    tags: ["角色扮演", "策略", "探索"],
    description: "",
  },

  {
    id: "honkai-star-rail",
    name: "崩坏：星穹铁道",
    developer: "miHoYo",
    category: "rpg",
    status: "playing",
    cover: "assets/games/崩坏：星穹铁道.webp",
    platform: "PC / Mobile / PS5",
    tags: ["角色扮演", "回合制", "科幻"],
    description: "每期上号打深渊都想把策划的冯飞了",
  },

  {
    id: "zenless-zone-zero",
    name: "绝区零",
    developer: "miHoYo",
    category: "action",
    status: "playing",
    cover: "assets/games/绝区零.webp",
    platform: "PC / Mobile / PS5",
    tags: ["动作角色扮演", "都市幻想", "即时战斗"],
    description: "ZZZ什么时候出游戏了？",
  },

  {
    id: "genshin-impact",
    name: "原神",
    developer: "miHoYo",
    category: "rpg",
    status: "backlog",
    cover: "assets/games/原神.webp",
    platform: "PC / Mobile / PlayStation",
    tags: ["开放世界", "动作角色扮演", "探索"],
    description: "原神牛逼",
  },

  {
    id: "neverness-to-everness",
    name: "异环",
    developer: "Hotta Studio",
    category: "rpg",
    status: "playing",
    cover: "assets/games/异环.webp",
    platform: "PC / Mobile / PS5",
    tags: ["开放世界", "动作角色扮演", "都市"],
    description: "",
  },
];