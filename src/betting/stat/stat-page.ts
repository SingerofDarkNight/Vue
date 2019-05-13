import Vue from "vue";
import Component from "vue-class-component";
import statCard from '../components/statCard.vue';
import statTable from '../components/statTable.vue'
@Component({
  components: {
    statCard: statCard,
    statTable: statTable
  }
})
export default class StatPage extends Vue {
}
