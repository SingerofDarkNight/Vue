<template>
	<div>
		<div>
			<drawer></drawer>
		</div>
	</div>

</template>

<script lang="ts">
	import Vue from "vue";
	import Component from "vue-class-component";
	import SideDrawer from "../components/drawer.vue"

	@Component({
		components: {
			drawer: SideDrawer,
		}
	})
	export default class Create extends Vue {

	}
</script>

<style scoped>

</style>
