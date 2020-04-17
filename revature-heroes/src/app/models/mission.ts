import { Hero } from './hero';

export class Mission {
    missionID: number;
    missionStart: number;
    missionFinish: number;
    missionStatus: string; //"Available", "In Progress", "Completed"
    missionSuccess: number;
    ownerID: number;
    templateID: number;
    title: string;
    description: string;
    requirements: {
        heroesRequired: number;
        missionDuration: number;
        missionLevel: number;
        statRequired: string;
    };
    heroes: Hero[];
}