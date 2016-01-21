function BillTable() {
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
        var searchMonth = oParameters.month;
        var searchYear = oParameters.year;
        var aSearchResult = [];
        if(searchMonth) {
            aSearchResult = this._aBillTable.filter(function(oElement, iIndex, aBillTable) {
                return oElement.month === searchMonth;
            });
        } else if (searchYear) {
            aSearchResult = this._aBillTable.filter(function(oElement, iIndex, aBillTable) {
                return oElement.year === searchYear;
            });
        }
        return aSearchResult;
    };

    return this;
};