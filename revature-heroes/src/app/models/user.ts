import { Hero } from './hero';

export interface User {
    id: number,
    userName: string,
    heroes: Hero[]
}