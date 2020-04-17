import { Hero } from './hero';

export class User {
    id: number;
    userName: string;
    heroes: Hero[];
    treasury: {
        heroDollars: number;
        heroEssence: number;
        powerUp: number;
    };

    constructor() {}
}