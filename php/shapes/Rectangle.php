<?php

//require_once "Shape.php";
//require_once "Quadrant.php";

class Rectangle extends Shape
{
    private float $width;
    private float $height;

    public function __construct(Quadrant $quadrant, float $width, float $height)
    {
        parent::__construct($quadrant);
        $this->width = $width;
        $this->height = $height;
    }

    function isInShape(float $x, float $y): bool
    {
        return $this->isInQuadrant($x, $y) &&
            $this->quadrant->getX() * $x <= $this->width && $this->quadrant->getY() * $y <= $this->height;
    }
}