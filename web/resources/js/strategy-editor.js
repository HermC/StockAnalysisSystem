/**
 * Created by Hermit on 16/8/20.
 */
var codeEditor = document.getElementById("strategy_code_editor");
var CodeMirrorEditor;

//var strategy_id;

window.onload = function() {
    codeEditor = document.getElementById("strategy_code_editor");

    if(isNew){

    }else{
        var strategy_flow = strategy.json;
        var tmp = eval("(" + strategy_flow + ")");
        flow_data = {data: tmp};
    }

    initButtonListener();
    initInputListener();
    initDateTools();

    if(isNew){
        $("#strategy_code").show();
        $("#jtk_demo_flowchart").hide();
        showCodeEditor(isNew);
    }else{
        showCodeEditor(isNew);
        console.log(isNew);
        if(isCode){
            //showCodeEditor(isNew);
            $("#strategy_code").show();
            $("#jtk_demo_flowchart").hide();
            showCodeEditor(isNew);
        }else{
            //console.log("32");
            $("#strategy_code").hide();
            $("#jtk_demo_flowchart").show();
            showFlowChart(isNew);
        }
    }
};

function sleep(numberMillis) {
    var now = new Date();
    var exitTime = now.getTime() + numberMillis;
    while (true) {
        now = new Date();
        if (now.getTime() > exitTime)
            return;
    }
}

//var isCode = true;
function initButtonListener() {
    $("#change_model").on("click", function() {
        console.log(isCode);
        if(isCode){
            $("#change_model").html("采用代码模式");
            $("#strategy_code").hide();
            $("#jtk_demo_flowchart").show();
            showFlowChart(true);
        }else{
            $("#change_model").html("采用流程图模式");
            $("#strategy_code").show();
            $("#jtk_demo_flowchart").hide();
            showCodeEditor(true);
        }
        isCode = !isCode;
    });
    $("#save").on("click", function() {
        $("#change_model").hide();
        saveCodeORFlow();
    });
    $("#start_simulator").on("click", function() {
        $("#change_model").hide();
        var start = $("#start_time").val();
        var end = $("#end_time").val();
        var amount = $("#start_amount").val();
        console.log(start);
        if(start==undefined||start==null||start==""){
            $("#start_time").addClass("input-alert");
            return;
        }
        if(end==undefined||end==null||end==""){
            $("#end_time").addClass("input-alert");
            return;
        }
        if(amount==undefined||amount==null||amount==""){
            $("#start_amount").addClass("input-alert");
            return;
        }
        saveCodeORFlow();
        runningCode();
    });
}

function initInputListener() {
    $("input").bind("focus", function() {
         $(this).removeClass("input-alert");
    });
}

function saveCodeORFlow() {
    var data = "";
    if(isCode){
        data += "strategy_name="+$("#strategy_name").val()+"&strategy_code="+CodeMirrorEditor.getValue()+"&isCode=true";
    }else{
        data += "strategy_name="+$("#strategy_name").val()+"&strategy_flow="+JSON.stringify(toolkit.exportData())+"&isCode=false";
    }
    console.log(data);
    if(isNew){
        $.ajax({
            type: "post",
            async: false,
            url: "user/strategy/add-new-strategy.do",
            data: data,
            dataType: "json",
            success: function(data) {
                console.log(data);
            },
            error: function() {
                alert("保存失败,请稍后再试");
            }
        });
        isNew = false;
    }else{
        data = "strategy_id="+strategy_id+"&"+data;
        $.ajax({
            type: "post",
            async: false,
            url: "user/strategy/update-strategy.do",
            data: data,
            dataType: "json",
            success: function(data) {
                console.log(data);
            },
            error: function() {
                console.log("save error");
            }
        });
    }
}

