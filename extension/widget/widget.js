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
        const remoteManifestUrl = '../manifest.json'; // TODO change url
        const localManifestUrl = '../manifest.json';
        Promise.all([
            fetch(remoteManifestUrl).then(response => response.json()),
            fetch(localManifestUrl).then(response => response.json())
        ]).then(([remoteManifest, localManifest]) => {
            if (localManifest.version < remoteManifest.version) {
                WidgetViewCreator.renderUpdateInfo('New update available!');
            }
        });
    }

    static init() {
        WidgetViewCreator.renderInfo('Loading...');
        if (SCENARIO_SECTIONS && SCENARIO_SECTIONS.length) {
            WidgetViewCreator.renderScenarioSections(SCENARIO_SECTIONS);
            Widget.initClickListeners(SCENARIO_SECTIONS, Widget.handleScenario);
            Widget.initHotkeys(SCENARIO_SECTIONS, Widget.handleScenario);
            WidgetViewCreator.renderInfo('Waiting for action...');
        } else {
            WidgetViewCreator.renderInfo('No scenarios nor actions defined!');
        }
        Widget.checkUpdateAvailability();
    }

}


Widget.init();
