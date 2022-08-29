const enable3dCheckbox = document.getElementById('toggle-canvas') as HTMLInputElement

function swapCanvas() {
    let canvas2d = document.getElementById('axis-canvas')
    let axis3d = document.getElementById('axis-canvas-3d');

    if (enable3dCheckbox.checked) {
        canvas2d.style.display = "none";
        axis3d.style.display = "block";
    } else {
        canvas2d.style.display = "block";
        axis3d.style.display = "none";
    }

}

export const ToggleCanvasHook = {
    init() {
        enable3dCheckbox.onclick = swapCanvas
    }
}
