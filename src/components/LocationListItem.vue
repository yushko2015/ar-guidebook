<template>
    <el-card class="box-card location-card" shadow="never">
       <div class="location-name">{{ location.name }}</div>
       <div class="location-coords">
        <div class="location-latitude"><span>Latitude: </span>{{ location.latitude }}</div>
        <div class="location-longitude"><span>Longitude: </span>{{ location.longitude }}</div>
       </div>
    </el-card>
</template>
<script>
export default {
    props: {
        location: {
            type: Object
        }
    }
}
</script>
<style scoped>
.box-card {
    display: flex;
    flex-direction: column;
}
.location-coords {
    display: flex;
    font-size: 1.5rem;
    gap: 1vw;
    color: #ececec;
}
.location-name {
    text-align: left;
    font-size: 2.5em;
    font-weight: 600;
}
.location-card {
   
}
</style>