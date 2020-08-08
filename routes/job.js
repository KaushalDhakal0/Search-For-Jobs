const express = require('express');

const router = express.Router();
const db = require('../config/database');
const Job = require('../models/job_model');
const hbs = require('express-handlebars');

//the below routing works on path /jobs/
//getting jobs list
router.get('/', (req, res)=> {
    Job.findAll()
        .then( (jobs) =>{

            console.log(typeof(jobs));
            res.render('jobs' , {
                jobs: jobs.map(jobs => jobs.toJSON())
            });
        })
        .catch( err => console.log(err));
});

//displaying form
router.get('/add', (req, res) =>{
    res.render('add');
});

//add a job


router.post('/add' , (req, res) =>{
    // const data ={
    //     title: req.body.title,
    //     technologies: req.body.technologies,
    //     budget : req.body.budget,
    //     description: req.body.description,
    //     contact_email: req.body.contact_email
    // }

    //the line below will parse datas from req.body
    console.log(req.body);
    let{title, technologies, budget, description, contact_email} = req.body;
    let errors = [];

    //validate Fielda
    if(!title){
        errors.push('please add title....')
    }
    if(!technologies){
        errors.push({
            text: 'please add some technologies....'
        })
    }
    if(!contact_email){
        errors.push({
            text: 'please add your contact-email....'
        })
    }

//Check for errors

    if (errors.length > 0) {
        console.log('hello world');

        res.render('add', {
            errors,
            title, 
            technologies, 
            budget, 
            description, 
            contact_email

        })
        
    } else {
        Job.create({
            title,
            technologies,
            budget,
            description,
            contact_email
    
             })
                .then(jobs =>{
                res.redirect('/jobs');
                })
                .catch(err => console.log(err));

    }


    //inserting values into table
    //create() => takes parameters with created model
    //create returns a promise
    
        


});

module.exports = router;