Component({
  properties: {
    playlist: {
      type: Object
    }
  },
  observers: {
    ['playlist.playCount'] (val) {
      this.setData({
        count: this.tranNumber(val, 2)
      }) 
    }
  },
  data: {
    count: 0
  },
  methods: {
    tranNumber (num, point) {
      let numStr = num.toString().split('.')[0]
      if (numStr.length < 6) {
        return tranNumber
      } else if (numStr.length >= 6 && numStr.length <= 8) {
        var floatNumber = (numStr / 10000).toString()
        var result = parseFloat(floatNumber.slice(floatNumber.indexOf('.'))).toFixed(point)
        return parseFloat(parseInt(numStr / 10000) + parseFloat(result)) + '万'
      } else if (numStr.length > 8) {
        var floatNumber = (numStr / 100000000).toString()
        var result = parseFloat(floatNumber.slice(floatNumber.indexOf('.'))).toFixed(point)
        return parseFloat(parseInt(numStr / 100000000) + parseFloat(result)) + '亿'
      }
    },
    toMusicList (e) {
      var id = e.currentTarget.dataset.playlistid
      wx.navigateTo({
        url: `/pages/list/list?playlistid=${id}`
      })
    }
  }
})