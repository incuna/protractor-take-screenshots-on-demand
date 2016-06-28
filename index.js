var fs = require('fs');
var path = require('path');
var mkdirp = require('mkdirp');


module.exports  = {

    screenShotDirectory:  '',

    createDirectory: function () {
        var directory = this.screenShotDirectory;
        mkdirp(directory, function(err) {
            if(err) {
                console.log('Could not create directory ' + directory);
                throw err;
            }
        });
    },

    takeScreenshot: function (name) {
        var directory = this.screenShotDirectory;
        function writeScreenShot (data, filename) {
            if (!fs.existsSync(directory)) {
                throw new Error('Directory does not exist ' + directory);
            }
            var stream = fs.createWriteStream(path.join(directory, filename));
            stream.write(new Buffer(data, 'base64'));
            stream.end();
        }
        browser.takeScreenshot().then(function (png) {
            browser.getCapabilities().then(function (capabilities) {
                var browserName = capabilities.get('browserName'),
                    filename = browserName + ' - ' + name + '.png';
                writeScreenShot(png, filename);
            });
        });
    }

};
