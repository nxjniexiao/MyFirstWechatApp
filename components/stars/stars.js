// components/stars/stars.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    score: {
      type: Number
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    fixedScore: null,
    starsPath: {
      'full': '/images/icons/star-full.png',
      'half': '/images/icons/star-half.png',
      'empty': '/images/icons/star-empty.png'
    },
    starsArray: []
  },

  // 生命周期函数
  attached: function() {
    this.setData({
      fixedScore: this.properties.score.toFixed(1),
      starsArray: this.getStarsArray(this.properties.score)
    })
  },

  /**
   * 组件的方法列表
   */
  methods: {
    getStarsArray: function(score) {
      score = score/2;
      let fullStars = Math.floor(score);// 满星
      let hasHalfStar = false;// 半星
      // 0.5 就近原则
      if ( (score - fullStars) >= 0.75 ){
        fullStars ++;
      } else if ( (score - fullStars) >= 0.25) {
        hasHalfStar = true;
      }
      const res = [];
      for(let i = 0; i < 5; i++){
        if (i < fullStars){
          res[i] = 'full';
        } else {
          res[i] = 'empty';
        }
      }
      if (hasHalfStar) {
        res[fullStars] = 'half';
      }
      return res;
    }
  }
})
