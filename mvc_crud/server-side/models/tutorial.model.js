module.exports = mongoose => {

   let tutorialSchema = mongoose.Schema({
        title: String,
        description: String,
        published: Boolean
    }, {
        timestamps: true
    })

    tutorialSchema.method("toJSON", function() {
        const {__v, _id, ...object} = this.toObject();
        object.id = _id;

        return object;
    });

    const Tutorial = mongoose.model("tutorial", tutorialSchema);

    return Tutorial;
};