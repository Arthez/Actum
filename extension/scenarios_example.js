export const SCENARIO_SECTIONS_EXAMPLE = [
    {
        sectionTitle: 'Section1',
        scenarios: [
            {
                title: 'Scenario1',
                actions: [
                    {
                        type: ACTION.FILL,
                        config: { selector: '.class1', value: 'some value' },
                    },
                    {
                        type: ACTION.WAIT,
                        config: { delay: 2000 },
                    },
                    {
                        type: ACTION.CLICK,
                        config: { selector: '.class2' },
                    },
                    {
                        type: ACTION.OPEN,
                        config: { url: 'https://google.com' },
                    },
                ],
            },
            {
                title: 'Scenario2',
                hotkey: 9,
                actions: [
                    {
                        type: ACTION.FILL,
                        config: { selector: 'input.login', value: 'username' },
                    },
                    {
                        type: ACTION.CLICK,
                        config: { selector: '#loginButton', optional: true },
                    },
                    {
                        type: ACTION.OPEN,
                        config: { url: 'https://google.com', delay: 1000 },
                    },
                ],
            },
        ],
    },
    {
        sectionTitle: 'Section2',
        scenarios: [
            {
                title: 'Google translate example',
                actions: [
                    {
                        type: ACTION.FILL,
                        config: { selector: 'textarea', value: 'translate this text' },
                    },
                    {
                        type: ACTION.WAIT,
                        config: { delay: 1000 },
                    },
                    {
                        type: ACTION.CLICK,
                        config: { selector: '#i7', delay: 2000 },
                    },
                    {
                        type: ACTION.FILL,
                        config: { selector: 'textarea', value: 'Now translate different text, something much longer' },
                    },
                    {
                        type: ACTION.OPEN,
                        config: { url: 'https://google.com', delay: 3000 },
                    },
                ],
            },
        ],
    },
    {
        sectionTitle: 'Jokes',
        scenarios: [
            {
                title: 'Get random Joke',
                hotkey: 1,
                actions: [
                    {
                        type: ACTION.getRandomJoke,
                    }
                ]
            },
        ]
    }
];
