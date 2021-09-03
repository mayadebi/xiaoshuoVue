<template>
  <div>
    <el-form :inline="true">
      <el-form-item>
        <el-input v-model="searchFrom.name" placeholder="名称" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="getRoleList">搜索</el-button>
      </el-form-item>
      <el-form-item>
        <el-popconfirm title="确定要批量删除吗？" @confirm="delHandel(null)">
          <el-button type="danger" slot="reference" :disabled="delStatu">批量删除</el-button>
        </el-popconfirm>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="addRole">新增</el-button>
      </el-form-item>
    </el-form>
    <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        border
        stripe
        @selection-change="handleSelectionChange">
      <el-table-column
          type="selection"
          width="55">
      </el-table-column>
      <el-table-column
          prop="name"
          label="名称"
          width="120">
      </el-table-column>
      <el-table-column
          prop="code"
          label="唯一编码"
          show-overflow-tooltip>
      </el-table-column>
      <el-table-column
          prop="remark"
          label="描述"
          show-overflow-tooltip>
      </el-table-column>
      <el-table-column
          prop="statu"
          label="状态">
        <template slot-scope="scope">
          <el-tag size="small" v-if="scope.row.statu === 0" type="success">正常</el-tag>
          <el-tag size="small" v-else-if="scope.row.statu === 1" type="danget">禁用</el-tag>
        </template>
      </el-table-column>
      <el-table-column
          prop="icon"
          label="操作">
        <template slot-scope="scope">
          <el-button type="text" @click="editHandle(scope.row)">分配权限</el-button>
          <el-button type="text" @click="editHandle(scope.row)">编辑</el-button>
          <el-divider direction="vertical"></el-divider>
          <template>
            <el-popconfirm title="确定要删除这条记录吗？" @confirm="delHandel(scope.row.id)">
              <el-button type="text" slot="reference" >删除</el-button>
            </el-popconfirm>
          </template>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="current"
        :page-sizes="[10, 20, 20, 100]"
        :page-size="size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
    </el-pagination>
    <el-dialog
        title="提示"
        :visible.sync="dialogVisible"
        width="600px"
        :before-close="handleClose"
    >
      <el-form :model="editForm" :rules="editFormRules" ref="editForm" label-width="100px" class="demo-editFrom">
        <el-form-item label="角色名称" prop="name" label-width="100px">
          <el-input v-model="editForm.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="唯一编码" prop="code" label-width="100px">
          <el-input v-model="editForm.code" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="描述" prop="remark" label-width="100px">
          <el-input v-model="editForm.remark" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="statu" label-width="100px">
          <el-radio-group v-model="editForm.statu">
            <el-radio :label=0>禁用</el-radio>
            <el-radio :label=1>正常</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('editForm')">提交</el-button>
          <el-button @click="resetForm('editFrom')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "Role",
  data() {
    return {
      editFormRules: {
        name: [{required: true, message: '请输入角色名称', trigger: 'blur'}],
        code: [{required: true, message: '请输入唯一编码', trigger: 'blur'}],
        statu: [{required: true, message: '请选择状态', trigger: 'blur'}]
      },
      editForm:{},
      dialogVisible:false,
      size:10,
      total:100,
      current:1,
      searchFrom: {},
      delStatu: true,
      tableData: [{
        remark: '2016-05-03',
        name: '王小虎',
        code: '上海市普陀区金沙江路 1518 弄',
        statu:0,
        id:1
      }],
      multipleSelection: []

    }
  }
  ,
  created() {
    this.getRoleList()
  },
  methods: {
    getRoleList(){
      this.$axios.get("/sys/role/all",{
        params:{
          name:this.searchFrom.name,
          current:this.current,
          size:this.size
        }
      }).then(res =>{
        this.tableData = res.data.data.records
        this.size = res.data.data.size
        this.current = res.data.data.current
        this.total = res.data.data.total
      })
    },
    delHandel(id){
      let ids = []
      if(id){
        ids.push(id)
      } else {
        this.multipleSelection.forEach(item =>{
          ids.push(item.id)
        })
      }
      this.$axios.post('/sys/role/delete/',ids).then(res =>{
        this.$message({
          message: '恭喜你，操作成功',
          type: 'success',
          onClose:() =>{
            this.getRoleList()
          }
        })
      })
    },
    editHandle(row){
      this.editForm = row
      this.dialogVisible = true
    },
    submitForm(formName){
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios.post('/sys/role/'+(this.editForm.id?'update' : 'save'),this.editForm).then(res =>{
            this.$message({
              message: '恭喜你，操作成功',
              type: 'success',
              onClose:() =>{
                this.getRoleList()
              }
            })
            this.dialogVisible = false
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    handleClose(){
      this.resetForm('editForm')
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.dialogVisible = false
      this.editForm = {}
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.size = val
      this.getRoleList()
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.current = val
      this.getRoleList()
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
      this.delStatu = val.length ===0
    },
    addRole() {
      this.dialogVisible = true
    }
  }
}
</script>

<style scoped>
.el-pagination{
  float: right;
  margin-top: 22px;
}
</style>