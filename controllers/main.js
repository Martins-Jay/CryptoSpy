import * as AuthController from './auth/authController.js';
import { loaderEl } from '../views/authView.js';
import * as MenuController from './menu/mobileController/mobileController.js';
import { initMenuButtons } from '../views/menuView.js';
import { loadSVGSprite } from './spriteSVGController/iconController.js';
import { themeManager } from '../models/ui/themeManager.js';
import { fontActionsObj } from '../views/menuDevices/fontsMobileView.js';
import { greetingControllerObj } from './home/greetingController.js';
import sessionController from './session/sessionController.js';
import { portfolioController } from './home/portfolioController.js';
import MarketModel from '../models/market/marketModel.js';
import { marketController } from './home/market/marketController.js';
import { viewMoreController } from './home/market/viewMoreController.js';
import { holdingsPanel } from './home/holdingsPanelController.js';
import { holdingsDataController } from './holdingsData/holdingsDataController.js';
import { onAuthStateChanged, auth } from '../firebase/firebaseInit.js';
import { bottomNav } from '../views/components/homeComponents/bottomNavView.js';
import { holdingsView } from '../views/components/homeComponents/bottomNav/holdingsView.js';

const marketModel = new MarketModel();

document.addEventListener('DOMContentLoaded', async () => {
  try {
    // const sampleCards = [
    //   {
    //     symbol: 'BTC',
    //     exchange: 'Binance',
    //     buyPrice: '$42,000',
    //     sellPrice: '$50,000',
    //     amountInvested: '$1,000',
    //     stopLoss: '$40,000',
    //     takeProfit: '$52,000',
    //   },
    //   {
    //     symbol: 'ETH',
    //     exchange: 'Coinbase',
    //     buyPrice: '$3,200',
    //     sellPrice: '$3,600',
    //     amountInvested: '$500',
    //     stopLoss: '$3,000',
    //     takeProfit: '$3,800',
    //   },
    // ];

    loaderEl.classList.remove('hidden');
    bottomNav.renderBottomNav();

    holdingsView.initScrollListener();

    sessionController.init();
    holdingsPanel.init();

    loadSVGSprite();
    themeManager.init();
    fontActionsObj.init();

    AuthController.initAuthToggle();
    AuthController.initTogglePasswordVisibility();
    AuthController.handleLoginValidation();
    AuthController.handleSignupValidation();

    greetingControllerObj.initGreetingUi();
    portfolioController.initPortfolioSummary();
    await marketController.init();
    await viewMoreController.init();

    holdingsDataController.initSubmitToFirebase();

    initMenuButtons();
    MenuController.initMenuController();
    MenuController.init();

    onAuthStateChanged(auth, async (user) => {
      if (user) {
        await holdingsDataController.loadHoldings(user.uid);
      }
    });
  } catch (err) {
    // console.error('App initialization failed:', err);
  } finally {
    loaderEl.classList.add('hidden');
  }
});
