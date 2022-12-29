<template>
    <div>
        
    </div>
</template>

<script>
export default {
    data() {
        return {
            
        }
    },
    methods: {
        apiTestFun(){
            this.$api.list(id).then(res => {
            if (res.rc === 0) {
                this.pageList = res.data.item
            } else {
                this.$Message.info(res.desc);
            }
            })
            .catch(error => {
                this.$Message.info(error);
            })
        },  
    },
}
</script>