<template>
    <div class="balance">
        <router-link to="/address" tag="h1">您还没有填写配送地址，请点击添加
            <i class="iconfont icon-angle-right"></i>
        </router-link>
        <h1>
            配送日期
            <i class="iconfont icon-angle-right"></i>
        </h1>
        <div class="bottom">
            <h1>
                <span>优惠券</span>
                <span>-￥0.00
                    <i class="iconfont icon-angle-right"></i>
                </span>
            </h1>
            <ul>
                <li v-for="(item, index) in cartList" :key="index">
                    <dl>
                        <dt>
                            <img :src="item.thumbnail" alt="">
                        </dt>
                        <dd>
                            <p>
                                <span>{{item.title}}</span>
                                <b>{{item.tag}}</b>
                            </p>
                            <p>￥{{item.price}}元 × {{item.shopCount}}盒</p>
                        </dd>
                    </dl>
                </li>×
            </ul>
            <p>
                <span>商品合计：
                    <i>￥{{cartPrice}}</i>
                </span>
                <span>邮费：
                    <i>免邮</i>
                </span>
                <span>优惠券：
                    <i>-￥0.00</i>
                </span>
            </p>
            <ol>
                <li>2-6摄氏度冷藏|开盖后24小时内食用|若乳清析出不影响食用</li>
                <li>由于雾霾，大雾天气，航空延误等不可抗力因素，部分地区的小酸奶可能会晚到，请耐心等待哦</li>
                <li>购物须知</li>
            </ol>
        </div>
        <div class="foot">
            <p>总计：{{cartCount}}盒</p>
            <p>实付￥{{cartPrice}}</p>
            <button>立即支付</button>
        </div>
    </div>
</template>
<script>
    import { mapState, mapGetters } from 'vuex';
    export default {
        computed: {
            ...mapState('product', ['cartList']),
            ...mapGetters('product', ['cartCount', 'cartPrice'])
        }
    }
</script>
<style>
    @import url("../../../static/css/balance/style.css");
</style>