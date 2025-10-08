import * as AuthController from './auth/authController.js';
import * as MenuController from './menu/mobileController/mobileController.js';
import { initMenuButtons } from '../views/menuView.js';
import { loadSVGSprite } from './spriteSVGController/iconController.js';
import { themeManager } from '../models/ui/themeManager.js';
import { fontActionsObj } from '../views/menuDevices/fontsMobileView.js';
import { greetingControllerObj } from './home/greetingController.js';
import sessionController from './session/sessionController.js';

document.addEventListener('DOMContentLoaded', () => {
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

  initMenuButtons();

  MenuController.initMenuController();
  MenuController.init();
});