function runningCode() {
    if(isCode){
        $.ajax({
            type: "get",
            url: "user/strategy/running-python-strategy.do?strategy_id="+strategy_id,
            dataType: "json",
            success: function(data) {
                console.log(data);
            },
            error: function() {
                console.log("running error");
            }
        });
    }else{
        var stocks = $("#choose_stocks").val()+"";
    }
}

function initDateTools() {
    $(".form_datetime").datetimepicker({
        format: 'yyyy-mm-dd',
        autoclose: true,
        minView: "month"
    });

    $(".form_datetime").datetimepicker("setEndDate", getNowFormatDate());

    $("#start_time").datetimepicker().on("changeDate", function(ev) {
        console.log(ev);
        $("#end_time").datetimepicker("setStartDate", ev.date);
        $("#end_time").datetimepicker("update", ev.date);
    });

    $("#end_time").datetimepicker().on("changeDate", function(ev) {
        console.log(ev);
        $("#start_time").datetimepicker("setEndDate", ev.date);
        $("#start_time").datetimepicker("update", ev.date);
    });
}

function showCodeEditor(isNew) {
    var text = code;
    if(isNew){

    }else{
        $("#change_model").hide();
        text = strategy.python;
    }
    console.log(text);
    if(CodeMirrorEditor!=undefined||CodeMirrorEditor!=null){
        return;
    }
    $(codeEditor).val(text);
    CodeMirrorEditor = CodeMirror.fromTextArea(codeEditor, {
        mode: "python",
        lineNumbers: true,
        theme: "twilight",
        indentUnit: 4
    });
}

function getNowFormatDate() {
    var date = new Date();
    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
        + " " + date.getHours() + seperator2 + date.getMinutes()
        + seperator2 + date.getSeconds();
    return currentdate;
}

/**
 *
 * jsPlumb init
 *
 * */
var toolkit;
var flow_data = {data: {
    "nodes": [
        {
            "id": "start",
            "type": "start",
            "text": "Start",
            "left": 50,
            "top": 50,
            "w": 100,
            "h": 70
        },
        {
            "id": "question1",
            "type": "question",
            "text": "Do Something?",
            "left": 290,
            "top": 79,
            "w": 150,
            "h": 150
        }
    ],
    "edges": [
        {
            "source": "start",
            "target": "question1",
            "data": {}
        }
    ],
    "ports": []
}};

