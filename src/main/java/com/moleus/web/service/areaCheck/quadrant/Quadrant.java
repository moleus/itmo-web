package com.moleus.web.service.areaCheck.quadrant;

public enum Quadrant {
    FIRST(1, 1),
    SECOND(-1, 1),
    THIRD(-1, -1),
    FORTH(1, -1);

    public final int x;
    public final int y;

    Quadrant(int x, int y) {
        this.x = x;
        this.y = y;
    }
}
