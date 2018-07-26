/**
 * localStorage存入数据
 * @param name
 * @param value
 */
export const setStore = (name, value) => {
  if (!name) return
  if (typeof value !== 'string') {
    value = JSON.stringify(value)
  }
  window.localStorage.setItem(name, value)
}

/**
 * localStorage存入数据
 * @param name
 * @returns {string | null}
 */
export const getStore = (name) => {
  if (!name) return
  return window.localStorage.getItem(name)
}

/**
 * localStorage移除数据
 * @param name
 */
export const removeStore = (name) => {
  if (!name) return
  window.localStorage.removeItem(name)
}

export const ip = '//' + document.location.hostname

export const rasPublic = `MIICdAIBADANBgkqhkiG9w0BAQEFAASCAl4wggJaAgEAAoGBAMFFU2p/iSbAmx5VxQFoVPY2rzHvn2OIJbflFqaIvwndiOuVzkLMRBzxg3WueWKWmBREHPPymZQHgx8B0O0xoF6VfLQd9a41++Nz5DTKJVNJIPokbF7UznGQgH7IvHUMvl0+rcqToOO7y9KULy/dp2IhAN1sgHCdwsfxs8ih6UdnAgMBAAECgYANDWuGw7o1fch8EfrOD4e9YRAP5Uj0Zdt2Qeh3ssCEIAwBLQrTBAyNj9n69p+IAveeVsNFzlqE3sUCMRM1Eabs3hVB7/P/WafZWrm0JZ1c6MkuK4yV9I0juwEYLx8fMSuwqCGvOnyVdR+8M2/o7cnmNAG7FlfBgZbcQaoiDv+4kQJBAPqrURowSJHsPDqww+46MzBM3CJPujjp4grWmq59i+j6f4aAHgGEDmcPY/UU6PUhluW7X5awvxVsclqS2TyB6hsCQQDFYYXhTVyFrwB+x3X9CAPcyRKDg6B+j/txfNKfUWbAWEspwap6hlY3Ky1PZIW9cRZt09SXS5h3xhcXvgtw3mylAkBRt8nfxL/TunTEGV42aojHhTb6hI1MAosrR1zz53/V+tvaCChADEH5vR20BxYO291qlVQLNyGEJW9+MYNaY2vjAkALQHv5VAeqN0e38nbvbb2KoIvFo4NKs7qJxavcGS/aVy4xuzCUu4O+sV9r3zcgjYnRyPmdhlmyukAmwla0oHlhAj96U73bpEiNpda5mZmzmv3mSDPCwAClGTtvjPE/1c0ujSXWyTE9/f33NczZVia8nfnLErTQLtp/W601dt1cJQA=`
