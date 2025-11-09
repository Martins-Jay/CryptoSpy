class HoldingsPanelView {
  toggleVisibility() {
    const addHoldingsBtn = document.getElementById('add-holdings-panel')

    addHoldingsBtn.classList.toggle('translate-x-full')
  }
}

export const holdingsPanelView = new HoldingsPanelView()
