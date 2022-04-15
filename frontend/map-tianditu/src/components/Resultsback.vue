<template>
  <div class="hello">
    <h1>任务上报结果</h1>
    <div v-for="result in resultsdata">
    <div :id="result.taskid" style="width: 500px;height:300px;" :ref = "result.taskid"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'results',
  data () {
    return {
      msg: 'results',
      chart: null,
      resultsdata:[{"taskid":6, "taskurl":"http://www.baidu.com", "tasksummary":[{"statuscode": "200", "count":1}]}]
    }
  },
  created() {
         let that = this
         //this.$http.get(this.$root.HOST + '/api/latesttaskresults', {}

     this.$axios({
                 url:this.$root.HOST + '/api/latesttaskresults',
                 method:'get',
                 data:{},
                 headers:{
            'Content-Type': 'application/json',
            'token': window.sessionStorage.getItem('token') 
            }
            }).then((response) =>{          //这里使用了ES6的语法
                 console.log(response.data)
                 var summarylist = response.data.latestsummary
                 console.log(summarylist)
                 var summary = JSON.parse(summarylist)
                 console.log(JSON.parse(summarylist))
                 that.resultsdata = summary
                 for (var index in summary){
                 console.log(summary[index].taskid)
                 console.log(summary[index].taskurl)
                 console.log(summary[index].tasksummary)
                 }
                 //this.$message.success('请求成功')
                 }).catch((error) =>{
                 console.log(error)       //请求失败返回的数据
                 })


     },
  updated(){
                 this.init()
  },
methods:{
            init(){
                var option = {
        title: {
          text: 'ECharts 入门示例'
        },
        series: [
          {
              type: 'pie',
              radius: '80%',
              avoidLabelOverlap: false,
             label: {
                normal: {
                    formatter: 'response:' + '\n\r' + '{b}:{c}' + '\n\r' + '({d}%)',
                    show: true,
                    textStyle: {
										fontSize: this.standSize / 150,
									}
                },
                emphasis: {
                    show: true,
                    textStyle: {
                        fontSize: '15',
                        fontWeight: 'bold'
                    }
                }
            },
             labelLine: {
                normal: {
                    show: true
                }
            },
      data: [
        {
          value: 335,
          name: '直接访问'
        },
      ]
          }
        ]
      };
// 使用刚指定的配置项和数据显示图表。

      let index
      for (index in this.resultsdata){
         var taskid = String(this.resultsdata[index].taskid)
         console.log(taskid)
         var taskurl = this.resultsdata[index].taskurl
         //var mychart = this.$echarts.init(this.$refs[taskid])
         var mychart = this.$echarts.init(document.getElementById(taskid))
         option.title.text = taskurl
         var tasksummary = this.resultsdata[index].tasksummary
         let sindex
         for (sindex in tasksummary){
             tasksummary[sindex].name = tasksummary[sindex].statuscode
             tasksummary[sindex].value = tasksummary[sindex].count
         }
         console.log(tasksummary)
         option.series[0].data = tasksummary
         console.log(option)
         mychart.setOption(option)

      }
            }
        }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
