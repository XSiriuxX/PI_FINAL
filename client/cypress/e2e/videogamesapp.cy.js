describe("Videogames APP - testing", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
  });

  it("Render without crashing", () => {
    cy.get("a[href='/login']").each((page) => {
      cy.request(page.prop("href"));
    });
  });
});

describe("Home Component Tests", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/home");
  });

  it("should reset filters when 'CLEAR FILTERS' button is clicked", () => {
    cy.get(".reset-button").click();
    cy.get(".sort-select").should("have.value", "");
    cy.get(".origin-select").should("have.value", "");
    cy.get(".genre-menu-button").click();
    cy.get(".genre-menu input[type='checkbox']").should("not.be.checked");
  });

  it("should change sorting option when 'SORT BY' select is changed", () => {
    cy.get(".sort-select").select("3");
    cy.get(".sort-select").should("have.value", "3");
  });

  it("should change origin option when 'ORIGIN' select is changed", () => {
    cy.get(".origin-select").select("1");
    cy.get(".origin-select").should("have.value", "1");
  });

  it("should toggle genre options when 'SELECT GENRES' button is clicked", () => {
    cy.get(".genre-menu-button").click();
    cy.get(".genre-menu input[type='checkbox']").first().check();
    cy.get(".genre-menu input[type='checkbox']").first().should("be.checked");
  });

  it("should paginate to next page when 'Siguiente' button is clicked", () => {
    cy.get(".cards-container .buttons-container button:last-child").click();
    cy.get(".cards-container .cards .card").should("exist");
  });
});

describe("Detail Component Tests", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/detail/1");
    cy.intercept("GET", "http://localhost:3001/videogames/1").as(
      "getVideogameDetail"
    );
    cy.wait("@getVideogameDetail");
  });

  it("should display the game details correctly", () => {
    cy.get(".detail-container").should("exist");
    cy.get(".detail-left h1").should("contain", "D/Generation HD");
    cy.get(".platform-icons").should("contain", "Platforms:");
    cy.get(".star-rating").should("contain", "Rating:");
    cy.get(".detail-right div").should("contain", "Genres:");
  });

  it("should go back to previous page when 'BACK' button is clicked", () => {
    cy.get(".detail-button").click();
    cy.url().should("not.include", "/detail/1");
  });
});
