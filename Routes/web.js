const express = require('express');
const ContactController = require('../Controllers/ContactController');
const InternController = require('../Controllers/InternController');
const News_eventsControllers = require('../Controllers/News_eventsController');
const PortfolioControllers = require('../Controllers/PortfolioController');
const Slidercontroller = require('../Controllers/SliderController');
const TeamController = require('../Controllers/TeamCOntroller');


const router = express.Router();



//slidercontroller
router.post('/sliderinsert',Slidercontroller.sliderinsert)
router.get('/sliderdisplay',Slidercontroller.silderdisplay)
router.put('/sliderupdate/:id',Slidercontroller.updateslider)
router.get('/sliderdelete/:id',Slidercontroller.deleteslider)

//News events controller
router.post('/newsinsert',News_eventsControllers.News_eventsinsert)
router.get('/newsdisplay',News_eventsControllers.News_events_display)
router.put('/newsupdate/:id',News_eventsControllers.update_news_events)
router.get('/newsdelete/:id',News_eventsControllers.delete_news_events)

//Portfolio Controller
router.post('/portfolioinsert',PortfolioControllers.Portfolio_insert)
router.get('/portfoliodisplay',PortfolioControllers.Portfolio_display)
router.put('/portfolioupdate/:id',PortfolioControllers.update_portfolio)
router.get('/portfoliodelete/:id',PortfolioControllers.delete_portfolio)


//contactController
router.post('/contactinsert',ContactController.contactinsert)
router.get('/contactdisplay',ContactController.contactall)
router.delete('/contactdelete/:id',ContactController.deletecontact)


//InternshipController
router.post('/interninsert',InternController.Internship_insert)
router.get('/interndisplay',InternController.Intership_display)
router.get('/interndelete/:id',InternController.deleteintern)
router.get('/internview/:id',InternController.Internship_view)

//teamcontroller
router.post('/teaminsert',TeamController.teaminsert)
router.get('/teamdisplay',TeamController.Team_display)
router.put('/teamupdate/:id',TeamController.update_team)
router.get('/teamdelete/:id',TeamController.deleteteam)
module.exports = router