import { Hero } from './hero';

export class Mission {
    missionStart: number;
    missionFinish: number;
    missionStatus: string; //"Available", "In Progress", "Completed"
    ownerID: number;
    missionID: number;
    templateID: number;
    title: string;
    description: string;
    requirements: {};
    heroes: Hero[];
} 