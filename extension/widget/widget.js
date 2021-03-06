import { SCENARIO_SECTIONS_CONFIGS } from '../scenario_sections_config.js';
import { CONFIG_SELECTOR, WidgetViewCreator } from './widget-view-creator.js';
import { WidgetLocalStorage } from './widget-local-storage.js';

class Widget {

    static emitEvent(scenario, actionIndex) {
        EventBus.sendEvent({ scenario, actionIndex }, Widget.handleResponse);
    }

    static handleScenario(scenario) {
        if (!scenario) {
            WidgetViewCreator.renderInfo('Error: Invalid scenario structure!');
        } else if (!scenario.actions || !scenario.actions.length) {
            WidgetViewCreator.renderInfo('Error: Scenario has no actions defined!');
        } else {
            Widget.handleAction(scenario, 0);
        }
    }

    static handleAction(scenario, index) {
        const actions = scenario.actions;
        const currentAction = actions[index];
        const timeout = currentAction.config ? currentAction.config.delay || 0 : 0;
        const message = `Executing: ${scenario.title} (${index + 1}/${actions.length})`;
        WidgetViewCreator.renderInfo(message);

        setTimeout(() => {
            Widget.emitEvent(scenario, index);
        }, timeout);
    }

    static handleResponse(response) {
        if (response === undefined) {
            WidgetViewCreator.renderInfo('Unknown error occurred! This site might be blocking the widget.');
        } else {
            if (response && response.scenario) {
                Widget.handleSuccessfulResponse(response);
            } else if (response && response.error) {
                WidgetViewCreator.renderInfo(response.error);
            } else {
                WidgetViewCreator.renderInfo('Unknown response error occurred!');
            }
        }
    }

    static handleSuccessfulResponse(response) {
        const actions = response.scenario.actions;
        const nextIndex = response.actionIndex + 1;

        if (actions[response.actionIndex].type === ACTION.OPEN) {
            window.open(actions[response.actionIndex].config.url);
        }

        if (actions[nextIndex]) {
            const message = `Executing: ${response.scenario.title} (${nextIndex}/${actions.length})`;
            WidgetViewCreator.renderInfo(message);
            Widget.handleAction(response.scenario, nextIndex);
        } else {
            const message = `Finished executing: ${response.scenario.title}`;
            WidgetViewCreator.renderInfo(message);
        }
    }

    static initClickListeners(scenarioSections, callback) {
        scenarioSections.forEach((section, sectionIndex) => {
            section.scenarios.forEach((scenario, scenarioIndex) => {
                const element = $.id(`scenario-${sectionIndex}-${scenarioIndex}`);
                if (element) {
                    element.addEventListener('click', () => {
                        callback(scenario);
                    }, false);
                }
            });
        });
    }

    static initHotkeys(scenarioSections, callback) {
        const hotkeyScenarioMap = {};
        scenarioSections.forEach((section) => {
            section.scenarios.forEach((scenario) => {
                if (scenario.hotkey) {
                    hotkeyScenarioMap[scenario.hotkey] = scenario;
                }
            });
        });
        document.onkeydown = (e) => {
            const hotkeyScenario = hotkeyScenarioMap[e.key];
            if (hotkeyScenario) {
                callback(hotkeyScenario);
            }
        }
    }

    static checkUpdateAvailability() {
        const remoteManifestUrl = 'https://raw.githubusercontent.com/Arthez/Actum/master/extension/manifest.json';
        const localManifestUrl = '../manifest.json';
        Promise.all([
            fetch(remoteManifestUrl).then(response => response.json()),
            fetch(localManifestUrl).then(response => response.json())
        ]).then(([remoteManifest, localManifest]) => {
            const [localMajor, localMinor, localPatch] = localManifest.version.split('.').map(ver => parseInt(ver, 10));
            const [remoteMajor, remoteMinor, remotePatch] = remoteManifest.version.split('.').map(ver => parseInt(ver, 10));

            if ((localMajor < remoteMajor) || (localMinor < remoteMinor) || (localPatch < remotePatch)) {
                WidgetViewCreator.renderUpdateInfo('New update available on official repository!', 'https://github.com/Arthez/Actum');
            }
        });
    }

    static initScenarioSections(scenarioSections) {
        WidgetViewCreator.renderScenarioSections(scenarioSections);
        Widget.initClickListeners(scenarioSections, Widget.handleScenario);
        Widget.initHotkeys(scenarioSections, Widget.handleScenario);
        WidgetViewCreator.renderInfo('Waiting for action...');
    }

    static initConfigSelector(configIndex) {
        if (!SCENARIO_SECTIONS_CONFIGS || SCENARIO_SECTIONS_CONFIGS.length <= 1) {
            return;
        }

        WidgetViewCreator.renderConfigSelector(SCENARIO_SECTIONS_CONFIGS);
        const configSelector = $.id(CONFIG_SELECTOR);
        configSelector.value = configIndex || 0;
        configSelector.onchange = function() {
            WidgetLocalStorage.setDefaultConfigName(SCENARIO_SECTIONS_CONFIGS[this.value].name);
            Widget.initScenarioSections(SCENARIO_SECTIONS_CONFIGS[this.value].scenarioSections);
        };
    }

    static init() {
        WidgetViewCreator.renderInfo('Loading...');
        if (SCENARIO_SECTIONS_CONFIGS && SCENARIO_SECTIONS_CONFIGS.length) {
            const configIndexFromStorage = SCENARIO_SECTIONS_CONFIGS.findIndex(config => config.name === WidgetLocalStorage.getDefaultConfigName());
            const defaultConfigIndex = configIndexFromStorage >= 0 ? configIndexFromStorage : 0;
            Widget.initConfigSelector(defaultConfigIndex);
            Widget.initScenarioSections(SCENARIO_SECTIONS_CONFIGS[defaultConfigIndex]?.scenarioSections);
        } else {
            WidgetViewCreator.renderInfo('Config in "scenario_sections_config.js" is NOT defined!');
        }
        Widget.checkUpdateAvailability();
    }

}


Widget.init();
