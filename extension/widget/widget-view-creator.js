const INFO_CONTAINER_ID = 'info-container';
const SCENARIO_SECTIONS_CONTAINER_ID = 'scenario-sections-container';
const UPDATE_INFO_CONTAINER_ID = 'update-info-container';

class WidgetViewCreator {

    static renderInfo(text) {
        $.render(INFO_CONTAINER_ID, text);
    }

    static renderScenarioSections(scenarioSections) {
        const template = WidgetViewCreator.getScenarioSectionsTemplate(scenarioSections);
        $.render(SCENARIO_SECTIONS_CONTAINER_ID, template);
    }

    static renderUpdateInfo(text, url) {
        const info = url ? `<a href="${url}" target="_blank">${text}</a>` : `<span>${text}</span>`;
        const template = `<div class="update-info">${info}</div>`;
        $.render(UPDATE_INFO_CONTAINER_ID, template);
    }

    static getScenarioSectionsTemplate(scenarioSections) {
        return scenarioSections.reduce((template, section, sectionIndex) => {
            return template + `<div class="scenario-section"><div class="section-title">${section.sectionTitle}</div><div><ol>${WidgetViewCreator.getScenarioTemplate(section.scenarios, sectionIndex)}</ol></div></div>`;
        }, '');
    }

    static getScenarioTemplate(scenarios, sectionIndex) {
        return scenarios.reduce((template, scenario, scenarioIndex) => {
            const hotkeyText = scenario.hotkey ? ` [${scenario.hotkey}]` : '';
            return template + `<li><span class="scenario-title" id="scenario-${sectionIndex}-${scenarioIndex}">${scenario.title}${hotkeyText}</span></li>`;
        }, '');
    }

}
