<?php

class Validator
{
    private Graph $graph;

    public function __construct()
    {
        $this->graph = new Graph(createShapes());
    }

    public function isPointInShape(float $x, float $y, float $unitR): bool
    {
        return $this->graph->isInGraph($x / $unitR, $y / $unitR);
    }
}

function createShapes(): array
{
    $circle = new Circle(Quadrant::FIRST, 0.5);
    $rectangle = new Rectangle(Quadrant::SECOND, 1, 1);
    $triangle = new Triangle(Quadrant::THIRD, 0.5, 0.5);
    return array($circle, $rectangle, $triangle);
}