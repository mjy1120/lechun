<template>
    <div class="detail">
        <div class="top">
            <img :src="detail.background" alt="">
        </div>
        <div class="bottom">
            <h2>
                <p>
                    <span>{{detail.title}}</span>
                    <b>{{detail.tag}}</b>
                </p>
                <b>{{detail.price}}元/盒</b>
            </h2>
            <div class="car">
                <ul>
                    <li>净含量：
                        <span>135g/盒</span>
                    </li>
                    <li>保质期：
                        <span>21天</span>
                    </li>
                    <li>储存条件：
                        <span>请于2-6℃冷藏保存</span>
                    </li>
                </ul>
                <Car :product="detail">
                    <template slot-scope="scope">
                        <button @click="scope.add">加入购物车</button>
                    </template>
                </Car>

            </div>
            <div class="content">
                <h2>产品介绍：</h2>
                <p>
                    作为国内第一家紫薯黑米风味的希腊酸奶，紫薯搭配着黑米，口感很丰富，每一口都非常紧实。新鲜的紫薯碾压成泥，加上经过了多道工序精心烘焙的紫薯粉，使其颜色、风味和营养价值都得到了最大的保留。紫色的花青素混合上醇厚的酸奶，创造出了时尚浪漫的紫粉色，给你满满的幸福感
                </p>
            </div>
            <div class="yr">
                <h1>——营养成分——</h1>
            </div>
        </div>
    </div>
</template>
<script>
    import api from '@/api';
    import { mapState } from 'vuex';
    import Car from "@/components/shopcar/car"
    export default {
        name: "",
        data() {
            return {
                detail: {}
            }
        },
        components: {
            Car
        },
        methods: {
            getDetail() {
                api.product.detail({
                    id: this.$route.params.id
                }).then((data) => {
                    console.log(data)
                    this.detail = data.data
                })
            }
        },
        computed: {
            spec() {
                return JSON.parse(this.detail.spec)
            }
        },
        created() {
            this.getDetail();
        }
    }
</script>
<style>
    @import url("../../../../static/css/detail/style.css");
</style>