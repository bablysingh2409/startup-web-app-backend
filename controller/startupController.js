const Startup = require('../model/startup');

const startupController = {
    getAllStartups: async (req, res) => {
        try {
            const data = await Startup.find();
            res.status(200).json(data);
        }
        catch (err) {
            console.error('Error fetching startups:', err);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    //fetching startup data based on industry type
    getStartupByIndustry: async (req, res) => {
        const { industry } = req.params;
        try {
            const data = await Startup.find({ industry });
            res.status(200).json(data);
        }
        catch (err) {
            console.error('Error fetching startups by industry:', err);
            res.status(500).json({ error: 'Internal Server Error' });
        }

    }


}

module.exports = startupController;

