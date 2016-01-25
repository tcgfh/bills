function BillTable() {
    var STORAGEKEY = "billTable";

    this._aBillTable = [];
    function oTableEntry() {

        this.description;
        this.amount;
        this.month;
        this.year;

        return this;
    };
    this.addEntry = function(oEntryValues){
        var sMonth = oEntryValues.month;
        var iYear = oEntryValues.year;
        var sDescription = oEntryValues.description;
        var dAmount = oEntryValues.amount;

        var oEntry = new oTableEntry();

        oEntry.description = sDescription;
        oEntry.amount = dAmount;
        oEntry.month = sMonth;
        oEntry.year = iYear;

        this._aBillTable.push(oEntry);
        return;
    };

    this.getEntries = function(oParameters) {
        var iSearchMonth = oParameters.month;
        var iSearchYear = oParameters.year;
        var aSearchResult = [];
        if(iSearchMonth !== undefined && iSearchYear != undefined) {
            aSearchResult = this._aBillTable.filter(function(oElement, iIndex, aBillTable) {
                var bMatchMonth = !!(oElement.month === iSearchMonth);
                var bMatchYear = !!(oElement.year === iSearchYear);
                return bMatchMonth && bMatchYear
            });
        } else if(iSearchMonth) {
            aSearchResult = this._aBillTable.filter(function(oElement, iIndex, aBillTable) {
                return oElement.month === iSearchMonth;
            });
        } else if (iSearchYear) {
            aSearchResult = this._aBillTable.filter(function(oElement, iIndex, aBillTable) {
                return oElement.year === iSearchYear;
            });
        }
        return aSearchResult;
    };

    this.saveToLocal = function() {
        localStorage.setItem(STORAGEKEY, this._aBillTable);
        return;
    };

    this.loadFromLocal = function() {
        var oSavedData = localStorage.getItem(STORAGEKEY);

        if(oSavedData != null) {
            this._aBillTable = oSavedData;
        }
        return;
    };

    return this;
};