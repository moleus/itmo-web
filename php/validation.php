<?php

require_once 'shapes/Circle.php';
require_once 'shapes/Rectangle.php';
require_once 'shapes/Triangle.php';
require_once 'shapes/Quadrant.php';
require_once 'shapes/Graph.php';

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