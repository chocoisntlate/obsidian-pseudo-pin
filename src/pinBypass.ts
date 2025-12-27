import { App } from "obsidian";

const openMethodCommandIdMapping: Record<string, string> = {
    'Quick switcher': 'switcher:open',
    'Omnisearch': 'omnisearch:open',
}

export class PinBypass {
    app: App;
    openCommandId: string | undefined;

    constructor(
        app: App,
        openMethod: string
    ) {
        this.app = app;
        this.openCommandId = openMethodCommandIdMapping[openMethod];
    }

    setOpenMethod(openMethod: string): void {
        this.openCommandId = openMethodCommandIdMapping[openMethod];
    }

    run(): void {
        const leaf = this.app.workspace.getMostRecentLeaf();
        if (!leaf) return;

        const isPinned = leaf.getViewState().pinned;
        if (!isPinned) {
            (this.app as any).commands.executeCommandById(this.openCommandId); // exists at runtime
            return;
        }

        // unpin
        leaf.setPinned(false);

        // re-pin
        const repin = () => {
            leaf.setPinned(true);
            this.app.workspace.off("file-open", repin);
            this.app.workspace.off("modal-close", repin);
            this.app.workspace.off("active-leaf-change", repin);
            this.app.workspace.off("window-close", repin);
        }

        // listeners
        this.app.workspace.on("file-open", repin);
        this.app.workspace.on("active-leaf-change", repin);
        this.app.workspace.on("window-close", repin);

        // open
        (this.app as any).commands.executeCommandById(this.openCommandId);

    }

}   