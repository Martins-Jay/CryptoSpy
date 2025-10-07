import { observeUser } from '../../models/auth/authModel.js';
import { greetingControllerObj } from '../home/greetingController.js';
import { viewManager } from '../viewManager/viewManager.js';

const loaderEl = document.getElementById('loader');

// On refresh, ensure the correct sections are still displayed 
const sessionController = {
  init() {
    // Show loader while Firebase checks session
    loaderEl.classList.remove('hidden');

    observeUser((user) => {
      loaderEl.classList.add('hidden');

      if (user) {
        // User logged in — update greeting and show dashboard
        const userName = user.displayName || localStorage.getItem('username');
        greetingControllerObj.initGreetingUi(userName);

        viewManager.hideAndShowRest(
          'auth-section',
          'dashboard-section',
          'dashboard-header'
        );
      } else {
        // User logged out — show auth screen, hide others
        viewManager.showndHideRest(
          'auth-section',
          'dashboard-section',
          'dashboard-header'
        );
      }
    });
  },
};

export default sessionController;
