var app = new Vue({
  el: '#app',
  data: function() {
    return {
      allCount: 0,
      allPrice: 0,
      result: []
    }
  },
  created: function() {
    this.getData()
  },
  methods: {
    getData: function() {
      var self = this
      $.ajax({
        url: 'file/data.json',
        method: 'get',
        contenttype :"application/x-www-form-urlencoded;charset=utf-8", 
		dataType:"json",
        success: function(response) {
          self.result = response
        },
        error: function() {
          alert('error')
        }
      })
    },
    inputChange:function(arr,index1,index2,e){
    	console.log(1111)
    	console.log('e.target.value:'+e.target.value)
    	// 非法值
    	if(new Number(e.target.value).toLocaleString() == "NaN" || e.target.value == ''){
    		console.log('非法值')
    		arr[index1].scaleData[index2].scaleInput = 0
    		alert('您输入的是非法值')
    	}
    	// js有效精度监测值为16位
    	if(e.target.value>999999999999999){
    		e.target.value = 999999999999999
    		arr[index1].scaleData[index2].scaleInput = 999999999999999
    		alert('最大金额不能超过为16位')
    	}
    	// 最大值
    	if(e.target.value>arr[index1].scaleData[index2].number){
    		console.log('最大值')
    		arr[index1].scaleData[index2].scaleInput = new Number(arr[index1].scaleData[index2].number).toLocaleString().replace(/,/g,'') 
    		console.log('最大值：'+arr[index1].scaleData[index2].scaleInput)
    		alert('您输入的超过最大值啦')
    		// debugger
    	}

    	var scalelLen = arr[index1].scaleData.length
    	var temCount=0;
    	// 一行数据
    	for(var i=0;i<scalelLen;i++){
    		var tem = arr[index1].scaleData[i].scaleInput
    		if(tem){
    			// 科学计数时
    			tem = tem.toString().replace(/,/g,'')
    			temCount += parseFloat(tem)
    		}
    	}
    	arr[index1].count= temCount
    	// 显示的值
    	arr[index1].price=temCount*100//new Number(temCount*100).toLocaleString()
    	console.log("temCount:"+temCount)
    	// 所有数据
    	var colorLen = arr.length
    	var temAllCount=0
    	for(var i=0;i<colorLen;i++){
    		if(arr[i].count){
    			console.log('i:'+i+',arr[i].count:'+arr[i].count)
    			temAllCount += arr[i].count//parseFloat(arr[i].count)
    		}
    	}
    	console.log("temAllCount:"+temAllCount)
    	// 显示的值
    	this.allCount= temAllCount//new Number(temAllCount).toLocaleString()
    	this.allPrice= temAllCount*100//new Number(temAllCount*100).toLocaleString()
    },
    submit:function(){
    	alert('提交订单')
    }
  }
})