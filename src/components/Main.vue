<template>
    <Navbar/>
    <Table/>
    <Footer/>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import Table from "@/components/Table.vue";
import Footer from "@/components/Footer.vue";

export default {
    name: "Main",
    components: {
        Footer,
        Table,
        Navbar,
    },
}
</script>

<style scoped>

</style>