/**
 * @jest-environment node
 */

const mdLinks = require('../index.js')
const extraerLinks = require('../extraerLinks.js');
const validateLinks = require('../validateLinks.js')
const metrics = require('../metrics.js');

const axios = require('axios');
jest.mock('axios');
const fs = require('fs');
jest.mock('fs');

const option1 = '--validate'
const option2 = '--stats'
const option3 = '--stats--validate'

const prueba = [{
  Url: 'https://nodejs.org/api/fs.html#fs_fs_readfile_path_options_callback',
  file: 'mdPrueba.md',
  text: 'Leer un archivo'
},
{
  Url: 'https://nodejs.org/api/fs.html#fs_fs_readdir_path_options_callback',
  file: 'mdPrueba.md',
  text: 'Leer un directorio'
},
{ Url: 'https://nodejs.org/api/path.html', file: 'mdPrueba.md', text: 'Path' },
{
  Url: 'https://medium.com/netscape/a-guide-to-create-a-nodejs-command-line-package-c2166ad0452e',
  file: 'mdPrueba.md',
  text: 'Linea de comando CLI'
},
{
  Url: 'https://medium.com/esteEsMIerror',
  file: 'mdPrueba.md',
  text: 'Esta Es mi Error'
}
]

const resultValidate = [
  {
    Url: 'https://nodejs.org/api/fs.html#fs_fs_readfile_path_options_callback',
    text: 'Leer un archivo',
    file: 'mdPrueba.md',
    status: 200,
    ok: 'ok'
  },
  {
    Url: 'https://nodejs.org/api/fs.html#fs_fs_readdir_path_options_callback',
    text: 'Leer un directorio',
    file: 'mdPrueba.md',
    status: 200,
    ok: 'ok'
  },
  {
    Url: 'https://nodejs.org/api/path.html',
    text: 'Path',
    file: 'mdPrueba.md',
    status: 200,
    ok: 'ok'
  },
  {
    Url: 'https://medium.com/netscape/a-guide-to-create-a-nodejs-command-line-package-c2166ad0452e',
    text: 'Linea de comando CLI',
    file: 'mdPrueba.md',
    status: 200,
    ok: 'ok'
  },
  {
    Url: 'https://medium.com/esteEsMIerror',
    text: 'Esta Es mi Error',
    file: 'mdPrueba.md',
    status: 503,
    fail: 'fail'
  }
]

const metricResult = { Total: 5, Broken: 1, Unique: 5 }

const path = '/Users/nataliarodriguez/Documents/Laboratoria/Md-links/prueba'

const resultExtracLinks = [
  {
    Url: 'https://github.com/markdown-it/markdown-it',
    text: 'markdown-it',
    file: '/Users/nataliarodriguez/Documents/Laboratoria/Md-links/prueba/mdPrueba copy.md'
  },
  {
    Url: 'https://developer.mozilla.org/es/docs/Web/JavaScript/Guide/Regular_Expressions',
    text: 'expresiones regulares (RegExp)',
    file: '/Users/nataliarodriguez/Documents/Laboratoria/Md-links/prueba/mdPrueba copy.md'
  },
  {
    Url: 'https://github.com/markedjs/marked',
    text: 'marked',
    file: '/Users/nataliarodriguez/Documents/Laboratoria/Md-links/prueba/mdPrueba copy.md'
  },
  {
    Url: 'https://github.com/jsdom/jsdom',
    text: 'JSDOM',
    file: '/Users/nataliarodriguez/Documents/Laboratoria/Md-links/prueba/mdPrueba copy.md'
  },
  {
    Url: 'https://github.com/cheeriojs/cheerio',
    text: 'Cheerio',
    file: '/Users/nataliarodriguez/Documents/Laboratoria/Md-links/prueba/mdPrueba copy.md'
  },
  {
    Url: 'https://github.com/markedjs/marked',
    text: 'marked',
    file: '/Users/nataliarodriguez/Documents/Laboratoria/Md-links/prueba/mdPrueba copy.md'
  },
  {
    Url: 'https://github.com/markdown-it/markdown-it',
    text: 'markdown-it',
    file: '/Users/nataliarodriguez/Documents/Laboratoria/Md-links/prueba/mdPrueba.md'
  },
  {
    Url: 'https://developer.mozilla.org/es/docs/Web/JavaScript/Guide/Regular_Expressions',
    text: 'expresiones regulares (RegExp)',
    file: '/Users/nataliarodriguez/Documents/Laboratoria/Md-links/prueba/mdPrueba.md'
  },
  {
    Url: 'https://github.com/markedjs/marked',
    text: 'marked',
    file: '/Users/nataliarodriguez/Documents/Laboratoria/Md-links/prueba/mdPrueba.md'
  },
  {
    Url: 'https://github.com/jsdom/jsdom',
    text: 'JSDOM',
    file: '/Users/nataliarodriguez/Documents/Laboratoria/Md-links/prueba/mdPrueba.md'
  },
  {
    Url: 'https://github.com/cheeriojs/cheerio',
    text: 'Cheerio',
    file: '/Users/nataliarodriguez/Documents/Laboratoria/Md-links/prueba/mdPrueba.md'
  },
  {
    Url: 'https://github.com/markedjs/marked',
    text: 'marked',
    file: '/Users/nataliarodriguez/Documents/Laboratoria/Md-links/prueba/mdPrueba.md'
  }
]

// test Validate Function 

describe(' This function validates the status of an array of links', () => {
  it('is a function', () => {
    expect(typeof validateLinks).toBe('function');
  });
  it('returns new array with two new keys, status and ok/fail options', () => {
    return validateLinks(prueba, option1).then(result => {
      expect(result).toEqual(resultValidate);
    })
  });
});


// test metrics Function 

describe(' This function returns statistics from an array', () => {
  it('is a function', () => {
    expect(typeof metrics).toBe('function');
  });

  it('returns new array with two new keys, status and ok/fail options', () => {
    expect(metrics(resultValidate, option3)).toEqual(metricResult);
  });
});

// test extraerLinks Function 

describe(' This function extracts the links from a file', () => {
  it('is a function', () => {
    expect(typeof extraerLinks).toBe('function');
  });
// esta esta ligada a toReadFiles que devuelve texto en HTML por eso no funciona 
  it('Returns an array of objects with the links that found in .md files', () => {
    return extraerLinks(path).then(result => {
      expect(result).toEqual(resultExtracLinks);
    })
  });
});

// mock

it('returns the arrays of links', async () => {
  axios.get.mockResolvedValue({
    data: [{
      Url: 'https://nodejs.org/api/fs.html#fs_fs_readfile_path_options_callback',
      file: 'mdPrueba.md',
      text: 'Leer un archivo'
    },
    {
      Url: 'https://nodejs.org/api/fs.html#fs_fs_readdir_path_options_callback',
      file: 'mdPrueba.md',
      text: 'Leer un directorio'
    },
    { Url: 'https://nodejs.org/api/path.html', file: 'mdPrueba.md', text: 'Path' },
    {
      Url: 'https://medium.com/netscape/a-guide-to-create-a-nodejs-command-line-package-c2166ad0452e',
      file: 'mdPrueba.md',
      text: 'Linea de comando CLI'
    },
    {
      Url: 'https://medium.com/esteEsMIerror',
      file: 'mdPrueba.md',
      text: 'Esta Es mi Error'
    }
    ]
  });

  const result = await validateLinks(prueba);
  expect(result).toEqual(resultValidate);
});