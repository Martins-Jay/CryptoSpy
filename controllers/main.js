import * as AuthController from './auth/authController.js';
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

const marketModel = new MarketModel();

document.addEventListener('DOMContentLoaded', async () => {
  sessionController.init();

  // Load THE SPRITE AT ONCE
  loadSVGSprite();

  // Initialize theme immediately
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

  initMenuButtons();

  MenuController.initMenuController();
  MenuController.init();
});
