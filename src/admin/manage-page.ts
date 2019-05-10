import Vue from "vue";
import Component from "vue-class-component";
import AdminGameList from './components/AdminGameList.vue';
import SideDrawer from "@/admin/components/drawer.vue";

@Component({
	components: {
        "admin-drawer": SideDrawer,
		"admin-game-list": AdminGameList
	}
})
export default class Manage extends Vue {}