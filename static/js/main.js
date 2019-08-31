Vue.component('pagebody', {
    template: `
    <div class="row">
        <Camera></Camera>
        <div class="col-md-6">
            <div class="panel panel-default">
                <div class="panel-heading">
                    <p>Available videos:</p>
                </div>
                <div class="panel-body">
                    <ul id="file_list"></ul>
                </div>
            </div>
        </div>
    </div>`,
    data() {
        return {
            test: 'sdfsd'
        }
    },
    created() {
        this.getStoredFiles();
    },
    methods: {
        getStoredFiles() {
            var http = new XMLHttpRequest();
            http.responseType = 'json';
            http.open("GET", "/savedFiles");
            http.send();

            http.onreadystatechange = function () {
                if (this.readyState === 4 && this.status == 200) {
                    let ul = document.getElementById('file_list');
                    http.response.forEach(el => {
                        let li = document.createElement('li');
                        li.appendChild(document.createTextNode(el));
                        ul.appendChild(li);
                    });
                }
            }
        }
    }
});

Vue.component('Camera', {
    template: `
    <div class="col-md-6">
        <div class="panel panel-default">
            <div class="panel-heading">
                <p>Camera:</p>
            </div>
            <img class="cam-feed media-object" src="feed" alt="video" height="320" width="426">
            <div class="panel-footer">
                <p>Camera recording: <span id="camStatus">false</span></p>
            </div>
        </div>
    </div>`,
    created() {
        setInterval(this.getCamStatus, 3000);
    },
    methods: {
        getCamStatus() {
            var http = new XMLHttpRequest();
            http.open("GET", '/camStatus');
            http.send();

            http.onreadystatechange = function () {
                if (this.readyState === 4 && this.status == 200) {
                    document.getElementById('camStatus').innerHTML = http.responseText.toLowerCase();
                }
            }
        }
    }
});

var app = new Vue({
    el: '#app'
});