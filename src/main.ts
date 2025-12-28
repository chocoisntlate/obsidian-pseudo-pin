import { Plugin } from 'obsidian'
import { PinBypass } from 'pinBypass';
import { PseudoPinPluginSettingsTab } from 'settings';

export interface PseudoPinPluginSettings {
    openMethod: string;
    hideTabBar: boolean;
}

const DEFAULT_SETTINGS: PseudoPinPluginSettings = {
    openMethod: 'Quick switcher',
    hideTabBar: false,
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
            id: 'pseudo-pin-unpin-and-trigger-open-method',
            name: 'Unpin current file, trigger open method, and wait to repin',
            callback: () => this.pinBypass.runWithOpenMethod()
        });

        this.addCommand({
            id: 'pseudo-pin-unpin-only',
            name: 'Unpin current file and wait to repin',
            callback: () => this.pinBypass.unpinAndWaitToRepin()
        })

        this.registerTabBarVisibility();
    }

    registerOpeningMethod(): void {
        this.pinBypass.setOpenMethod(this.settings.openMethod);
    }

    registerTabBarVisibility(): void {
        document.body.classList.toggle("pseudo-pin-hide-tab-bar", this.settings.hideTabBar);
    }

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}