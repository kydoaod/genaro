class CommonFunctions {
    static removeUndefined(obj) {
        Object.keys(obj).forEach(key => obj[key] === undefined && delete obj[key]);

        return obj;
    }
}

module.exports = CommonFunctions;
