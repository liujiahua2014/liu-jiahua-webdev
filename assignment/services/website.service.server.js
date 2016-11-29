module.exports = function(app, model) {

    app.post("/api/user/:uid/website", createWebsite);
    app.get("/api/user/:uid/website", findAllWebsitesForUser);
    app.get("/api/website/:wid", findWebsiteById);
    app.put("/api/website/:wid", updateWebsite);
    app.delete("/api/website/:wid", deleteWebsite);

    function createWebsite(req, res) {
        var website = req.body;
        model.websiteModel
            .createWebsite(req.params.uid, website)
            .then(
                function (website) {
                    res.json(website);
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
        );
    }

    function findAllWebsitesForUser(req, res) {
        var uid = req.params.uid;
        model.websiteModel
            .findAllWebsitesForUser(uid)
            .then(
                function(websites) {
                    res.json(websites);
                }
            );
    }

    function findWebsiteById(req, res) {
        var wid = req.params.wid;
        model.websiteModel
            .findWebsiteById(wid)
            .then(
                function(website) {
                    res.json(website);
                }
            );
    }

    function updateWebsite(req, res) {
        var website = req.body;
        var wid = req.params.wid;
        model
            .websiteModel
            .updateWebsite(wid, website)
            .then(
                function (status) {
                    res.send(200);
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            );
    }
    
    function deleteWebsite(req, res) {
        var wid = req.params.wid;
        model
            .websiteModel
            .deleteWebsite(wid)
            .then(
                function (status) {
                    res.send(200);
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            )
    }
}