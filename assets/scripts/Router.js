// router.js

/** Some hints for this router:
  *   - it shouldn't be a terribly long file, each function is pretty short.
  *   - the functions being passed in should mostly be stored so that
  *     you can call them later when you want to navigate to a page
  *   - you should be pushing to history (only when the 'popstate' event
  *     hasn't fired) so that you can use forward / backward buttons
  *   - You should be using hashes to update the URL (e.g. 
  *     https://somewebsite.com#somePage) - the hash is the #somePage part.
  *     It's accessible via window.location.hash and using them lets you
  *     easily modify the URL without refreshing the page or anything
  */

export class Router {
  /**
   * Sets up the home function, the page name should always be 'home', which
   * is why no page name variable is passed in.
   * @param {Function} homeFunc The function to run to set the home route
   *                            visually
   */
  constructor(homeFunc) {
    this.pages = {'home': {hash: '', func: homeFunc}};
  }

  /**
   * Adds a page name & function so to the router so that the function
   * can be called later when the page is passed in
   * @param {String} page The name of the page to route to (this is used
   *                      as the page's hash as well in the URL)
   * @param {Function} pageFunc The function to run when the page is called
   */
  addPage(page, pageFunc) {
    this.pages[page] = {hash: `#${page}`, func: pageFunc};
  }

  /**
   * Changes the page visually to the page that has been passed in. statePopped
   * is used to avoid pushing a new history state on back/forward button presses
   * @param {String} page The name of the page to route to
   * @param {Boolean} statePopped True if this function is being called from a
   *                              'popstate' event instead of a normal card click
   */
  navigate(page, statePopped) {
    const url = `${window.location.origin}/${this.pages[page].hash}`;
    if (statePopped) {
      history.replaceState(page, '', url);
    } else {
      history.pushState(page, '', url);
    }
    this.pages[page].func();
  }
}