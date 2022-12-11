import {faker} from '@faker-js/faker';
import {HitResult} from "../../src/api/types/HitResult";

export const createRandomHit = (id: number) => {
    return {
        id: id,
        x: faker.datatype.float({min: -5, max: 5}),
        y: faker.datatype.float({min: -5, max: 5}),
        r: faker.datatype.float({min: -5, max: 5}),
        hit: faker.datatype.boolean(),
        hitTime: faker.datatype.datetime().toLocaleTimeString(),
        executionTimeMicros: faker.datatype.number({min: 5, max: 3000})
    } as HitResult
}

export const getRandomHits = (count: number): HitResult[] => {
    return Array.from({length: count}).map((_, i) => createRandomHit(i));
}

export const getRandomName = (): string => {
   return "test_" + Math.floor(Math.random() * 100000).toString()
}