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

    },

    // creating a new startup
    createNewStartup: async (req, res) => {
        console.log(req.body);
        try {
            const data = req.body;
            const newStartup = new Startup({
                company_name: data.companyName,
                city: data.city,
                starting_year: data.startingYear,
                founders: data.founders,
                industry: data.industry,
                funding_amount: data.fundingAmount
            })
            const saveData = await newStartup.save();
            res.status(200).json(saveData);

        }
        catch (err) {
            console.error('Error creating a new startup:', err);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    //searching startups
    searchStartups: async (req, res) => {
        const { q } = req.query;
        try {
            const data = await Startup.find({
                $or: [
                    { company_name: { $regex: new RegExp(q, 'i') } },
                    { industry: { $regex: new RegExp(q, 'i') }, },
                    { founders: { $regex: new RegExp(q, 'i') }, }

                ]
            })
            res.status(200).json(data);

        }
        catch (err) {
            console.error('Error searching startups:', err);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }



}

module.exports = startupController;

