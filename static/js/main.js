Vue.component('pagebody', {
    template: `
    <div class="row">
        <Camera></Camera>
        <div class="col-md-6">
            <div class="panel panel-default">
                <div class="panel-heading">
                    <p>Available videos:</p>
                </div>
            </div>
        </div>
    </div>`,
    data() {
        return {
            message: 'testing!!!'
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
            <img class="media-object" src="feed" alt="video" height="240" width="320">
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
                    document.getElementById('camStatus').innerHTML = http.responseText;
                }
            }
        }
    }
});

var app = new Vue({
    el: '#app'
});