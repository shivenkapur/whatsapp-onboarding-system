export default {
  hasData: function hasData(dataPoint) {
    if (
      dataPoint != "" &&
      dataPoint != "undefined" &&
      dataPoint != undefined &&
      dataPoint != "#N/A"
    )
      return true;
    return false;
  },
  hasNoData: function hasNoData(dataPoint) {
    if (
      dataPoint == "" ||
      dataPoint == "undefined" ||
      dataPoint == undefined ||
      dataPoint == "#N/A"
    )
      return true;
    return false;
  },
};
