module.exports = function(app) {

    var pages = [
        { "_id": 321, "name": "Post 1", "wid": 567 },
        { "_id": 432, "name": "Post 2", "wid": 567 },
        { "_id": 543, "name": "Post 3", "wid": 567 }
    ];

    app.post("/api/website/:wid/page", createPage);
    app.get("/api/website/:wid/page", findAllPagesForWebsite);
    app.get("/api/page/:pid", findPageById);
    app.put("/api/page/:pid", updatePage);
    app.delete("/api/page/:pid", deletePage);

    function createPage(req, res) {
        var page = req.body;
        pages.push(page);
        res.send(pages);
    }

    function findAllPagesForWebsite(req, res) {
        var wid = parseInt(req.params.wid);
        var result = [];
        for(var w in pages) {
            if(pages[w].wid === wid) {
                result.push(pages[w]);
            }
        }
        res.json(result);
    }

    function findPageById(req, res) {
        var pid = parseInt(req.params.pid);
        for(var w in pages) {
            if(pages[w]._id === pid) {
                res.send(pages[w]);
                return;
            }
        }
        res.send('0');
    }

    function updatePage(req, res) {
        var page = req.body;
        var pid = parseInt(req.params.pid);
        for(var w in pages) {
            if(pages[w]._id === pid) {
                pages[w] = page;
            }
        }
        res.send(200);
    }

    function deletePage(req, res) {
        var pid = parseInt(req.params.pid);
        for(var i in pages) {
            if (pages[i]._id === pid) {
                pages.splice(i, 1);
                res.send(200);
                return;
            }
        }
        res.send(400);
    }
}