import PseudoPinPlugin from "main";
import { App, PluginSettingTab, Setting } from "obsidian";

export class PseudoPinPluginSettingsTab extends PluginSettingTab {
	plugin: PseudoPinPlugin;

	constructor(app: App, plugin: PseudoPinPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const { containerEl } = this;
		containerEl.empty();

		containerEl.createEl("h2", { text: "Behavior" });

		new Setting(containerEl)
			.setName("Choose opening method")
			.setDesc("")
			.addDropdown((dropdown: any) => {
				dropdown
					.addOption("Quick switcher", "Quick switcher")
					.addOption("Omnisearch", "Omnisearch")
					.setValue(this.plugin.settings.openMethod)
					.onChange(async (value: any) => {
						this.plugin.settings.openMethod = value;
						await this.plugin.saveSettings();
						this.plugin.registerOpeningMethod();
					});
			});

		containerEl.createEl("h2", { text: "Appearance" });

		new Setting(containerEl)
			.setName("Hide tab bar")
			.setDesc("Visually hide tab bar. Might look off with some themes.")
			.addToggle((toggle) =>
				toggle
					.setValue((this.plugin as any).settings.hideTabBar)
					.onChange(async (value) => {
						(this.plugin as any).settings.hideTabBar = value;
						await this.plugin.saveSettings();
						(this.plugin as any).registerTabBarVisibility();
					})
			);
	}

}