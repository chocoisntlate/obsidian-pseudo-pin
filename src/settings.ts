import { App, PluginSettingTab, Setting } from "obsidian";
import PseudoPinPlugin from "main";
import {
  QUICK_SWITCHER_COMMAND_ID,
  OMNISEARCH_COMMAND_ID,
} from "./constants";

export class PseudoPinPluginSettingsTab extends PluginSettingTab {
  plugin: PseudoPinPlugin;

  constructor(app: App, plugin: PseudoPinPlugin) {
    super(app, plugin);
    this.plugin = plugin;
  }

  display(): void {
    const { containerEl } = this;
    containerEl.empty();

    new Setting(containerEl).setHeading().setName("Behavior");

    let customSettingContainer: HTMLElement;

    new Setting(containerEl)
      .setName("Opening method")
      .setDesc("Choose opening method used in the command.")
      .addDropdown((dropdown) => {
        dropdown
          .addOption(QUICK_SWITCHER_COMMAND_ID, "Quick switcher")
          .addOption(OMNISEARCH_COMMAND_ID, "Omnisearch")
          .addOption("custom", "Custom")
          .setValue(
            this.plugin.settings.openMethodCommandId ??
              QUICK_SWITCHER_COMMAND_ID
          )
          .onChange(async (value) => {
            this.plugin.settings.openMethodCommandId = value;
            await this.plugin.saveSettings();
            this.plugin.registerOpeningMethod();

            if (customSettingContainer) {
              customSettingContainer.style.display =
                value === "custom" ? "" : "none";
            }
          });
      });

    customSettingContainer = containerEl.createDiv();

    new Setting(customSettingContainer)
      .setName("Custom command ID")
      .setDesc("Enter the command ID of the opening method. Refer to the docs for help with finding command IDs.")
      .addText((text) => {
        text
          .setPlaceholder("e.g. " + QUICK_SWITCHER_COMMAND_ID)
          .setValue(
            this.plugin.settings.openMethodCommandId !== "custom"
              ? this.plugin.settings.openMethodCommandId
              : ""
          )
          .onChange(async (value) => {
            if (!value?.trim()) return;

            this.plugin.settings.openMethodCommandId = value.trim();
            await this.plugin.saveSettings();
            this.plugin.registerOpeningMethod();
          });
      });

    // visibility of custom command ID input
	const enableCustom = this.plugin.settings.openMethodCommandId === "custom";
	customSettingContainer.classList.toggle("hidden", !enableCustom);
  }
}
