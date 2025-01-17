const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    contactinfo: { type: String, required: true, unique: true, },
    password: { type: String, required: true },
});

const modeldataSchema = new mongoose.Schema({
    //  contributors, citation, visibility
    // image: { type: String, required: true },
    coordinates: {
        latitude: { type: String, required: true },
        longitude: { type: String, required: true },
    },
    contactid: { type: String, required: true },
    contactinfo: { type: String, required: true },
    index: {type: Number, required: true, unique: true },
    // image
    title: { type: String, required: true },
    // year,
    address: { type: String, required: true },
    description: { type: String, required: true },
    largeDescription: { type: String, required: true },
    info: {
        releaseDate: { type: String, required: true },
        
        author: { type: String, required: true },
        license: { type: String, required: true },
        tags: [{ type: String, required: true }],
        size: { type: String, required: true },
        smallestVisibleFeature: { type: String, required: true },

        state: { type: String, required: true },
        modelLink: { type: String, required: true  },

        GeologicalAgesOptions: [{ type: String }],
        ClasticSedimentologyOptions: [{ type: String }],
        CarbonateAndEvaporiteSedimentologyOptions: [{ type: String }],
        MetamorphicOptions: [{ type: String }],
        ExtrusiveIgneousOptions: [{ type: String }],
        IntrusiveIgneousOptions: [{ type: String }],
        StructureOptions: [{ type: String }],
        FossilsOptions: [{ type: String }],
        QuaternaryGeomorphologyOptions: [{ type: String }],
    },
    contributors: [{ type: String, required: true }],
    citation: { type: String, required: true },
    visibility: { type: String, required: true },
});

const User = mongoose.model("UserInfo", userSchema);
const ModelData = mongoose.model("ModelInfo", modeldataSchema);

module.exports = {
    User,
    ModelData
};