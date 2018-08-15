<template>
    <form>
        <label class="add-item">
            <span>联系人</span>
            <input type="text" placeholder="请输入姓名" v-model="name">
        </label>
        <label class="add-item">
            <span>手机号</span>
            <input type="tel" placeholder="请输入电话" v-model="phone">
        </label>
        <label class="add-item">
            <span>城市</span>
            <group style="flex:1">
                <!-- <calendar title="title" v-model="value"></calendar> -->
                <x-address title="" v-model="value" :list="addressData" placeholder="请选择地址" ref="address"></x-address>
            </group>
        </label>
        <label class="add-item">
            <span>收货地址</span>
            <input type="text" placeholder="请输入地址" v-model="address">
        </label>
        <label class="label-wrap">
            <p>选择地址标签</p>
            <div>
                <span @click="addActive($event)">住宅</span>
                <span @click="addActive($event)">公司</span>
                <span @click="addActive($event)">学校</span>
                <span @click="addActive($event)">家人</span>
                <span @click="addActive($event)">朋友</span>
                <span @click="addActive($event)">其他</span>
            </div>
        </label>
        <button @click="addresss" type="button">保存</button>

    </form>
</template>
<script>
    import { Group, XAddress, ChinaAddressV2Data } from 'vux'
    import api from '@/api/index'
    export default {
        data() {
            return {
                name: "",
                phone: "",
                address: "",
                bq: "",
                value: [],
                addressData: ChinaAddressV2Data
            }
        },
        mounted() {
            //console.log(this.addressData)
        },
        components: {
            Group,
            XAddress
        },
        methods: {
            addActive(event) {
                for (let i = 0; i < event.path[1].children.length; i++) {
                    event.path[1].children[i].classList.remove("active")
                }
                event.path[0].classList.add("active");
                this.bq = event.path[0].innerHTML;
            },
            addresss() {
                let mPattern = /^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,5-9]))\d{8}$/;
                if (this.name && mPattern.test(this.phone) && this.address && this.bq && this.value) {
                    this.value = [];
                    this.value.push(this.$refs.address.nameValue)
                    api.address.address({
                        name: this.name,
                        phone: this.phone,
                        address: this.address,
                        value: this.value.join(),
                        bq: this.bq
                    }).then(async (res) => {
                        console.log(res);
                        if (res.code == 1) {
                            return res.toString()
                        } else {
                            const data = await res.toString()
                            return Promise.reject(new Error(data.msg))
                        }
                    }).then((data) => {
                        console.log(data);
                        this.$router.push("/address")
                    }).catch((e) => {
                        console.log(e.message);
                    })
                } else {
                    console.log("请输入")
                }


            }
        }
    }
</script>
<style>
    @import url("../../../static/css/address/select/style.css");
    .weui-cells:before {
        border-top: none !important;
    }

    .weui-cells:after {
        border-bottom: none !important;
    }
</style>