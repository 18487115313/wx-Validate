const app = getApp()
import WxValidate from '../lib/WxValidate.js'
Page({
  data: {

  },
  onLoad: function () {
    this.initValidate()
  },
  showModal(error) {
    wx.showModal({
      content: error.msg,
      showCancel: false,
    })
  },
  formSubmit(e)
  {
    var that = this
    const params = e.detail.value
    if (!this.WxValidate.checkForm(params)) {
      const error = this.WxValidate.errorList[0]
      this.showModal(error)
      return false
    }
  },
  initValidate() {//在js 写个方法，放进onLoad，当做初始化
    const rules = {
      CityID: { required: true, },//true OR false 控制是否验证，也可直接不写name
      Name: { required: true },
      Year: { required: true, dateISO: true},
      FrName: { required: true },
      FrTel: { required: true, tel: true },//第二个参数属于特殊字符验证
    }

    const messages = {
      CityID: { required: '请选择乡镇' },
      Name: { required: '请输入养殖场名称' },
      Year: { required: '请输入建场时间'},
      FrName: { required: '请输入法人名' },
      FrTel: { required: '请输入法人手机号', tel: '请输入正确的手机号' },
    }
    this.WxValidate = new WxValidate(rules, messages)
  },
})
