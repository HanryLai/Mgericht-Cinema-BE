require('dotenv').config();
import app from './app/app';
import config from './app/configs/db.config';

const port = config.app.port || process.env.PORT;
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
