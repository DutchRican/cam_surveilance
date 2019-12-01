<template>
    <div class="page-header text-center">
        <h1 class="app-header">Home Security</h1>
        <font-awesome-icon icon="cog" size="lg" class="settings-cog" v-on:click="toggleSettings"></font-awesome-icon>
        <Settings v-if="$store.state.isShowSettings" />
    </div>
</template>

<script>
import Settings from './Settings.vue';

export default {
    name: 'Header',
    components: {
        Settings
    },
    methods: {
        toggleSettings() {
            this.$store.dispatch('toggleSettings');
        }
    },
    computed: {
        isShowSettings() {
            return this.$store.state.isShowSettings;
        }
    }
}
</script>
<style scoped>
    .page-header {
        height: 4em;
        background-color: #e7d8c5a8;
        display: flex;
        justify-content: space-between;
    }
    .app-header {
        flex:2;
    }
    .settings-cog {
        float: right;
        margin: auto 15px;
    }
</style>