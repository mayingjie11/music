<template>
    <el-container class="m-container">
            <el-header class="m-header">
                <div>
                    <span class="m-span">欢迎：{{username}}</span>
                    <el-button size="mini" type="primary" @click="denglu">登录</el-button>
                    <el-button size="mini" type="primary" @click="quit">退出</el-button>
                </div>
            </el-header>
            <el-container>
            <el-aside width="200px">Aside</el-aside>
            <el-main>
                <el-table
                    :data="tableData"
                    style="width: 100%">
                    <el-table-column
                    label="Date"
                    prop="date">
                    </el-table-column>
                    <el-table-column
                    label="Name"
                    prop="name">
                    </el-table-column>
                    <el-table-column
                    align="right">
                    <!-- <template slot="header" slot-scope="scope">
                        <el-input
                        v-model="search"
                        size="mini"
                        placeholder="输入关键字搜索"/>
                    </template> -->
                    <template slot-scope="scope">
                        <el-button
                        size="mini"
                        @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button
                        size="mini"
                        type="danger"
                        @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                    </el-table-column>
                </el-table>
            </el-main>
            </el-container>
    </el-container>
</template>

<script>
import {mapState,mapMutations} from 'vuex'
export default {
    data(){
        return{
             tableData: [{
                date: '2016-05-02',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
                }, {
                date: '2016-05-04',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1517 弄'
                }, {
                date: '2016-05-01',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1519 弄'
                }, {
                date: '2016-05-03',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1516 弄'
                }],
        }
    },
    methods:{
        ...mapMutations(['setName']),
        denglu(){
            this.$router.push('/login')
        },
        quit(){
            this.$confirm('是否退出', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$message({
                    type: 'success',
                    message: '退出成功!'
                 });
                // let aaa = res.data.token
                // console.log(aaa)
                localStorage.removeItem('token')
                this.$router.push('/login')
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '不退出'
                });          
            });
        },
        handleEdit(index, row) {
        console.log(index, row);
        },
        handleDelete(index, row) {
            console.log(index, row);
        }
    },
    created(){
        this.$api.user.userinfo().then(res => {
            console.log(res.data.data.username)
            if(res.data.code == 1){
                 this.setName(res.data.data.username)
            }
            
        })
    },
    computed:{
        ...mapState({
            username:state => state.username
        })
    }
};
</script>

<style lang="scss" scoped>
    .el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }
  
  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
  }
  
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;

  }
  
  body > .el-container {
    margin-bottom: 40px;
  }
  
  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }
  
  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
  .m-container{
      height: 100%;
  }
  .m-header{
      text-align: right;
  }
  .m-span{
      margin-right: 20px;
  }
  </style>