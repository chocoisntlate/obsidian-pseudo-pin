import { App } from "obsidian";

interface AppWithCommands extends App {
	commands: {
		executeCommandById(commandId: string): boolean;
	};
}

export class PinBypass {
    app: App;
    openMethodCommandId: string | undefined;

    constructor(app: App,openMethodCommandId: string) {
        this.app = app;
        this.openMethodCommandId = openMethodCommandId;
    }

    setOpenMethod(openMethodCommandId: string): void {
        this.openMethodCommandId = openMethodCommandId;
    }

    runWithOpenMethod(): void {
        const leaf = this.app.workspace.getMostRecentLeaf();
        if (!leaf) return;

        const isPinned = leaf.getViewState().pinned;
        if (!isPinned) {
            this.executedOpenCommand();
            return;
        }

        this.unpinAndWaitToRepin();
        this.executedOpenCommand();
    }

    private executedOpenCommand(): void {
        if (!this.openMethodCommandId) return;

        const appWithCommands = this.app as unknown as AppWithCommands;
        appWithCommands.commands.executeCommandById(this.openMethodCommandId);
    }

    unpinAndWaitToRepin(): void {
        const leaf = this.app.workspace.getMostRecentLeaf();
        if (!leaf) return;

        const isPinned = leaf.getViewState().pinned;
        if (!isPinned) return;

        // unpin
        leaf.setPinned(false);

        // re-pin
        const repin = () => {
            leaf.setPinned(true);
            this.app.workspace.off("file-open", repin);
            this.app.workspace.off("modal-close", repin);
            this.app.workspace.off("active-leaf-change", repin);
            this.app.workspace.off("window-close", repin);
        };

        // listeners
        this.app.workspace.on("file-open", repin);
        this.app.workspace.on("active-leaf-change", repin);
        this.app.workspace.on("window-close", repin);
    }
}