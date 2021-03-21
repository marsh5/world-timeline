const express = require('express');
const app = express();
const cors = require('cors');
const pool = require('./db');
const path = require("path");
const PORT = process.env.PORT || 5000;

//middleware
app.use(cors());
app.use(express.json());

if(process.env.NODE_ENV === "production") {
    //server static content
    //npm run build
    app.use(express.static("client/build"))
}


//ROUTES

app.get('/', async (req, res) => {
    res.send('<h1>Hello Friend</h1>');
})

app.get('/marketcap/:year', async (req, res) => {
    try {
        const { year } = req.params;
        const cap = await pool.query('SELECT mc.year, mc.rank, co.name, co.ticker, co.industry, co.country, mc.cap FROM companies co INNER JOIN marketcap mc ON co.ticker = mc.company_ticker WHERE mc.year = $1 ORDER BY rank asc', [year]);
        res.json(cap.rows);
        
        
    } catch (err) {
        console.error(err.message);
    }
});

app.get('/richestpeople/:year', async (req, res) => {
    try {
        const { year } = req.params;
        const rich = await pool.query('SELECT rp.year, rp.rank, rp.networth, p.name, p.country, p.source, rp.rich_id FROM richestpeople rp INNER JOIN people p ON rp.person_initial = p.initials WHERE rp.year = $1 ORDER BY rank asc', [year]);
        res.json(rich.rows);
        
    } catch (err) {
        console.error(err.message); 
    }
});

app.get('/gdp/:year', async (req,res) => {
    try {
        const { year } = req.params;
        const gdp = await pool.query(`SELECT gdp.code2, gdp.name, gdp.year${year} as gdp, pc.year${year} as percapita FROM gdp INNER JOIN percapita pc ON gdp.code = pc.ccode ORDER BY gdp.year${year} desc LIMIT 10`);
        res.json(gdp.rows);
        
    } catch (err) {
        console.error(err.message);
    }
});

app.get('/population/:year', async (req,res) => {
    try {
        const { year } = req.params;
        const population = await pool.query(`SELECT name, code2, year${year} as population, percent${year} as percent FROM population
        ORDER BY year${year} desc
        LIMIT 11;`);
        res.json(population.rows);
        
    } catch (err) {
        console.error(err.message);
    }
});

app.get('/faang/:year', async(req, res) => {
    try {
        const { year } = req.params;
        const faang = await pool.query(`SELECT rev.name, rev.year${year} as revenue, prof.year${year} as profit FROM faangrevenue rev LEFT JOIN faangprofit prof ON rev.ticker = prof.ticker`);
        res.json(faang.rows);

    } catch (err) {
        console.error(err.message);
    }
});

app.get('/powerful/:year', async(req, res) => {
    try {
        const { year } = req.params;
        const faang = await pool.query(`SELECT mp.name, mp.country, mp.source FROM mostpowerful mp ORDER BY year${year} desc LIMIT 10;`);
        res.json(faang.rows)
    } catch (err) {
        console.error(err);
    }
});

app.get("*", (req,res) => {
    res.sendFile(path.join(__dirname, "client/build/index.html"));
});



app.listen(PORT, () => {
    console.log(`Server has started on port ${PORT}`);
});