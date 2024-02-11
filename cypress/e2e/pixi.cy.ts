const path = require('path');

describe('template spec', () => {

  beforeEach(() => {
    cy.visit('http://localhost:5174');
  })

  it('Should initialize PIXI instance on app render', () => {
  
    cy.window().then(win => {
      cy.wait(1000).then(() => {
        expect(Boolean((win as any).pixiApp)).to.equal(true)
      }) 
    }) 
  })

  it('Should play video on press play', () => {
    cy.window().then(win => {
      cy.wait(1000).then(() => {
        const app = (win as any).pixiApp;
        cy.get('canvas').should('exist')
        cy.get('canvas').click(app.screen.x + 200, app.screen.y + 200, { force: true })
      }) 
    }) 
  })

  it('Should stop the video and text animation on pause', () => {
    cy.window().then(win => {
      cy.wait(1000).then(() => {
        const app = (win as any).pixiApp;
        cy.get('canvas').should('exist')
        cy.get('canvas').click(app.screen.x + 200, app.screen.y + 200, { force: true })
        cy.wait(2000).then(() => {
          cy.get('canvas').click(app.screen.x + 200, app.screen.y + 250, { force: true }).then(() => {
            expect(app.ticker.started).to.equal(false);
          })
        })
      }) 
    }) 
  })

  it('Should download screenshot', () => {
    cy.window().then(win => {
      cy.wait(1000).then(() => {
        
        const app = (win as any).pixiApp;
        cy.get('canvas').should('exist')
        cy.get('canvas').click(app.screen.x + 200, app.screen.y + 200, { force: true })
        cy.get('canvas').click(app.screen.x + 200, app.screen.y + 300, { force: true })
        cy.wait(2000).then(() => {
          const downloadsFolder = Cypress.config('downloadsFolder')

          const downloadedFilename = path.join(downloadsFolder, 'screenshot.png')
        
          cy.get('canvas').click(app.screen.x + 200, app.screen.y + 350, { force: true }).then(() => {
            cy.readFile(downloadedFilename, 'binary', { timeout: 15000 })
            .should((buffer) => {
              expect(Boolean(buffer)).to.eq(true);
            })
          })
        })
      }) 
    }) 
  })



})