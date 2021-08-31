// 引入mockjs
const Mock = require('mockjs')
// 获取 mock.Random 对象
// 参考：https://github.com/nuysoft/Mock/wiki/Mock.Randomconst
Random = Mock.Random
Result = {code: 200, msg: '操作成功', data: null}
/** * Mock.mock( url, post/get , function(options))；
 * url 表示需要拦截的 URL， * post/get 需要拦截的 Ajax 请求类型
 * 用于生成响应数据的函数
 */
// 获取验证码图片base64编码以及一个随机码
Mock.mock('/captcha', 'get', () => {
        Result.data = {
            token: Random.string(32),
// 获取一个32位的随机字符串,
            captchaImg: Random.dataImage("120x40", "11111")
//生成验证码为11111的base64图片编码
        }
        return Result
    }
)


Mock.mock('/login', 'post', () => {
        return Result
    }
)
Mock.mock('/logout', 'post', () => {
        return Result
    }
)
Mock.mock('/sys/menu/all', 'get', () => {
        let menu = [
            {
                name: 'SysManga',
                title: '系统管理',
                icon: 'el-icon-s-operation',
                path: '',
                component: '',
                children: [{
                    name: 'SysUser',
                    title: '用户管理',
                    icon: 'el-icon-s-custom',
                    path: '/sys/user',
                    component: 'admin/User',
                    children: []
                }, {
                    name: 'SysRole',
                    title: '权限管理',
                    icon: 'el-icon-s-custom',
                    path: '/sys/role',
                    component: 'admin/Role',
                    children: []
                }, {
                    name: 'SysMenu',
                    title: '菜单管理',
                    icon: 'el-icon-s-custom',
                    path: '/sys/menu',
                    component: 'admin/Menu',
                    children: []
                }]
            }, {
                name: 'SysTools',
                title: '系统工具',
                icon: 'el-icon-s-tools',
                path: '',
                children: [{name: 'SysDict', title: '数字字典', icon: 'el-icon-s-order', path: '/sys/dicts', children: []},]
            }
        ]
        let authoritys = []
        Result.data = {
            menu: menu,
            authoritys: authoritys
        }
        return Result
    }
)
Mock.mock('/sys/userInfo', 'get', () => {
        Result.data = {
            id: '1',
            username: 'test',
            touxiang: 'https://dgss0.bdstatic.com/5bVSsj_p_tVS5dKfpU_Y_D3/data/f29112307b6e45286ff3a4aa54320472'
        }
        return Result
    }
)