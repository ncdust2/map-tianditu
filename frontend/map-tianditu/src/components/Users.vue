<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
     <el-table
    :data="resultsdata"
    stripe
    style="width: 100%">
    <el-table-column
      prop="username"
      label="用户名">
    </el-table-column>
     <el-table-column
      fixed="right"
      label="操作"
      width="100">
      <template slot-scope="scope">
        <el-button @click="handleClick(scope.row)" type="text" size="small">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <div >
  <el-form :model="adduserForm"  ref="adduserForm" label-width="100px">
  <el-form-item style = "margin-left: 0px;margin-top:100px" label="" prop = "adduserdetail">
  <p>添加用户(密码默认和用户名相同)</p>
  <el-input v-model="adduserForm.adduserdetail"></el-input>
   </el-form-item>
 <el-form-item>
   <el-button type="primary" style="width:100% ;" @click="doadduser('adduserForm')">添加</el-button>
   </el-form-item>
    </el-form>

  </div>

  </div>
</template>

<script>
export default {
  name: 'users',
  data () {
    return {
      msg: '用户列表',
      adduserForm:{adduserdetail:""},
      resultsdata:[
		{
			"username": "ncdust"
		},
		{
			"username": "ncdust2"
		}
	],
    }
  },
  created() {
      this.get_resultsdata()
     },

  methods:{
    doadduser(){
         this.$axios({
                 url:this.$root.HOST + '/api/user',
                 method:'post',
                 data:{
                 "username": this.adduserForm.adduserdetail,
                 "password": this.$md5(this.adduserForm.adduserdetail),
                 },
                 headers:{
            'Content-Type': 'application/json',
            'token': window.sessionStorage.getItem('token')
            }
            }).then((response) =>{          //这里使用了ES6的语法
                 //this.$message.success('请求成功')
                this.get_resultsdata()
                 this.adduserForm.adduserdetail = ""
                 }).catch((error) =>{
                 console.log(error)       //请求失败返回的数据
                 this.$message.error(error.response.data.msg)       //请求失败返回的数据
                 })
    },
    handleClick(row) {
        console.log(row);
        this.$axios({
                 url:this.$root.HOST + '/api/user',
                 method:'delete',
                 data:{"username": row.username},
                 headers:{
            'Content-Type': 'application/json',
            'token': window.sessionStorage.getItem('token')
            }
            }).then((response) =>{          //这里使用了ES6的语法
                 //this.$message.success('请求成功')
                this.get_resultsdata()
                 }).catch((error) =>{
                 console.log(error)       //请求失败返回的数据
                 console.log(error.data.msg)       //请求失败返回的数据
                 })
             },
    get_resultsdata(){

     let that = this
     this.$axios({
                 url:this.$root.HOST + '/api/users',
                 method:'get',
                 data:{},
                 headers:{
            'Content-Type': 'application/json',
            'token': window.sessionStorage.getItem('token')
            }
            }).then((response) =>{          //这里使用了ES6的语法
                 console.log(response.data)
                 var usersjson = response.data.users
                 console.log(usersjson)
                 var users = JSON.parse(usersjson)
                 console.log(users)
                 that.resultsdata = users
                 for (var index in users){
                 console.log(users[index].username)
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
