(function () {
  function getTemplateFloors(projectType, totalFloors) {
    const type = BOQ_DATA.projectTypes[projectType] || BOQ_DATA.projectTypes.residential;
    const floors = [];
    for (let i = 1; i <= totalFloors; i += 1) {
      floors.push({ id: BOQUtils.makeId("floor"), name: i === 1 ? "Ground Floor" : "Floor " + i, rooms: type.roomTemplate.map(function (room) { return Object.assign({ id: BOQUtils.makeId("room") }, room); }) });
    }
    return floors;
  }
  function simulateExtraction(fileName, projectType, totalFloors) {
    return { fileName: fileName, message: "Simulated extraction completed from " + fileName + ". Floors and room schedule were generated from the selected project type.", floors: getTemplateFloors(projectType, totalFloors) };
  }
  window.BOQCad = { getTemplateFloors, simulateExtraction };
})();
