<template lang="pug">
    transition(name="top")
        .return-to-top(v-if="scrolled" @click="scrollToTop()")
            fa(fas="angle-up" size="3x" )
</template>

<script>
import Vue from 'vue'
import Component from 'vue-class-component'
import { above, below } from '@core/misc/scrollFire'

@Component
export default class Top extends Vue {

    scrolled = false

    @above(265)
    show() {
        if (!this.scrolled) this.scrolled = true
    }

    @below(265)
    hide() {
        if (this.scrolled) this.scrolled = false
    }

    scrollToTop() {
        window.scroll({
            top: 0,
            behavior: 'smooth'
        })
    }
}
</script>


<style lang="stylus" scoped>
.return-to-top
    position fixed
    bottom 1em
    left 1em
    z-index 99
    width 50px
    height @width
    background #212121
    display flex
    justify-content center
    align-items center
    border-radius 5px
    opacity .7
    cursor pointer

    &.top-enter-active, &.top-leave-active
        transition opacity 300ms

    &.top-enter, &.top-leave-to
        opacity 0

    i
        color invert(@background)
</style>
