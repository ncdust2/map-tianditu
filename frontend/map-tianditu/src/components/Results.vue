<template>
  <div class="hello">
    <h1>任务上报结果</h1>
  <el-table
    :data="resultsdata"
    stripe
    style="width: 100%"
    :span-method="arraySpanMethod"
    row-key="taskurl"
    border

    >
    <el-table-column type="expand">
                <template slot-scope="props">
                  <el-table
                    class="table-in-table"
                    :data="props.row.resultsdetail"
                    style="width: 100%;"
                    row-key="taskurl"
                    border
                  >
                  <el-table-column prop="username" label="提交用户" width="180"></el-table-column>
                  <el-table-column prop="statuscode" label="响应码" width="180"></el-table-column>
                  <el-table-column prop="submittime" label="提交时间" width="180"></el-table-column>
<el-table-column prop="network_type" label="网络类型" width="180"></el-table-column>
<el-table-column prop="NetworkOperatorName" label="网络运营商" width="180"></el-table-column>

<el-table-column prop="SimOperatorName" label="SIM卡运营商" width="180"></el-table-column>
<el-table-column prop="localipAddress" label="本地ip" width="180"></el-table-column>
<el-table-column prop="netipAddress" label="公网ip" width="180"></el-table-column>
<el-table-column prop="localipv6Address" label="ipv6地址" width="180"></el-table-column>

<el-table-column prop="latitude" label="纬度" width="180"></el-table-column>
<el-table-column prop="longitude" label="经度" width="180"></el-table-column>
<el-table-column prop="addr" label="地址" width="180"></el-table-column>
<el-table-column prop="locationDescribe" label="位置描述" width="180"></el-table-column>
                  </el-table>
                </template>
           </el-table-column>


    
    <el-table-column
      prop="taskurl"
      label="任务url">
    </el-table-column>
    <el-table-column
      prop="createtime"
      label="任务创建时间">
    </el-table-column>
     <el-table-column
     v-for = "code in codedata"
      :prop="'statuscode_' + code"
      :label="'statuscode_' + code"
      width="150">
      <template slot-scope="scope">
        <el-popover v-if="scope.row['statuscode_' + code]" trigger="hover" placement="left">

          <div style="width:200px;height:600px">
          <img style= "width: auto;height: auto; max-width: 100%;  max-height: 100%;" 
          :src="host+'/img/task'+scope.row.taskid+'_'+code"></img>
          </div>
          <div slot="reference" class="name-wrapper">
            <el-tag size="medium"> {{scope.row['statuscode_' + code]}}</el-tag>
          </div>
        </el-popover>
      </template>
    </el-table-column>

  </el-table>

  </div>
</template>

<script>
export default {
  name: 'results',
  data () {
    return {
      msg: 'results',
      chart: null,
      host: this.$root.HOST,
      codedata: ["200"],
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
                 var codelist = response.data.latestcode
                 console.log(summarylist)
                 console.log(codelist)
                 var summary = JSON.parse(summarylist)
                 console.log(JSON.parse(summarylist))
                 that.codedata = codelist
                 for (var index in summary){
                 console.log(summary[index].taskid)
                 console.log(summary[index].taskurl)
                 var smlist = summary[index].tasksummary
                 for (var smindex in smlist){
                     console.log(smlist[smindex].statuscode)
                     console.log(smlist[smindex].count)
                     summary[index]["statuscode_" + smlist[smindex].statuscode ] = smlist[smindex].count
                 }
                 }
                 that.resultsdata = summary
                 console.log(summary)
                 //this.$message.success('请求成功')
                 }).catch((error) =>{
                 console.log(error)       //请求失败返回的数据
                 })


     },
  updated(){
  },
methods:{
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
.hello {
  ::v-deep {
    .el-table th {
      background: #ddeeff;
    }
    .el-table__expanded-cell {
      border-bottom: 0px;
      border-right: 0px;
      padding: 0px 0px 0px 47px;
    }
  }
  .table-in-table {
    border-top: 0px;
  }
}

</style>
