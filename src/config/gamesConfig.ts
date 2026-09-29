import type { GamesConfig } from "@/types/gamesConfig";
import { withUserConfig } from "../utils/config-overlay.ts";

/**
 * 游戏展示页行为与展示配置。
 *
 * 遵循「配置管行为，数据管内容」原则：
 * - enable：页面总开关；false 时导航入口同步隐藏，访问 /games/ 跳转 404；
 * - categories：游戏分类清单（数组顺序即页面顶部 Chips 顺序；
 *   没有任何条目的分类会自动隐藏，因此可放心保留暂时用不到的分类）；
 * - disabledIds：可选被禁用的游戏 ID 列表；
 *
 * 注：游戏的具体清单数据（游戏名、开发商、封面、评分、时长、简评等）请在 `src/data/games.ts` 中维护。
 */
export const gamesConfig: GamesConfig = withUserConfig("games", {
	enable: true,
	title: "$t:games",
	description: "$t:gamesBanner",
	categories: [
  {
    key: "visual-novel",
    label: "视觉小说",
    icon: "material-symbols:menu-book-rounded",
    description: "AVG",
  },
  {
    key: "rpg",
    label: "RPG",
    icon: "material-symbols:swords-rounded",
    description: "RPG",
  },
  {
    key: "strategy",
    label: "策略",
    icon: "material-symbols:strategy-rounded",
    description: "策略与塔防",
  },
  {
    key: "simulation",
    label: "模拟经营",
    icon: "material-symbols:storefront-rounded",
    description: "模拟经营",
  },
  {
    key: "adventure",
    label: "冒险",
    icon: "material-symbols:explore-rounded",
    description: "剧情冒险",
  },
  {
    key: "puzzle",
    label: "解谜",
    icon: "material-symbols:extension-rounded",
    description: "推理解谜",
  },
  {
    key: "action",
    label: "动作",
    icon: "material-symbols:sports-esports-rounded",
    description: "动作类",
  },
  {
    key: "casual",
    label: "休闲",
    icon: "material-symbols:videogame-asset-rounded",
    description: "休闲",
  },
],
	
	// disabledIds: [],
});
