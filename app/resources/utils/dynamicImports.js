// dynamicImports.js
export async function loadSection(sectionName) {
  switch (sectionName) {
    case "details":
      return import("../components/ResourceDetails");
    case "list":
      return import("../components/ResourceList");
    default:
      return null;
  }
}
