// missionStart: number;
//     missionFinish: number;
//     missionStatus: string; //"Available", "In Progress", "Completed"
//     ownerID: number;
//     missionID: number;
//     templateID: number;
//     title: string;
//     description: string;
//     requirements: {};
//     heroes: Hero[];

import { Mission } from './models/mission';

//1, 2, or 3 heroes

//ownerId

export let TEST_MISSIONS: Mission[] = [
    {
        missionStart: null,
        missionFinish: 0,
        missionStatus: "Available",
        ownerID: 3,
        missionID: 1,
        templateID: 0,
        title: "Title",
        description: "this is a description of a test mission",
        requirements: {
                "heroesRequired": 1,
                "missionDuration": 30,
                "missionLevel": 10,
                "statRequired": "speed"
        },
        heroes: []
    },
    
    {
        missionStart: null,
        missionFinish: 0,
        missionStatus: "Available",
        ownerID: 3,
        missionID: 2,
        templateID: 0,
        title: "Title",
        description: "this is a description of a test mission",
        requirements: {
                "heroesRequired": 2,
                "missionDuration": 30,
                "missionLevel": 10,
                "statRequired": "speed"
        },
        heroes: []
    },

    {
        missionStart: null,
        missionFinish: 0,
        missionStatus: "Available",
        ownerID: 3,
        missionID: 3,
        templateID: 0,
        title: "Title",
        description: "this is a description of a test mission",
        requirements: {
                "heroesRequired": 3,
                "missionDuration": 30,
                "missionLevel": 10,
                "statRequired": "speed"
        },
        heroes: []
    },
]