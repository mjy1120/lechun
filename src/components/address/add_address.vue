<template>
    <div>
        <ul>
            <li v-for="(item) in list" :key="item.id">
                <p>
                    <span>{{item.name}}
                        <i>{{item.phone}}</i>
                    </span>
                    <span>
                        <b>[{{item.bq}}]</b>
                        <i v-for="(ite,ind) in item.value.split(',')" :key="ind">
                            {{ite}}
                        </i>
                        <i>{{item.address}}</i>
                    </span>
                </p>
                <p>
                    <i class="iconfont icon-quanbudingdan-01"></i>
                </p>
            </li>
        </ul>
        <router-link to="/selectAddress" tag="button">
            + 新建地址
        </router-link>
    </div>
</template>
<script>
    import api from "@/api"
    export default {
        data() {
            return {
                list: []
            }
        },
        mounted() {
            api.address.addressList().then(data => {
                console.log(data.data);
                this.list = data.data;
            })
        }
    }
</script>
<style>
    div {
        width: 100%;
        height: 100%;
        position: relative;
        background: #f5f5f7;
    }

    ul {
        width: 100%;
    }

    ul li {
        height: .8rem;
        display: flex;
        padding: 0 .07rem;
        justify-content: space-between;
        padding: 0 .06rem;
        background: #fff;
        border-bottom: 1px solid #ccc;
    }

    ul li p {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
    }

    ul li p span {
        color: #000;
    }

    ul li p i {
        color: #999;
        margin-left: .05rem;
    }

    ul li p b {
        color: red;
        font-weight: 800;
    }

    button {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: .45rem;
        background: rgba(9, 9, 61, 0.883);
        color: #fff;
        text-align: center;
        border: none;
    }
</style>