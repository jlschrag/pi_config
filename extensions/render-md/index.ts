/**
 * /render <path> - Read a markdown file and render it inline in the pi
 * output, using pi-tui's Markdown component.
 */

import { readFile } from "node:fs/promises";
import { isAbsolute, resolve } from "node:path";
import {
	type ExtensionAPI,
	getMarkdownTheme,
} from "@mariozechner/pi-coding-agent";
import { Markdown } from "@mariozechner/pi-tui";

const CUSTOM_TYPE = "rendered-markdown";

export default function (pi: ExtensionAPI) {
	pi.registerMessageRenderer(CUSTOM_TYPE, (message) => {
		return new Markdown(String(message.content ?? ""), 0, 0, getMarkdownTheme());
	});

	pi.registerCommand("render", {
		description: "Render a markdown file inline in the session",
		handler: async (args, ctx) => {
			const arg = args.trim();
			if (!arg) {
				ctx.ui.notify("Usage: /render <path>", "warn");
				return;
			}
			const cleaned = arg.startsWith("@") ? arg.slice(1) : arg;
			const abs = isAbsolute(cleaned) ? cleaned : resolve(ctx.cwd, cleaned);
			try {
				const text = await readFile(abs, "utf8");
				pi.sendMessage({
					customType: CUSTOM_TYPE,
					content: text,
					display: true,
				});
			} catch (err) {
				ctx.ui.notify(
					`Failed to render ${arg}: ${(err as Error).message}`,
					"error",
				);
			}
		},
	});
}
