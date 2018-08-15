<template>
    <ul>
        <Item v-for="(item,index) in lists" :key="index" :ite="item" />

    </ul>


</template>
<script>
    import Item from "@/components/list.vue"
    export default {
        name: "Smalllist",
        props: {
            lists: {
                type: Array,
                default() {
                    return []
                }
            }
        },

        components: {
            Item
        },
    }
</script>
<style></style>