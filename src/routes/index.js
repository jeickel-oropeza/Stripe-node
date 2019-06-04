const{ Router } = require('express');
const router = Router();
const stripe = require('stripe')('sk_test_hLICn1ojxOWPPFjSUC1NdCdp00Z8TDmcY8');

router.get('/', (req, res) => {
    res.render('index');
});

router.post('/checkout', async (req, res) => {
    console.log(req.body);
    const customer = await stripe.customers.create({
        email: req.body.stripeEmail,
        source: req.body.stripeToken
    });
    const charge = await stripe.charges.create({
        amount: '3000',
        currency: 'usd',
        customer: customer.id,
        description: 'Software'
    });
    res.render('download');
});

module.exports = router;