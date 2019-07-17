<template>
  <div class="d-flex">
    <div class="input-group-prepend">
      <span class="input-group-text">
        <template v-if="typeof translatedTitle === 'string'">{{ translatedTitle }}</template>
        <template v-else>
          {{ translatedTitle.title }}
          <small class="textInputTooltip text-info" data-toggle="tooltip" data-html="true" :title="translatedTitle.help">[?]</small>
        </template>
      </span>
    </div>
    <ul class="list-group list-group-flush w-100 border border-input">
      <li class="list-group-item border-0 d-flex" v-for='(v, index) of currentValues' :ref='"list_" + index' :key="index">
        <div class="text-muted btn"
          style="cursor: grab;"
          v-on:dragstart="dragstart(index, $event)"
          v-on:dragend="dragend(index, $event)"
          v-on:dragenter="dragenter(index, $event)"
          draggable="true">
          <i class="fas fa-ellipsis-v"></i>
        </div>
        <div class="w-100" :key="index">
          <input type="text" class="form-control" v-model="currentValues[index]" readonly="true"/>
        </div>
        <button class="btn btn-outline-dark border-0" @click="toggleItem(index)">
          <i class="fas" :class="{ [toggleonicon]: !isToggled(index), [toggleofficon]: isToggled(index) }"></i>
        </button>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator';

import { xor } from 'lodash';

@Component({})
export default class sortableList extends Vue {
  @Prop() readonly values: any;
  @Prop() readonly toggle: any;
  @Prop() readonly toggleonicon: any;
  @Prop() readonly toggleofficon: any;
  @Prop() readonly title: any;

  currentValues = this.values;
  currentToggle = this.toggle;
  translatedTitle = this.translate(this.title);
  draggingItem: any = null;

  @Watch('currentValue')
  onChange() {
    this.$emit('update', { value: this.currentValues, toggle: this.currentToggle })
  }

  toggleItem(idx) {
    this.currentToggle = xor(this.currentToggle, [this.currentValues[idx]]);
    this.$forceUpdate()
    this.onChange()
  }
  isToggled (idx) {
    const value = this.currentValues[idx]
    return this.currentToggle.indexOf(value) !== -1
  }
  dragstart(item, e) {
    this.draggingItem = item;
    this.$refs['list_' + item][0].style.opacity = 0.5;
    e.dataTransfer.setData('text/plain', 'dummy');
  }
  dragenter(newIndex, e) {
    const value = this.currentValues[this.draggingItem]
    this.currentValues.splice(this.draggingItem, 1);
    this.currentValues.splice(newIndex, 0, value);
    this.draggingItem = newIndex;

    for (let i = 0, length = this.currentValues.length; i < length; i++) {
      this.$refs['list_' + i][0].style.opacity = 1;
    }
    this.$refs['list_' + newIndex][0].style.opacity = 0.5;

    this.$forceUpdate()
    this.onChange()
  }
  dragend(item, e) {
    for (let i = 0, length = this.currentValues.length; i < length; i++) {
      this.$refs['list_' + i][0].style.opacity = 1;
    }
  }
}
</script>