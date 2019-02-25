<template lang="jade">
.main
    .content
            .input-box.no-click(@click.stop="changePicker('sex')")
                .picker-img
                    input(
                        type="text",
                        placeholder="*称谓",
                        readonly="readonly",
                        v-model.trim="info.sex")
            .input-box.no-click.data-input(@click.stop="changePicker('date')")
                .picker-img
                    input(
                        type="text",
                        placeholder="生日*",
                        readonly="readonly",
                        v-model.trim="info.year")
                .picker-img
                    input(
                        type="text",
                        readonly="readonly",
                        v-model.trim="info.month")
                .picker-img
                    input(
                        type="text",
                        readonly="readonly",
                        v-model.trim="info.day")
            .input-box.no-click(@click.stop="changePicker('address')")
                .picker-img-city
                    input(
                        type="text",
                        placeholder="省份*",
                        readonly="readonly",
                        v-model.trim="info.provinceStr")
                .picker-img-city
                    input(
                        type="text",
                        placeholder="城市*",
                        readonly="readonly",
                        v-model.trim="info.cityStr")
    mt-popup.mt-popup(
    v-model="showSex"
    position="bottom"
    )
        .pop-button
            span.cancel(
            @click="closePicker('sex')"
            ) 取消
            span.confirm(
            @click="confirmSex"
            ) 确认
        .pop-main
            mt-picker(
            :slots="slotSex",
            @change="onValuesSex"
            )
    mt-datetime-picker(
        ref="picker",
        type="date",
        year-format="{value} 年",
        month-format="{value} 月",
        date-format="{value} 日",
        :startDate="startDate",
        :endDate="endDate",
        @confirm="confirmDate"
        )
    mt-popup.mt-popup(
        v-model="showAddress"
        position="bottom"
    )
       .pop-button
           span.cancel(
              @click="closePicker('address')"
           ) 取消
           span.confirm(
              @click="confirmAddress"
           ) 确认
       .pop-main
           mt-picker(
           :slots="slots",
           valueKey="text",
           @change="onValuesAddress"
           )
</template>

<script>
import navigators from '../../libs/navigator'
import { addressOptions } from './config'
/* eslint-disable */
export default {
  data () {
    const address = JSON.parse(JSON.stringify(addressOptions()))
    return {
      address,
      info: { // 个人信息
        year: '',
        month: '',
        day: '',
        provinceStr: '',
        cityStr: '',
        sex: ''
      },
      showSex: !1, // 性别选择器
      showAddress: !1, // 地址选择器
      showDate: !1, // 生日选择器
      isIos: navigators.isIos(),
      startDate: new Date('1936-01-01'),
      endDate: new Date('2018-12-31'),
      slots: [
        {
          flex: 1,
          values: address.province,
          className: 'slot1',
          textAlign: 'right'
        }, {
          flex: 1,
          values: address.cityData['2'],
          className: 'slot3',
          textAlign: 'left'
        }
      ],
      slotSex: [{values: ['先生', '女士']}],
      sex: '',
      provinceStr: '',
      cityStr: ''
    }
  },
  computed:{
    status () {
      const {showDate, showAddress, showSex} = this
      return showDate || showAddress || showSex
    }
  },
  components: {},
  watch: {
    status (val) {
      this.stopTouch(val)
    }
  },
  created () {
  },
  mounted() {
  },
  methods: {
    // 取消选择器
    closePicker (type) {
      switch (type) {
        case 'sex':
          this.showSex = !1
          break
        case 'address':
          this.showAddress = !1
          break
        case 'date':
          this.showDate = !1
          break
      }
    },
    // 确认性别
    confirmSex () {
      this.showSex = !1
      this.info.sex = this.sex
    },
    // 确认地址
    confirmAddress () {
      this.showAddress = !1
      this.info.provinceStr = this.provinceStr
      this.info.cityStr = this.cityStr
    },
    // 确认生日
    confirmDate (val) {
      console.log('val-----',val)
      let date = new Date(val)
      let year = date.getFullYear()
      let month = date.getMonth() + 1
      let day = date.getDate()
      this.info.year = year + '年'
      if (month.toString().length == 1) {
        this.info.month = '0' + month + '月'
      } else{
        this.info.month = month + '月'
      }
      if (day.toString().length == 1) {
        this.info.day = '0' + day + '日'
      } else{
        this.info.day = day + '日'
      }
    },
    // 弹起选择器
    changePicker (type) {
      this.hidePicker()
      switch (type) {
        case 'sex':
          this.showSex = !0
          setTimeout(this.scrollToHeight(), 300)
          break
        case 'address':
          this.showAddress = !0
          setTimeout(this.scrollToHeight(), 300)
          break
        case 'date':
          this.showDate = !0
          this.$refs.picker.open();
          setTimeout(this.scrollToHeight(), 300)
          break
      }
    },
    // 表单focus，picker关闭
    hidePicker () {
      this.showSex = !1
      this.showAddress = !1
      this.showDate = !1
    },
    //弹起picker时，页面底部会有部分白底
    scrollToHeight () {
      if (this.isIos) {
        setTimeout(() => {
          window.scrollTo(0, document.documentElement.clientHeight || document.documentElement.offsetWidth)
        }, 300)
      }
    },
    //弹性称谓时的选择值
    onValuesSex(picker, values) {
      console.log('values-----',values)
      this.sex = values[0]
    },
    //弹性城市时的选择值
    onValuesAddress(picker, values) {
      console.log('values-----',values)
      picker.setSlotValues(1, this.address.cityData[values[0].value])
      this.provinceStr = values[0].text
      this.cityStr = values[1].text
    },
    handler(e) {
      e.preventDefault()
    },
    //滑动弹框时禁止背景滚动
    stopTouch(type) {
      if (type) {
        document.querySelector('body').addEventListener('touchmove', this.handler, {passive:false})
      } else {
        document.querySelector('body').removeEventListener('touchmove', this.handler, {passive:false})
      }
    }
  }
}
</script>
<style scoped lang="scss">
   @import "index";
</style>
