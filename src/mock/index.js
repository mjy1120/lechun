var listData = require("./data/list.json");
var mockApi = {
    "/api/list_data": listData
};
module.exports = function (url) {
    return mockApi[url]
}