function showFlowChart(isNew) {
    jsPlumbToolkit.ready(function() {
        $(".js-example-basic-multiple").select2();
        if(isNew){

        }else{
            $("#change_model").hide();
        }

        // ------------------------ toolkit setup ------------------------------------

        // This function is what the toolkit will use to get an ID from a node.
        var idFunction = function (n) {
            return n.id;
        };

        // This function is what the toolkit will use to get the associated type from a node.
        var typeFunction = function (n) {
            return n.type;
        };

        // get the various dom elements
        var mainElement = document.querySelector("#jtk-demo-flowchart"),
            canvasElement = mainElement.querySelector(".jtk-demo-canvas"),
            miniviewElement = mainElement.querySelector(".miniview"),
            nodePalette = mainElement.querySelector(".node-palette"),
            controls = mainElement.querySelector(".controls");

        // Declare an instance of the Toolkit, and supply the functions we will use to get ids and types from nodes.
        if(toolkit!=undefined||toolkit!=null){
            return;
        }
        toolkit = jsPlumbToolkit.newInstance({
            idFunction: idFunction,
            typeFunction: typeFunction,
            nodeFactory: function (type, data, callback) {
                jsPlumbToolkit.Dialogs.show({
                    id: "dlgText",
                    title: "Enter " + type + " name:",
                    onOK: function (d) {
                        data.text = d.text;
                        // if the user entered a name...
                        if (data.text) {
                            // and it was at least 2 chars
                            if (data.text.length >= 2) {
                                // set an id and continue.
                                data.id = jsPlumbToolkitUtil.uuid();
                                callback(data);
                            }
                            else
                            // else advise the user.
                                alert(type + " names must be at least 2 characters!");
                        }
                        // else...do not proceed.
                    }
                });
            },
            beforeStartConnect:function(node, edgeType) {
                // limit edges from start node to 1. if any other type of node, return
                return (node.data.type === "start" && node.getEdges().length > 0) ? false : { label:"" };
            }
        });

// ------------------------ / toolkit setup ------------------------------------

// ------------------------- dialogs -------------------------------------

        jsPlumbToolkit.Dialogs.initialize({
            selector: ".dlg"
        });

// ------------------------- / dialogs ----------------------------------

// ------------------------ rendering ------------------------------------

        var _editLabel = function(edge, deleteOnCancel) {
            jsPlumbToolkit.Dialogs.show({
                id: "dlgText",
                data: {
                    text: edge.data.label || ""
                },
                onOK: function (data) {
                    toolkit.updateEdge(edge, { label:data.text });
                },
                onCancel:function() {
                    if (deleteOnCancel) {
                        toolkit.removeEdge(edge);
                    }
                }
            });
        };

        // Instruct the toolkit to render to the 'canvas' element. We pass in a view of nodes, edges and ports, which
        // together define the look and feel and behaviour of this renderer.  Note that we can have 0 - N renderers
        // assigned to one instance of the Toolkit..
        var renderer = window.renderer = toolkit.render({
            container: canvasElement,
            view: {
                nodes: {
                    "start": {
                        template: "tmplStart"
                    },
                    "selectable": {
                        events: {
                            tap: function (params) {
                                toolkit.toggleSelection(params.node);
                            },
                            click: function (params) {
                                var info = renderer.getObjectInfo(params.node);
                                jsPlumbToolkit.Dialogs.show({
                                    id: "dlgText",
                                    data: info.obj.data,
                                    title: "Edit " + info.obj.data.type + " name",
                                    onOK: function (data) {
                                        if (data.text && data.text.length > 2) {
                                            // if name is at least 2 chars long, update the underlying data and update the UI.
                                            toolkit.updateNode(info.obj, data);
                                        }
                                    }
                                });
                            }
                        }
                    },
                    "question": {
                        parent: "selectable",
                        template: "tmplQuestion"
                    },
                    "action": {
                        parent: "selectable",
                        template: "tmplAction"
                    },
                    "output":{
                        parent:"selectable",
                        template:"tmplOutput"
                    }
                },
                // There are two edge types defined - 'yes' and 'no', sharing a common
                // parent.
                edges: {
                    "default": {
                        anchor:"AutoDefault",
                        endpoint:"Blank",
                        connector: ["Flowchart", { cornerRadius: 5 } ],
                        paintStyle: { lineWidth: 2, strokeStyle: "#f76258", outlineWidth: 3, outlineColor: "transparent" },	//	paint style for this edge type.
                        hoverPaintStyle: { lineWidth: 2, strokeStyle: "rgb(67,67,67)" }, // hover paint style for this edge type.
                        events: {
                            "dblclick": function (params) {
                                jsPlumbToolkit.Dialogs.show({
                                    id: "dlgConfirm",
                                    data: {
                                        msg: "Delete Edge"
                                    },
                                    onOK: function () {
                                        toolkit.removeEdge(params.edge);
                                    }
                                });
                            }
                        },
                        overlays: [
                            [ "Arrow", { location: 1, width: 10, length: 10 }],
                            [ "Arrow", { location: 0.3, width: 10, length: 10 }]
                        ]
                    },
                    "connection":{
                        parent:"default",
                        overlays:[
                            [
                                "Label", {
                                label: "${label}",
                                events:{
                                    click:function(params) {
                                        _editLabel(params.edge);
                                    }
                                }
                            }
                            ]
                        ]
                    }
                },

                ports: {
                    "start": {
                        edgeType: "default"
                    },
                    "source": {
                        maxConnections: -1,
                        edgeType: "connection"
                    },
                    "target": {
                        maxConnections: -1,
                        isTarget: true,
                        dropOptions: {
                            hoverClass: "connection-drop"
                        }
                    }
                }
            },
            // Layout the nodes using an absolute layout
            layout: {
                type: "Absolute"
            },
            events: {
                canvasClick: function (e) {
                    toolkit.clearSelection();
                },
                edgeAdded:function(params) {
                    if (params.addedByMouse) {
                        _editLabel(params.edge, true);
                    }
                },
                nodeDropped:function(info) {
                    console.log("node ", info.source.id, "dropped on ", info.target.id);
                }
            },
            miniview: {
                container: miniviewElement
            },
            lassoInvert:true,
            elementsDroppable:true,
            consumeRightClick: false,
            dragOptions: {
                filter: ".jtk-draw-handle, .node-action, .node-action i"
            }
        });

        //// Load the data.
        //toolkit.load({
        //    url: "js/flowchart-1.json",
        //    onload: function () {
        //        _updateDataset();
        //    }
        //});
        console.log(flow_data);
        toolkit.load(flow_data);

        // listener for mode change on renderer.
        renderer.bind("modeChanged", function (mode) {
            jsPlumb.removeClass(controls.querySelectorAll("[mode]"), "selected-mode");
            jsPlumb.addClass(controls.querySelectorAll("[mode='" + mode + "']"), "selected-mode");
        });

        // pan mode/select mode
        jsPlumb.on(controls, "tap", "[mode]", function () {
            renderer.setMode(this.getAttribute("mode"));
        });

        // on home button click, zoom content to fit.
        jsPlumb.on(controls, "tap", "[reset]", function () {
            toolkit.clearSelection();
            renderer.zoomToFit();
        });

        // configure Drawing tools. This is an optional include.
        new jsPlumbToolkit.DrawingTools({
            renderer: renderer
        });

        jsPlumb.on(canvasElement, "tap", ".node-delete, .node-delete i", function () {
            var info = renderer.getObjectInfo(this);
            jsPlumbToolkit.Dialogs.show({
                id: "dlgConfirm",
                data: {
                    msg: "Delete '" + info.obj.data.text + "'"
                },
                onOK: function () {
                    toolkit.removeNode(info.obj);
                }
            });
        });

        // change a question or action's label
        jsPlumb.on(canvasElement, "tap", ".node-edit, .node-edit i", function () {
            // getObjectInfo is a method that takes some DOM element (this function's `this` is
            // set to the element that fired the event) and returns the toolkit data object that
            // relates to the element. it ascends through parent nodes until it finds a node that is
            // registered with the toolkit.
            var info = renderer.getObjectInfo(this);
            jsPlumbToolkit.Dialogs.show({
                id: "dlgText",
                data: info.obj.data,
                title: "Edit " + info.obj.data.type + " name",
                onOK: function (data) {
                    if (data.text && data.text.length > 2) {
                        // if name is at least 2 chars long, update the underlying data and
                        // update the UI.
                        toolkit.updateNode(info.obj, data);
                    }
                }
            });
        });


// ------------------------ / rendering ------------------------------------

        var _syntaxHighlight = function (json) {
            json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
            return "<pre>" + json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
                    var cls = 'number';
                    if (/^"/.test(match)) {
                        if (/:$/.test(match)) {
                            cls = 'key';
                        } else {
                            cls = 'string';
                        }
                    } else if (/true|false/.test(match)) {
                        cls = 'boolean';
                    } else if (/null/.test(match)) {
                        cls = 'null';
                    }
                    return '<span class="' + cls + '">' + match + '</span>';
                }) + "</pre>";
        };

        var datasetContainer = document.querySelector(".jtk-demo-dataset");
        var _updateDataset = function () {
            datasetContainer.innerHTML = _syntaxHighlight(JSON.stringify(toolkit.exportData(), null, 4));
        };
        //
        // any operation that caused a data update (and would have caused an autosave), fires a dataUpdated event.
        //
        toolkit.bind("dataUpdated", _updateDataset);

// ------------------------ drag and drop new tables/views -----------------

        //
        // Here, we are registering elements that we will want to drop onto the workspace and have
        // the toolkit recognise them as new nodes.
        //
        //  typeExtractor: this function takes an element and returns to jsPlumb the type of node represented by
        //                 that element. In this application, that information is stored in the 'jtk-node-type' attribute.
        //
        //  dataGenerator: this function takes a node type and returns some default data for that node type.
        //
        renderer.registerDroppableNodes({
            droppables: nodePalette.querySelectorAll("li"),
            dragOptions: {
                zIndex: 50000,
                cursor: "move",
                clone: true
            },
            typeExtractor: function (el) {
                return el.getAttribute("jtk-node-type");
            },
            dataGenerator: function (type) {
                return {
                    w:120,
                    h:80
                };
            }
        });

// ------------------------ / drag and drop new tables/views -----------------

    });
}

