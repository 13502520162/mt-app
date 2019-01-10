import Router from 'koa-router'
import Redis from 'koa-redis'
import nodeMaoler from 'nodemailer'
import User from '../dbs/models/users'
import Passpost from './utils/passport'
import Email from '../dbs/config'
import axios from './utils/axios'


let router = new Router({
  prefix: '/users'
})

let Store = new Redis().client


// 注册
router.post('/signup', async (ctx) => {
  const { // 解构赋值
    username,
    password,
    email,
    code
  } = ctx.req.body

  if (code) {
    const saveCode = await Store.hget(`nodemail:${username}`, 'code')
    const saveExpire = await Store.hget(`nodemail:${username}`, 'expire')
    if (code === saveCode) {
      if (new Date().getTime() - saveExpire > 0) {
        ctx.body = {
          code: '-1',
          msg: '验证码已过期，请重新尝试'
        }
        return false
      } else {
        ctx.body = {
          code: '-1',
          msg: '请填写正确验证码'
        }
      }
    }
  } else {
    ctx.body = {
      code: '-1',
      msg: '请填写验证码'
    }
  }

  let user = await User.find({
    username
  })

  if (user.length) {
    ctx.body = {
      code: '-1',
      msg: '已被注册'
    }
    return
  }

  let nuser = await User.create({
    username,
    password,
    email
  })

  if (nuser) {
    let res = await axios.post('/users/signin', {
      username,
      password
    })

    if (res.data && res.data.code == 0) {
      ctx.body = {
        code: 0,
        msg: '注册成功',
        user: res.data.user
      }
    } else {
      ctx.body = {
        code: '-1',
        msg: 'error'
      }
    }
  } else {
    ctx.body = {
      code: '-1',
      msg: '注册失败'
    }
  }
})

// 登录
router.post('/signin', async (ctx, next) => {
  return Passpost.authenticate('local', function(err, user, info, status) {
    if (err) {
      ctx.body = {
        code: -1,
        msg: err
      }
    } else {
      if (user) {
        ctx.body = {
          code: 0,
          msg: '登录成功',
          user: user
        }
        return ctx.login(user)
      } else {
        ctx.body = {
          code: 1,
          msg: info
        }
      }
    }
  })(ctx, next)
})


// 邮件验证
router.post('/verify', async (ctx, next) => {
  let username = ctx.request.body.username
  const saveExpire = await Store.hget(`nodemail:${username}`, 'expire')

  if (saveExpire && new Date().getTime() - saveExpire < 0) {
    ctx.body = {
      code: -1,
      msg: '验证请求过于频繁，1分钟内1次'
    }
    return false
  }


  //发送对象
  let transporter = nodeMaoler.createTransport({
    host: Email.smtp.host,
    port: 587,
    secure: false,
    auth: {
      user: Email.smtp.user,
      pass: Email.smtp.pass
    }
  })

  // 接收信息
  let ko = {
    code: Email.smtp.code(),
    expire: Email.smtp.expire(),
    email: ctx.request.body.email,
    user: ctx.request.body.username
  }

  //邮件显示内容
  let mailOptins = {
    from: `"认证邮件"<${Email.smtp.user}`,
    to: ko.email,
    subject: '《随心高仿美团网全栈》注册码',
    html: `您在《随心高仿美团网全栈》邀请码是${ko.code}`
  }

  await transporter.sendMail(mailOptins, (err, info) => {
    if (err) {
      return console.log('error')
    } else {
      Store.hmset(`nodemail:${ko.user}`, 'code', ko.code, 'expire', ko.expire, 'email', ko.email)
    }
  })

  ctx.body = {
    code: 0,
    msg: '验证码已发送，可能会有延时，有效期1分钟'
  }
})


// 退出
router.get('/exit', async (ctx, next) => {
  await ctx.logout()  //  注销动作
  if (ctx.isAuthenticated()) {
    ctx.body = {
      code: 0,
      msg: '退出成功'
    }
  } else {
    ctx.body = {
      code: -1,
      msg: '退出失败'
    }
  }
})


// 获取用户名
router.get('/getUser', async (ctx) => {
  if (ctx.isAuthenticated()) {
    const { username, email } = ctx.session.passport.user
    ctx.body = {
      user: username,
      email
    }
  } else {
    ctx.body = {
      user: '',
      email: ''
    }
  }
})

export default router

