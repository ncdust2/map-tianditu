<template>
	<div class="login-wrap">
		<el-form :model="ruleForm" label-width="100px" class="demo-ruleForm login-container">
			<h3 style="text-align: center;">管理员登录</h3>
			<el-form-item label="用户名">
				<el-input v-model="ruleForm.uname"></el-input>
			</el-form-item>
			<el-form-item label="密码">
				<el-input type="password" v-model="ruleForm.pwd"></el-input>
			</el-form-item>
			<el-form-item>
				<el-row>
					<el-col :span="24">
						<div class="grid-content bg-purple-dark">
							<el-button type="primary" style="width:100% ;" @click="doLogin">提交</el-button>
						</div>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="12">
						<div class="grid-content bg-purple-dark">
                            <el-checkbox v-model="ruleForm.checked" class="autoCheck">记住我</el-checkbox>
						</div>
					</el-col>
				</el-row>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				ruleForm: {
					uname: '',
					pwd: '',
                    checked: false
				}
			};
		},
		methods: {
			doLogin() {
                let url = this.$root.HOST + '/api/admintoken'
                console.log(url)
                this.$axios.post(url,{
                username: this.ruleForm.uname,
                password:this.$md5(this.ruleForm.pwd)
                }).then((response) =>{          //这里使用了ES6的语法
                console.log(response.data)
                this.$message.success('登录成功')
                window.sessionStorage.setItem('token', response.data.token)  
                window.sessionStorage.setItem('username', response.data.username)  
                if(this.ruleForm.checked){
                    window.localStorage.setItem('token', response.data.token);
                    window.localStorage.setItem('username', response.data.username);
                    var stoken = window.localStorage.getItem('token');
                    console.log(stoken);
                }
                this.$router.push({path:'/results'})
            }).catch((error) =>{
                console.log(error)       //请求失败返回的数据
                this.$message.error(error.response.data.msg)
                }
            )
            }
		}
	}
</script>

<style scoped>
	.login-wrap {
		box-sizing: border-box;
		width: 100%;
		height: 100%;
		padding-top: 10%;
		/* background-color: #112346; */
		background-repeat: no-repeat;
		background-position: center right;
		background-size: 100%;
	}

	.login-container {
		border-radius: 10px;
		margin: 0px auto;
		width: 350px;
		padding: 30px 35px 15px 35px;
		background: #fff;
		border: 1px solid #eaeaea;
		text-align: left;
		box-shadow: 0 0 20px 2px rgba(0, 0, 0, 0.1);
	}

	.title {
		margin: 0px auto 40px auto;
		text-align: center;
		color: #505458;
	}
</style>


