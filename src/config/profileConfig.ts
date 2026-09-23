import type { ProfileConfig } from "@/types/config";
import { withUserConfig } from "../utils/config-overlay.ts";

/**
 * 博主资料：头像 / 名称 / 简介 / 社交链接（侧栏 Profile 卡片、页脚、RSS 作者等消费）。
 * 类型见 src/types/config.ts。
 */
export const profileConfig: ProfileConfig = withUserConfig("profile", {
	avatar: "assets/images/avatar.webp", // Relative to the /src directory. Relative to the /public directory if it starts with '/'
	name: "somebodyX",
	bio: "大本钟邮局快递员",
	links: [
		{
    		name: "Bilibili",
    		icon: "fa6-brands:bilibili",
    		url: "https://space.bilibili.com/1966238501",
    	},
		{
      		name: "GitHub",
      		icon: "fa6-brands:github",
      		url: "https://github.com/somebodyX-bot",
    	},
		{
			name: "Email",
			icon: "material-symbols:mail-outline-rounded",
			url: "mailto:3867642961@qq.com"
		},
	],
});
