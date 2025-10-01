import * as AuthController from './authController.js';
import * as MenuController from './menu/menuController.js';
import { initMenuButtons } from '../views/menuView.js';
import { loadSVGSprite } from './iconController.js';
import { themeManager } from '../models/themeManager.js';
import { fontActionsObj } from '../views/menuDevices/fontsMobileView.js';

document.addEventListener('DOMContentLoaded', () => {
  // Load THE SPRITE AT ONCE
  loadSVGSprite();

  // Initialize theme immediately
  themeManager.init();

  fontActionsObj.init();

  AuthController.initAuthToggle();
  AuthController.initTogglePasswordVisibility();
  AuthController.handleLoginValidation();
  AuthController.handleSignupValidation();

  initMenuButtons();

  MenuController.initMenuController();
  MenuController.init();
});
