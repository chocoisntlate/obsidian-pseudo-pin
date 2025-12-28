import { QUICK_SWITCHER_COMMAND_ID } from './constants';
import { Plugin } from 'obsidian'
import { PinBypass } from 'pinBypass';
import { PseudoPinPluginSettingsTab } from 'settings';

export interface PseudoPinPluginSettings {
    openMethodCommandId: string;
}

const DEFAULT_SETTINGS: PseudoPinPluginSettings = {
    openMethodCommandId: QUICK_SWITCHER_COMMAND_ID,
}

export default class PseudoPinPlugin extends Plugin {
    settings: PseudoPinPluginSettings;
    pinBypass: PinBypass;

    async onload() {
        await this.loadSettings();
        this.addSettingTab(new PseudoPinPluginSettingsTab(this.app, this));

        this.pinBypass = new PinBypass(this.app, this.settings.openMethodCommandId)

        this.registerCommands();

    }

    registerCommands() {
        this.addCommand({
            id: 'unpin-and-trigger-open-method',
            name: 'Unpin current file, trigger open method, and wait to repin',
            callback: () => this.pinBypass.runWithOpenMethod()
        });

        this.addCommand({
            id: 'unpin-only',
            name: 'Unpin current file and wait to repin',
            callback: () => this.pinBypass.unpinAndWaitToRepin()
        })
    }

    registerOpeningMethod(): void {
        this.pinBypass.setOpenMethod(this.settings.openMethodCommandId);
    }

    async loadSettings() {
        this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData() as Partial<PseudoPinPluginSettings>);
    }


	async saveSettings() {
		await this.saveData(this.settings);
	}
}