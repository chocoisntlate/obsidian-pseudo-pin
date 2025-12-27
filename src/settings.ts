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
					.addOption("Quick switcher", "Core obsidian plugin")
					.addOption("Omnisearch", "Community plugin")
					.setValue(this.plugin.settings.openMethod)
					.onChange(async (value: any) => {
						this.plugin.settings.openMethod = value;
						await this.plugin.saveSettings();
						this.plugin.registerOpeningMethod();
					});
			});
	}

}