angular.module('app')
    .directive('fileReader', function () {
        return {
            scope: {
                onContent: '='
            },
            template: '<form enctype="multipart/form-data">' +
            '<input type="file" />' +
            '</form>',
            link: function (scope, element) {
                var fileInput = element.find('input');
                fileInput.on('change', function (e) {
                    var file = fileInput[0].files[0];
                    var reader = new FileReader();

                    reader.onload = function (e) {
                        try {
                            var result = JSON.parse(reader.result);
                        } catch (e) {
                        }
                        scope.onContent.apply(null, [result]);
                    };

                    reader.readAsText(file);
                });
            }
        }
    });