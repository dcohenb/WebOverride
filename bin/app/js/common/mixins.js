function s4() {
    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
}

_.mixin({
    guid: function () {
        return [s4() + s4(), s4(), s4(), s4(), s4() + s4() + s4()].join('-');
    },
    isUUID: function(str) {
        return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(str)
    },
    downloadFileFromText: function (filename, content) {
        var a = document.createElement('a');
        var blob = new Blob([content], {type: "text/plain;charset=UTF-8"});
        a.href = window.URL.createObjectURL(blob);
        a.download = filename;
        a.style.display = 'none';
        document.body.appendChild(a);
        a.click(); //this is probably the key - simulating a click on a download link
    }
});