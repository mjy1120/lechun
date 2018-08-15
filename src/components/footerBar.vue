<template>
    <footer>
        <ul>
            <router-link tag="li" to="/indexPage" active-class="change">
                <i></i>
                <span>主页</span>
            </router-link>
            <li @click="show">
                <i class="bag">购物袋</i>
                <span></span>
            </li>
            <router-link tag="li" to="/person" active-class="change">
                <i class="me"> </i>
                <span>我的乐纯</span>
            </router-link>
        </ul>
        <Mark v-show="change" @hide="hideMark" />

    </footer>
</template>
<script>
    import Mark from "@/components/shopcar/shopcar"

    export default {
        data() {
            return {
                change: false,
            }
        },
        methods: {
            show() {
                this.change = true;
                document.body.style.overflow = 'hidden';
            },
            hideMark() {
                this.change = false;
                document.body.style.overflow = 'auto';
            }
        },
        components: {
            Mark
        }
    }
</script>
<style>
    @import url("../../static/css/footer/style.css");
</style>