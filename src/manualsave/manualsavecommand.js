import Command from '@ckeditor/ckeditor5-core/src/command';

export default class ManualSaveCommand extends Command {
    execute(isSave) {
        var manualSaveConfig = this.editor.config.manualSave;

        if (isSave) {
            manualSaveConfig.saveClicked();
        } else {
            manualSaveConfig.cancelClicked();
        }
    }

    refresh() {
        this.isEnabled = true;
    }
}
