describe("auth", () => {
  it("should login", () => {
    const validUsername = [
      "standard_user",
      // "locked_out_user",
      "problem_user",
      "performance_glitch_user",
    ];

    const randomValidUserName = () =>
      validUsername[Math.floor(Math.random() * validUsername.length)];
    const validPassword = () => "secret_sauce";

    cy.visit("").then(() => {
      cy.get('[data-test="username"]').focus().type(randomValidUserName());
      cy.get('[data-test="password"]').focus().type(validPassword());
      cy.get('[data-test="login-button"]').click();
      cy.wait(2000);
      cy.url().then((url) => {
        expect(url.endsWith("inventory.html")).equal(true);
      });
    });
  });

  it("need username", () => {
    cy.visit("").then(() => {
      cy.get('[data-test="login-button"]').click();
      cy.get('*[class^="error-message-container"]').contains(
        "Epic sadface: Username is required"
      );
    });
  });

  it("need password", () => {
    cy.visit("").then(() => {
      cy.get('[data-test="username"]').focus().type(" ");
      cy.get('[data-test="login-button"]').click();
      cy.get('*[class^="error-message-container"]').contains(
        "Epic sadface: Password is required"
      );
    });
  });

  it("wrong credential", () => {
    cy.visit("").then(() => {
      cy.get('[data-test="username"]').focus().type(" ");
      cy.get('[data-test="password"]').focus().type(" ");
      cy.get('[data-test="login-button"]').click();
      cy.get('*[class^="error-message-container"]').contains(
        "Epic sadface: Username and password do not match any user in this service"
      );
    });
  });
});
