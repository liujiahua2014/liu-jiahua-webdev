module.exports = function(app) {

    var websites = [
        { "_id": 123, "name": "Facebook",    "uid": 456 },
        { "_id": 234, "name": "Tweeter",     "uid": 456 },
        { "_id": 456, "name": "Gizmodo",     "uid": 456 },
        { "_id": 567, "name": "Tic Tac Toe", "uid": 123 },
        { "_id": 678, "name": "Checkers",    "uid": 123 },
        { "_id": 789, "name": "Chess",       "uid": 234 }
    ];

    app.post("/api/user/:uid/website", createWebsite);
    app.get("/api/user/:uid/website", findAllWebsitesForUser);
    app.get("/api/website/:wid", findWebsiteById);
    app.put("/api/website/:wid", updateWebsite);
    app.delete("/api/website/:wid", deleteWebsite);

    function createWebsite(req, res) {
        var website = req.body;
        websites.push(website);
        res.send(websites);
    }

    function findAllWebsitesForUser(req, res) {
        var uid = parseInt(req.params.uid);
        var result = [];
        for(var w in websites) {
            if(websites[w].uid === uid) {
                result.push(websites[w]);
            }
        }
        res.json(result);
    }

    function findWebsiteById(req, res) {
        var wid = parseInt(req.params.wid);
        for(var w in websites) {
            if(websites[w]._id === wid) {
                res.send(websites[w]);
                return;
            }
        }
        res.send('0');
    }

    function updateWebsite(req, res) {
        var website = req.body;
        var wid = parseInt(req.params.wid);
        for(var w in websites) {
            if(websites[w]._id === wid) {
                websites[w] = website;
            }
        }
        res.send(200);
    }
    
    function deleteWebsite(req, res) {
        var wid = parseInt(req.params.wid);
        for(var i in websites) {
            if (websites[i]._id === wid) {
                websites.splice(i, 1);
                res.send(200);
                return;
            }
        }
        res.send(400);
    }
}