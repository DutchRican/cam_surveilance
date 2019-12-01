const express = require('express');
const app = express();
const path = require('path');
const sqlite3 = require('sqlite3');

const port = 3000;

const db = new sqlite3.Database(path.join(__dirname, '/data/config.db'), err => {
    if (err) throw err;
});


// Serve all the files in '/dist' directory
app.use(express.static(path.join(__dirname, '/../client/dist')));
app.use(express.json());
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE');
    next();
});
// Handle a get request to an api route
app.get('/config/cameras', (req, res) => {
    db && db.serialize(() => {
        db.all('SELECT * from cameras;', (err, rows) => {
            if (err) { res.status(400).json({ error: err }); }
            else {
                res.json({ cameras: rows });
            }
        });
    });
});

app.put('/config/cameras/:id', (req, res) => {
    const { host, name, port } = req.body;
    if (!host || !name || !port) {
        return res.status(422);
    }
    const query = `UPDATE cameras set 
    host = COALESCE(?,host), 
    name = COALESCE(?,name), 
    port = COALESCE(?,port) 
    WHERE camera_id = ?`;
    const params = [host, name, port, parseInt(req.params.id)]
    db && db.run(query, params, (err, result) => {
        if (err) {
            res.status(400).json({ error: err });
        }
        else {
            res.json({ host, name, port, camera_id: parseInt(req.params.id) });
        }
    });
});

app.delete('/config/remove/camera/:id', (req, res) => {
    const query = `DELETE from cameras
    WHERE camera_id = ?`;
    const params = [parseInt(req.params.id)];
    db && db.run(query, params, (err, result) => {
        if (err) {
            res.status(400).json({ error: err });
        }
        else {
            res.json({message: 'deleted', changes: this.changes });
        }
    });
});

// app.get('*', (req, res) => {
//     res.sendFile('index.html')
// });

app.listen(process.env.port || port, function () {
    console.log(`Server is up and running on localhost:${process.env.port || port}`);
});

process.on('SIGTERM', cleanup);
process.on('SIGINT', cleanup)

function cleanup() {
    console.log('cleaning up.');
    try {
        db.close(error => {
            if (error) throw error;
        });
    } catch (err) {
        console.log(err);
    } finally {
        process.exit(1);
    }
}