const fs = require("node:fs");
const ncp = require("ncp").ncp;

const devAppsPath = "./development";

const getComponentFoldersList = () => {
  const componentList = fs
    .readdirSync(devAppsPath)
    .map((app) => "./development/" + app + "/components");
  const pagesList = fs
    .readdirSync(devAppsPath)
    .map((app) => "./development/" + app + "/pages");
  console.log(">>>", componentList);
  componentList.forEach((sourcePath) =>
    copyToFolder(sourcePath, "./docs/components")
  );
  pagesList.forEach((sourcePath) => copyToFolder(sourcePath, "./docs/pages"));
};

const copyToFolder = (source, target) => {
  const filterFn = (source) => {
    if (
      source.includes("_app.tsx") ||
      source.includes("_document.tsx") ||
      source.includes("index.tsx")
    )
      return false;
    return true;
  };

  ncp(source, target, { filter: filterFn }, function (err) {
    if (err) {
      console.error(err);
    } else {
      console.log("Component Folder created successfully.");
    }
  });
};

module.exports = getComponentFoldersList;
