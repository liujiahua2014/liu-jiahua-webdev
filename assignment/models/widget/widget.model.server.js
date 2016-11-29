module.exports = function () {

    var model = {};
    var mongoose = require("mongoose");
    var WidgetSchema = require("./widget.schema.server")();
    var WidgetModel = mongoose.model("WidgetModel", WidgetSchema);

    var api = {
        createWidget: createWidget,
        findAllWidgetsForPage: findAllWidgetsForPage,
        findWidgetById: findWidgetById,
        updateWidget: updateWidget,
        deleteWidget: deleteWidget,
        reorderWidget: reorderWidget,
        setModel: setModel
    };
    return api;

    function createWidget(pageId, widget) {
        return WidgetModel
            .findOne({_page: pageId})
            .sort('-order')
            .then(
                function(lastWidget) {
                    if(lastWidget) {
                        widget.order = ++lastWidget.order;
                    } else {
                        widget.order = 0;
                    }
                    return WidgetModel
                        .create(widget)
                        .then(function(widgetObj){
                            model.pageModel
                                .findPageById(pageId)
                                .then(function(pageObj){
                                    pageObj.widgets.push(widgetObj);
                                    widgetObj._page = pageObj._id;
                                    widgetObj.save();
                                    pageObj.save();
                                }, function(error){
                                    console.log(error);
                                });
                            return widgetObj;
                        });
                }
            );
    }

    function findAllWidgetsForPage(pageId) {
        return WidgetModel.find({"_page": pageId});
    }

    function findWidgetById(widgetId) {
        return WidgetModel.findById(widgetId);
    }

    function updateWidget(widgetId, widget) {
        return WidgetModel
            .update(
                {
                    _id: widgetId
                },
                {
                    name: widget.name,
                    text: widget.text,
                    url: widget.url,
                    description: widget.description,
                    width: widget.width,
                    height: widget.height,
                    size: widget.size === undefined ? 0 : widget.size,
                    rows: widget.rows === undefined ? 0 : widget.rows,
                    formatted: widget.formatted,
                    placeholder: widget.placeholder,


                }
            );
    }

    function deleteWidget(widgetId) {
        return WidgetModel
            .remove({_id: widgetId});
    }

    function reorderWidget(pageId, startIndex, endIndex) {
        return WidgetModel
            .find()
            .then(
                function(widgets) {
                    widgets
                        .forEach(
                            function(widget){
                                if(startIndex < endIndex) {
                                    if(widget.order < startIndex) {

                                    } else if(widget.order === startIndex) {
                                        widget.order = endIndex;
                                        widget.save(function(err,doc){});
                                    } else if(widget.order > startIndex && widget.order <= endIndex) {
                                        widget.order--;
                                        widget.save(function(err,doc){});
                                    } else if(widget.order > endIndex) {

                                    }
                                } else {
                                    if(widget.order < endIndex) {

                                    } else if(widget.order === startIndex) {
                                        widget.order = endIndex;
                                        widget.save(function(err,doc){});
                                    } else if(widget.order < startIndex && widget.order >= endIndex) {
                                        widget.order++;
                                        widget.save(function(err,doc){});
                                    } else if(widget.order > startIndex) {

                                    }
                                }
                            }
                        );
                },
                function(err) {

                }
            );
    }

    function setModel(_model) {
        model = _model;
    }
};