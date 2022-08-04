<?php

enum Quadrant
{
    case FIRST;
    case SECOND;
    case THIRD;
    case FORTH;

    public function getX(): int
    {
        return match ($this) {
            self::FIRST, self::FORTH => 1,
            self::SECOND, self::THIRD => -1,
        };
    }

    public function getY(): int
    {
        return match ($this) {
            self::FIRST, self::SECOND => 1,
            self::THIRD, self::FORTH => -1,
        };
    }
}