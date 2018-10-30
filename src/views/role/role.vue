<template>
    <Row>
        <Col>
            <Card>
                <span>角色名称</span>
                <Input v-model="role" placeholder="请输入角色名称" clearable style="width: 200px"></Input>

                <Button class="margin-left-10" type="primary" icon="search" @click="search">查询</Button>
                <Button class="margin-left-10" type="primary" icon="search" @click="add">新增</Button>
            </Card>
        </Col>
    </Row>
</template>

<script>
    import selRole from '../../service/userQuery.js';
    export default {
    data () {
            return {
                role: ''
            };
    },
    created () {
            this.selRole(this.param)
                .then(res => {
                    console.log(res, 'res');
                });
    },
    methods: {
            search () {

            },
            add () {

            }
    }
};
</script>

<style scoped>

</style>