<?php

require_once "Shape.php";
require_once "Quadrant.php";

class Triangle extends Shape
{
    private float $a;
    private float $b;

    public function __construct(Quadrant $quadrant, float $a, float $b)
    {
        parent::__construct($quadrant);
        $this->a = $a;
        $this->b = $b;
    }

    function isInShape(float $x, float $y): bool
    {
        return $this->isInQuadrant($x, $y) &&
            $this->quadrant->getX() * $this->a * $x + $this->quadrant->getY() * $this->b <= $y;
    }
}
