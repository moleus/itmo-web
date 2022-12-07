/// <reference path="../../../../cypress/global.d.ts" />
import React from 'react';
import AxisCanvas from "./AxisCanvas";
import {HitQuery} from "../../../api/types/HitQuery";

const CANVAS_SIZE = 300;
const IMG_SRC = "/img/graph.svg"

describe('Canvas with axis', function () {
    it.only('should send request with coordinates after click', () => {
        const centeredPoint = {x: 0, y: 0, r: 1} as HitQuery;

        cy.intercept('/api/hits/add').as("AddHit");

        cy.mount(<AxisCanvas canvasProps={{sizePx: CANVAS_SIZE, imageSrc: IMG_SRC}}/>);
        cy.clickCanvas('axis-canvas', CANVAS_SIZE / 2, CANVAS_SIZE / 2);
        cy.wait("@AddHit").its('request.body').should('deep.equal', centeredPoint);
    })
})
