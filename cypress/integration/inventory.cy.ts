describe("inventory", () => {
  it("should NOT visit", () => {
    cy.visit("").then(() => {
      cy.get('[data-test="username"]').focus().type("standard_user");
      cy.get('[data-test="password"]').focus().type("secret_sauce");
      cy.get('[data-test="login-button"]').click();
      cy.wait(2000);

      let max = 0;

      cy.get('*[class^="btn btn_primary btn_small btn_inventory"]').each(
        (item, k) => {
          cy.wrap(item)
            .click()
            .then(() => {
              cy.get('*[class^="shopping_cart_badge"]').contains(k + 1);
              max = k;
            });
        }
      );

      cy.get('*[class^="btn btn_secondary btn_small btn_inventory"]').each(
        (item, k) => {
          cy.wrap(item)
            .click()
            .then(() => {
              if (k !== max) {
                cy.get('*[class^="shopping_cart_badge"]').contains(max - k);
              }
            });
        }
      );
    });
  });
});
