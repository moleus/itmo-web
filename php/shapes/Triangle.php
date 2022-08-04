<?php

//require_once "Shape.php";
//require_once "Quadrant.php";

class Triangle extends Shape
{
    private int $a;
    private int $b;

    public function __construct(Quadrant $quadrant, int $a, int $b)
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
