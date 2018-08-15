<template>
    <li>
        <router-link :to="{name:'Detail',params:{id:ite.id}}" tag="img" :src="ite.thumbnail" alt=""></router-link>
        <h2>{{ite.title}}</h2>
        <span>{{ite.tag }}
        </span>
        <p>
            <b>{{ite.price}}/盒</b>
            <Car @addCar="addCar($event)" :product="ite">
                <template slot-scope="scope">
                    <i @click="scope.add"></i>
                </template>

            </Car>
        </p>
    </li>
</template>
<script>
    import { mapState } from 'vuex'
    import Car from "@/components/shopcar/car"
    export default {
        props: {
            ite: {
                type: Object,
                default() {
                    return {}
                }
            }
        },
        components: {
            Car
        }
    }
</script>
<style></style>