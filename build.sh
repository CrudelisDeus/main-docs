vitepress build docs

# cv cp
mkdir -p docs/.vitepress/dist/pet/img/index
cp -r docs/pet/img/index/*.pdf docs/.vitepress/dist/pet/img/index

# robots && sitemap
cp robots.txt docs/.vitepress/dist