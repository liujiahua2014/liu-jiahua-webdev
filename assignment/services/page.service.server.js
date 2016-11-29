module.exports = function(app, model) {

    app.post("/api/website/:wid/page", createPage);
    app.get("/api/website/:wid/page", findAllPagesForWebsite);
    app.get("/api/page/:pid", findPageById);
    app.put("/api/page/:pid", updatePage);
    app.delete("/api/page/:pid", deletePage);

    function createPage(req, res) {
        var page = req.body;
        model.pageModel
            .createPage(req.params.wid, page)
            .then(
                function (page) {
                    res.json(page);
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            );
    }

    function findAllPagesForWebsite(req, res) {
        var wid = req.params.wid;
        model.pageModel
            .findAllPagesForWebsite(wid)
            .then(
                function(pages) {
                    res.json(pages);
                }
            );
    }

    function findPageById(req, res) {
        var pid = req.params.pid;
        model.pageModel
            .findPageById(pid)
            .then(
                function(page) {
                    res.json(page);
                }
            );
    }

    function updatePage(req, res) {
        var page = req.body;
        var pid = req.params.pid;
        model
            .pageModel
            .updatePage(pid, page)
            .then(
                function (status) {
                    res.send(200);
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            );
    }

    function deletePage(req, res) {
        var pid = req.params.pid;
        model
            .pageModel
            .deletePage(pid)
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