<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
     <el-table
    :data="resultsdata"
    stripe
    style="width: 100%">
    <el-table-column
      prop="taskurl"
      label="任务url">
    </el-table-column>
    <el-table-column
      prop="createtime"
      label="任务创建时间">
    </el-table-column>
     <el-table-column
      fixed="right"
      label="操作"
      width="100">
      <template slot-scope="scope">
        <el-button @click="handleClick(scope.row)" type="text" size="small">结束</el-button>
      </template>
    </el-table-column>
  </el-table>
  <div >
  <el-form :model="addtaskForm"  ref="addtaskForm" label-width="100px">
  <el-form-item style = "margin-left: 0px;margin-top:100px" label="" prop = "addtaskdetail">
  <p>下发任务url(可添加多个，以回车分隔)</p>
  <el-input type="textarea"
  :autosize="{ minRows: 4, maxRows: 8}"
  placeholder="请输入内容" v-model="addtaskForm.addtaskdetail"></el-input>
   </el-form-item>
 <el-form-item>
   <el-button type="primary" style="width:100% ;" @click="doaddtask('addtaskForm')">添加</el-button>
   </el-form-item>
    </el-form>

  </div>

  </div>
</template>

<script>
export default {
  name: 'tasks',
  data () {
    return {
      msg: 'tasks',
      addtaskForm:{addtaskdetail:""},
      resultsdata:[{"taskid":6, "taskurl":"http://www.baidu.com", "createtime": "2022-01-23 11:53:08", "tasksummary":[{"statuscode": "200", "count":1}]}],
    }
  },
  created() {
      this.get_resultsdata()
     },

  methods:{
    doaddtask(){
         let adddetail = this.addtaskForm.addtaskdetail
         adddetail.replace(['*[^\S\n\r\t]', '\n'])
         console.log(adddetail)
         
         let urllist = adddetail.split('\n')
         let urlindex
         let urljsonlist = []
         for (urlindex in urllist){
             console.log(urllist[urlindex])
             urljsonlist.push({"taskurl":urllist[urlindex]})
         }
         console.log(urljsonlist)
         this.$axios({
                 url:this.$root.HOST + '/api/latesttasks',
                 method:'post',
                 data:{"tasklist": urljsonlist},
                 headers:{
            'Content-Type': 'application/json',
            'token': window.sessionStorage.getItem('token')
            }
            }).then((response) =>{          //这里使用了ES6的语法
                 //this.$message.success('请求成功')
                this.get_resultsdata()
                 this.addtaskForm.addtaskdetail = ""
                 }).catch((error) =>{
                 console.log(error)       //请求失败返回的数据
                 })
    },
    handleClick(row) {
        console.log(row);
        this.$axios({
                 url:this.$root.HOST + '/api/task',
                 method:'put',
                 data:{"taskid": row.taskid},
                 headers:{
            'Content-Type': 'application/json',
            'token': window.sessionStorage.getItem('token')
            }
            }).then((response) =>{          //这里使用了ES6的语法
                 //this.$message.success('请求成功')
                this.get_resultsdata()
                 }).catch((error) =>{
                 console.log(error)       //请求失败返回的数据
                 })
             },
            get_resultsdata(){

     let that = this
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
.el-form-item__content {
    margin-left: 0px !important;
}
</style>
