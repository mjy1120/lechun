<template>
    <div class="wrap">
        <section>
            <div class="swiper">
                <swiper :options="swiperOption" ref="mySwiper">
                    <swiper-slide v-for="(item,index) in imgList" :key="index">
                        <img :src="item" alt="" width="100%">
                    </swiper-slide>
                </swiper>
            </div>
            <NavList/>
            <div class="list">
                <div v-for="(item, index) in lists" :key="index" class="one">
                    <h1>
                        <span>{{item.title}}</span>
                        <p>{{item.describe}}</p>
                    </h1>
                    <SmallList :lists="item.commodities" />
                </div>

            </div>
        </section>

    </div>
</template>
<script>
    import HeadBar from './components/headBar'
    import NavList from "./components/navlist"
    import Fetch from '@/utils/fetch';
    import { mapState } from 'vuex';
    import api from '@/api'
    import SmallList from "@/components/smalllist"
    import {
        swiper,
        swiperSlide
    } from 'vue-awesome-swiper';
    //import axios from "axios"
    export default {
        name: "home",
        data() {
            return {
                lists: [],
                change: false,
                imgList: ["http://resource2.lechun.cc/imgStorage/3192666929356045256.png", "http://resource2.lechun.cc/imgStorage/3192666929356045256.png"],
                swiperOption: {
                    notNextTick: true,
                    pagination: '.swiper-pagination',
                    slidesPerView: 'auto',
                    centeredSlides: true,
                    paginationClickable: true,
                    spaceBetween: 30,
                    autoplay: true,
                    loop: true,
                    onSlideChangeEnd: swiper => {
                        this.page = swiper.realIndex + 1;
                        this.index = swiper.realIndex;
                    }
                }
            }
        },
        components: {
            swiper,
            swiperSlide,
            NavList,
            SmallList
        },
        computed: {
            ...mapState('user', ['info']),
        },
        methods: {
            getList() {
                api.product.group().then((data) => {
                    //console.log(data)
                    this.lists = data.data
                })
            },
            clickTop() {
                //console.log(this.$refs.m0a)
            },
            addCar(count) {
                console.log(count)
            },
            changeMark() {
                this.change = true;
            }


        },
        created() {
            this.getList();
        },
        mounted() {
            this.clickTop();
        }
    }
</script>
<style>
    @import url("../../../static/css/home/style.css");
</style>