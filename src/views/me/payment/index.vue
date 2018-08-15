<template>
    <div class="payment">
        <nav>
            <ul>
                <router-link to="/payment/all" tag="li" active-class="active">全部</router-link>
                <router-link to="/payment/nopay" tag="li" active-class="active">代付款</router-link>
                <router-link to="/payment/nosend" tag="li" active-class="active">代发货</router-link>
                <router-link to="/payment/noput" tag="li" active-class="active">待收货</router-link>
                <router-link to="/payment/notell" tag="li" active-class="active">待评价</router-link>
            </ul>
        </nav>
        <section>
            <router-view></router-view>
        </section>
    </div>
</template>
<script></script>
<style>
    @import url("../../../../static/css/payment/style.css");
</style>