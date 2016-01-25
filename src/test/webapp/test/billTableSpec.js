describe("billTable spec", function() {
    describe("unit tests", function() {
        it("BillTable exists", function() {
            expect(typeof BillTable).toEqual("function");
        });

        describe("fn addEntry", function() {
            var oBillTable;

            beforeEach(function() {
                oBillTable = new BillTable();
            });

            it("exists", function() {
                var fnUnderTest = oBillTable.addEntry;
                expect(typeof fnUnderTest).toEqual("function");
            });
            it("adds an entry to the bill table", function() {
                var initialTableLength = oBillTable._aBillTable.length;
                oBillTable.addEntry({});
                expect(oBillTable._aBillTable.length).toEqual(initialTableLength + 1);
            });
            it("accepts description, month, year, dollar amount", function() {
                var expectedMonth = "january";
                var expectedYear = 2015;
                var expectedAmount = 25.19;
                var expectedDescription = "some stuff";

                oBillTable.addEntry({
                    month: expectedMonth,
                    year: expectedYear,
                    amount: expectedAmount,
                    description: expectedDescription
                });

                var aResult = oBillTable._aBillTable[0];
                expect(aResult.month).toEqual(expectedMonth);
                expect(aResult.year).toEqual(expectedYear);
                expect(aResult.amount).toEqual(expectedAmount);
                expect(aResult.description).toEqual(expectedDescription);

            });

        });

        describe("fn getEntries", function() {
            var oBillTable;

            beforeEach(function() {
                oBillTable = new BillTable();
                var aTestData = [];

                var currMonth = 4;
                var currYear = 2016;
                var currDesc = "valid";
                var nextMonth = 3;
                var nextYear = 2017;
                var nextDesc = "invalid";
                for( var i = 0; i < 10; i++) {

                    var oEntry = {
                        year: currYear,
                        month: currMonth,
                        description: currYear,
                        amount: i
                    };
                    aTestData.push(oEntry);

                    var prevMonth = currMonth;
                    var prevYear = currYear;
                    var prevDesc = currDesc;
                    currMonth = nextMonth;
                    currYear = nextYear;
                    currDesc = nextDesc;
                    nextMonth = prevMonth;
                    nextYear = prevYear;
                    nextDesc = prevDesc;
                }

                oBillTable._aBillTable = aTestData;
            });

            it("exists", function() {
                var fnUnderTest = oBillTable.getEntries;
                expect(fnUnderTest).toBeDefined();
            });

            it("returns entries filtered by month", function() {


                var aResult = oBillTable.getEntries({
                    month: 4
                });

                expect(aResult.length).toEqual(5);
                for(var i = 0; i < aResult.length; i++) {
                    expect(aResult[i].month).toEqual(4);
                }

                aResult = oBillTable.getEntries({
                    month: 3
                });

                expect(aResult.length).toEqual(5);
                for(var i = 0; i < aResult.length; i++) {
                    expect(aResult[i].month).toEqual(3);
                }
            });
            it("returns entries filtered by year", function() {
                var aResult = oBillTable.getEntries({
                    year: 2016
                });

                expect(aResult.length).toEqual(5);
                for(var i = 0; i < aResult.length; i++ ) {
                    expect(aResult[i].year).toEqual(2016);
                }

                aResult = oBillTable.getEntries({
                    year: 2017
                });

                expect(aResult.length).toEqual(5);
                for(var i = 0; i < aResult.length; i++ ) {
                    expect(aResult[i].year).toEqual(2017);
                }
            });

            describe("returns entries filtered by month and year", function() {

                it("when matches month and year", function() {
                    var expectedMonth = 4;
                    var expectedYear = 2016;
                    var aResult = oBillTable.getEntries({
                        year: expectedYear,
                        month: expectedMonth
                    });

                    expect(aResult.length).toEqual(5);
                    for(var i = 0; i < aResult.length; i++) {
                        expect(aResult[i].year).toEqual(expectedYear);
                        expect(aResult[i].month).toEqual(expectedMonth);
                    }
                });

                it("when matches only year", function() {
                    var aResult = oBillTable.getEntries({
                        year: 2015,
                        month: 3
                    });

                    expect(aResult.length).toEqual(0);

                    var aResult = oBillTable.getEntries({
                        year: 0,
                        month: 3
                    });

                    expect(aResult.length).toEqual(0);

                });

                it("when matches only month", function() {
                    var aResult = oBillTable.getEntries({
                        year: 2017,
                        month: 0
                    });

                    expect(aResult.length).toEqual(0);

                    var aResult = oBillTable.getEntries({
                        year: 2017,
                        month: 7
                    });

                    expect(aResult.length).toEqual(0);
                });


            });
        });
        describe("fn saveToLocal", function() {
            var oBillTable;
            beforeEach(function() {
                oBillTable = new BillTable();
            });

            it("exists", function() {
                expect(oBillTable.saveToLocal).toBeDefined();
            });

            it("saves data to the localStorage using the key billTable", function() {
                spyOn(localStorage, "setItem");
                var expectedKey = "billTable";
                var expectedData = [{
                    something: 1,
                    value: "someString"
                }];

                oBillTable._aBillTable = expectedData;
                oBillTable.saveToLocal();

                expect(localStorage.setItem).toHaveBeenCalledWith(expectedKey, expectedData);
            })
        });

        describe("fn loadFromLocal", function() {
            var oBillTable;

            beforeEach(function() {
                oBillTable = new BillTable();
            });

            it("exists", function() {
                expect(oBillTable.loadFromLocal).toBeDefined();
            });

            it("loads data from local storage key billTable", function() {
                var expectedData = [{
                    something: 1,
                    value: "someString"
                }];
                var expectedKey = "billTable";
                spyOn(localStorage, "getItem").and.returnValue(expectedData);
                oBillTable._aBillTable = [];

                oBillTable.loadFromLocal();

                expect(localStorage.getItem).toHaveBeenCalledWith(expectedKey);
                expect(oBillTable._aBillTable).toEqual(expectedData);

            });

            it("does nothing if local storage has no billTable key", function() {
                var expectedData = [{
                    something: 1,
                    value: "someString"
                }];
                var expectedKey = "billTable";
                spyOn(localStorage, "getItem").and.returnValue(null);
                oBillTable._aBillTable = expectedData;

                oBillTable.loadFromLocal();

                expect(localStorage.getItem).toHaveBeenCalledWith(expectedKey);
                expect(oBillTable._aBillTable).toEqual(expectedData);

            });
        });
    });
});