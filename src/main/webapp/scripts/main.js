function main() {
    jQuery.sap.registerModulePath("com.bills", "./scripts/com/bills/");
    // sap.ui.localResources("com.bills");
    jQuery.sap.require("sap.m.App");
    jQuery.sap.require("sap.m.Page");
    jQuery.sap.require("sap.ui.model.json.JSONModel");
    jQuery.sap.require("com.bills.MonthPicker");

    var monthPage = new sap.m.Page({
        title: "Month"
    });

    var yearPage = new sap.m.Page({
        title: "Year"
    });

    var oMonthPicker = new MonthPicker();
    monthPage.addContent(oMonthPicker);


    var myapp = new sap.m.App();
    myapp.addPage(yearPage);
    myapp.addPage(monthPage);
    myapp.placeAt("content");
};