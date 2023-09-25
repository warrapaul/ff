module.exports = {
    apps:[
        {
            name:'proj',
            script:'/home/warra/Documents/projects/boilerplates/proj/dist/main.js',
            instances: 2,  // The number of instances in your cluster
            autorestart: true,
            exect_mode:'cluster',
            max_memory_restart:'250M' // Set the desired heap size here
        }
    ]
}

//pm2 start pm2.config.js
