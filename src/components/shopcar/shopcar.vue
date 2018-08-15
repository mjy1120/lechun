<template>
    <div class="mark">
        <div class="mark_one" @click="hide">
        </div>
        <div class="car">
            <h2> 小伙伴，选购商品满90元起送哦 </h2>
            <div class="content">
                <ol>
                    <li v-for="(item, index) in cartList" :key="index">
                        <span>{{item.title}}</span>
                        <Car :product="item" />
                    </li>
                </ol>
            </div>
            <div class="foot">
                <p>
                    <span>
                        <em>{{cartCount}}</em>盒商品</span>
                    <span>合计：
                        <em>￥{{cartPrice}}</em>
                    </span>
                </p>
                <div ref="balance" @click="balance">
                    下单
                </div>
            </div>
        </div>
    </div>

</template>
<script>

    import { mapState, mapGetters } from 'vuex';
    import Car from "@/components/shopcar/car"
    export default {
        name: "shopcar",
        data() {
            return {
                count: 1,
                list: []
            }
        },
        methods: {
            hide() {
                this.$emit("hide")
            },
            balance() {
                //console.log(this.$store.state.product.cartList)
                if (this.$store.state.product.cartList.length > 0) {
                    this.$router.push("/balance")
                } else {
                    alert("请选择商品")
                }
            }
        },
        components: {
            Car
        },
        computed: {
            ...mapState('product', ['cartList']),
            ...mapGetters('product', ['cartCount', 'cartPrice'])
        }
    }
</script>
<style scoped>
    @import url("../../../static/css/mark/style.css");
</style>