/// This file is only showing how types in TypeScript would be defined for SCENARIO_SECTIONS

type ScenarioSectionsConfigs = ScenarioSectionsConfig[];

interface ScenarioSectionsConfig {
    name: string;
    scenarioSections: ScenarioSection[];
}

interface ScenarioSection {
    sectionTitle: string;
    scenarios: Scenario[];
}

interface Scenario {
    title: string;
    hotkey: string;
    actions: Action[];
}

declare enum ActionType {
    // BASE actions
    CLICK = 'click',
    FILL = 'fill',
    OPEN = 'open',
    WAIT = 'wait',

    // CUSTOM actions
    getRandomJoke = 'getRandomJoke',
}

interface Action {
    type: ActionType;
    config: ActionConfig;
}

type ActionConfig = WaitActionConfig | ClickActionConfig | FillActionConfig | OpenActionConfig;

interface BaseActionConfig {
    delay: number;
}

interface WaitActionConfig extends BaseActionConfig {
}

interface ClickActionConfig extends BaseActionConfig {
    selector: string;
}

interface FillActionConfig extends BaseActionConfig {
    selector: string;
    value: any;
}

interface OpenActionConfig extends BaseActionConfig {
    url: string;
}
