/*global browser*/ /*global element*/ /*global expect*/ /*global by*/
describe('Data is loaded', function() {
    it('should show some employments', function() {
        browser.
        get('https://sos1718-02.herokuapp.com/#!/employments').
        then(function() {
            element.all(by.repeater('employment in employments')).then(function(employments) {
                expect(employments.length).toEqual(10);
            });
        });
    });
    it('should add a new employment', function() {
        browser.
        get('https://sos1718-02.herokuapp.com/#!/employments');
        element.all(by.repeater('employment in employments')).then(function(employments) {

            element(by.model('newEmployment.country')).sendKeys('spain');
            element(by.model('newEmployment.year')).sendKeys(20);
            element(by.model('newEmployment.totalself')).sendKeys(123);
            element(by.model('newEmployment.totalsalaried')).sendKeys(123);
            element(by.model('newEmployment.totalcontributingfamilyworker')).sendKeys(123);

            element(by.buttonText('Add')).click();
        });
    });
    it('should show some expenditures', function() {
        browser.
        get('https://sos1718-02.herokuapp.com/#!/expenditures').
        then(function() {
            element.all(by.repeater('expenditures in expenditures')).then(function(expenditures) {
                expect(expenditures.length).toBeGreaterThan(1);
            });
        });
    });
    it('should add a new expenditure', function() {
        browser.
        get('https://sos1718-02.herokuapp.com/#!/expenditures');
        element.all(by.repeater('expenditures in expenditures')).then(function(expenditures) {

            element(by.model('newExpenditure.country')).sendKeys('spain');
            element(by.model('newExpenditure.year')).sendKeys(20);
            element(by.model('newExpenditure.primary')).sendKeys(123);
            element(by.model('newExpenditure.secundary')).sendKeys(123);
            element(by.model('newExpenditure.tertiery')).sendKeys(123);

            element(by.buttonText('Add')).click();

        });
    });
    it('should show some unemployments', function() {
        browser.
        get('https://sos1718-02.herokuapp.com/#!/unemployments').
        then(function() {
            element.all(by.repeater('unemployments in unemployments')).then(function(unemployments) {
                expect(unemployments.length).toBeGreaterThan(5);
            });
        });
    });
    it('should add a new unemployment', function() {
        browser.
        get('https://sos1718-02.herokuapp.com/#!/unemployments');
        element.all(by.repeater('unemployments in unemployments')).then(function(unemployments) {

            element(by.model('newUnemployment.country')).sendKeys('spain');
            element(by.model('newUnemployment.year')).sendKeys(20);
            element(by.model('newUnemployment.young')).sendKeys(123);
            element(by.model('newUnemployment.adult')).sendKeys(123);
            element(by.model('newUnemployment.old')).sendKeys(123);
            element(by.model('newUnemployment.longterm')).sendKeys(123);

            element(by.buttonText('Add')).click();
        });
    });
});
