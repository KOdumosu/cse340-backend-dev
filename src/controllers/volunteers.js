import {
    addVolunteer,
    removeVolunteer
} from '../models/volunteers.js';

export const volunteerForProject =
async (req,res,next) => {

    try {

        const userId =
            req.session.user.user_id;

        const projectId =
            req.params.projectId;

        await addVolunteer(
            userId,
            projectId
        );

        req.flash(
            'success',
            'Volunteer signup successful'
        );

        res.redirect(
            `/projects/${projectId}`
        );

    } catch(error){
        next(error);
    }
};

export const removeVolunteerSignup =
async (req,res,next) => {

    try {

        const userId =
            req.session.user.user_id;

        const projectId =
            req.params.projectId;

        await removeVolunteer(
            userId,
            projectId
        );

        req.flash(
            'success',
            'Volunteer removed'
        );

        res.redirect('/dashboard');

    } catch(error){
        next(error);
    }
};