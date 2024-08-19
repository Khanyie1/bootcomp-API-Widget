import express from 'express'
import cors from 'cors'

const app = express();

app.use(express.static('public'))
app.use(cors())

app.use(express.urlencoded({ extended: false}))
app.use(express.json())

let callPrice = 2.75;
let smsPrice = 0.65;

app.get("/api/Khanyie/word_game", function(req, res) {
    const sentence = req.query.sentence;
    
    const words = sentence.split(" ");
    
    let longestWord = "";
    
    for (let i = 0; i < words.length; i++) {
        const word = words[i].trim();
        console.log(word);
        if (word.length >= longestWord.length) {
            longestWord = word;
        }
    }


    let shortestWord = sentence;
    
    for (let i = 0; i < words.length; i++) {
        const word = words[i].trim();
        
        if (word.length <= shortestWord.length) {
            shortestWord = word;
        }
    }

    let sum = 0;
    for (let i = 0; i < words.length; i++) {
        const word = words[i].trim();
        sum += word.length;
    }

    res.json({
        longestWord,
        shortestWord,
        sum
    });
})

app.post("/api/Khanyie/phonebill/total", function (req, res) {
    const { bill } = req.body;
    if (!bill) {
        return res.status(400).json({ error: 'Bill is required' });
    }

    const items = bill.split(',');
    const total = items.reduce((account, item) => {
        if (item === 'call') return account + callPrice;
        if (item === 'sms') return account + smsPrice;
        return account;
    }, 0);

    res.json({ total })
})

app.get("/api/Khanyie/phonebill/prices", function(req, res) {
    res.json({ 
        call: callPrice, 
        sms: smsPrice 
    });
})

app.post("/api/Khanyie/phonebill/price", function(req, res) {
    const { type, price } = req.body;

    if (!type || !price) {
        return res.status(400).json({ error: 'Type and price are required' });
    }

    if (type === 'call'){
        callPrice = price;
    } 
    if (type === 'sms'){
        smsPrice = price;
    } 

    res.json({ 
        status: 'success', 
        message: `The ${type} was set to ${price}` 
    });
})

app.post("/api/Khanyie/enough", function(req, res) {
    const { usage, available } = req.body;
    if (!usage || available === undefined) {
        return res.status(400).json({ error: 'Usage and available are required' });
    }

    const items = usage.split(',');
    const totalCost = items.reduce((acc, item) => {
        if (item === 'call') return acc + 2.75;
        if (item === 'sms') return acc + 0.65;
        return acc;
    }, 0);

    const result = available - totalCost;

    res.json({ 
        result 
    });
})

const PORT = process.env.PORT || 3009;

app.listen(PORT, function(){
    console.log('App starting on port:', PORT);
});
