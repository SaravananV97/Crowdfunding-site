const fs = require('fs-extra');
const path = require('path');
const solc = require('solc');

const buildPath = path.resolve(__dirname,"build");
fs.removeSync(buildPath);
const contractPath = path.resolve(__dirname,"contracts","campaign.sol");
const source = fs.readFileSync(contractPath,"utf8");
const compiled = solc.compile(source,1).contracts;
 fs.ensureDirSync(buildPath);
 for(let i in compiled){
  fs.outputJsonSync(path.resolve(buildPath,i.replace(":","") + ".json"),compiled[i]);
}
