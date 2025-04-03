import { defineConfig } from 'vitepress';
import { withMermaid } from 'vitepress-plugin-mermaid';
import { tabsMarkdownPlugin } from 'vitepress-plugin-tabs';
import markdownItAbbr from 'markdown-it-abbr';
import navigation from './navigation.mjs';
import handleAbbr from './abbr.mjs';

// Автоматична генерація одночасно nav (меню в хедері) і сайдбару для кожного пункту nav
const { nav, sidebar } = navigation(
  /*
    Перший параметр функції (обов'язковий) - масив об'єктів з ключами:
      1) text (обов'язковий) - назва пункта меню, яка буде відображатись в хедері
      2) folder (обов'язковий) - назва папки з документацією, яка повинна відкриватись по кліку на пункт меню з хедера
        (на основі цієї папки буде автоматично сформований сайдбар)
      3) link (необов'язковий) - кастомне посилання, по стандарту веде на файл `docs/${forder}/index.md`
      4) інші необов'язкові ключі (activeMatch, target...) описані тут - https://vitepress.dev/reference/default-theme-nav#navigation-links
  */
  [
    {
      text: 'About me',
      folder: 'pet',
    },
  ],
  /*
    Другий параметр функції (НЕобов'язковий) - об'єкт з двома ключами:
      1) nav - параметри для налаштування хедера, може містити наступні ключі:
        * disableHome (Booleadn, default: false) - чи скрити пункт меню, який веде на головну
        * homeTitle (String, default: 'Головна') - назва пункту меню, який веде на головну
      2) sidebar - параметри для налаштування сайдбару, може містити наступні ключі:
        * ${назва_папки} (Object) - референс до кожного окремого сайдбару, який вказаний в першому параметрі функції. Ключем виступає те що вказано в folder. Перелік доступних ключів стандартний і описаний тут - https://github.com/jooy2/vitepress-sidebar#options
  */
  {
    nav: {
        disableHome: true,
        homeTitle: 'Home',
    },
    // sidebar: {
    //   'api': {
    //     includeFolderIndexFile: true,
    //   }
    // }
  },
  /*
    Третій параметр функції (НЕобов'язковий, default: '/docs') - вказує папку, в якій знаходиться конфігураційна папка .vitepress:
      - наприклад, якщо у вас в проєкті вже є інша документація і папка docs зайнята, то тут потрібно вказати нову назву папки
      - детальніше тут - https://github.com/jooy2/vitepress-sidebar?tab=readme-ov-file#documentrootpath
  */
  // '/docs-dev',
);

export default withMermaid(
  defineConfig({
    base: '/main-docs/',
      sitemap: {
        hostname: 'https://github.com/CrudelisDeus/main-docs'
      },
      // https://vitepress.dev/ru/reference/default-theme-last-updated
      lastUpdated: true,
    title: "Notes",
    description: "",

    ignoreDeadLinks: true,

    markdown: {
      config(md) {
        md.use(tabsMarkdownPlugin);
        md.use(markdownItAbbr);
        md.use(handleAbbr);
      },
      languageAlias: {
        'example': 'r',
        'schema-api': 'r',
        'scheme-api': 'r',
        'schema': 'r',
        'scheme': 'r'
      },
    },

    head: [
      ['script', { src: 'https://cdn.tailwindcss.com' }],

      ['script', {
        async: true,
        src: 'https://www.googletagmanager.com/gtag/js?id=G-99M10ZF9GL'
      }],
      ['script', {}, `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-99M10ZF9GL');`],

      ['meta', { name: 'robots', content: 'index, follow' }],
      ['link', { rel: 'icon shortcut', href: './logo-short.svg' }],
      ['script', {}, `
        document.documentElement.classList.add('dark');
        localStorage.setItem('vitepress-theme-appearance', 'dark');
      `]
    ],

    // https://vitepress.dev/reference/default-theme-config
    themeConfig: {
        nav,
        sidebar,

        appearance: false,

        logo: '/logo-short.svg',
        siteTitle: 'DeuSoft',

        outline: 'deep',

        search: {
          provider: 'local',
        },

        footer: {
          message: 'Released under the MIT License',
          copyright: 'Copyright © 2025-present Dmitry Shvydenko'
        },

        socialLinks: [
          { icon: 'github', link: 'https://github.com/CrudelisDeus', },
        ],

        navigationLinks: [
          { icon: 'github', link: 'https://github.com/CrudelisDeus', text: 'GitHub', },
        ],
    },
  })
);
