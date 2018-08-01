function loadModule(filename, module, require) {
    const wrappedSrc = `(function(module, exports, require){
        ${fs.readFileSync(filename, 'utf8')}    
    })(module, module.exports, require);`;
    eval(wrappedSrc);
}

// Acepta un nombre de module como entrada
const require = (moduleName) => { 
    console.log(`Require invoked for module: ${moduleName}`); 
    //Ubicacion del modulo con respecto a la carpeta node_modules
    const id = require.resolve(moduleName);      //[1] 
    // Si ya se ha cargado el modulo en el pasado
    if(require.cache[id]) {                      //[2] 
      return require.cache[id].exports; 
    } 
   
    // Se crea un modulo con el id
    const module = {                             //[3] 
      exports: {}, 
      id: id 
    }; 
    
    // Se cachea el modulo
    require.cache[id] = module;                  //[4] 
   
    //load the module 
    loadModule(id, module, require);             //[5] 
   
    //return exported variables 
    return module.exports;                       //[6] 
  }; 
  require.cache = {}; 
  require.resolve = (moduleName) => { 
    /* resolve a full module id from the moduleName */ 
  }; 
  