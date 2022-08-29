<?php

require_once "Quadrant.php";

abstract class Shape
{
    protected Quadrant $quadrant;

    protected function __construct(Quadrant $quadrant)
    {
        $this->quadrant = $quadrant;
    }

    abstract function isInShape(float $x, float $y): bool;

    protected function isInQuadrant(float $x, float $y): bool
    {
        return ($this->quadrant->getX() * $x >= 0) && ($this->quadrant->getY() * $y >= 0);
    }
}