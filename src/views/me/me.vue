<template>
    <div class="me">
        <h2>
            <p>
                <b></b> 18811456021
            </p>
            <h3>
                <span>会员最高享折</span>
                <i>点击进入会员中心 > </i>
            </h3>
        </h2>
        <div class="top">
            <router-link to="/payment" tag="h1">
                <span>我的订单</span>
                <p>查看全部订单
                    <i>></i>
                </p>
            </router-link>
            <ul>
                <li>
                    <i></i>
                    <span>代付款</span>
                </li>
                <li>
                    <i></i>
                    <span>代发货</span>
                </li>
                <li>
                    <i></i>
                    <span>代收货</span>
                </li>
                <li>
                    <i></i>
                    <span>代评价</span>
                </li>
            </ul>
        </div>
        <FootBar/>

    </div>
</template>
<script>
    import FootBar from '@/components/footerBar'

    export default {
        components: {
            FootBar
        },
    }
</script>
<style>
    @import url("../../../static/css/me/style.css");
</style>