import { Plugin } from 'obsidian'
import { PinBypass } from 'pinBypass';
import { PseudoPinPluginSettingsTab } from 'settings';

export interface PseudoPinPluginSettings {
    openMethod: string;
}

const DEFAULT_SETTINGS: PseudoPinPluginSettings = {
    openMethod: 'Quick switcher',
}

const openMethodCommandIdMapping: Record<string, string> = {
    'Quick switcher': 'switcher:open',
    'Omnisearch': 'omnisearch:open',
}

export default class PseudoPinPlugin extends Plugin {
    settings: PseudoPinPluginSettings;
    pinBypass: PinBypass;

    async onload() {
        await this.loadSettings();
        this.addSettingTab(new PseudoPinPluginSettingsTab(this.app, this));

        this.pinBypass = new PinBypass(this.app, this.settings.openMethod)

        this.addCommand({
            id: 'pseudo-pin-open',
            name: 'Open with Pseudo Pin',
            callback: () => this.pinBypass.run()
        });
    }

    registerOpeningMethod(): void {
        this.pinBypass.setOpenMethod(this.settings.openMethod);
    }

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}