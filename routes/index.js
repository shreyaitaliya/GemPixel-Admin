const express = require('express');

const routes = express.Router();

const adminuserController = require('../controllers/adminUserController')

// Login Routes
routes.use('/login', require('../routes/loginRoutes'));

// user Routes
routes.use('/user', require('../routes/userRoutes'));

// Add BlogCategory
routes.use('/blogcategory', require('../routes/blogCategoryRoutes'));

// Add BlogPost
routes.use('/blogpost', require('../routes/blogpostRoutes'));

// Channel Routes
routes.use('/channel', require('../routes/channelRoutes'));

// QRcode Routes
routes.use('/qrcode', require('../routes/qrcodeRoutes'));

// Campaign Routes   
routes.use('/campaign', require('../routes/campaignRoutes'));

// CustomSplash Routes
routes.use('/custom', require('../routes/customsplashRoutes'));

// Pixel Routes
routes.use('/pixel', require('../routes/pixelRoutes'))

// CTA Poll Routes
routes.use('/poll', require('../routes/CTApollRoutes'))

// CTA Message Routes
routes.use('/message', require('../routes/CTAMessageRoutes'))

// CTA Newsletter Routes
routes.use('/newsletter', require('../routes/CTANewsletterRoutes'))

// CTA Image Routes
routes.use('/image', require('../routes/CTAImageRoutes'))

// CTA Coupon Routes
routes.use('/coupon', require('../routes/CTACouponRoutes'));

// CTA Contact Routes
routes.use('/contact', require('../routes/CTAContactRoutes'));

// Bio Routes
routes.use('/bio', require('../routes/bioRoutes'));

// Domain Routes
routes.use('/domain', require('../routes/domainRoutes'));

// Page Routes
routes.use('/page', require('../routes/pageRoutes'));

// ArticleCategory Routes
routes.use('/articlecategory', require('../routes/articleCategoryRoutes'));

// Article Routes
routes.use('/article', require('../routes/articleRoutes'));

module.exports = routes;      