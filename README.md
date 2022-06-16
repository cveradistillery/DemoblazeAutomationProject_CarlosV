
# Demoblaze Automation Project - Carlos V. - QA Automation Engineer
Support DemoBlaze code challenge by using Cypress

## To clone this repository
Open your console/terminal and run this:
```sh
cd </your/desired/project/path/>
```

```sh
git clone https://github.com/cveradistillery/DemoblazeAutomationProject_CarlosV.git
```

## Installation

```console
cd <parentFolder>
npm i
```

_Desirable_:
- Multiple browsers installed locally to provide multiple browser support
    * e.g. you can use Chrome, Safari, Firefox, Edge, Chromium, Opera, etc


## Quick Run
- Headless mode (with video recording of the execution):
  *  Run this:
```console
./node_modules/.bin/cypress run --browser chrome --spec "cypress/e2e/0-integration/demoblaze_spec.cy.js"
```

- Or if you prefer to run the tests on demand and see the test execution in real time:
  *  Run this:
```console
./node_modules/.bin/cypress open
```
  * Additional Comment:
    *  If you have the latest Cypress version installed you need to choose E2E Testing + desired browser + Start E2E Testing in <browser>  and just click in the desired <fileTestName>.spec.cy.js test file to run the ATCs

## Report
- Any failure you will see the correspondent screenshot / Report:
    * ![alt text](https://i.ibb.co/68dxkxj/image.png) 

## Execution Record:
- [![Watch the video](https://i.imgur.com/RfiDUsT.png)](https://www.veed.io/view/8a57c438-1ff2-4f53-98a3-6f693f8c0fc5)


## Main Paths

- /cypress.config.js: contains the two valid urls of the site https://api.demoblaze.com/ & https://www.demoblaze.com/
- /cypress/e2e/0-integration/demoblaze_spec.cy.js: Valid ATCs / flow (signup, login, product store, cart, place order / purchase)
- /cypress/support/pageobjects: PO pattern (it includes the web elements for example)
- /cypress/support/cookies.js: cookies management
- /cypress/videos: video execution folder if you run the test/s by command line / headless mode
- /package.json: project dependencies


## Demo

- [Demo Link](https://www.veed.io/view/8a57c438-1ff2-4f53-98a3-6f693f8c0fc5)

## Full documentation - Main Library documentation
- https://www.cypress.io/

## Appendix

N/A


## Contributing

N/A


## FAQ

#### N/A Q1

N/A A1

--

#### N/A Q2

N/A A2

--
## Authors

- [Carlos Vera](https://www.github.com/)


## Badges


[![MIT License](https://img.shields.io/apm/l/atomic-design-ui.svg?)](https://choosealicense.com/licenses/mit/)

# MIT licence

Copyright (c) 2022 Carlos Vera

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

