describe("Videogames APP - testing", () => {
  it("Render without crashing", () => {
    cy.visit("http://localhost:3000/");
    cy.get("a[href='/login']").each((page) => {
      cy.request(page.prop("href"));
    });
  });
});
