<template>
    <div class="home">

        <HeadBar/>
        <Home/>
        <Footbar/>
    </div>
</template>
<script>
    import HeadBar from './home/components/headBar'
    import Footbar from "@/components/footerBar"

    import Home from "./home/home"
    export default {
        name: "indexPage",
        components: {
            HeadBar,
            Home,
            Footbar
        }
    }
</script>
<style>
</style>