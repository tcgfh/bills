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

            it("returns entries by month", function() {


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
            it("returns entries by year", function() {
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

            describe("returns entries by month and year", function() {

                it("returns all matches by month and year", function() {
                    var aResult = oBillTable.getEntries({
                        year: 2016,
                        month: 3
                    });

                    expect(aResult.length).toEqual(5);
                    for(var i = 0; i < aResult.length; i++) {
                        expect(aResult[i].year).toEqual(2016);
                        expect(aResult[i].month).toEqual(3);
                    }
                });

                it("returns no results when match only year", function() {
                    var aResult = oBillTable.getEntries({
                        year: 2015,
                        month: 3
                    });

                    expect(aResult.length).toEqual(0);

                });

                it("returns no results when match only month", function() {
                    var aResult = oBillTable.getEntries({
                        year: 2017,
                        month: 0
                    });

                    expect(aResult.length).toEqual(0);
                });


            });
        });
    });
});