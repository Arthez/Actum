### Actum

Widget to automate various actions which are executed with single click or hotkey.

Useful to automate some actions on privately used websites or to automate various actions helpful in web development. 

Author: Artur Ratowski

*Widget was created in vanilla JS (not TS) without using any dependencies and builders to make it as easy to modify as possible, even for less technical people.*

#### Examples:

 * logging in on specific user
 * filling complex form and submitting it
 * navigating to certain place on the website
 * fetching some data and putting it into clipboard

*Disclaimer: Widget has been tested ONLY on Google Chrome.*

#### How to use:
1. Define your config scenarios and actions in "scenario_sections_config.js" (you can find there example configuration)
1. Go to *chrome://extensions* in your chrome browser
1. Drag "extension" folder on opened extension page
1. When installed just click on extension icon and click action you want to perform (might need to pin extension to see the icon)

*Extension must be opened until all scenario steps are finished (progress is visible at the top), otherwise scenario will be stopped.* 

#### Defining custom actions
1. Add method with logic (e.g. "getRandomJoke") in "page/custom-actions.js" file
2. Add implemented method to "actions.js"
3. Now you can use it in your SCENARIO_SECTIONS_CONFIGS configuration ("scenario_sections_config.js" file)
