import foundHtmlUrl from 'url:./popup/found.html'
import iconActive16Url from 'url:./assets/icon-active/icon-active-16.png'
import iconActive32Url from 'url:./assets/icon-active/icon-active-32.png'
import iconActive48Url from 'url:./assets/icon-active/icon-active-48.png'
import iconActive64Url from 'url:./assets/icon-active/icon-active-64.png'
import iconActive128Url from 'url:./assets/icon-active/icon-active-128.png'

import notFoundHtmlUrl from 'url:./popup/not-found.html'
import iconInactive16Url from 'url:./assets/icon-inactive/icon-inactive-16.png'
import iconInactive32Url from 'url:./assets/icon-inactive/icon-inactive-32.png'
import iconInactive48Url from 'url:./assets/icon-inactive/icon-inactive-48.png'
import iconInactive64Url from 'url:./assets/icon-inactive/icon-inactive-64.png'
import iconInactive128Url from 'url:./assets/icon-inactive/icon-inactive-128.png'

const activeIcons = {
  16: iconActive16Url,
  32: iconActive32Url,
  48: iconActive48Url,
  64: iconActive64Url,
  128: iconActive128Url,
}

const inactiveIcons = {
  16: iconInactive16Url,
  32: iconInactive32Url,
  48: iconInactive48Url,
  64: iconInactive64Url,
  128: iconInactive128Url,
}

const checkCapacitor = async (tabId: number) => {
  try {
    const [{ result: isCapacitor }] = await chrome.scripting.executeScript({
      target: {
        tabId,
      },
      world: 'MAIN',
      func: () => !!(window as Window & typeof globalThis & { Capacitor: any }).Capacitor,
    })

    await chrome.action.setPopup({
      tabId,
      popup: isCapacitor ? foundHtmlUrl : notFoundHtmlUrl,
    })
  
    chrome.action.setIcon({
      tabId,
      path: isCapacitor ? activeIcons : inactiveIcons,
    })
  } catch (e) {
    console.log(e)
  }
}

chrome.tabs.onActivated.addListener(async ({ tabId }) => {
  checkCapacitor(tabId)
})

chrome.tabs.onUpdated.addListener(async (tabId, _changeInfo, _tab) => {
  checkCapacitor(tabId)
})

export {}