export default {
  isWeixin () {
    return /micromessenger/.test(navigator.userAgent.toLowerCase())
  },
  isIos () {
    return /(iPod|iPhone|iPad)/.test(navigator.userAgent)
  },
  isAndroid () {
    return /(Android|Adr)/.test(navigator.userAgent)
  }
}
