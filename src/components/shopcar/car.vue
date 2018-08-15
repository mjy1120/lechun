<template>
    <div class="btn">
        <div class="car-btn" v-show="count!=0">
            <button :disabled="count==0" @click="decrease">-</button>
            <span>{{getCount}}</span>
            <button @click="add">+</button>
        </div>
        <div v-show="count==0">
            <slot :add="add"></slot>
        </div>
    </div>
</template>
<script>
    import { mapState } from 'vuex';
    export default {
        name: "",
        data() {
            return {
                count: 0
            }
        },
        props: {
            product: {
                type: Object,
                default() {
                    return {}
                }
            }
        },
        methods: {
            add() {
                this.count += 1;
                this.$store.dispatch('product/setCarItem', {
                    ...this.product,
                    shopCount: this.count
                });
            },
            decrease() {
                if (this.count <= 0) {
                    this.count = 0;
                }
                this.count -= 1;
                this.$store.dispatch('product/setCarItem', {
                    ...this.product,
                    shopCount: this.count
                })
            }
        },
        computed: {
            ...mapState('product', ['cartList']),
            getCount() {
                const cartItem = this.cartList.filter((item, index) => {
                    return item.id === this.product.id
                })
                this.count = cartItem.length >= 1 ? cartItem[0].shopCount : 0;
                return this.count;
            }
        }
    }
</script>
<style>
    @import url("../../../static/css/car/style.css");
</style>