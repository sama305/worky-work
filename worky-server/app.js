const express = require('express');
const fs = require('fs');
const cors = require('cors');

const app = express();
const port = 8080;

app.use(express.json())
app.use(cors({
    origin: '*'
}));

app.get('/:user/exercises', (req, res) => {
    let rawData = fs.readFileSync(`./data/users/${req.params.user}/exercises.json`, 'utf-8');
    console.log(`GET request from ${req.params.user} for exercises`);

    res.status(200).send(rawData)
});

app.get('/:user/exercises/:id', (req, res) => {
    let rawData = fs.readFileSync(`./data/users/${req.params.user}/exercises.json`, 'utf-8');
    let exercise = JSON.parse(rawData).find(e => {
        return e.id === req.params.id
    })
    console.log(`GET request from ${req.params.user} for exercises`);

    res.status(200).send(exercise)
})

app.post('/:user/exercises', (req, res) => {
    let rawData = req.body
    let data = JSON.stringify(rawData)

    fs.writeFileSync(`./data/users/${req.params.user}/exercises.json`, data, 'utf-8');
    console.log(`POST request from ${req.params.user} for exercises`);

    res.status(200).send(req.body)
})

app.post('/:user', (req, res) => {
    let rawData = req.body
    let data = JSON.stringify(rawData)
    console.log(`POST request from ${req.params.user} for user`);

    fs.access(`./data/${req.params.user}`, (err) => {
        // user does not exist
        if (err.code === 'EEXIST') {
            fs.mkdir(`./data/${req.params.user}`, (err) => {
                if (err) return console.error(err)
            })
            fs.writeFile(`./data/${req.params.user}/exercises.json`, '', function(err) {
                if (err) return console.error(err)
            })
            fs.writeFile(`./data/${req.params.user}/splits.json`, '', function(err) {
                if (err) return console.error(err)
            })
            fs.writeFile(`./data/${req.params.user}/user.json`, data, function(err) {
                if (err) return console.error(err)
            })
        }
        // user does exist
        else {
            fs.writeFileSync(`./data/users/${req.params.user}/user.json`, data, 'utf-8');
        }
    })

    res.status(200).send(req.body)
})

app.get('/:user', (req, res) => {
    let rawData = fs.readFileSync(`./data/users/${req.params.user}/user.json`)
    console.log(`GET request from ${req.params.user} for user data`);

    res.status(200).send(rawData)
})

app.get('/:user/splits', (req, res) => {
    let rawData = fs.readFileSync(`./data/users/${req.params.user}/splits.json`, 'utf-8');
    console.log(`GET request from ${req.params.user} for splits`);

    res.status(200).send(rawData)
})

app.post('/:user/splits', (req, res) => {
    let rawData = req.body
    let data = JSON.stringify(rawData)

    fs.writeFileSync(`./data/users/${req.params.user}/splits.json`, data, 'utf-8');
    console.log(`POST request from ${req.params.user} for splits`);

    res.status(200).send(req.body)
})

app.get('/:user/splits/:id', (req, res) => {
    let rawData = fs.readFileSync(`./data/users/${req.params.user}/splits.json`, 'utf-8');
    let split = JSON.parse(rawData).find(s => {
        return s.id === req.params.id
    })
    console.log(`GET request from ${req.params.user} for splits`);

    res.status(200).send(split)
})

app.get('/:user/logs', (req, res) => {
    let rawData = fs.readFileSync(`./data/users/${req.params.user}/logs.json`)
    console.log(`GET request from ${req.params.user} for logs`)

    res.status(200).send(rawData)
})

app.post('/:user/logs', (req, res) => {
    let rawData = req.body
    let data = JSON.stringify(rawData)

    fs.writeFileSync(`./data/users/${req.params.user}/logs.json`, data, 'utf-8');
    console.log(`POST request from ${req.params.user} for logs`);

    res.status(200).send(req.body)
})

app.listen(port, () => {
    console.log(`[server]: Server running at http://localhost:${port}`)
});
