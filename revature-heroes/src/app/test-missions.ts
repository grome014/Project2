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
        missionSuccess: null,
        ownerID: 3,
        missionID: 1,
        templateID: 0,
        title: "Title",
        description: "this is a description of a test mission",
        requirements: {
                "heroesRequired": 1,
                "missionDuration": 30,
                "missionLevel": 200,
                "statRequired": "speed"
        },
        heroes: []
    },
    
    {
        missionStart: null,
        missionFinish: 0,
        missionStatus: "Available",
        missionSuccess: null,
        ownerID: 3,
        missionID: 2,
        templateID: 0,
        title: "Title",
        description: "this is a description of a test mission",
        requirements: {
                "heroesRequired": 2,
                "missionDuration": 30,
                "missionLevel": 200,
                "statRequired": "speed"
        },
        heroes: []
    },

    {
        missionStart: null,
        missionFinish: 0,
        missionStatus: "Available",
        missionSuccess: null,
        ownerID: 3,
        missionID: 3,
        templateID: 0,
        title: "Title",
        description: "this is a description of a test mission",
        requirements: {
                "heroesRequired": 3,
                "missionDuration": 30,
                "missionLevel": 200,
                "statRequired": "speed"
        },
        heroes: []
    },
    {
        missionStart: null,
        missionFinish: 0,
        missionStatus: "Completed",
        missionSuccess: null,
        ownerID: 3,
        missionID: 1,
        templateID: 0,
        title: "Title",
        description: "this is a description of a test mission",
        requirements: {
                heroesRequired: 1,
                missionDuration: 30,
                missionLevel: 200,
                statRequired: "speed"
        },
        heroes: []
    },
    
    {
        missionStart: 1587067113405,
        missionFinish: 0,
        missionStatus: "In Progress",
        missionSuccess: 15,
        ownerID: 3,
        missionID: 2,
        templateID: 0,
        title: "Title",
        description: "this is a description of a test mission",
        requirements: {
                "heroesRequired": 2,
                "missionDuration": 30,
                "missionLevel": 200,
                "statRequired": "speed"
        },
        heroes: [
            {ownerID:1, gameID: 3, superID: 47, name: 'test hero 6', intelligence: 22,
            strength: 52, speed: 33, durability: 45, power: 125, combat: 64,
            url: "https://www.superherodb.com/pictures2/portraits/10/100/1448.jpg", status: "On Mission"},
            {ownerID:1, gameID: 2, superID: 36, name: 'test hero 5', intelligence: 22,
            strength: 52, speed: 33, durability: 45, power: 125, combat: 64,
            url: "https://www.superherodb.com/pictures2/portraits/10/100/181.jpg", status: "On Mission"}]
    },

    {
        missionStart: 1587077275524,
        missionFinish: 0,
        missionStatus: "In Progress",
        missionSuccess: 120,
        ownerID: 3,
        missionID: 3,
        templateID: 0,
        title: "Title",
        description: "this is a description of a test mission",
        requirements: {
                "heroesRequired": 3,
                "missionDuration": 30,
                "missionLevel": 200,
                "statRequired": "speed"
        },
        heroes: [
            {ownerID:1, gameID: 2, superID: 36, name: 'test hero 2', intelligence: 22,
            strength: 52, speed: 33, durability: 45, power: 125, combat: 64,
            url: "https://www.superherodb.com/pictures2/portraits/10/100/956.jpg", status: "On Mission"},
            {ownerID:1, gameID: 3, superID: 47, name: 'test hero 3', intelligence: 22,
            strength: 52, speed: 33, durability: 45, power: 125, combat: 64,
            url: "https://www.superherodb.com/pictures2/portraits/10/100/1460.jpg", status: "On Mission"},
            {ownerID:1, gameID: 1, superID: 23, name: 'test hero 4', intelligence: 22,
            strength: 52, speed: 33, durability: 45, power: 125, combat: 64,
            url: "https://www.superherodb.com/pictures2/portraits/10/100/1.jpg", status: "On Mission"}
        ]
    },
]