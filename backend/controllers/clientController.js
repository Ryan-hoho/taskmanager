const Client = require('../models/Client');

const getClients = async (req, res) => {
    try {
        const clients = await Client.find({ userId: req.user.id });
        res.json(clients);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const addClient = async (req, res) => {
    const { firstname, middlename, lastname, company, occupation, email, phone, clientStatus } = req.body;
    try {
        const client = await Client.create({ 
            userId: req.user.id,
            firstname, middlename, lastname, company, occupation, email, phone, clientStatus });
        res.status(201).json(client);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const updateClient = async (req, res) => {
    const { firstname, middlename, lastname, company, occupation, email, phone, clientStatus } = req.body;
    try {
        const client = await Client.findById(req.params.id);
        if (!client) return res.status(404).json({ message: 'Client not found' });

        client.firstname = firstname || client.firstname;
        client.middlename = middlename || client.middlename;
        client.lastname = lastname ?? client.lastname;
        client.company = company || client.company;
        client.occupation = occupation || client.occupation;
        client.email = email || client.email;
        client.phone = phone || client.phone;
        client.clientStatus = clientStatus || client.clientStatus;



        const updatedClient = await client.save();
        res.json(updatedClient);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const deleteClient = async (req, res) => {
    try {
        const client = await Client.findById(req.params.id);
        if (!client) return res.status(404).json({ message: 'Client not found' });

        await client.remove();
        res.json({ message: 'Client deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


module.exports = { getClients, addClient, updateClient, deleteClient };
