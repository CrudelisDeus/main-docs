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
      text: 'PET',
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
      disableHome: false,
      homeTitle: 'Главная',
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
    base: '/',

    title: "Docs",
    description: "DevOps docs",

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
      ['link', { rel: 'icon shortcut', href: './logo-short.svg' }],
    ],

    // https://vitepress.dev/reference/default-theme-config
    themeConfig: {
      nav,
      sidebar,

      logo: '/logo.svg',
      siteTitle: false,

      outline: 'deep',

      search: {
        provider: 'local',
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
