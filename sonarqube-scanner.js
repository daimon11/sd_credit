const scanner = require('sonarqube-scanner');
const projectName = require('./package.json').name;
const projectKeyPostfix = projectName.replace('@', '').replace('/', '-');

scanner(
  {
    serverUrl: process.env.SONAR_URL,
    token: process.env.SONAR_LOGIN,
    options: {
      'sonar.projectKey': `${process.env.SONAR_PREFIX}${projectKeyPostfix}`,
      'sonar.sources': '.',
      'sonar.tests': '.',
      'sonar.test.inclusions': '**/*.test.js,**/*.test.jsx,**/*.test.tsx,**/*.test.ts',
      'sonar.javascript.lcov.reportPaths': 'coverage/lcov.info',
      'sonar.testExecutionReportPaths': 'coverage/sonar-report.xml',
    },
  },
  () => process.exit()
);
