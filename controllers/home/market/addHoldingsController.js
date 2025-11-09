import { renderTemplate } from '../../../helpers/templateHelper.js';
import { subscribe } from '../../../helpers/pubsub.js';
import { homePublisher } from '../../publisher/homePublisher.js';
import { holdingsPanelView } from '../../../views/components/homeComponents/addHoldingsView.js';

class AddHoldings {
  constructor() {
    // Helper: safe getElementById. call by running $(id)
    this.$ = (id) => document.getElementById(id);
  }

  injectTemplatetoPanel() {
    const targetContainer = document.getElementById('add-holdings-panel');
    const templateEl = this.$('add-holdings-template');

    if (!targetContainer) return;

    // If panel content hasnt been injected yet, inject it once
    if (!targetContainer.hasChildNodes()) {
      if (templateEl) renderTemplate(targetContainer, templateEl);
    }
  }

  _handleAction({ action }) {
    if (action === 'show-add-holdings') {
      console.log('im here');
      holdingsPanelView.toggleVisibility()
    }
    if (action === 'close-holdings-panel') {
      holdingsPanelView.toggleVisibility()
    }
  }

  init() {
    homePublisher.addHandlerClick();
    subscribe('home:btn-clicked', this._handleAction.bind(this));
  }
}

export const addHoldings = new AddHoldings();
