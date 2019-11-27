const { getCurrentWindow, globalShortcut, ipcRenderer, app } = require('electron').remote;
const ElectronSearchText = require('electron-search-text');

var shell = require('electron').shell;

window.onload = () => {
    window.$ = window.jQuery = window.jquery = require('jquery');
    window.electron_navigation = require('electron-navigation');

    $('#nav-ctrls-close').click(function () {
        getCurrentWindow().close();
    });

    $('#logo').click(function () {
        shell.openExternal('https://l1nna.com');
    });

    window.open_shell = function (url) {
        if (url.startsWith('http'))
            shell.openExternal(url);
    };

    window.add_search_window = () => {
        $('webview').each(function (ind, ele) {
            var vid = $(ele).prop('id');
            var input_id = vid + '-input';
            var count_id = vid + '-count';
            var box_id = vid + '-box';
            $('body').append(
                $(`<div id='${box_id}' class="electronSearchText-box"/>`)
                    .append(
                        $(`<span id='${count_id}' class="electronSearchText-count"></span>`)
                    )
                    .append(
                        $(`<input type="text" id='${input_id}' class="electronSearchText-input" >`)
                    )
            );
            var searcher = new ElectronSearchText({
                target: '#' + vid,
                input: '#' + input_id, // selector for search input
                count: '#' + count_id, // selector for search results count
                box: '#' + box_id,
            });
            $(ele).data('searcher', searcher);
        });
    };

    window.open_search = function () {
        search.openSearchWindow();
    };

    var basepath = app.getPath('home');
    console.log(basepath);
    const fs = require('fs');
    try {
        var data = fs.readFileSync(basepath + '/l1nna-settings.json');
        let settings = JSON.parse(data);
        window.settings = settings
    } catch (err) {
        console.log(err);
         window.settings = [
                {
                    'url': 'https://www.gmail.com',
                    'conf': { 'id': 'gmail', 'title': '', 'icon': 'icons/gmail.png' }
                }
            ];
    }


    console.log("loaded");

};