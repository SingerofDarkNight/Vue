import Vue from 'vue';

Vue.filter('tof', function(b: boolean): string {
  if (b) {
    return '可见';
  } else {
    return '不可见';
  }
})