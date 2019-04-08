const fs = require('fs');
const dateFormat = require('dateformat');

const now = new Date();
const buildVersion = '1.1.' + dateFormat(now, "yyyymmddHH");

try {
  console.log('Build version set: ' + buildVersion);

//  echo 'export class MyVersion {public static readonly number = '%SVN_REVISION%'}' > src\myVersion.ts

  // var file = new File("src/app/app.version.ts");
  // file.open("w");
  // file.writeln("export class AppVersion {public static readonly buildVersion = '${buildVersion}'}");
  // file.close();

  const filename = "src/app/app.version.ts";
  const content = "export class AppVersion { public static readonly buildVersion = '" + buildVersion + "'; }";
  fs.writeFile(filename, content, (err) => {
    if (err) throw err;
  })
} catch (error) {
  console.error('Error occurred:', error);
}
