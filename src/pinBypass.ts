import { App } from "obsidian";

export class PinBypass {
    app: App;
    openMethodCommandId: string | undefined;

    constructor(
        app: App,
        openMethodCommandId: string
    ) {
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
            (this.app as any).commands.executeCommandById(this.openMethodCommandId); // exists at runtime
            return;
        }

        this.unpinAndWaitToRepin();

        // open
        (this.app as any).commands.executeCommandById(this.openMethodCommandId);
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