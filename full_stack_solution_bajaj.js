const express = require('express');
const app = express();
app.use(express.json());

// POST endpoint
app.post('/bfhl', (req, res) => {
    try {
        const {data } = req.body;
        if (!data || !Array.isArray(data)) {
            return res.status(400).json({
                is_success: false,
                message: "Provide a valid array in 'data'."
            });
        }
        const oddNum = [];
        const evenNum = [];
        const alphabets =[];
        const specialCharacters = [];
        let totalSum = 0;

        data.forEach(item => {
            if (/^-?\d+$/.test(item)) {
                const number = parseInt(item, 10);
                number % 2 === 0 ? evenNum.push(item) : oddNum.push(item);
                totalSum += number;
            } else if (/^[a-zA-Z]+$/.test(item)) {
                alphabets.push(item.toUpperCase());
            } else {
                specialCharacters.push(item);
            }
        });
        const reversedAlphabets = alphabets.join('').split('').reverse().join('');
        let finalConcatenatedString = '';
        for (let i = 0; i < reversedAlphabets.length; i++) {
            finalConcatenatedString += i % 2 === 0 
                ? reversedAlphabets[i].toUpperCase() 
                : reversedAlphabets[i].toLowerCase();
        }

        const responsePayload = {
            is_success: true,
            user_id: "john_doe_17091999",
            email: "john@xyz.com",
            roll_number: "ABCD123",
            odd_numbers: oddNum,
            even_numbers: evenNum,
            alphabets,
            special_characters: specialCharacters,
            sum: totalSum.toString(),
            concat_string: finalConcatenatedString
        };

        res.status(200).json(responsePayload);
    } catch (error) {
        res.status(500).json({
            is_success: false,
            message: `Error: ${error.message}`
        });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));