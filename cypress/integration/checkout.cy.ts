describe("checkout", () => {
  it("total price", () => {
    cy.visit("").then(() => {
      cy.get('[data-test="username"]').focus().type("standard_user");
      cy.get('[data-test="password"]').focus().type("secret_sauce");
      cy.get('[data-test="login-button"]').click();
      cy.wait(2000);

      cy.get('*[class^="btn btn_primary btn_small btn_inventory"]').click({
        multiple: true,
      });

      cy.get('*[class^="shopping_cart_badge"]').click();

      cy.get('*[class^="btn btn_action btn_medium checkout_button"]').click();

      cy.get('[data-test="firstName"]').focus().type("firstName");
      cy.get('[data-test="lastName"]').focus().type("lastName");
      cy.get('[data-test="postalCode"]').focus().type("postalCode");

      cy.get('[data-test="continue"]').click();

      let total = 0;
      cy.get('*[class^="inventory_item_price"]')
        .each((item) => {
          const priceItem = item.text().substring(1);
          total += Number.parseFloat(priceItem);
        })
        .then(() => {
          cy.get("[class=summary_subtotal_label]").contains(total);
        });
    });
  });

  it("finish", () => {
    cy.visit("").then(() => {
      cy.get('[data-test="username"]').focus().type("standard_user");
      cy.get('[data-test="password"]').focus().type("secret_sauce");
      cy.get('[data-test="login-button"]').click();
      cy.wait(2000);

      cy.get('*[class^="btn btn_primary btn_small btn_inventory"]').click({
        multiple: true,
      });

      cy.get('*[class^="shopping_cart_badge"]').click();

      cy.get('*[class^="btn btn_action btn_medium checkout_button"]').click();

      cy.get('[data-test="firstName"]').focus().type("firstName");
      cy.get('[data-test="lastName"]').focus().type("lastName");
      cy.get('[data-test="postalCode"]').focus().type("postalCode");

      cy.get('[data-test="continue"]').click();

      cy.get('[data-test="finish"]').click();
      cy.wait(2000);

      cy.url().then((url) => {
        expect(url.endsWith("checkout-complete.html")).equal(true);
      });
    });
  });
});
