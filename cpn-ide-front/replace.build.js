const replace = require('replace-in-file');
const dateFormat = require('dateformat');

const now = new Date();
const buildVersion = '1.1.' + dateFormat(now, "yyyymmddHH");

const options = {
  files: 'src/environments/environment.prod.ts',
  from: /{BUILD_VERSION}/g,
  to: buildVersion,
  allowEmptyPaths: false,
};

try {
  let changedFiles = replace.sync(options);
  console.log('Build version set: ' + buildVersion);
} catch (error) {
  console.error('Error occurred:', error);
}
