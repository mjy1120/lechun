<template>
    <div class="login">
        <img class="img1" src="https://m.lechun.cc/images/login/login-bg.png" alt="">
        <p>
            <img src="https://m.lechun.cc/images/login/login-phone.png" alt="">
            <input type="text" v-model="mobile" placeholder="手机号码">
            <!-- placeholder="手机号码" -->
            <i class="icon-close">x</i>
            <img src="https://m.lechun.cc/images/login/login-code.png" alt="">
            <input type="text" placeholder="短信验证码" v-model="code">
            <template v-if="time == 0">
                <button class="get-code" :disabled="!isCode" @click="getCode">获取验证码
                </button>
            </template>
            <template v-else>
                <button id="cs" :disabled="true">{{time}}秒后重试
                </button>
            </template>
        </p>
        <button class="dl" @click="login">登录
        </button>
    </div>
</template>
<!-- <template v-else>
        <button :disabled="true">{{time}}秒后重试<tton>
      </template> -->
<script>
    export default {
        name: 'Login',
        data() {
            return {
                mobile: '',
                code: '',
                time: 0,
                timefn: ''
            }
        },
        computed: {
            isCode() {
                const reg = /\d{11}/
                return reg.test(this.mobile);
            }
        },
        methods: {
            getCode() {
                //console.log(1)
                this.time = 10;
                fetch('/api/msgCode/?mobile=' + this.mobile, {
                    credentials: 'include'
                })
                    .then((res) => {
                        //console.log(res)
                        return res.text()
                    })
                    .then((data) => {
                        console.log(data)
                        this.timefn = setInterval(() => {
                            this.time -= 1
                            if (this.time == 0) {
                                clearInterval(this.timefn)
                            }
                        }, 1000)
                    }).catch((e) => {
                        console.log(e)
                    })
            },
            login() {
                // alert(1)
                fetch('/api/login', {
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        mobile: this.mobile,
                        code: this.code
                    }),
                    credentials: 'include'
                })
                    .then(async (res) => {
                        //console.log(res)
                        if (res.ok) {
                            return res.json()
                        } else {
                            //console.log(res);
                            const data = await res.json()
                            return Promise.reject(new Error(data.msg))
                        }
                    })
                    .then((data) => {
                        console.log(data)
                        this.$router.replace('/indexPage')
                    }).catch((e) => {
                        console.log(e.message)
                    })
            }
        },
    }
</script>
<style>
    input::-webkit-input-placeholder,
    textarea::-webkit-input-placeholder {
        color: #ccc;
    }

    .login {
        width: 100%;
        padding: 0.3rem;
        text-align: center;
    }

    .login .img1 {
        width: 50%;
        padding: 0.1rem;
    }

    .login input {
        width: 100%;
        height: 0.45rem;
        border: none;
        padding-left: 0.25rem;
        border-bottom: 1px solid #ccc;
    }

    p {
        position: relative;
    }

    p img {
        width: 0.15rem;
        height: 0.17rem;
        position: absolute;
        margin: 0.12rem 0.05rem;
    }

    .icon-close {
        position: absolute;
        top: 0.13rem;
        right: 0.1rem;
        width: .2rem;
        height: .2rem;
        display: block;
        background: #222222;
        border-radius: .19rem;
        color: #ffffff;
        text-align: center;
        line-height: .2rem;
        font-style: normal;
        font-size: .16rem;
    }

    .get-code {
        position: absolute;
        top: 0.56rem;
        right: 0.1rem;
        border: none;
        background: #fff;
    }

    #cs {
        position: fixed;
        top: 2.21rem;
        right: 0.4rem;
        border: none;
        background: #fff;
    }

    .dl {
        width: 98%;
        height: 0.45rem;
        border: none;
        background: #202020;
        border-radius: .1rem;
        font-size: .16rem;
        color: #ffffff;
        margin-top: 0.45rem;
    }
</style>