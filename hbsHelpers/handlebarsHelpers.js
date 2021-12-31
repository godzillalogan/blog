const dayjs = require('dayjs')

module.exports={
  dateFormat:function (a){
    return dayjs(a).format('YYYY 年 MM 月 DD 日')
  }
}