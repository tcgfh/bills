sap.ui.define("MonthPicker", [
    "sap/ui/core/Control",
    "sap/m/List",
    "sap/ui/model/json/JSONModel"
    ], function (Control, List, JSONModel) {
        "use strict";
        var oMonthPickerControl = Control.extend("MonthPicker", {
            metadata: {
                properties: {
                    "selectedMonth": {type: "integer", default: 1}
                },
                aggregations: {
                    "_oList": {type: "sap.m.List", multiple: false, visibility: "hidden"}
                },
                events: {}
            },
            init: function() {
                var oMonthList = new sap.m.List();
                var oMonthModel = new sap.ui.model.json.JSONModel();
                var oMonthsData = {
                    months:[
                        {
                            description: "January",
                            value: 1
                        },{
                            description: "February",
                            value: 2
                        },{
                            description: "March",
                            value: 3
                        },{
                            description: "April",
                            value: 4
                        },{
                            description: "May",
                            value: 5
                        },{
                            description: "June",
                            value: 6
                        },{
                            description: "July",
                            value: 7
                        },{
                            description: "August",
                            value: 8
                        },{
                            description: "Septmber",
                            value: 9
                        },{
                            description: "October",
                            value: 10
                        },{
                            description: "November",
                            value: 11
                        },{
                            description: "December",
                            value: 12
                        }
                    ]
                };
                oMonthModel.setData(oMonthsData);
                oMonthList.setModel(oMonthModel);
                oMonthList.bindItems({
                    path: "/months",
                    template: new sap.m.StandardListItem({
                        title: "{description}"
                    })
                });
                oMonthList.attachSelectionChange(function(oEvent) {
                    // get the item that was selected
                    // get the context path of the item
                    // using the context path against the model, we can get the value
                    // then we can set the selected Month property
                    // and fire a selection change event on the monthPicker.
                });
                this.setAggregation("_oList", oMonthList);
            },

            renderer: function(oRM, oControl) {
                oRM.renderControl(oControl.getAggregation("_oList"));
            },
            setSelectedMonth: function(iSelectedMonth) {
                this.setProperty("selectedMonth", iSelectedMonth);
                var oList = this.getAggregation("_oList");
            }
        });

        return oMonthPickerControl;
    }
);


