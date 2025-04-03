<script setup>
import DefaultTheme from 'vitepress/theme';
import Panzoom from './components/Panzoom.vue';
import NavigationLinks from './components/NavigationLinks.vue';
import GTMNoScript from './components/GTMNoScript.vue'; // 1. Импортируем компонент

const { Layout } = DefaultTheme;
</script>

<template>
  <Layout>
    <template #layout-top>
      <GTMNoScript />
    </template>

    <template #aside-outline-after>
      <NavigationLinks />
    </template>
  </Layout>

  <Panzoom />
</template>