<template>
  <div>Friend 页面</div>
</template>

<script>

export default {
  name: 'FriendComponent', // 用你的新组件名替换
  created() {
    this.$store.dispatch('initData');
  },
  computed: {},
  methods: {},

};
</script>

<style lang="css" scoped>

</style>
