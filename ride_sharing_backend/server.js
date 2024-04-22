const express = require('express')
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const router= require('./routes/passenger_router')

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
//app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect('mongodb+srv://Ayeshasaqib:Aishashi%40533@atlascluster.02no8pr.mongodb.net/ride_sharing?retryWrites=true&w=majority&appName=AtlasCluster')
        .then(()=>{
            console.log('connection establish');
          })
          .catch((err)=>console.log(err));
        

// Routes
app.use('/passenger',router);

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
