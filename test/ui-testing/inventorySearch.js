/* global Nightmare describe it before after */
module.exports.test = function test(uiTestCtx) {
  describe('Module test: inventory:inventorySearch', function startTest() {
    const { config, helpers: { login, openApp, logout }, meta: { testVersion } } = uiTestCtx;
    const nightmare = new Nightmare(config.nightmare);

    this.timeout(Number(config.test_timeout));

    describe('Login > Click Inventory > Enter Search Term > Wait for Results > Confirm search term at top of results > Click Reset All > Wait for results pan to change state > Logout\n', () => {
      const title = 'California';
      const authorName = 'Huntley, Henry Veel';
      let hitCount = 0;
      before((done) => {
        login(nightmare, config, done); // logs in with the default admin credentials
      });
      after((done) => {
        logout(nightmare, config, done);
      });
      it('should open module "Inventory" and find version tag ', (done) => {
        nightmare
          .use(openApp(nightmare, config, done, 'inventory', testVersion))
          .then(result => result);
      });
      it('should find hit count with no filters applied', (done) => {
        nightmare
          .wait('#list-inventory')
          .evaluate(() => {
            return document.querySelector('#list-inventory').getAttribute('data-total-count');
          })
          .then((result) => {
            done();
            hitCount = result;
          })
          .catch(done);
      });
      it(`should search for: "${title}"`, (done) => {
        nightmare
          .wait('#clickable-inventory-module')
          .click('#clickable-inventory-module')
          .wait('#input-inventory-search')
          .click('#input-inventory-search')
          .insert('#input-inventory-search', title)
          .wait('#clickable-reset-all')
          .wait('button[type=submit]')
          .click('button[type=submit]')
          .wait(`#list-inventory:not([data-total-count^="${hitCount}"])`)
          .wait(`a[aria-label*="Title: ${title}"]`)
          /* .evaluate(function evall(title2) {
            const list = document.querySelector('#list-inventory div[role="listitem"]:first-of-type > a > div[role="gridcell"]:nth-of-type(1)').title;
            console.log(`list contains: ${list} and title is ${title2} `);

            if (list !== title2) {
              throw new Error('First item not matched');
            }
          }, title) */
          .then(done)
          .catch(done);
      });
      it('should click "reset all" button', (done) => {
        nightmare
          .wait('#clickable-reset-all')
          .click('#clickable-reset-all')
          .wait(`#list-inventory[data-total-count^="${hitCount}"]`)
          .then(done)
          .catch(done);
      });
      it(`should search for title: ${title}`, (done) => {
        nightmare
          .wait('#input-inventory-search-qindex')
          .select('#input-inventory-search-qindex', 'title')
          .wait('#input-inventory-search')
          .insert('#input-inventory-search', title)
          .wait('#clickable-reset-all')
          .wait('button[type=submit]')
          .click('button[type=submit]')
          .wait(`#list-inventory:not([data-total-count^="${hitCount}"])`)
          .wait(`a[aria-label*="Title: ${title}"]`)
          /* .evaluate(function evall(title2) {
            const list = document.querySelector('#list-inventory div[role="listitem"]:first-of-type > a > div[role="gridcell"]:nth-of-type(1)').title;
            // console.log(`list contains: ${list} and title is ${title2} `);
            if (list !== title2) {
              throw new Error('First item not matched');
            }
          }, title) */
          .then(done)
          .catch(done);
      });
      it('should click "reset all" button', (done) => {
        nightmare
          .wait('#clickable-reset-all')
          .click('#clickable-reset-all')
          .wait(`#list-inventory[data-total-count^="${hitCount}"]`)
          .then(done)
          .catch(done);
      });
      it(`should search for contributor: ${authorName}`, (done) => {
        nightmare
          .select('#input-inventory-search-qindex', 'contributor')
          .insert('#input-inventory-search', authorName)
          .wait('#clickable-reset-all')
          .wait('button[type=submit]')
          .click('button[type=submit]')
          .wait(`#list-inventory:not([data-total-count^="${hitCount}"])`)
          .wait(`a[aria-label*="${authorName}"]`)
          .then(done)
          .catch(done);
      });
    });
  });
};