var code = "" +
    "import talib\n" +
    "from rqalpha.api import history, plot, order_target_value, order_shares\n\n" +
    "def init(context):\n" +
    "\tcontext.s1 = '000001.XSHE'\n\n" +
    "\t# 设置这个策略当中会用到的参数，在策略中可以随时调用，这个策略使用长短均线，我们在这里设定长线和短线的区间，在调试寻找最佳区间的时候只需要在这里进行数值改动\n" +
    "\tcontext.SHORTPERIOD = 20\n" +
    "\tcontext.LONGPERIOD = 120\n\n" +
    "# 你选择的证券的数据更新将会触发此段逻辑，例如日或分钟历史数据切片或者是实时数据切片更新\n" +
    "def handle_bar(context, bar_dict):\n" +
    "\t# 开始编写你的主要的算法逻辑a\n\n" +
    "\t# bar_dict[order_book_id] 可以拿到某个证券的bar信息\n\n" +
    "\t# context.portfolio 可以拿到现在的投资组合状态信息\n\n" +
    "\t# 使用order_shares(id_or_ins, amount)方法进行落单\n\n" +
    "\t# TODO: 开始编写你的算法吧\n\n" +
    "\t# 因为策略需要用到均线，所以需要读取历史数据\n" +
    "\tprices = history(context.LONGPERIOD+1,'1d','close')[context.s1].values\n\n" +
    "\t# 使用talib计算长短两根均线，均线以array的格式表达\n" +
    "\tshort_avg = talib.SMA(prices,context.SHORTPERIOD)\n" +
    "\tlong_avg = talib.SMA(prices,context.LONGPERIOD)\n\n" +
    "\tplot('short avg',short_avg[-1])\n" +
    "\tplot('long avg',long_avg[-1])\n\n" +
    "\t# 计算现在portfolio中股票的仓位\n" +
    "\tcurPosition = context.portfolio.positions[context.s1].quantity\n" +
    "\t# 计算现在portfolio中的现金可以购买多少股票\n" +
    "\tshares = context.portfolio.cash/bar_dict[context.s1].close\n\n" +
    "\t# 如果短均线从上往下跌破长均线，也就是在目前的bar短线平均值低于长线平均值，而上一个bar的短线平均值高于长线平均值\n" +
    "\tif short_avg[-1]-long_avg[-1]<0 and short_avg[-2]-long_avg[-2]>0 and curPosition>0:\n" +
    "\t\t#进行清仓\n" +
    "\torder_target_value(context.s1,0)\n\n" +
    "\t# 如果短均线从下往上突破长均线，为入场信号\n" +
    "\tif short_avg[-1]-long_avg[-1]>0 and short_avg[-2]-long_avg[-2]<0:\n" +
    "\t\t#满仓入股\n" +
    "\t\torder_shares(context.s1,shares)\n";