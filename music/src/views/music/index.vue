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
                <el-button @click="open">添加</el-button>
                <!-- 添加音乐表格 -->
                <el-table :data="MusicList" style="width: 100%">
                    <el-table-column label="序号" type='index'></el-table-column>
                    
                    <el-table-column label="歌名" prop="music_name"> </el-table-column>
                   
                    <el-table-column label="图片" >
                    <!-- 作用域插槽 -->
                     <template slot-scope="scope">
                            <img :src="scope.row.pic" alt="" class="m-img">
                        </template>
                    </el-table-column>
                      <el-table-column label="歌手" prop="singer_name">
                      </el-table-column>
                      <el-table-column label="是否上架" prop="">
                        <template slot-scope="scope">
                            <span>{{scope.row.isup ? '是' :'否'}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" align="right">
                        <template slot-scope="scope">
                            <el-button size="mini" @click="handleEdit(scope.$index, scope.row, scope.row.id)">编辑</el-button>
                            <el-button size="mini"  type="danger" @click="handleDelete(scope.$index, scope.row,scope.row.id)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                  <!-- 分页器 -->
                     <el-pagination
                        background
                        layout="prev, pager, next"
                        :total="total"
                        :page-size="limit"
                        @current-change="pageChange"
                        >
                    </el-pagination>
                <!-- 添加弹框 -->
                <el-dialog title="提示" :visible.sync="dialogVisible" width="50%">
                    <span>
                        <el-form :model="ruleForm" status-icon  ref="ruleForm" label-width="100px" class="demo-ruleForm">
                            <el-form-item label="歌名" prop="music_name">
                                <el-input type="text" v-model="ruleForm.music_name" autocomplete="off"></el-input>
                            </el-form-item>
                            <el-form-item label="歌手" prop="singer_name">
                                <el-input type="text" v-model="ruleForm.singer_name" autocomplete="off"></el-input>
                            </el-form-item>
                            <el-form-item label="上传图片" prop="age">
                               <input type="file" @change="upload">
                               <img  :src="ruleForm.pic" class="m-img"/>
                            </el-form-item>
                            <el-form-item label="是否上架" prop="pass">
                                <el-radio-group v-model="ruleForm.isup">
                                    <el-radio label="1">是</el-radio>
                                    <el-radio label="0">否</el-radio>
                                </el-radio-group>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" @click="submitForm('ruleForm')">{{editId ? "添加" : "完成"}}</el-button>
                                <el-button @click="resetForm('ruleForm')">重置</el-button>
                            </el-form-item>
                        </el-form>
                    </span>
                    <!-- <span slot="footer" class="dialog-footer">
                        <el-button @click="dialogVisible = false">取 消</el-button>
                        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
                    </span> -->
                </el-dialog>
            </el-main>
            </el-container>
    </el-container>
</template>

<script>
import {mapState,mapMutations} from 'vuex'
export default {
    data(){
        return{
             MusicList: [],
                limit:3,//每页展示的条数
                pagenum:1,//展示页数
                total:0,
                dialogVisible: false,//控制弹框的显示
                editId:'',
                ruleForm:{
                    music_name:'',
                    singer_name:'',
                    pic:'',
                    isup:1
                }

        }
    },
    methods:{
        ...mapMutations(['setName']),
        //点击跳到登录页面
        denglu(){
            this.$router.push('/login')
        },
        //点击分页器
        pageChange(val){
             this.pagenum = val;
             this.getMusicList()
        },
        //点击退出页面
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
        //点击编辑
        handleEdit(index, row,id) {
        console.log(id);
        this.dialogVisible = true
        this.editId = id;
        let editObj = this.MusicList.find(item => item.id === id);
        this.ruleForm.music_name = editObj.music_name;
        this.ruleForm.singer_name = editObj.singer_name;
        this.ruleForm.isup = editObj.isup;
        this.ruleForm.pic = editObj.pic;
        this.$api.music.updatemusic(Object.assign({},this.ruleForm,{id:this.editId})).then(res => {
            if(res.data.code === 1) {
                this.getMusicList()
            }
        })
            if(id){
                
            }

          this.$nextTick( () => {
                     this.$message({
                        message:'编辑完成',
                        type:'success'
                    })
            })
         
        },
        //点击删除
        handleDelete(index, row,id) {
            console.log(index, row);
            this.$api.music.delete({id}).then( res => {
                if(res.data.code === 1) {
                    this.$message({
                        message:'删除成功',
                        type:'success'
                    })
                    this.MusicList.length <= 1 && this.pagenum > 1 ? --this.pagenum : this.pagenum;
                    this. getMusicList()
                }
            })
        },
        //点击添加列表项
        open(){
            this.dialogVisible = true
        },
        //请求音乐列表
        getMusicList(){
            this.$api.music.querymusic({pagenum:this.pagenum,limit:this.limit}).then(res => {
                if( res.data.code == 1){
                    this.MusicList= res.data.data
                    this.total = res.data.total
                }
            })
        },
        //点击添加将音乐列表添加到列表项中
        submitForm(){
            // this.dialogVisible =false
            this.$api.music.addmusic(this.ruleForm).then( res => {
                if(res.data.code == 1) {
                    this.getMusicList();
                    this.resetForm()
                    this.dialogVisible = false;
                }
            })
        },
        //点击重置按钮的时候将添加弹框里的内容清空
        resetForm(){
            this.ruleForm. music_name ='';
            this.ruleForm. singer_name ='';
            this.ruleForm. pic ='';
            this.ruleForm. isup =''
        },
        //上传图片
        upload(e){
            let file = e.target.files[0];
            //1、新建formdata的实例
            let formdata = new FormData();
            //2.添加参数
            formdata.append('file',file)
            //3.请求上传图片的接口
            this.$api.music.upload(formdata).then( res => {
                if( res.data.code === 1 ) {
                    this.ruleForm.pic = 'http://localhost:3000' + res.data.url
                }
            })
        }
    },
    created(){
        this.$api.user.userinfo().then(res => {
            console.log(res.data.data.username)
            if(res.data.code == 1){
                 this.setName(res.data.data.username)
            } 
        })
         //请求音乐列表
        this.getMusicList()
        
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
  .m-img{
      width: 80px;
      height: 80px;
  }
  </style>