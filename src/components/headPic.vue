<template>
    <div class="head-bg">
        <div class="head-pic">
            <img src="" width="100%" height="100%">
        </div>
        <div class="head-body">
            <div class="nick-name">这里是昵称</div>
            <div class="point">
                <div class="point-jb">
                    <div class="jb-big">金币</div>
                    <div class="jb-small">123456</div>
                </div>
                <div class="point-pt">
                    <div class="jb-big">积分</div>
                    <div class="jb-small">123456</div>
                </div>
            </div>
            <div class="black-btn">
                <Button type="success" long>我的竞猜</Button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    
}
</script>

<style>
.head-bg {
    width: 270px;
    height: 300px;
}

.head-pic {
    width: 100%;
    height: 33%;
}

.head-body {
    display: flex;
    flex-direction: column;
    background: #fff;
    height: 66%;
    padding: 10px 20px;
}

.nick-name {
    color: #000;
    font-size: 22px;
    font-weight: 600;
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 1;
}

.point {
    display: flex;
    justify-content: space-around;
    height: 100%;
}

.point-jb,
.point-pt {
    display: flex;
    align-items: center;
    justify-content: space-around;
    flex-direction: column;
    font-weight: 600;
    padding: 10px 20px;
}

.jb-big {
    font-size: 18px;
}

.jb-small {
    font-size: 14px;
}

.black-btn {
    display: flex;
    justify-content: center;
    align-items: center;
}

.black-btn > .ivu-btn-success {
    background: #000!important;
    border-color: #000!important;
}
</style>

