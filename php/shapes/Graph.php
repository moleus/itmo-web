<?php

require_once 'Shape.php';

class Graph
{
    private array $shapes;

    public function __construct(array $shapes)
    {
        $this->shapes = $shapes;
    }

    public function isInGraph(float $x, float $y): bool
    {
        return sizeof(
                array_filter($this->shapes,
                    function (Shape $shape) use ($y, $x): bool {
                        return $shape->isInShape($x, $y);
                    })
            ) > 0;
    }
}