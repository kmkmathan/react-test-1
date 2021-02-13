const fetch = require('node-fetch');

module.exports = {
    getSpaceXListItem: async function (path, req, select, search = {}) {

        const limit = req.query.limit ? req.query.limit :  20;

        const pageNumber = req.query.page ? req.query.page : 0;
        
        const response = await fetch(`https://api.spacexdata.com${path}`, {
            method: 'post',
            body: JSON.stringify(
                {
                    query: {
                        ...search
                }, 
                options: {
                    limit: limit, 
                    offset: (limit * pageNumber) || 0 ,
                    select: select
                }
            }),
            headers: {'Content-Type': 'application/json'}
        });
        const data = await response.json();

        return data;
    }
}
