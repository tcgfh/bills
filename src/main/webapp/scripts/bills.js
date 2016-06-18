function main() {
  console.log("hello world");
  console.log("I am groot");

  initUI();

};

function initUI() {


    var oBillsList = new billsList({
        name: "groceries",
    });
    oBillsList.addEntry(50);
    oBillsList.placeAt($("#content").get(0));

    var valueInputForm = $("#valueInput");
    valueInputForm.submit(function(event) {
        var dDollarValue = parseFloat(event.target.elements["dollarValue"].value);
        if(!isNaN(dDollarValue)) {
            event.target.elements["dollarValue"].value = "";
            oBillsList.addEntry(dDollarValue);
            oBillsList.render();
        }
        event.preventDefault();
    });


};

function BillEntry(sCategory, dValue) {
    this.sCategory = sCategory || "";
    this.dValue = dValue || 0;
    return this;
};

function Bills() {
    this._aBillEntries = [];

    this.addEntry = function addEntry(sCategory, dValue) {
        var oBillEntry = new BillEntry(sCategory, dValue);
        this._aBillEntries = oBillEntry;
    };

    this.sumEntries = function sumEntries(sCategory) {
        var aFilteredEntries = this._aBillEntries(function(oCurrElement) {
            return sCurrElement.sCategory === sCategory;
        });

        var dSigmaSum = aFilteredEntries.reduce(function(dPreviousValue, oCurrentElement) {
            return dPreviousValue + oCurrentElement.dValue;
        }, 0);

        return dSigmaSum;
    };

    this.sumAllEntries = function sumAllEntries() {
        var dSigmaSum = this._aBillEntries.reduce(function(dPreviousValue, oCurrentElement) {
            return dPreviousValue + oCurrentElement.dValue;
        }, 0);

        return dSigmaSum;
    };
};

function billsList(oOptions) {

    this._oCategory = {
        name: ""
    };

    this._aBillEntries = [];



    if(oOptions) {
        this._oCategory.name = oOptions.name || "";
    }

    this.$ = function () {
        return $(this._oDomRef);
    };
    this.getDomRef = function() {
        return this._oDomRef;
    };
    this.placeAt = function(targetParent) {
        this._oParentNode = targetParent;
        //targetParent.appendChild(this._oDomRef);
        this.render();
    };

    this.render = function() {
        var $billsRoot = $("<div>");
        var $header = $("<div>");
        var $billEntries = $("<ul>");
        $header.addClass("categoryHeader");
        $header.text(this._oCategory.name);

        for(var i=0; i < this._aBillEntries.length; i++) {
            var currEntry = this._aBillEntries[i];
            var $billEntry = $("<li>");
            $billEntry.text(currEntry);
            $billEntry.appendTo($billEntries);
        }
        $header.appendTo($billsRoot);
        $billEntries.appendTo($billsRoot);

        // cleanup
        this.$().remove();
        this._oDomRef = $billsRoot.get(0);
        this.$().appendTo(this._oParentNode);

    };

    this.addEntry = function(dDollarValue) {
        this._aBillEntries.push(dDollarValue);
    };
};
