import React from "react";

export const About = () => {
    return (
        <div>
            <div className="d-none d-lg-block">
                <div className="row g-0 mt-5">
                    <div className="col-sm-6 col-md-6">
                        <div className="col-image-left"></div>
                    </div>
                    <div className="col-4 col-md-4 container d-flex justify-content-center align-items-center">
                        <div className="ml-2">
                            <h1>What have you been reading?</h1>
                            <p className="lead">
                                "Book readers are special people and they will always turn to
                                books as the ultimate pleasure." Indeed, you all are! We here,
                                are curious to know what you have been reading, in order to
                                furnish the top content for you!
                            </p>
                        </div>
                    </div>
                </div>
                <div className="row g-0">
                    <div className="col-4 col-md-4 container d-flex justfy-content-center align-items-center">
                        <div className="ml-2">
                            <h1>Our collection is always expanding!</h1>
                            <p className="lead">
                                Try visiting us on a regular basis in order to stay updated.
                                Whether you’re an avid reader seeking fresh material or a
                                learner looking for new resources, our ever-changing collection
                                is sure to have something that will pique your interest and
                                meet your needs.
                            </p>
                        </div>
                    </div>
                    <div className="col-sm-6 col-md-6">
                        <div className="col-image-right"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};