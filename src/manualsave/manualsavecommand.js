import Command from '@ckeditor/ckeditor5-core/src/command';

export default class ManualSaveCommand extends Command {
    execute(isSave) {
        var manualSaveConfig = this.editor.config.manualSave || this.editor.config.get('manualSave');

        if (manualSaveConfig) {
            if (isSave) {
                manualSaveConfig.saveClicked();
            } else {
                manualSaveConfig.cancelClicked();
            }
        } else {
            console.log('Config for manual save is not defined.');
            console.log(this.editor.config);
        }
    }

    refresh() {
        this.isEnabled = true;
    }
}
