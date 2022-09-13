export class ModeSwitcherView {
    private modeSwitch: HTMLInputElement;

    constructor() {
        this.modeSwitch = document.getElementById('toggle-canvas') as HTMLInputElement;
    }

    bindToggle(handler: (isChecked: boolean) => void) {
        handler(this.modeSwitch.checked);
        this.modeSwitch.onclick = () => {
            handler(this.modeSwitch.checked);
        }
    }
}