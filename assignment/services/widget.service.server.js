module.exports = function(app, model) {

    var multer = require('multer');
    var upload = multer({ dest: __dirname+'/../../public/uploads' });

    app.post ("/api/uploads", upload.single('myFile'), uploadImage);
    app.post("/api/page/:pid/widget", createWidget);
    app.get("/api/page/:pid/widget", findAllWidgetsForPage);
    app.get("/api/widget/:wgid", findWidgetById);
    app.put("/api/widget/:wgid", updateWidget);
    app.delete("/api/widget/:wgid", deleteWidget);
    app.put("/api/page/:pid/widget", updateOrder);

    function uploadImage(req, res) {

        var uid      = req.body.uid;
        var wid      = req.body.wid;
        var pid      = req.body.pid;
        var wgid      = req.body.wgid;

        var widget = {
            name: req.body.name,
            text: req.body.text,
            url: "/uploads/" + req.file.filename,
            width: req.body.width
        };

        model
            .widgetModel
            .updateWidget(wgid, widget)
            .then(
                function (status) {
                    res.send(200);
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            );

        res.redirect("/assignment/#/user/"+uid+"/website/"+wid+"/page/"+pid+"/widget/"+wgid);
    }

    function createWidget(req, res) {
        var widget = req.body;
        model.widgetModel
            .createWidget(req.params.pid, widget)
            .then(
                function (widget) {
                    res.json(widget);
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            );
    }

    function findAllWidgetsForPage(req, res) {
        var pid = req.params.pid;
        model.widgetModel
            .findAllWidgetsForPage(pid)
            .then(
                function(widgets) {
                    res.json(widgets);
                }
            );
    }

    function findWidgetById(req, res) {
        var wgid = req.params.wgid;
        model.widgetModel
            .findWidgetById(wgid)
            .then(
                function(widget) {
                    res.json(widget);
                }
            );
    }

    function updateWidget(req, res) {
        var widget = req.body;
        var wgid = req.params.wgid;
        model
            .widgetModel
            .updateWidget(wgid, widget)
            .then(
                function (status) {
                    res.send(200);
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            );
    }

    function deleteWidget(req, res) {
        var wgid = req.params.wgid;
        model
            .widgetModel
            .deleteWidget(wgid)
            .then(
                function (status) {
                    res.send(200);
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            )
    }

    function updateOrder(req, res) {
        var pid = req.params.pid;
        var startIndex = parseInt(req.query.initial);
        var endIndex = parseInt(req.query.final);
        model
            .widgetModel
            .reorderWidget(pid, startIndex, endIndex)
            .then(
                function (status) {
                    res.send(200);
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            )

        //widgets.splice(end, 0, widgets.splice(start, 1)[0]);
    }
}