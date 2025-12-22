class Holdings {
  constructor() {
    this.cardsContainer = document.getElementById('cards-track');
    this.scrollbarIndicator = document.getElementById('scrollbar-indicator');
  }

  generateCardDisplayItems(cardData) {
    const cardInfoFields = [
      { label: 'Buy Price (USDT)', value: cardData.buyPrice, colorClass: '' },
      { label: 'Sell Price (USDT)', value: cardData.sellPrice, colorClass: '' },
      {
        label: 'Amount Invested',
        value: cardData.amountInvested,
        colorClass: '',
      },
      {
        label: 'Stop Loss (USDT)',
        value: cardData.stopLoss,
        colorClass: 'text-red-500',
      },
      {
        label: 'Take Profit (USDT)',
        value: cardData.takeProfit,
        colorClass: 'text-green-500',
      },
    ];

    const cardDisplayItems = cardInfoFields
      .map(
        (infoObj) => `
        <div>
          <p class="text-gray-400 dark:text-gray-400 text-xs font-bold">
            ${infoObj.label}
          </p>
          <p class="text-xs">$${infoObj.value}</p>
        </div>
      `
      )
      .join('');

    return cardDisplayItems;
  }

  // Create a single card
  createCard(cardData) {
    // Container for single card
    const cardWrapperEl = document.createElement('div');
    cardWrapperEl.className = 'flex flex-row snap-start';

    cardWrapperEl.innerHTML = `
      <div class="flex flex-col py-4 px-6 w-[80vw] light:text-gray-900 dark:text-gray-100 text-white bg-menuCard-glass light:bg-menuCard-menuLightBg backdrop-blur-2xl rounded-3xl border border-appBg-white/10 dark:border-x-border-subtle shadow-xl space-y-4 hover:scale-[1.02] transition-all duration-300">

        <!-- Top Header -->
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-3">
            <div class="flex items-center justify-center w-10 h-10 rounded-full bg-brand/60 light:text-white font-black text-sm">
              ${cardData.coinSymbol}
            </div>
            <div>
              <h3 class="text-md font-bold text-gray-400 dark:text-gray-400">Exchange</h3>
              <p class="text-xs light:text-gray-900 dark:text-gray-100 text-white">${
                cardData.exchangeName
              }</p>
            </div>
          </div>
        </div>

        <!-- Divider -->
        <div class="w-full h-px bg-gradient-to-r from-transparent via-brand/60 to-transparent"></div>

        <!-- Info Grid -->
        <div class="grid grid-cols-2 gap-y-3 text-sm">
          ${this.generateCardDisplayItems(cardData)}
        </div>

        <!-- Footer Buttons -->
        <div class="flex justify-end">
          <button class="px-4 py-2 rounded-full text-xs font-medium bg-red-500/80 dark:text-appBg-white text-white hover:bg-red-500/30 transition">
            Delete
          </button>
        </div>
    `;

    return cardWrapperEl;
  }

  /** Add a single card */
  addCard(cardData) {
    const cardElement = this.createCard(cardData);
    this.cardsContainer.appendChild(cardElement);
  }

  /** Load multiple cards */
  loadCards(cardsArray) {
    cardsArray.forEach((cardData) => this.addCard(cardData));
  }

  initScrollListener() {
    if (!this.scrollbarIndicator) return;

    this.cardsContainer.addEventListener('scroll', () => {
      this.updateScrollbar();
    });

    // Initial sync (important when cards are first added)
    this.updateScrollbar();
  }

  updateScrollbar() {
    // Stop if scrollbar indicator does not exist
    if (!this.scrollbarIndicator) return;

    const container = this.cardsContainer;

    // Total width of all cards inside the container
    const totalContentWidth = container.scrollWidth;

    // Width of the visible area (what the user sees)
    const visibleWidth = container.clientWidth;

    // Maximum distance the container can scroll horizontally
    const maxScrollLeft = totalContentWidth - visibleWidth;

    // Current horizontal scroll position
    const currentScrollLeft = container.scrollLeft;

    // --------------------------------
    // 1. Calculate indicator WIDTH
    // --------------------------------
    // Divide visible width by total width to know
    // what fraction of the content is currently visible
    let visibleRatio = visibleWidth / totalContentWidth;

    // If everything fits (no overflow), cap it at 1 (100%)
    if (visibleRatio > 1) {
      visibleRatio = 1;
    }

    // Convert to percentage
    const indicatorWidthPercent = visibleRatio * 100;

    // --------------------------------
    // 2. Calculate indicator POSITION
    // --------------------------------
    let scrollRatio;

    // Avoid dividing by zero
    if (maxScrollLeft > 0) {
      scrollRatio = currentScrollLeft / maxScrollLeft;
    } else {
      scrollRatio = 0;
    }

    // The indicator should not move beyond the track
    const maxTranslateX = 100 - indicatorWidthPercent;

    // Calculate how far the indicator should move
    const translateXPercent = scrollRatio * maxTranslateX;

    // --------------------------------
    // Apply styles
    // --------------------------------
    this.scrollbarIndicator.style.width = `${indicatorWidthPercent}%`;
    this.scrollbarIndicator.style.transform = `translateX(${translateXPercent}%)`;
  }
}

export const holdingsView = new Holdings();
