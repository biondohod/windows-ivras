class Tabs {
  constructor(tabsHeader, tabsSelector, tabsContent, activeClass) {
    this._header = document.querySelector(tabsHeader);
    this._tabsSelector = this._header.querySelectorAll(tabsSelector);
    this._tabsClass = tabsSelector.slice(1);
    this._tabsContent = document.querySelectorAll(tabsContent);
    this._activeClass = activeClass;
    this._header.addEventListener('click', (evt) => this.selectTab(evt.target));
  }

  hideTabsContent() {
    this._tabsContent.forEach(tab => tab.style.display = 'none');
  }

  showTabContent(index) {
    this.hideTabsContent();
    this.unactiveTabsSelectors();
    this._tabsContent[index].style.display = 'block';
    this._tabsSelector[index].classList.add(this._activeClass);
  }

  unactiveTabsSelectors() {
    this._tabsSelector.forEach(selector => selector.classList.remove(this._activeClass));
  }

  selectTab(target) {
    if (target && (target.classList.contains(this._tabsClass) || target.parentNode.classList.contains(this._tabsClass))) {
      this._tabsSelector.forEach((tab, i) => {
        if (tab === target || tab === target.parentNode) {
          this.showTabContent(i);
        }
      });
    }
  }
}

new Tabs('.glazing_slider', '.glazing_block', '.glazing_content', 'active').showTabContent(0);
new Tabs('.decoration_slider', '.no_click', '.decoration_content > div > div', 'after_click').showTabContent(0);
new Tabs('.balcon_icons', '.balcon_icons_img', '.big_img > img', 'do_image_more').showTabContent(0);
document.querySelectorAll('.big_img > img').forEach((item) => item.style.margin = '0 auto');
