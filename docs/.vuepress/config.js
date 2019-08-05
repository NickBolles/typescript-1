const fs = require('fs-extra')

module.exports = {
  title: 'TypeScript Module',
  description: 'TypeScript Support Module for Nuxt',
  themeConfig: {
    repo: 'nuxt/typescript',
    docsDir: 'docs',
    editLinks: true,
    editLinkText: 'Edit this page on GitHub',
    displayAllHeaders: true,
    sidebar: {
      '/examples': getExamplesSidebar(),
      '/': getMainSidebar()
    },
    nav: [
      {
        text: 'Guide',
        link: '/guide/'
      },
      {
        text: 'Examples',
        link: '/examples/object-api/minimal'
      }
    ]
  }
}

function getMainSidebar () {
  return [
    {
      title: 'Guide',
      collapsable: false,
      children: [
        '/guide/',
        '/guide/setup',
        '/guide/lint',
        '/guide/deployment'
      ]
    },
    {
      title: 'Cookbook',
      collapsable: false,
      children: [
        '/cookbook/components',
        '/cookbook/middlewares',
        '/cookbook/plugins',
        '/cookbook/configuration',
        '/cookbook/modules',
        '/cookbook/server-middlewares'
      ]
    }
  ]
}

function getExamplesSidebar () {
  const apiNames = ['object', 'class', 'function']
  const levels = ['minimal', 'basic', 'advanced']

  return apiNames.map((apiName) => {
    return {
      title: `${apiName[0].toUpperCase() + apiName.slice(1)} API`,
      collapsable: false,
      children: levels.map((level, index) => {
        generateExampleMarkdown(apiName, level, index === 0 ? { prev: false } : index === levels.length - 1 ? { next: false } : {})
        return [`/examples/${apiName}-api/${level}`, level[0].toUpperCase() + level.slice(1)]
      })
    }
  })
}

function generateExampleMarkdown (apiName, level, options = {}) {
  const comingSoon = !fs.existsSync(`../examples/${apiName}-api/${level}`)
  let content = ''

  if (Object.keys(options).length > 0) {
    content += '---\n'
    for (const [key, value] of Object.entries(options)) {
      content += `${key}: ${value}\n`
    }
    content += '---\n\n'
  }

  content += `# ${apiName[0].toUpperCase()}${apiName.slice(1)} API example (${level})\n\n`

  if (comingSoon) {
    content += '### Coming Soon ...\n\n'
    content += `<!-- <Example name="${apiName}-api/${level}" /> -->\n`
  } else {
    content += `<Example name="${apiName}-api/${level}" />\n`
  }

  fs.outputFileSync(`./examples/${apiName}-api/${level}.md`, content)
}