/* ===============================================
  listens to the view, 
  receives the formData, 
  validates it, 
  tells the model to save it, gives UI feedback
  This file is separate from addHoldings.js 
=============================================== */
import { holdingModel } from '../../models/holdings/holdingsModel.js';
import { holdingsPanelView } from '../../views/components/homeComponents/addHoldingsView.js';
import { holdingsView } from '../../views/components/homeComponents/bottomNav/holdingsView.js';
import { auth } from '../../firebase/firebaseInit.js';

class HoldingsDataController {
  constructor() {}

  async handleFormSubmit(formData) {
    try {
      const user = auth.currentUser;

      // ---- 1. Validate coin ----
      if (!formData.coinSymbol || formData.coinSymbol.length < 2) {
        alert('Please enter a valid coin symbol like BTC or ETH.');
        return;
      }

      // ---- 2. Save to Firestore ----
      await holdingModel.addHolding(user.uid, formData);

      // ---- 3. Feedback ----
      alert('Holding added successfully!');
    } catch (error) {
      console.error('Error saving holding: ', error);
      alert(error.message);
    }
  }

  async loadHoldings(userUid) {
    const holdings = await holdingModel.fetchHoldings(userUid);

    // send data to the view
    holdingsView.loadCards(holdings)
    
    console.log('Holdings from Firestore:', holdings);
  }

  initSubmitToFirebase() {
    // Listen for form submission
    holdingsPanelView.onSubmit((formData) => this.handleFormSubmit(formData));
  }
}

export const holdingsDataController = new HoldingsDataController();
