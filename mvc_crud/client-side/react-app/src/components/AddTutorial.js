import React, {useState} from 'react';
import TutorialDataService from './../services/TutorialService';

const AddTutorial = () => {
    const initialTutorialState = {
        id: null,
        title: "",
        description: "",
        published: false
    };

    const [tutorial, setTutorial] = useState(initialTutorialState);
    const [submitted, setSubmitted] = useState(false);

    const handleInputChange = (event) => {
        const {name, value} = event.target;

        setTutorial({...tutorial, [name]: value});
    };

    const saveTutorial  = () => {
        var data = {
            title: tutorial.title,
            description: tutorial.description
        };

        TutorialDataService.create(data).then(response => {
            setTutorial({
                id: response.data.id,
                title: response.data.title,
                description: response.data.description,
                published: response.data.published
            });

            setSubmitted(true);
            console.log(response.data);
        }).catch (e => {
            console.log("error=", e);
        });
    };

    const newTutorial = () => {
        setTutorial(initialTutorialState);
        setSubmitted(false);
    };

    return (
        <div className="submit-form">
            {
                submitted ? (
                    <>
                    <h4>Your tutorial saved successfully.</h4>
                    <button onClick={newTutorial}>Add New</button>
                    </>
                ) : (
                    <>
                    <div className="form-group">
                        <label htmlFor="title">Title</label>
                        <input type="text"
                                className="form-control"
                                id="title"
                                name="title"
                                value={tutorial.title}
                                onChange={handleInputChange}
                                required
                                />
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <input type="text"
                                name="description"
                                id="description"
                                value={tutorial.description}
                                onChange={handleInputChange}
                                className="form-control"
                                required
                                />
                    </div>

                    <div className="form-group">
                        <button type="submit" onClick={saveTutorial} className="btn btn-success">Save</button>
                    </div>
                    </>
                )
            }
        </div>
    );
};

export default AddTutorial;
