<script setup>
import { computed } from 'vue';
import { useData } from 'vitepress';

const { frontmatter, theme } = useData();

const headingLabel = computed(() => frontmatter.value.navigationLinksLabel || 'Link:');

const links = computed(() => {
  const arr = [];

  if (frontmatter.value.navigationLinks && Array.isArray(frontmatter.value.navigationLinks) && frontmatter.value.navigationLinks.length) {
    frontmatter.value.navigationLinks.forEach(link => {
      arr.push(formatLink(link));
    });
  }

  if (theme.value.navigationLinks && Array.isArray(theme.value.navigationLinks) && theme.value.navigationLinks.length && !frontmatter.value.navigationLinksHideGlobal) {
    theme.value.navigationLinks.forEach(link => {
      arr.push(formatLink(link));
    });
  }

  return arr;
});

function formatLink(linkObj) {
  const { link } = linkObj;

  return {
    ...linkObj,
    isTargetBlank: link.startsWith('http') || link.startsWith('www'),
  }
}
</script>

<template>
  <div v-if="links.length" class="nav-links">
    <div v-if="headingLabel?.length" class="nav-links__item">
      <span class="nav-links__heading">{{ headingLabel }}</span>
    </div>

    <a v-for="(link, idx) in links" :key="idx" :href="link.link" :target="link.isTargetBlank ? '_blank' : '_self'" class="nav-links__item">
      <i v-if="link.icon" :class="`nav-links__icon ti ti-${link.icon}`"></i>

      <span v-if="link.text" class="nav-links__text">{{ link.text }}</span>

      <i v-if="link.isTargetBlank" class="nav-links__target ti ti-arrow-up-right"></i>
    </a>
  </div>
</template>

<style lang="scss" scoped>
.nav-links {
  display: flex;
  flex-direction: column;
  margin: 30px 0 0;
  padding-left: 16px;
  border-left: 1px solid var(--vp-c-divider);

  // .nav-links__item
  &__item {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 0;
    color: var(--vp-c-text-2);
    transition: color 0.5s;

    &:hover {
      color: var(--vp-c-text);
    }
  }

  // .nav-links__icon
  &__icon {
    font-size: 18px;
  }

  // .nav-links__heading
  &__heading {
    font-size: 14px;
    font-weight: 600;
    line-height: 1;
    color: rgba(60, 60, 67);
  }

  // .nav-links__text
  &__text {
    font-size: 14px;
    font-weight: 400;
    line-height: 1;
  }

  // .nav-links__target
  &__target {
    align-self: flex-start;
    font-size: 12px;
    margin-left: -4px;
  }
}
</style>
