import Vue from 'vue'
import AV from 'leancloud-storage'

var leancloud = {
  install(Vue) {
    const appId = "oVEXsxvtC1pvHCMzptDdzjd3-MdYXbMMI";
    const appKey = "zoEQ1bgOXovkaDIpRqX3weYX";
    // 数据存储初始化
    AV.init({
      appId,
      appKey,
    });
    Vue.prototype.$AV = AV
  }
}
Vue.use(leancloud)