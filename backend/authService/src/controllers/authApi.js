const fetch = require('node-fetch');
const signInUrl = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDI26Bw2RZkbNJp-U77lA3v_fX_Wou_hWQ";
const signUpUrl = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDI26Bw2RZkbNJp-U77lA3v_fX_Wou_hWQ";

app.post('/signin', async (req, res) => {
    try {
        const { email, password } = req.body;
        const signInResponse = await fetch(signInUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
                password,
                returnSecureToken: true,
            }),
        });
        const signInData = await signInResponse.json();
        res.json(signInData);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/signup', async (req, res) => {
    try {
        const { email, password } = req.body;
        const signUpResponse = await fetch(signUpUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
                password,
                returnSecureToken: true,
            }),
        });
        const signUpData = await signUpResponse.json();
        res.json(signUpData);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
