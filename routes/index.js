
module.exports = function (app) {
    const spaceXCtrl = require("../controllers/spaceX");
    
    app.get("/launches", async (req, res) =>  {
      	try {
            const path = `/v4/launches/query`;

            const search = req.query.search ? { name:  { $regex: req.query.search }, upcoming: false }: { upcoming: false };

            const select = {
                name: 1,
                details: 1,
                links: 1,
            }

            const result = await spaceXCtrl.getSpaceXListItem(path, req, select, search);

            return res.status(200).json({ result: result });
        } catch (err) {
            
            console.error(err)
            res.status(500).json({
                message: "SORRY, PLEASE TRY AGAIN",
            });
        }
    });

    app.get("/rockets", async (req, res) => {
		try {
            const path = `/v4/rockets/query`;

            const select = {
                name: 1,
                description: 1,
                cost_per_launch: 1,
                flickr_images: 1
            }

            const result = await spaceXCtrl.getSpaceXListItem(path, req, select);

            return res.status(200).json({ result: result });
        } catch (err) {
           
            console.error(err)
            res.status(500).json({
                message: "SORRY, PLEASE TRY AGAIN",
            });
        }
    });

    app.get("*", async (req, res) => {
        return res.status(200).json({ result: 'TEST PROJECT' });
    });
};
